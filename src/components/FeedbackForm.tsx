import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useState } from "react";

export interface FeedbackFormProps {
  onSubmit: (rating: number, comment: string) => void;
  className?: string;
}

export default function FeedbackForm({
  onSubmit,
  className = "",
}: FeedbackFormProps) {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return; // 별점은 필수 입력

    setIsSubmitting(true);
    try {
      await onSubmit(rating, comment);
      // 제출 성공 처리는 부모 컴포넌트에서 관리
    } catch (error) {
      console.error("피드백 제출 중 오류 발생:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={`w-full max-w-md mx-auto shadow-md ${className}`}>
      <form onSubmit={handleSubmit}>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg sm:text-xl text-center">
            분석 결과가 도움이 되셨나요?
          </CardTitle>
          <CardDescription className="text-center text-sm sm:text-base">
            서비스 개선을 위해 피드백을 남겨주세요
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pb-2">
          <div className="flex justify-center items-center space-x-1 py-2">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                className="focus:outline-none transition-transform hover:scale-110"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                aria-label={`${star}점 평가`}
              >
                <Star
                  size={32}
                  className={`
                    ${(hoverRating || rating) >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                    transition-colors
                  `}
                />
              </button>
            ))}
          </div>
          <div className="text-center text-sm text-muted-foreground">
            {rating > 0 && (
              <span>
                {rating === 1 && "매우 불만족"}
                {rating === 2 && "불만족"}
                {rating === 3 && "보통"}
                {rating === 4 && "만족"}
                {rating === 5 && "매우 만족"}
              </span>
            )}
          </div>
          <div className="pt-2">
            <Textarea
              placeholder="의견을 자유롭게 남겨주세요 (선택사항)"
              value={comment}
              onChange={e => setComment(e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center pt-2">
          <Button
            type="submit"
            disabled={rating === 0 || isSubmitting}
            className="w-full sm:w-auto px-8"
          >
            {isSubmitting ? "제출 중..." : "피드백 제출"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
