import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">ZipCheck</h1>
          <p className="text-xl text-muted-foreground mb-8">
            전세사기 예방을 위한 안전한 부동산 검증 서비스
          </p>
          <Button size="lg" className="mr-4">
            시작하기
          </Button>
          <Button variant="outline" size="lg">
            더 알아보기
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-2">부동산 등기 확인</h3>
            <p className="text-muted-foreground">
              실시간 등기부등본 조회로 정확한 소유권 정보를 확인하세요
            </p>
          </div>

          <div className="text-center p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-2">사기 위험도 분석</h3>
            <p className="text-muted-foreground">
              AI 기반 위험도 분석으로 전세사기 가능성을 사전에 감지합니다
            </p>
          </div>

          <div className="text-center p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-2">안전한 계약</h3>
            <p className="text-muted-foreground">
              전문가 검토와 안전 체크리스트로 안심 계약을 도와드립니다
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
