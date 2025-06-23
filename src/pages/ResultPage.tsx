import RiskScoreGauge from "@/components/RiskScoreGauge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function ResultPage() {
  // 테스트용 위험 점수 (실제로는 API에서 받아올 값)
  const riskScore = 15; // 0-100 사이의 값 (낮을수록 안전)

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
                새 분석
              </Link>
              <Link
                to="/guide"
                className="text-gray-700 hover:text-primary transition-colors"
              >
                등기부 가이드
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
            <h1 className="text-3xl font-bold text-gray-900 mb-4">분석 결과</h1>
            <p className="text-lg text-gray-600">
              등기부등본 분석이 완료되었습니다
            </p>
          </div>

          {/* 결과 카드 */}
          <Card className="mb-8 shadow-lg">
            <CardHeader className="bg-green-50">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <CardTitle className="text-xl text-green-800 mb-4 md:mb-0">
                  안전 등급: 안전
                </CardTitle>
                {/* 위험 점수 게이지 추가 */}
                <RiskScoreGauge score={riskScore} size="md" />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700 mb-4">
                분석된 등기부등본에서 전세사기 위험 요소가 발견되지 않았습니다.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">
                    부동산 정보
                  </h3>
                  <ul className="space-y-1 text-sm">
                    <li>
                      <span className="text-gray-500">주소:</span> 서울특별시
                      강남구 테헤란로 123
                    </li>
                    <li>
                      <span className="text-gray-500">면적:</span> 84.12㎡
                    </li>
                    <li>
                      <span className="text-gray-500">등기일:</span> 2022-05-15
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">
                    소유자 정보
                  </h3>
                  <ul className="space-y-1 text-sm">
                    <li>
                      <span className="text-gray-500">소유자:</span> 홍길동
                    </li>
                    <li>
                      <span className="text-gray-500">소유권 취득일:</span>{" "}
                      2020-03-22
                    </li>
                    <li>
                      <span className="text-gray-500">지분:</span> 단독소유
                    </li>
                  </ul>
                </div>
              </div>

              <h3 className="font-medium text-gray-900 mb-2">권리관계 요약</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 mb-6">
                <li>현재 설정된 근저당권 없음</li>
                <li>압류, 가압류, 가처분 등 권리침해 사항 없음</li>
                <li>전세권 설정 내역 없음</li>
                <li>소유권 이전 제한 사항 없음</li>
              </ul>

              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="font-medium text-blue-800 mb-2">AI 분석 결과</h3>
                <p className="text-sm text-blue-700">
                  이 등기부등본은 전세사기 위험도가 낮습니다. 소유권 관계가
                  명확하고, 권리침해 사항이 없으며, 근저당권 등 채권 관계가
                  설정되어 있지 않습니다.
                </p>
              </div>

              <div className="flex justify-center">
                <Button>상세 보고서 다운로드</Button>
              </div>
            </CardContent>
          </Card>

          {/* 새 분석 버튼 */}
          <div className="text-center">
            <Link to="/upload">
              <Button variant="outline">새로운 등기부등본 분석하기</Button>
            </Link>
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
