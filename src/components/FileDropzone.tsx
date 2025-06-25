import { Button } from "@/components/ui/button";
import React, { useRef, useState } from "react";

interface FileDropzoneProps {
  onFileSelect: (file: File) => void;
  acceptedTypes?: string[];
  maxFileSize?: number; // in MB
  className?: string;
}

export default function FileDropzone({
  onFileSelect,
  acceptedTypes = [".pdf"],
  maxFileSize = 10,
  className = "",
}: FileDropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string => {
    // 파일 크기 검증
    if (file.size > maxFileSize * 1024 * 1024) {
      return `파일 크기가 ${maxFileSize}MB를 초과합니다.`;
    }

    // 파일 확장자 검증
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
    if (!acceptedTypes.includes(fileExtension)) {
      return `지원하지 않는 파일 형식입니다. ${acceptedTypes.join(", ")} 파일만 업로드 가능합니다.`;
    }

    return "";
  };

  const handleFile = (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    onFileSelect(file);
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // 드래그 영역을 완전히 벗어날 때만 isDragOver를 false로 설정
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) {
      setIsDragOver(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]); // 첫 번째 파일만 처리
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={className}>
      <div
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200
          ${
            isDragOver
              ? "border-primary bg-primary/10 scale-105"
              : "border-border hover:border-primary/50 hover:bg-muted/50"
          }
          ${error ? "border-destructive bg-destructive/10" : ""}
        `}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          accept={acceptedTypes.join(",")}
          className="hidden"
        />

        <div className="space-y-4">
          {/* 업로드 아이콘 */}
          <div
            className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
              isDragOver
                ? "bg-primary/20"
                : error
                  ? "bg-destructive/20"
                  : "bg-primary/10"
            }`}
          >
            {error ? (
              <svg
                className="w-8 h-8 text-destructive"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            ) : (
              <svg
                className={`w-8 h-8 ${
                  isDragOver ? "text-primary" : "text-primary"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            )}
          </div>

          {/* 메시지 */}
          <div>
            {error ? (
              <div>
                <p className="text-lg font-medium text-destructive mb-2">
                  업로드 오류
                </p>
                <p className="text-destructive/80">{error}</p>
              </div>
            ) : isDragOver ? (
              <div>
                <p className="text-lg font-medium text-primary mb-2">
                  파일을 놓으세요
                </p>
                <p className="text-primary/80">
                  파일을 여기에 놓으면 업로드됩니다
                </p>
              </div>
            ) : (
              <div>
                <p className="text-lg font-medium text-foreground mb-2">
                  파일을 드래그하여 업로드하세요
                </p>
                <p className="text-muted-foreground">
                  또는 클릭하여 파일을 선택하세요
                </p>
              </div>
            )}
          </div>

          {/* 업로드 버튼 */}
          {!error && (
            <Button
              className="mt-4"
              variant={isDragOver ? "default" : "default"}
              onClick={e => {
                e.stopPropagation();
                handleClick();
              }}
            >
              {isDragOver ? "파일 업로드" : "파일 선택"}
            </Button>
          )}

          {/* 재시도 버튼 */}
          {error && (
            <Button
              variant="outline"
              onClick={e => {
                e.stopPropagation();
                setError("");
                handleClick();
              }}
            >
              다시 시도
            </Button>
          )}
        </div>
      </div>

      {/* 파일 형식 안내 */}
      <div className="mt-4 p-4 bg-primary/10 rounded-lg">
        <h4 className="text-sm font-medium text-foreground mb-2">
          지원 파일 형식
        </h4>
        <p className="text-sm text-muted-foreground">
          {acceptedTypes.join(", ").toUpperCase()} 파일만 업로드 가능합니다.
          (최대 {maxFileSize}MB)
        </p>
      </div>
    </div>
  );
}
