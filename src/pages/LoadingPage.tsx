import ErrorDialog from "@/components/ErrorDialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import logger from "@/lib/logger";
import api from "@/services/api";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// 분석 단계 정의
type AnalysisStep = "upload" | "extract" | "analyze" | "generate";

interface AnalysisStepInfo {
  title: string;
  description: string;
  duration: number; // 초 단위
}

// 각 단계별 정보 정의
const ANALYSIS_STEPS: Record<AnalysisStep, AnalysisStepInfo> = {
  upload: {
    title: "PDF 업로드 중",
    description: "등기부등본 파일을 서버에 업로드하고 있습니다",
    duration: 3,
  },
  extract: {
    title: "텍스트 추출 중",
    description: "PDF에서 텍스트 데이터를 추출하고 있습니다",
    duration: 5,
  },
  analyze: {
    title: "AI 분석 중",
    description: "추출된 데이터를 AI 모델로 분석하고 있습니다",
    duration: 8,
  },
  generate: {
    title: "결과 생성 중",
    description: "분석 결과 보고서를 생성하고 있습니다",
    duration: 4,
  },
};

// 단계 순서 정의
const STEP_ORDER: AnalysisStep[] = ["upload", "extract", "analyze", "generate"];

// 최대 재시도 횟수
const MAX_RETRY_COUNT = 3;

// 문제 해결 팁
const TROUBLESHOOTING_TIPS = [
  "인터넷 연결 상태를 확인해주세요.",
  "PDF 파일이 손상되지 않았는지 확인해주세요.",
  "파일 크기가 20MB 이하인지 확인해주세요.",
  "지원되는 PDF 형식인지 확인해주세요.",
  "브라우저 캐시를 삭제하고 다시 시도해보세요.",
];

interface LoadingPageProps {
  fileSize?: number; // KB 단위
  onCancel?: () => void;
  testMode?: boolean; // 테스트 모드 (실제 API 호출 없이 UI 테스트)
}

export default function LoadingPage({
  onCancel,
  testMode = false, // 기본값을 false로 변경
}: LoadingPageProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // UploadPage에서 전달된 파일 정보
  const fileData = location.state || {
    fileSize: 1000,
    fileName: "등기부등본.pdf",
    fileObject: null,
  };

  const fileSize = fileData.fileSize || 1000; // 기본값 1MB (1000KB)
  const file = fileData.fileObject as File | null;

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(
    "서버 연결에 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
  );
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isApiCallComplete, setIsApiCallComplete] = useState<boolean>(false);
  const [retryCount, setRetryCount] = useState<number>(0);
  const [isRetrying, setIsRetrying] = useState<boolean>(false);

  const currentStep = STEP_ORDER[currentStepIndex];
  const totalSteps = STEP_ORDER.length;

  // 총 예상 시간 계산 (파일 크기에 따라 조정)
  const calculateTotalTime = () => {
    // 기본 시간 (모든 단계의 기본 시간 합)
    const baseTime = Object.values(ANALYSIS_STEPS).reduce(
      (sum, step) => sum + step.duration,
      0
    );

    // 파일 크기에 따른 추가 시간 (1MB당 2초 추가)
    const fileSizeMultiplier = fileSize / 1000; // MB 단위로 변환
    const additionalTime = fileSizeMultiplier * 2;

    return baseTime + additionalTime;
  };

  // 현재 단계의 진행도에 따른 전체 진행도 계산
  const calculateOverallProgress = (
    stepIndex: number,
    stepProgress: number
  ) => {
    const stepWeight = 100 / totalSteps;
    return Math.min(
      Math.round(stepIndex * stepWeight + (stepProgress * stepWeight) / 100),
      100
    );
  };

  // 취소 핸들러
  const handleCancel = () => {
    logger.info("분석 취소됨", { fileName: fileData.fileName }, "ANALYZE");
    if (onCancel) {
      onCancel();
    } else {
      navigate("/upload");
    }
  };

  // API 호출 함수
  const callAnalysisApi = async () => {
    if (!file) {
      logger.error(
        "파일 객체 없음",
        { fileName: fileData.fileName },
        "ANALYZE"
      );
      setIsError(true);
      setErrorMessage("파일이 없습니다. 다시 업로드해주세요.");
      return;
    }

    try {
      setIsRetrying(false);
      // 업로드 단계 진행
      setCurrentStepIndex(0); // upload 단계

      logger.info(
        "등기부등본 분석 API 호출 시작",
        {
          fileName: file.name,
          fileSize: file.size,
          retryCount,
        },
        "ANALYZE"
      );

      // API 호출
      const result = await api.analyzeRegistration(
        file,
        "gpt-4.1",
        uploadProgress => {
          // 업로드 진행률 업데이트
          setProgress(uploadProgress);

          // 전체 진행도 업데이트
          const overallProgress = calculateOverallProgress(0, uploadProgress);
          document.title = `분석 중... ${overallProgress}% | ZipCheck`;
        }
      );

      // API 호출 완료 후 결과 저장
      logger.info(
        "등기부등본 분석 API 호출 완료",
        {
          fileName: file.name,
          resultSize: JSON.stringify(result).length,
        },
        "ANALYZE"
      );

      setAnalysisResult(result);
      setIsApiCallComplete(true);
      // 재시도 카운트 초기화
      setRetryCount(0);

      // localStorage에 분석 결과 저장
      try {
        // 파일 이름을 키로 사용하여 결과 저장
        const storageKey = `zipcheck_analysis_${file.name.replace(/\s+/g, "_").replace(/\.[^/.]+$/, "")}`;
        localStorage.setItem(
          storageKey,
          JSON.stringify({
            timestamp: new Date().toISOString(),
            fileName: file.name,
            fileSize: file.size,
            result: result,
          })
        );

        // 분석 기록 인덱스 업데이트
        const historyIndex = JSON.parse(
          localStorage.getItem("zipcheck_history_index") || "[]"
        );
        historyIndex.push(storageKey);
        localStorage.setItem(
          "zipcheck_history_index",
          JSON.stringify(historyIndex)
        );

        logger.info(
          "분석 결과 localStorage 저장 완료",
          {
            fileName: file.name,
            storageKey,
          },
          "STORAGE"
        );
      } catch (storageError) {
        logger.error(
          "localStorage 저장 오류",
          {
            error: storageError,
            fileName: file.name,
          },
          "STORAGE"
        );
      }

      // 나머지 단계 진행 (텍스트 추출, AI 분석, 결과 생성)
      // API가 이미 완료되었지만, 사용자 경험을 위해 나머지 단계도 표시
      setCurrentStepIndex(1); // extract 단계로 이동
    } catch (error) {
      logger.error(
        "API 호출 중 오류 발생",
        {
          error,
          fileName: file?.name,
          retryCount,
        },
        "ANALYZE"
      );

      // 오류 메시지 설정
      let message = "분석 중 오류가 발생했습니다. 다시 시도해주세요.";

      if (error instanceof Error) {
        message = error.message;
      }

      setIsError(true);
      setErrorMessage(message);
    }
  };

  // 초기 API 호출
  useEffect(() => {
    if (!testMode && !isError) {
      logger.info(
        "LoadingPage 초기화",
        {
          fileName: fileData.fileName,
          fileSize: fileSize,
          testMode,
        },
        "ANALYZE"
      );
      callAnalysisApi();
    }
  }, []);

  useEffect(() => {
    if (isError) return;

    // 테스트 모드이거나 API 호출이 완료되지 않은 경우에만 시뮬레이션 진행
    if (testMode || (currentStepIndex > 0 && isApiCallComplete)) {
      let stepDuration = ANALYSIS_STEPS[currentStep].duration * 1000; // ms로 변환

      // 파일 크기에 따른 단계별 시간 조정
      if (currentStep === "extract" || currentStep === "analyze") {
        const fileSizeMultiplier = fileSize / 1000; // MB 단위로 변환
        stepDuration += fileSizeMultiplier * 1000; // 1MB당 1초 추가
      }

      const interval = 100; // 100ms마다 업데이트
      let elapsed = 0;
      let remaining = calculateTotalTime();

      logger.debug(
        `단계 시작: ${currentStep}`,
        {
          stepIndex: currentStepIndex,
          duration: stepDuration,
          totalSteps,
        },
        "ANALYZE"
      );

      // 진행도 업데이트 타이머
      const timer = setInterval(() => {
        elapsed += interval;
        const stepProgress = Math.min((elapsed / stepDuration) * 100, 100);
        setProgress(stepProgress);

        // 남은 시간 업데이트
        remaining -= interval / 1000;
        setTimeRemaining(Math.max(Math.ceil(remaining), 0));

        // 전체 진행도 업데이트
        const overallProgress = calculateOverallProgress(
          currentStepIndex,
          stepProgress
        );
        document.title = `분석 중... ${overallProgress}% | ZipCheck`;

        // 현재 단계 완료 시 다음 단계로 이동
        if (stepProgress >= 100) {
          clearInterval(timer);

          logger.debug(
            `단계 완료: ${currentStep}`,
            {
              stepIndex: currentStepIndex,
              nextStepIndex: currentStepIndex + 1,
              isLastStep: currentStepIndex >= totalSteps - 1,
            },
            "ANALYZE"
          );

          if (currentStepIndex < totalSteps - 1) {
            setCurrentStepIndex(prev => prev + 1);
          } else {
            // 모든 단계 완료 시 결과 페이지로 이동
            setTimeout(() => {
              document.title = "분석 완료 | ZipCheck";
              logger.info(
                "분석 완료, 결과 페이지로 이동",
                {
                  fileName: fileData.fileName,
                  hasResult: !!analysisResult,
                },
                "ANALYZE"
              );

              navigate("/result", {
                state: {
                  analysisResult: analysisResult || {
                    // 테스트 모드일 경우 더미 데이터
                    riskScore: 65,
                    issues: [
                      {
                        title: "소유권 이전 등기 미완료",
                        severity: "high",
                        description:
                          "현재 등기부에 소유권 이전 등기가 완료되지 않았습니다.",
                      },
                      {
                        title: "근저당권 설정",
                        severity: "medium",
                        description:
                          "해당 부동산에 근저당권이 설정되어 있습니다.",
                      },
                    ],
                    recommendations: [
                      "전문 법무사와 상담하세요",
                      "등기부등본을 정확히 확인하세요",
                    ],
                  },
                },
              });
            }, 500);
          }
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [
    currentStepIndex,
    fileSize,
    navigate,
    isError,
    testMode,
    currentStep,
    isApiCallComplete,
  ]);

  // 에러 시뮬레이션 (테스트용)
  const simulateError = () => {
    logger.debug("에러 시뮬레이션 실행", null, "TEST");
    setIsError(true);
  };

  // 재시도 핸들러
  const handleRetry = () => {
    // 최대 재시도 횟수를 초과한 경우
    if (retryCount >= MAX_RETRY_COUNT) {
      logger.warn(
        "최대 재시도 횟수 초과",
        {
          retryCount,
          maxRetries: MAX_RETRY_COUNT,
          fileName: fileData.fileName,
        },
        "ANALYZE"
      );

      setErrorMessage(
        `최대 재시도 횟수(${MAX_RETRY_COUNT}회)를 초과했습니다. 나중에 다시 시도하거나 고객센터에 문의해주세요.`
      );
      return;
    }

    const newRetryCount = retryCount + 1;
    logger.info(
      "분석 재시도",
      {
        retryCount: newRetryCount,
        maxRetries: MAX_RETRY_COUNT,
        fileName: fileData.fileName,
      },
      "ANALYZE"
    );

    setIsError(false);
    setCurrentStepIndex(0);
    setProgress(0);
    setTimeRemaining(calculateTotalTime());
    setRetryCount(newRetryCount);
    setIsRetrying(true);

    if (!testMode) {
      callAnalysisApi();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">ZipCheck</h1>
          </div>
        </div>
      </header>

      {/* 에러 다이얼로그 */}
      <ErrorDialog
        open={isError}
        title="분석 중 오류가 발생했습니다"
        message={errorMessage}
        onRetry={handleRetry}
        onCancel={handleCancel}
        maxRetries={MAX_RETRY_COUNT}
        currentRetry={retryCount}
        showTroubleshooting={retryCount >= MAX_RETRY_COUNT}
        troubleshootingTips={TROUBLESHOOTING_TIPS}
      />

      {/* 메인 컨텐츠 */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          {!isError && (
            // 로딩 상태 UI
            <div className="p-8">
              {/* 파일 정보 표시 */}
              <div className="mb-6 text-center">
                <p className="text-sm text-gray-500 mb-1">분석 중인 파일</p>
                <p className="font-medium text-gray-800">{fileData.fileName}</p>
                <p className="text-xs text-gray-500">
                  {(fileSize / 1024).toFixed(2)} MB
                </p>
              </div>

              {/* 현재 단계 표시 */}
              <div className="text-center mb-8">
                <motion.h2
                  key={currentStep}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xl font-bold text-gray-900 mb-2"
                >
                  {isRetrying
                    ? `재시도 중: ${ANALYSIS_STEPS[currentStep].title}`
                    : ANALYSIS_STEPS[currentStep].title}
                </motion.h2>
                <motion.p
                  key={`desc-${currentStep}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-600"
                >
                  {ANALYSIS_STEPS[currentStep].description}
                </motion.p>
                {isRetrying && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-amber-600 mt-2"
                  >
                    재시도 횟수: {retryCount}/{MAX_RETRY_COUNT}
                  </motion.p>
                )}
              </div>

              {/* 진행 상태 표시 */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>진행 중...</span>
                  <span>{progress.toFixed(0)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              {/* 단계별 상태 표시 */}
              <div className="mb-8">
                <div className="relative">
                  {/* 연결선 */}
                  <div className="absolute top-4 left-4 right-4 h-0.5 bg-gray-200" />

                  {/* 단계 표시 */}
                  <div className="relative flex justify-between">
                    {STEP_ORDER.map((step, index) => {
                      const isCompleted = index < currentStepIndex;
                      const isActive = index === currentStepIndex;

                      return (
                        <div key={step} className="flex flex-col items-center">
                          <motion.div
                            className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                              isCompleted
                                ? "bg-green-500 text-white"
                                : isActive
                                  ? "bg-blue-500 text-white"
                                  : "bg-gray-200 text-gray-500"
                            }`}
                            animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                            transition={{ repeat: Infinity, duration: 2 }}
                          >
                            {isCompleted ? (
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            ) : (
                              <span className="text-xs">{index + 1}</span>
                            )}
                          </motion.div>
                          <span className="text-xs mt-2 text-gray-600">
                            {step === "upload"
                              ? "업로드"
                              : step === "extract"
                                ? "추출"
                                : step === "analyze"
                                  ? "분석"
                                  : "결과"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 남은 시간 표시 */}
              <div className="text-center mb-8">
                <p className="text-sm text-gray-600">
                  예상 남은 시간:{" "}
                  <span className="font-medium">{timeRemaining}초</span>
                </p>
              </div>

              {/* 취소 버튼 */}
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="text-gray-600"
                >
                  분석 취소
                </Button>
              </div>

              {/* 테스트 모드 버튼 (개발용) */}
              {testMode && (
                <div className="mt-8 pt-4 border-t border-gray-100">
                  <div className="flex justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={simulateError}
                      className="text-xs text-red-500"
                    >
                      에러 시뮬레이션
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate("/result")}
                      className="text-xs"
                    >
                      결과 페이지로
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* 푸터 */}
      <footer className="bg-white border-t mt-auto">
        <div className="container mx-auto px-4 py-4">
          <div className="text-center text-gray-500 text-sm">
            <p>© 2024 ZipCheck. 모든 권리 보유.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
