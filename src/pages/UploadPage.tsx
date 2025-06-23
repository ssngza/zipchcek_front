import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function UploadPage() {
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
                  {/* 드래그 앤 드롭 영역 */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                    <div className="space-y-4">
                      <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-blue-500"
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
                      </div>
                      <div>
                        <p className="text-lg font-medium text-gray-900 mb-2">
                          파일을 드래그하여 업로드하세요
                        </p>
                        <p className="text-gray-500">
                          또는 클릭하여 파일을 선택하세요
                        </p>
                      </div>
                      <Button className="mt-4">파일 선택</Button>
                    </div>
                  </div>

                  {/* 파일 형식 안내 */}
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-900 mb-2">
                      지원 파일 형식
                    </h4>
                    <p className="text-sm text-blue-700">
                      PDF 파일만 업로드 가능합니다. (최대 10MB)
                    </p>
                  </div>
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
                  <Button variant="outline" className="w-full">
                    가이드 보기
                  </Button>
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
