import { ContractStep } from "@/components/ContractPreparationGuide";
import { ChecklistItem } from "@/components/FraudPreventionChecklist";
import { Issue } from "@/components/PotentialIssuesAnalysis";
import RiskScoreGauge from "@/components/RiskScoreGauge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Download, Printer, Share2 } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

interface PrintableReportProps {
  propertyInfo: {
    address: string;
    area: string;
    registrationDate: string;
  };
  ownerInfo: {
    name: string;
    acquisitionDate: string;
    ownership: string;
  };
  riskScore: number;
  issues: Issue[];
  checklistItems: ChecklistItem[];
  contractSteps: ContractStep[];
  className?: string;
}

export default function PrintableReport({
  propertyInfo,
  ownerInfo,
  riskScore,
  issues,
  checklistItems,
  contractSteps,
  className = "",
}: PrintableReportProps) {
  const reportRef = useRef<HTMLDivElement>(null);

  // 인쇄 다이얼로그 열기
  const handlePrint = () => {
    toast.info("인쇄 다이얼로그를 준비하는 중...");
    setTimeout(() => {
      window.print();
    }, 300);
  };

  // PDF로 저장
  const handleSavePDF = async () => {
    if (!reportRef.current) return;

    try {
      // 로딩 상태 표시
      toast.loading("PDF 생성 중...", {
        id: "pdf-loading",
      });

      // HTML을 캔버스로 변환
      const canvas = await html2canvas(reportRef.current, {
        scale: 2, // 해상도 향상
        useCORS: true, // 외부 이미지 허용
        logging: false,
        backgroundColor: "#ffffff", // 배경색 지정
      });

      // 캔버스를 PDF로 변환
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("zipcheck-report.pdf");

      // 성공 메시지 표시
      toast.dismiss("pdf-loading");
      toast.success("PDF가 성공적으로 저장되었습니다!");
    } catch (error) {
      console.error("PDF 생성 중 오류 발생:", error);
      toast.dismiss("pdf-loading");
      toast.error("PDF 생성 중 오류가 발생했습니다.");
    }
  };

  // 공유 기능 (URL 복사)
  const handleShare = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      toast.success("링크가 클립보드에 복사되었습니다!");
    } catch (error) {
      console.error("클립보드 복사 중 오류 발생:", error);
      toast.error("링크 복사 중 오류가 발생했습니다.");
    }
  };

  // 위험 수준 텍스트 계산
  const getRiskLevelText = (score: number): string => {
    if (score < 30) return "안전";
    if (score < 70) return "주의";
    return "위험";
  };

  return (
    <div className={className}>
      {/* 인쇄 버튼 그룹 (인쇄 시 숨겨짐) */}
      <div className="flex justify-end mb-4 print-hide">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="flex items-center"
          >
            <Printer className="w-4 h-4 mr-2" />
            인쇄하기
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSavePDF}
            className="flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            PDF 저장
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="flex items-center"
          >
            <Share2 className="w-4 h-4 mr-2" />
            공유하기
          </Button>
        </div>
      </div>

      {/* 인쇄 가능한 보고서 내용 */}
      <div ref={reportRef} className="print-container">
        {/* 인쇄용 헤더 (인쇄 시에만 표시) */}
        <div className="print-header print-only">
          <div className="print-logo">ZipCheck</div>
          <div>등기부등본 분석 보고서</div>
        </div>

        {/* 메인 결과 카드 */}
        <Card className="mb-8 print-card">
          <CardHeader className="bg-green-50 print-header">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <CardTitle className="text-xl text-green-800 mb-4 md:mb-0">
                안전 등급: {getRiskLevelText(riskScore)}
              </CardTitle>
              <div className="risk-score-gauge">
                <RiskScoreGauge score={riskScore} size="md" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-4">
              {riskScore < 30
                ? "분석된 등기부등본에서 전세사기 위험 요소가 발견되지 않았습니다."
                : riskScore < 70
                  ? "분석된 등기부등본에서 몇 가지 주의해야 할 사항이 발견되었습니다."
                  : "분석된 등기부등본에서 심각한 위험 요소가 발견되었습니다. 계약 전 전문가와 상담하세요."}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 avoid-break">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">부동산 정보</h3>
                <ul className="space-y-1 text-sm">
                  <li>
                    <span className="text-gray-500">주소:</span>{" "}
                    {propertyInfo.address}
                  </li>
                  <li>
                    <span className="text-gray-500">면적:</span>{" "}
                    {propertyInfo.area}
                  </li>
                  <li>
                    <span className="text-gray-500">등기일:</span>{" "}
                    {propertyInfo.registrationDate}
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">소유자 정보</h3>
                <ul className="space-y-1 text-sm">
                  <li>
                    <span className="text-gray-500">소유자:</span>{" "}
                    {ownerInfo.name}
                  </li>
                  <li>
                    <span className="text-gray-500">소유권 취득일:</span>{" "}
                    {ownerInfo.acquisitionDate}
                  </li>
                  <li>
                    <span className="text-gray-500">지분:</span>{" "}
                    {ownerInfo.ownership}
                  </li>
                </ul>
              </div>
            </div>

            <div className="avoid-break">
              <h3 className="font-medium text-gray-900 mb-2">권리관계 요약</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 mb-6">
                {issues.length === 0 ? (
                  <>
                    <li>현재 설정된 근저당권 없음</li>
                    <li>압류, 가압류, 가처분 등 권리침해 사항 없음</li>
                    <li>전세권 설정 내역 없음</li>
                    <li>소유권 이전 제한 사항 없음</li>
                  </>
                ) : (
                  issues.map(issue => (
                    <li key={issue.id}>
                      {issue.title}: {issue.description}
                    </li>
                  ))
                )}
              </ul>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mb-6 avoid-break">
              <h3 className="font-medium text-blue-800 mb-2">AI 분석 결과</h3>
              <p className="text-sm text-blue-700">
                {riskScore < 30
                  ? "이 등기부등본은 전세사기 위험도가 낮습니다. 소유권 관계가 명확하고, 권리침해 사항이 없으며, 근저당권 등 채권 관계가 설정되어 있지 않습니다."
                  : riskScore < 70
                    ? "이 등기부등본은 전세사기 위험도가 보통입니다. 몇 가지 주의해야 할 사항이 있으니 아래 체크리스트를 확인하세요."
                    : "이 등기부등본은 전세사기 위험도가 높습니다. 소유권 관계나 권리침해 사항에 문제가 있을 수 있으니 전문가와 상담하세요."}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 잠재적 문제 섹션 */}
        {issues.length > 0 && (
          <div className="mb-8 avoid-break page-break">
            <h2 className="text-xl font-bold mb-4">잠재적 문제 분석</h2>
            <div className="space-y-4">
              {issues.map(issue => (
                <div key={issue.id} className="border rounded-lg p-4">
                  <div className="flex items-start">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">
                        {issue.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {issue.description}
                      </p>
                      <div className="bg-yellow-50 p-2 rounded">
                        <p className="text-sm text-yellow-800">
                          <strong>권장사항:</strong> {issue.recommendation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 체크리스트 섹션 */}
        <div className="mb-8 avoid-break page-break">
          <h2 className="text-xl font-bold mb-4">사기 방지 체크리스트</h2>
          <div className="space-y-4">
            {checklistItems.map(item => (
              <div
                key={item.id}
                className="border rounded-lg p-4 checklist-item"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded border flex items-center justify-center mr-3">
                    {/* 체크박스 (인쇄용) */}
                    <div className="w-4 h-4 border rounded"></div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 계약 가이드 섹션 */}
        <div className="mb-8 avoid-break">
          <h2 className="text-xl font-bold mb-4">계약 준비 가이드</h2>
          <div className="space-y-4">
            {contractSteps
              .filter(step => step.contractTypes.includes("jeonse"))
              .map((step, index) => (
                <div
                  key={step.id}
                  className="border rounded-lg p-4 accordion-content"
                >
                  <div className="flex items-center mb-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-medium mr-3">
                      {index + 1}
                    </div>
                    <h3 className="font-medium text-gray-900">{step.title}</h3>
                  </div>
                  <p className="text-gray-700 mb-4 pl-11">{step.description}</p>

                  {/* 필요 문서 목록 */}
                  {step.documents.length > 0 && (
                    <div className="mb-4 pl-11">
                      <h4 className="font-medium text-gray-900 mb-2">
                        필요 서류
                      </h4>
                      <ul className="space-y-2">
                        {step.documents.map(doc => (
                          <li key={doc.id} className="text-sm">
                            <strong>{doc.name}</strong>
                            {doc.required && (
                              <span className="text-red-600"> (필수)</span>
                            )}
                            <div className="text-gray-600">
                              {doc.description}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* 팁 목록 */}
                  {step.tips.length > 0 && (
                    <div className="pl-11">
                      <h4 className="font-medium text-gray-900 mb-2">
                        주의사항 및 팁
                      </h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {step.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="text-sm text-gray-700">
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>

        {/* 인쇄용 푸터 */}
        <div className="print-footer print-only mt-8">
          <p>
            © 2024 ZipCheck. 이 보고서는 참고용으로만 사용하세요. 법적 조언이
            필요한 경우 전문가와 상담하세요.
          </p>
          <p>
            생성일:{" "}
            {new Date().toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
