import FeedbackForm from "@/components/FeedbackForm";
import FeedbackThankYou from "@/components/FeedbackThankYou";
import { useFeedback } from "@/hooks/useFeedback";
import { useState } from "react";

export interface FeedbackContainerProps {
  propertyId?: string;
  className?: string;
}

export default function FeedbackContainer({
  propertyId,
  className = "",
}: FeedbackContainerProps) {
  const [showThankYou, setShowThankYou] = useState(false);
  const [submittedRating, setSubmittedRating] = useState(0);
  const { submitFeedback, hasSubmittedFeedback } = useFeedback(propertyId);

  // 이미 피드백을 제출했는지 확인
  const alreadySubmitted = hasSubmittedFeedback();

  // 피드백 제출 처리
  const handleSubmit = async (rating: number, comment: string) => {
    await submitFeedback(rating, comment);
    setSubmittedRating(rating);
    setShowThankYou(true);
  };

  // 감사 메시지 닫기
  const handleCloseThankYou = () => {
    setShowThankYou(false);
  };

  // 이미 피드백을 제출했거나 감사 메시지를 표시 중이면 피드백 폼을 표시하지 않음
  if (alreadySubmitted) {
    return null;
  }

  return (
    <div className={`my-6 ${className}`}>
      {showThankYou ? (
        <FeedbackThankYou
          onClose={handleCloseThankYou}
          rating={submittedRating}
        />
      ) : (
        <FeedbackForm onSubmit={handleSubmit} />
      )}
    </div>
  );
}
