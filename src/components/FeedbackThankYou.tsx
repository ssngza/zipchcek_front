import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export interface FeedbackThankYouProps {
  onClose: () => void;
  rating: number;
  className?: string;
}

export default function FeedbackThankYou({
  onClose,
  rating,
  className = "",
}: FeedbackThankYouProps) {
  // 별점에 따른 메시지 생성
  const getMessage = () => {
    if (rating >= 4) {
      return "소중한 의견 감사합니다! 더 나은 서비스를 제공하기 위해 노력하겠습니다.";
    } else if (rating >= 3) {
      return "피드백 감사합니다. 서비스 개선을 위해 노력하겠습니다.";
    } else {
      return "불편을 드려 죄송합니다. 더 나은 경험을 제공하기 위해 개선하겠습니다.";
    }
  };

  // 별점에 따른 추가 안내 메시지
  const getGuidance = () => {
    if (rating >= 4) {
      return "다른 부동산 정보도 분석해보세요!";
    } else if (rating >= 3) {
      return "다른 기능도 사용해보세요.";
    } else {
      return "추가 문의사항은 고객센터로 연락주세요.";
    }
  };

  return (
    <Card className={`w-full max-w-md mx-auto shadow-md ${className}`}>
      <CardHeader className="pb-4 text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-12 w-12 text-green-500" />
        </div>
        <CardTitle className="text-lg sm:text-xl">
          피드백이 제출되었습니다
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-2">
        <p className="text-sm sm:text-base">{getMessage()}</p>
        <p className="text-xs sm:text-sm text-muted-foreground">
          {getGuidance()}
        </p>
      </CardContent>
      <CardFooter className="flex justify-center pt-2 pb-4">
        <Button onClick={onClose} className="w-full sm:w-auto px-8">
          확인
        </Button>
      </CardFooter>
    </Card>
  );
}
