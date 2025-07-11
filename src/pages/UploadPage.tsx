import FileDropzone from "@/components/FileDropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setError(null); // 새 파일 선택 시 오류 초기화
    console.log("선택된 파일:", file.name, file.size, file.type);
  };

  const handleStartAnalysis = async () => {
    if (!selectedFile) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // 분석 시작 시 로딩 페이지로 이동
      navigate("/loading", {
        state: {
          fileSize: selectedFile.size / 1024, // KB 단위로 전달
          fileName: selectedFile.name,
          fileObject: selectedFile, // 파일 객체 전달
        },
      });
    } catch (err) {
      console.error("파일 분석 시작 중 오류 발생:", err);
      setError("파일 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 메인 컨텐츠 */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 페이지 타이틀 */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              등기부등본 분석
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              등기부등본 PDF 파일을 업로드하여 전세사기 위험도를 분석받으세요
            </p>
          </div>

          <div className="text-center mb-8">
            {/* 분석 정보 카드 */}
            <Card className="shadow-md">
              {/* <CardHeader>
                <CardTitle className="text-lg">분석 정보</CardTitle>
              </CardHeader> */}
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent/30 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-accent-foreground"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">소유권 확인</p>
                    <p className="text-sm text-muted-foreground">
                      등기부상 소유자 정보 검증
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">권리관계 분석</p>
                    <p className="text-sm text-muted-foreground">
                      담보권 및 제한사항 검토
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-destructive/20 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-destructive"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">위험도 평가</p>
                    <p className="text-sm text-muted-foreground">
                      AI 기반 사기 위험도 분석
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 업로드 영역 그리드 */}
          <div className="grid grid-cols-1 ">
            {/* 메인 업로드 카드 */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">파일 업로드</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* 에러 메시지 */}
                  {error && (
                    <div className="mb-4 p-4 bg-destructive/10 border border-destructive rounded-lg text-destructive text-center">
                      {error}
                    </div>
                  )}

                  {/* 파일 드롭존 */}
                  <FileDropzone
                    onFileSelect={handleFileSelect}
                    acceptedTypes={[".pdf"]}
                    maxFileSize={10}
                  />

                  {/* 선택된 파일 정보 */}
                  {selectedFile && (
                    <div className="mt-6 p-4 bg-accent/20 border border-accent rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-accent/30 rounded-full flex items-center justify-center">
                            <svg
                              className="w-5 h-5 text-accent-foreground"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-foreground">
                              {selectedFile.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {(selectedFile.size / (1024 * 1024)).toFixed(2)}{" "}
                              MB
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedFile(null)}
                          disabled={isSubmitting}
                        >
                          제거
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* 분석 시작 버튼 */}
                  {selectedFile && (
                    <div className="mt-6">
                      <Button
                        className="w-full"
                        size="lg"
                        onClick={handleStartAnalysis}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "처리 중..." : "등기부등본 분석 시작"}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* 사이드바 - 가이드 및 정보 */}
            <div className="space-y-6"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
