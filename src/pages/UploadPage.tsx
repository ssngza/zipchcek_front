import FileDropzone from "@/components/FileDropzone";
import RegistrationGuideModal from "@/components/RegistrationGuideModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    console.log("선택된 파일:", file.name, file.size, file.type);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 헤더 네비게이션 */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* 로고 */}
            <Link to="/" className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-primary">ZipCheck</h1>
            </Link>

            {/* 네비게이션 메뉴 */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/upload"
                className="text-gray-700 hover:text-primary transition-colors"
              >
                파일 업로드
              </Link>
              <Link
                to="/guide"
                className="text-gray-700 hover:text-primary transition-colors"
              >
                등기부 가이드
              </Link>
              <Link
                to="/support"
                className="text-gray-700 hover:text-primary transition-colors"
              >
                고객지원
              </Link>
            </nav>

            {/* 사용자 메뉴 */}
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                로그아웃
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 페이지 타이틀 */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              등기부등본 분석
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              등기부등본 PDF 파일을 업로드하여 전세사기 위험도를 분석받으세요
            </p>
          </div>

          {/* 업로드 영역 그리드 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 메인 업로드 카드 */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">파일 업로드</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* 파일 드롭존 */}
                  <FileDropzone
                    onFileSelect={handleFileSelect}
                    acceptedTypes={[".pdf"]}
                    maxFileSize={10}
                  />

                  {/* 선택된 파일 정보 */}
                  {selectedFile && (
                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <svg
                              className="w-5 h-5 text-green-600"
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
                            <p className="font-medium text-green-900">
                              {selectedFile.name}
                            </p>
                            <p className="text-sm text-green-700">
                              {(selectedFile.size / (1024 * 1024)).toFixed(2)}{" "}
                              MB
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedFile(null)}
                        >
                          제거
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* 분석 시작 버튼 */}
                  {selectedFile && (
                    <div className="mt-6">
                      <Button className="w-full" size="lg">
                        등기부등본 분석 시작
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* 사이드바 - 가이드 및 정보 */}
            <div className="space-y-6">
              {/* 등기부 발급 가이드 카드 */}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">등기부 발급 가이드</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    등기부등본 발급 방법을 안내해드립니다.
                  </p>
                  <RegistrationGuideModal>
                    <Button variant="outline" className="w-full">
                      가이드 보기
                    </Button>
                  </RegistrationGuideModal>
                </CardContent>
              </Card>

              {/* 분석 정보 카드 */}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">분석 정보</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-green-600"
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
                      <p className="text-sm text-gray-500">
                        등기부상 소유자 정보 검증
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-blue-600"
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
                      <p className="text-sm text-gray-500">
                        담보권 및 제한사항 검토
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-orange-600"
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
                      <p className="text-sm text-gray-500">
                        AI 기반 사기 위험도 분석
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="bg-white border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-500">
            <p>© 2024 ZipCheck. 모든 권리 보유.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
