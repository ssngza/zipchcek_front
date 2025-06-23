import { useCallback, useState } from "react";

// 피드백 데이터 인터페이스
export interface FeedbackData {
  id: string;
  propertyId?: string; // 부동산 ID (선택)
  rating: number; // 1-5 별점
  comment?: string; // 선택적 코멘트
  timestamp: number; // 제출 시간
}

// 로컬 스토리지 키
const FEEDBACK_STORAGE_KEY = "zipcheck_feedback_data";

/**
 * 피드백 데이터를 관리하는 커스텀 훅
 * @param propertyId 부동산 ID (선택)
 */
export function useFeedback(propertyId?: string) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);

  // 피드백 제출 함수
  const submitFeedback = useCallback(
    async (rating: number, comment?: string) => {
      setIsSubmitting(true);
      setError(null);
      setSuccess(false);

      try {
        // 새 피드백 데이터 생성
        const newFeedback: FeedbackData = {
          id: generateId(),
          propertyId,
          rating,
          comment,
          timestamp: Date.now(),
        };

        // 기존 피드백 데이터 불러오기
        const existingFeedback = loadFeedbackFromStorage();

        // 새 피드백 추가
        const updatedFeedback = [...existingFeedback, newFeedback];

        // 로컬 스토리지에 저장
        saveFeedbackToStorage(updatedFeedback);

        // 성공 상태 설정
        setSuccess(true);

        // 필요한 경우 여기에 API 호출 추가 가능
        // await sendFeedbackToApi(newFeedback);

        return newFeedback;
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("피드백 제출 중 오류가 발생했습니다.")
        );
        throw err;
      } finally {
        setIsSubmitting(false);
      }
    },
    [propertyId]
  );

  // 특정 부동산에 대한 피드백 불러오기
  const loadPropertyFeedback = useCallback(() => {
    if (!propertyId) return null;

    const allFeedback = loadFeedbackFromStorage();
    return (
      allFeedback.find(feedback => feedback.propertyId === propertyId) || null
    );
  }, [propertyId]);

  // 사용자가 이미 피드백을 제출했는지 확인
  const hasSubmittedFeedback = useCallback(() => {
    if (!propertyId) return false;
    return loadPropertyFeedback() !== null;
  }, [propertyId, loadPropertyFeedback]);

  return {
    submitFeedback,
    loadPropertyFeedback,
    hasSubmittedFeedback,
    isSubmitting,
    error,
    success,
  };
}

// 유틸리티 함수

// 고유 ID 생성
function generateId(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

// 로컬 스토리지에서 피드백 데이터 불러오기
function loadFeedbackFromStorage(): FeedbackData[] {
  try {
    const storedData = localStorage.getItem(FEEDBACK_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.error("피드백 데이터 로드 중 오류:", error);
    return [];
  }
}

// 로컬 스토리지에 피드백 데이터 저장
function saveFeedbackToStorage(feedbackData: FeedbackData[]): void {
  try {
    localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(feedbackData));
  } catch (error) {
    console.error("피드백 데이터 저장 중 오류:", error);
  }
}
