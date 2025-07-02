import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface ErrorDialogProps {
  open: boolean;
  title?: string;
  message: string;
  onRetry?: () => void;
  onCancel: () => void;
  maxRetries?: number;
  currentRetry?: number;
  showTroubleshooting?: boolean;
  troubleshootingTips?: string[];
}

export default function ErrorDialog({
  open,
  title = "오류가 발생했습니다",
  message,
  onRetry,
  onCancel,
  maxRetries = 3,
  currentRetry = 0,
  showTroubleshooting = false,
  troubleshootingTips = [
    "인터넷 연결 상태를 확인해주세요.",
    "브라우저를 새로고침 해보세요.",
    "파일이 손상되지 않았는지 확인해주세요.",
    "파일 크기가 허용 범위 내인지 확인해주세요.",
    "지원되는 파일 형식인지 확인해주세요.",
  ],
}: ErrorDialogProps) {
  const [isOpen, setIsOpen] = useState(open);
  const canRetry = onRetry && currentRetry < maxRetries;

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
          <AlertDialogTitle className="text-xl text-center">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center mt-2">
            {message}
          </AlertDialogDescription>

          {currentRetry > 0 && (
            <div className="text-sm text-amber-600 text-center mt-2">
              재시도 횟수: {currentRetry}/{maxRetries}
            </div>
          )}
        </AlertDialogHeader>

        {showTroubleshooting && currentRetry >= maxRetries && (
          <div className="my-4 text-sm text-gray-600">
            <p className="font-medium mb-2">
              문제가 지속되면 다음을 확인해보세요:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              {troubleshootingTips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        )}

        <AlertDialogFooter>
          <div className="flex flex-col sm:flex-row w-full gap-2">
            {canRetry && (
              <Button
                className="flex-1"
                onClick={handleRetry}
                variant="default"
              >
                다시 시도
              </Button>
            )}
            <Button
              className="flex-1"
              onClick={onCancel}
              variant={canRetry ? "outline" : "default"}
            >
              {canRetry ? "취소" : "확인"}
            </Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
