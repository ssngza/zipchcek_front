import { API_ENDPOINTS } from "@/constants";
import axios from "axios";

// API 기본 설정
const API_BASE_URL = API_ENDPOINTS.base;

// 기본 axios 인스턴스 생성
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 설정
api.interceptors.request.use(
  config => {
    // 로컬 스토리지에서 토큰 가져오기
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 기본 API 함수들
export default {
  // 파일 업로드 API
  uploadFile: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // 계약서 분석 API
  analyzeContract: async (fileId: string) => {
    const response = await api.post("/analyze", { fileId });
    return response.data;
  },

  // 분석 결과 조회 API
  getAnalysisResult: async (analysisId: string) => {
    const response = await api.get(`/analysis/${analysisId}`);
    return response.data;
  },

  // 분석 기록 조회 API
  getHistory: async (page = 1, limit = 10) => {
    const response = await api.get("/history", {
      params: { page, limit },
    });
    return response.data;
  },

  // 분석 기록 삭제 API
  deleteHistory: async (historyId: string) => {
    const response = await api.delete(`/history/${historyId}`);
    return response.data;
  },
};
