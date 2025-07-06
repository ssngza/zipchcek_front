import { API_ENDPOINTS } from "@/constants";
import logger from "@/lib/logger";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

// API 기본 설정
const API_BASE_URL = API_ENDPOINTS.base;

// 최대 재시도 횟수
const MAX_RETRIES = 3;
// 재시도 지연 시간 (ms) - 지수 백오프를 위한 기본값
const RETRY_DELAY = 1000;

// 재시도 가능한 HTTP 상태 코드
const RETRYABLE_STATUS_CODES = [408, 429, 500, 502, 503, 504];

// 재시도 가능한 오류인지 확인하는 함수
const isRetryableError = (error: AxiosError): boolean => {
  // 네트워크 오류인 경우
  if (!error.response) {
    return true;
  }

  // 재시도 가능한 상태 코드인 경우
  return RETRYABLE_STATUS_CODES.includes(error.response.status);
};

// 지수 백오프 지연 시간 계산 함수
const getRetryDelay = (retryCount: number): number => {
  return RETRY_DELAY * Math.pow(2, retryCount);
};

// 재시도 로직이 포함된 axios 요청 함수
const axiosRetry = async <T>(
  axiosInstance: AxiosInstance,
  config: AxiosRequestConfig,
  retryCount = 0
): Promise<T> => {
  try {
    const response = await axiosInstance(config);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    // 오류 로깅
    logger.warn(
      `API 요청 오류 (시도 ${retryCount + 1}/${MAX_RETRIES + 1})`,
      {
        url: config.url,
        method: config.method,
        status: axiosError.response?.status,
        statusText: axiosError.response?.statusText,
        retryCount,
      },
      "API"
    );

    // 재시도 가능한 오류이고 최대 재시도 횟수를 초과하지 않은 경우
    if (isRetryableError(axiosError) && retryCount < MAX_RETRIES) {
      const delay = getRetryDelay(retryCount);
      logger.info(`${delay}ms 후 재시도 중...`, { url: config.url }, "API");

      // 지연 후 재시도
      await new Promise(resolve => setTimeout(resolve, delay));
      return axiosRetry(axiosInstance, config, retryCount + 1);
    }

    // 재시도 불가능하거나 최대 재시도 횟수 초과 시 오류 전파
    throw axiosError;
  }
};

// 기본 axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30초 타임아웃 설정
});

// 요청 인터셉터 설정
axiosInstance.interceptors.request.use(
  config => {
    // 로컬 스토리지에서 토큰 가져오기
    // const token = localStorage.getItem("auth_token");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    // 요청 로깅
    logger.debug(
      `API 요청: ${config.method?.toUpperCase()} ${config.url}`,
      null,
      "API"
    );

    return config;
  },
  error => {
    logger.error("API 요청 인터셉터 오류", error, "API");
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
  response => {
    // 응답 로깅
    logger.debug(
      `API 응답: ${response.config.method?.toUpperCase()} ${response.config.url}`,
      { status: response.status },
      "API"
    );
    return response;
  },
  error => {
    // 오류 로깅
    if (error.response) {
      logger.error(
        `API 응답 오류: ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
        {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
        },
        "API"
      );
    } else {
      logger.error("API 네트워크 오류", error, "API");
    }

    // 인증 오류 처리 (401)
    if (error.response && error.response.status === 401) {
      // 토큰 만료 등의 인증 오류 처리
      logger.warn("인증 오류 발생: 로그인이 필요합니다.", null, "AUTH");
      // localStorage.removeItem("auth_token"); // 토큰 제거
      // 로그인 페이지로 리다이렉트 등의 처리
    }

    return Promise.reject(error);
  }
);

// 히스토리 응답 타입 정의
interface HistoryResponse {
  items: any[];
  total: number;
  page: number;
  limit: number;
}

// 기본 API 함수들
export default {
  // 파일 업로드 API
  uploadFile: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      logger.info(
        "파일 업로드 시작",
        { fileName: file.name, fileSize: file.size },
        "UPLOAD"
      );

      const result = await axiosRetry(axiosInstance, {
        method: "post",
        url: "/upload",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      logger.info("파일 업로드 성공", { fileName: file.name }, "UPLOAD");
      return result;
    } catch (error) {
      logger.error(
        "파일 업로드 실패",
        { fileName: file.name, error },
        "UPLOAD"
      );
      throw new Error("파일 업로드에 실패했습니다. 다시 시도해주세요.");
    }
  },

  // 등기부등본 분석 API
  analyzeRegistration: async (
    file: File,
    model: string = "gpt-4.1",
    onProgress?: (progress: number) => void
  ) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("model", model);

    try {
      logger.info(
        "등기부등본 분석 시작",
        { fileName: file.name, fileSize: file.size, model },
        "ANALYZE"
      );

      const result = await axiosRetry(axiosInstance, {
        method: "post",
        url: "/openai/analyze-registration",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: progressEvent => {
          if (progressEvent.total && onProgress) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(percentCompleted);

            // 진행 상황 로깅 (25%, 50%, 75%, 100%일 때만)
            if (percentCompleted % 25 === 0) {
              logger.debug(
                `업로드 진행률: ${percentCompleted}%`,
                null,
                "UPLOAD"
              );
            }
          }
        },
      });

      logger.info("등기부등본 분석 성공", { fileName: file.name }, "ANALYZE");
      return result;
    } catch (error) {
      logger.error(
        "등기부등본 분석 실패",
        { fileName: file.name, error },
        "ANALYZE"
      );

      if (axios.isAxiosError(error) && error.response) {
        // 서버 응답이 있는 경우
        if (error.response.status === 413) {
          throw new Error(
            "파일 크기가 너무 큽니다. 20MB 이하의 파일을 업로드해주세요."
          );
        } else if (error.response.status === 415) {
          throw new Error(
            "지원하지 않는 파일 형식입니다. PDF 파일만 업로드 가능합니다."
          );
        } else if (error.response.status === 429) {
          throw new Error("요청이 너무 많습니다. 잠시 후 다시 시도해주세요.");
        } else if (error.response.status >= 500) {
          throw new Error(
            "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
          );
        }
      }
      // 그 외 오류
      throw new Error(
        "등기부등본 분석 중 오류가 발생했습니다. 다시 시도해주세요."
      );
    }
  },

  // 계약서 분석 API
  analyzeContract: async (fileId: string) => {
    try {
      logger.info("계약서 분석 시작", { fileId }, "ANALYZE");

      const result = await axiosRetry(axiosInstance, {
        method: "post",
        url: "/analyze",
        data: { fileId },
      });

      logger.info("계약서 분석 성공", { fileId }, "ANALYZE");
      return result;
    } catch (error) {
      logger.error("계약서 분석 실패", { fileId, error }, "ANALYZE");
      throw new Error("계약서 분석 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  },

  // 분석 결과 조회 API
  getAnalysisResult: async (analysisId: string) => {
    try {
      logger.info("분석 결과 조회", { analysisId }, "RESULT");

      const result = await axiosRetry(axiosInstance, {
        method: "get",
        url: `/analysis/${analysisId}`,
      });

      logger.info("분석 결과 조회 성공", { analysisId }, "RESULT");
      return result;
    } catch (error) {
      logger.error("분석 결과 조회 실패", { analysisId, error }, "RESULT");
      throw new Error(
        "분석 결과를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요."
      );
    }
  },

  // 분석 기록 조회 API
  getHistory: async (page = 1, limit = 10) => {
    try {
      logger.info("분석 기록 조회", { page, limit }, "HISTORY");

      const result = await axiosRetry<HistoryResponse>(axiosInstance, {
        method: "get",
        url: "/history",
        params: { page, limit },
      });

      logger.info(
        "분석 기록 조회 성공",
        { page, limit, count: result.items?.length || 0 },
        "HISTORY"
      );
      return result;
    } catch (error) {
      logger.error("분석 기록 조회 실패", { page, limit, error }, "HISTORY");
      throw new Error(
        "분석 기록을 불러오는 중 오류가 발생했습니다. 다시 시도해주세요."
      );
    }
  },

  // 분석 기록 삭제 API
  deleteHistory: async (historyId: string) => {
    try {
      logger.info("분석 기록 삭제", { historyId }, "HISTORY");

      const result = await axiosRetry(axiosInstance, {
        method: "delete",
        url: `/history/${historyId}`,
      });

      logger.info("분석 기록 삭제 성공", { historyId }, "HISTORY");
      return result;
    } catch (error) {
      logger.error("분석 기록 삭제 실패", { historyId, error }, "HISTORY");
      throw new Error(
        "분석 기록 삭제 중 오류가 발생했습니다. 다시 시도해주세요."
      );
    }
  },
};
