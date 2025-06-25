import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  Building,
  Check,
  CreditCard,
  ExternalLink,
  FileText,
  Printer,
  Smartphone,
} from "lucide-react";

export default function RegistrationGuideContent() {
  // 인쇄 기능
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 print:p-6">
      {/* 인쇄 버튼 */}
      <div className="flex justify-end print:hidden">
        <Button variant="outline" onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          안내문 인쇄하기
        </Button>
      </div>

      {/* 등기부등본 소개 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold flex items-center">
          <FileText className="mr-2 h-6 w-6 text-primary" />
          등기부등본이란?
        </h2>
        <p className="text-muted-foreground">
          등기부등본은 부동산(토지, 건물)의 소유권, 저당권 등 권리관계를
          공적으로 증명하는 서류입니다. 부동산 거래 시 해당 부동산의 권리관계와
          제한사항을 확인하기 위해 필수적으로 확인해야 합니다.
        </p>
        <div className="bg-muted/50 p-4 rounded-lg">
          <div className="flex items-start">
            <AlertCircle className="mr-2 h-5 w-5 text-amber-500 mt-0.5" />
            <p className="text-sm">
              <strong>주의:</strong> 등기부등본은 부동산 거래 전 반드시 확인해야
              하며, 최신 정보를 확인하기 위해 계약 직전에 발급받는 것이
              좋습니다.
            </p>
          </div>
        </div>
      </section>

      <Separator />

      {/* 온라인 발급 방법 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold flex items-center">
          <Smartphone className="mr-2 h-6 w-6 text-primary" />
          온라인 발급 방법
        </h2>
        <p className="text-muted-foreground mb-4">
          인터넷 등기소를 통해 언제 어디서나 편리하게 등기부등본을 발급받을 수
          있습니다.
        </p>

        <div className="grid gap-4">
          <div className="bg-card border rounded-lg p-4">
            <h3 className="font-medium text-lg mb-2">1. 인터넷 등기소 접속</h3>
            <p className="text-sm text-muted-foreground mb-2">
              대법원 인터넷 등기소(iros.go.kr)에 접속합니다.
            </p>
            <a
              href="http://www.iros.go.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary flex items-center text-sm hover:underline"
            >
              인터넷 등기소 바로가기
              <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </div>

          <div className="bg-card border rounded-lg p-4">
            <h3 className="font-medium text-lg mb-2">
              2. 부동산등기 발급하기 선택
            </h3>
            <p className="text-sm text-muted-foreground">
              메인 화면에서 '부동산등기' → '발급하기' 메뉴를 클릭합니다.
            </p>
          </div>

          <div className="bg-card border rounded-lg p-4">
            <h3 className="font-medium text-lg mb-2">3. 부동산 정보 입력</h3>
            <p className="text-sm text-muted-foreground">
              발급받고자 하는 부동산의 주소(소재지)를 입력하고 해당 부동산을
              선택합니다.
            </p>
          </div>

          <div className="bg-card border rounded-lg p-4">
            <h3 className="font-medium text-lg mb-2">4. 본인 인증</h3>
            <p className="text-sm text-muted-foreground">
              휴대폰 본인인증, 공동인증서 등을 통해 본인 인증을 진행합니다.
              (비회원도 본인 인증만으로 발급 가능)
            </p>
          </div>

          <div className="bg-card border rounded-lg p-4">
            <h3 className="font-medium text-lg mb-2">5. 수수료 결제</h3>
            <p className="text-sm text-muted-foreground">
              온라인 발급 수수료(1부당 700원)를 신용카드, 계좌이체 등으로
              결제합니다.
            </p>
          </div>

          <div className="bg-card border rounded-lg p-4">
            <h3 className="font-medium text-lg mb-2">6. 발급 완료</h3>
            <p className="text-sm text-muted-foreground">
              PDF 파일로 등기부등본을 다운로드하거나 바로 인쇄할 수 있습니다.
            </p>
          </div>
        </div>
      </section>

      <Separator />

      {/* 오프라인 발급 방법 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold flex items-center">
          <Building className="mr-2 h-6 w-6 text-primary" />
          오프라인 발급 방법
        </h2>
        <p className="text-muted-foreground mb-4">
          가까운 등기소나 주민센터를 방문하여 등기부등본을 발급받을 수 있습니다.
        </p>

        <div className="grid gap-4">
          <div className="bg-card border rounded-lg p-4">
            <h3 className="font-medium text-lg mb-2">1. 방문 장소</h3>
            <p className="text-sm text-muted-foreground">
              가까운 등기소 또는 주민센터(행정복지센터)를 방문합니다.
            </p>
          </div>

          <div className="bg-card border rounded-lg p-4">
            <h3 className="font-medium text-lg mb-2">2. 신청서 작성</h3>
            <p className="text-sm text-muted-foreground">
              창구에서 등기부등본 발급 신청서를 작성합니다. (부동산의 소재지
              주소 필요)
            </p>
          </div>

          <div className="bg-card border rounded-lg p-4">
            <h3 className="font-medium text-lg mb-2">
              3. 신분증 제시 및 수수료 납부
            </h3>
            <p className="text-sm text-muted-foreground">
              신분증을 제시하고 수수료(1부당 1,000원)를 납부합니다.
            </p>
          </div>

          <div className="bg-card border rounded-lg p-4">
            <h3 className="font-medium text-lg mb-2">4. 등기부등본 수령</h3>
            <p className="text-sm text-muted-foreground">
              발급이 완료된 등기부등본을 수령합니다.
            </p>
          </div>
        </div>
      </section>

      <Separator />

      {/* 비용 정보 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold flex items-center">
          <CreditCard className="mr-2 h-6 w-6 text-primary" />
          발급 비용
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="border px-4 py-2 text-left">구분</th>
                <th className="border px-4 py-2 text-left">비용(1부 기준)</th>
                <th className="border px-4 py-2 text-left">특징</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">온라인 발급</td>
                <td className="border px-4 py-2">700원</td>
                <td className="border px-4 py-2">
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>24시간 언제든지 발급 가능</li>
                    <li>PDF 파일로 즉시 다운로드</li>
                    <li>인쇄 가능</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">오프라인 발급</td>
                <td className="border px-4 py-2">1,000원</td>
                <td className="border px-4 py-2">
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>등기소/주민센터 업무시간 내 발급</li>
                    <li>인쇄된 실물 문서로 수령</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <Separator />

      {/* 유의사항 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">유의사항</h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <Check className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" />
            <span>
              등기부등본은 누구나 발급 가능하며, 소유자 본인이 아니어도 주소만
              알면 발급할 수 있습니다.
            </span>
          </li>
          <li className="flex items-start">
            <Check className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" />
            <span>
              부동산 거래 시에는 계약 직전에 최신 등기부등본을 발급받아 확인하는
              것이 중요합니다.
            </span>
          </li>
          <li className="flex items-start">
            <Check className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" />
            <span>
              등기부등본 열람만 할 경우, 일부 정보는 무료로 확인할 수 있으나,
              공식 발급본(PDF, 인쇄본)은 수수료가 발생합니다.
            </span>
          </li>
          <li className="flex items-start">
            <Check className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" />
            <span>
              모바일 기기에서도 인터넷 등기소를 통해 발급이 가능합니다.
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
}
