import ContractPreparationGuide, {
  ContractStep,
} from "@/components/ContractPreparationGuide";
import FeedbackContainer from "@/components/FeedbackContainer";
import FraudPreventionChecklist, {
  ChecklistItem,
} from "@/components/FraudPreventionChecklist";
import PotentialIssuesAnalysis, {
  Issue,
} from "@/components/PotentialIssuesAnalysis";
import PrintableReport from "@/components/PrintableReport";
import RegistrationGuideModal from "@/components/RegistrationGuideModal";
import RiskScoreGauge from "@/components/RiskScoreGauge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, FileText, Printer } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

export default function ResultPage() {
  const { propertyId } = useParams<{ propertyId: string }>();
  const location = useLocation();

  // LoadingPage에서 전달받은 분석 결과
  const analysisData = location.state?.analysisResult;

  // 인쇄 모드 상태
  const [showPrintable, setShowPrintable] = useState(false);

  // 테스트용 위험 점수 (API에서 받아온 값이 있으면 사용)
  const riskScore = analysisData?.riskScore || 15; // 0-100 사이의 값 (낮을수록 안전)

  // 테스트용 잠재적 문제 데이터 (API에서 받아온 값이 있으면 사용)
  const [potentialIssues, setPotentialIssues] = useState<Issue[]>([
    {
      id: "1",
      title: "최근 소유권 변경",
      description:
        "해당 부동산은 최근 3개월 내에 소유권 변경이 있었습니다. 이는 일반적으로 위험 신호는 아니지만, 추가 확인이 필요할 수 있습니다.",
      severity: "low",
      category: "ownership",
      recommendation:
        "소유자에게 소유권 취득 경위를 확인하고, 필요시 이전 소유자 정보를 조회하세요.",
    },
    {
      id: "2",
      title: "근저당권 설정",
      description:
        "현재 부동산에 근저당권이 설정되어 있습니다. 채무 불이행 시 경매로 넘어갈 가능성이 있습니다.",
      severity: "medium",
      category: "mortgage",
      recommendation:
        "근저당권 설정 금액과 채무 상환 계획을 소유자에게 확인하세요. 또한 임대차계약 시 보증금 보호를 위한 우선순위를 확인하는 것이 중요합니다.",
    },
    {
      id: "3",
      title: "가압류 기록 존재",
      description:
        "과거 가압류 기록이 존재합니다. 현재는 해제되었으나, 소유자의 재정 상태에 문제가 있었을 가능성이 있습니다.",
      severity: "low",
      category: "rights",
      recommendation:
        "가압류 사유와 해제 경위를 확인하고, 현재 다른 채무 관계가 있는지 확인하세요.",
    },
  ]);

  // API 응답 데이터로 상태 업데이트
  useEffect(() => {
    if (analysisData?.issues && analysisData.issues.length > 0) {
      // API에서 받은 이슈 데이터를 형식에 맞게 변환
      const formattedIssues = analysisData.issues.map(
        (issue: any, index: number) => ({
          id: String(index + 1),
          title: issue.title,
          description: issue.description,
          severity: issue.severity || "medium",
          category: issue.category || "general",
          recommendation: issue.recommendation || "전문가와 상담하세요.",
        })
      );

      setPotentialIssues(formattedIssues);
    }
  }, [analysisData]);

  // 테스트용 사기 방지 체크리스트 항목 (실제로는 API에서 받아올 값)
  const fraudPreventionItems: ChecklistItem[] = [
    {
      id: "1",
      title: "등기부등본 원본 확인",
      description:
        "계약 전 인터넷 등기소에서 직접 발급한 등기부등본을 확인하세요.",
      importance: "high",
    },
    {
      id: "2",
      title: "소유자 신분증 대조",
      description:
        "등기부등본의 소유자와 계약 당사자의 신분증을 대조하여 일치 여부를 확인하세요.",
      importance: "high",
    },
    {
      id: "3",
      title: "건축물대장 확인",
      description:
        "건축물대장을 확인하여 불법 건축물 여부와 실제 면적을 확인하세요.",
      importance: "medium",
    },
    {
      id: "4",
      title: "현장 방문 확인",
      description: "실제 부동산을 방문하여 설명과 일치하는지 확인하세요.",
      importance: "medium",
    },
    {
      id: "5",
      title: "주변 시세 조사",
      description:
        "주변 유사 부동산의 시세를 조사하여 적정 가격인지 확인하세요.",
      importance: "medium",
    },
    {
      id: "6",
      title: "공인중개사 자격 확인",
      description:
        "거래 중개 공인중개사의 자격증과 중개사무소 등록증을 확인하세요.",
      importance: "low",
    },
    {
      id: "7",
      title: "계약서 법무사 검토",
      description: "계약서 작성 전 법무사나 변호사의 검토를 받으세요.",
      importance: "high",
    },
  ];

  // 테스트용 계약 준비 가이드 데이터 (실제로는 API에서 받아올 값)
  const contractGuideSteps: ContractStep[] = [
    {
      id: "1",
      title: "계약 전 확인사항",
      description:
        "계약 전에 반드시 확인해야 할 사항들입니다. 이 단계에서는 등기부등본과 관련 서류를 확인하고 부동산의 법적 상태를 파악합니다.",
      documents: [
        {
          id: "1-1",
          name: "등기부등본",
          description:
            "부동산의 소유권, 권리관계, 근저당권 등을 확인할 수 있는 공식 문서입니다.",
          required: true,
        },
        {
          id: "1-2",
          name: "건축물대장",
          description: "건물의 공식 정보, 면적, 용도 등을 확인할 수 있습니다.",
          required: true,
        },
        {
          id: "1-3",
          name: "토지이용계획확인서",
          description:
            "해당 부동산의 용도지역, 규제사항 등을 확인할 수 있습니다.",
          required: false,
          url: "https://www.eum.go.kr/",
        },
      ],
      tips: [
        "등기부등본은 인터넷 등기소에서 직접 발급받아 확인하세요.",
        "소유자 정보와 신분증을 대조하여 일치 여부를 확인하세요.",
        "근저당권, 압류, 가압류 등 권리제한 사항이 있는지 확인하세요.",
      ],
      contractTypes: ["jeonse", "monthly", "purchase"],
    },
    {
      id: "2",
      title: "계약서 작성 및 검토",
      description:
        "계약서를 작성하고 필요한 경우 전문가의 검토를 받는 단계입니다. 계약 조건과 특약사항을 명확히 기재해야 합니다.",
      documents: [
        {
          id: "2-1",
          name: "부동산 계약서",
          description:
            "계약 당사자, 부동산 정보, 계약 조건 등이 포함된 공식 문서입니다.",
          required: true,
          url: "https://www.easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1165&ccfNo=1&cciNo=1&cnpClsNo=1",
        },
        {
          id: "2-2",
          name: "계약금 영수증",
          description: "계약금 지급 증빙 서류입니다.",
          required: true,
        },
      ],
      tips: [
        "계약서에 특약사항을 명확하게 기재하세요.",
        "가능하면 법무사나 변호사의 검토를 받으세요.",
        "계약금은 가급적 계좌이체로 지급하고 증빙을 남기세요.",
      ],
      contractTypes: ["jeonse", "monthly", "purchase"],
    },
    {
      id: "3",
      title: "중도금 및 잔금 지급",
      description:
        "계약에 따라 중도금과 잔금을 지급하는 단계입니다. 이 단계에서는 자금 안전성을 확보하는 것이 중요합니다.",
      documents: [
        {
          id: "3-1",
          name: "중도금 영수증",
          description: "중도금 지급 증빙 서류입니다.",
          required: false,
        },
        {
          id: "3-2",
          name: "잔금 영수증",
          description: "잔금 지급 증빙 서류입니다.",
          required: true,
        },
        {
          id: "3-3",
          name: "확정일자 신청서",
          description:
            "전세권 설정 또는 임대차계약의 우선순위를 확보하기 위한 서류입니다.",
          required: true,
          url: "https://www.easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1165&ccfNo=3&cciNo=1&cnpClsNo=1",
        },
      ],
      tips: [
        "잔금 지급 전 등기부등본을 다시 확인하여 새로운 권리제한 사항이 없는지 확인하세요.",
        "가능하면 에스크로 서비스나 안전결제 시스템을 활용하세요.",
        "확정일자는 잔금 지급 당일에 받는 것이 좋습니다.",
      ],
      contractTypes: ["jeonse", "monthly", "purchase"],
    },
    {
      id: "4",
      title: "소유권 이전 등기",
      description:
        "매매계약의 경우 소유권을 이전하는 등기 절차를 진행하는 단계입니다.",
      documents: [
        {
          id: "4-1",
          name: "등기 신청서",
          description: "소유권 이전을 위한 공식 신청 서류입니다.",
          required: true,
        },
        {
          id: "4-2",
          name: "매매계약서",
          description: "인감증명이 날인된 매매계약서 원본입니다.",
          required: true,
        },
        {
          id: "4-3",
          name: "등기권리증",
          description: "이전 소유자의 등기권리증입니다.",
          required: true,
        },
      ],
      tips: [
        "소유권 이전 등기는 법무사에게 위임하는 것이 안전합니다.",
        "등기 완료 후 등기부등본을 다시 확인하여 소유권이 정확히 이전되었는지 확인하세요.",
        "취득세 납부 기한을 확인하고 기한 내에 납부하세요.",
      ],
      contractTypes: ["purchase"],
    },
    {
      id: "5",
      title: "전세권 설정 등기",
      description:
        "전세계약의 경우 전세권 설정 등기를 진행하는 단계입니다. 이는 전세금 보호를 위한 중요한 절차입니다.",
      documents: [
        {
          id: "5-1",
          name: "전세권 설정 등기 신청서",
          description: "전세권 설정을 위한 공식 신청 서류입니다.",
          required: true,
        },
        {
          id: "5-2",
          name: "전세계약서",
          description: "인감증명이 날인된 전세계약서 원본입니다.",
          required: true,
        },
      ],
      tips: [
        "전세권 설정 등기는 반드시 진행하는 것이 좋습니다.",
        "등기 완료 후 등기부등본을 다시 확인하여 전세권이 정확히 설정되었는지 확인하세요.",
        "전세권 설정 비용은 통상 임대인과 임차인이 절반씩 부담하나, 계약서에 명시된 내용을 따르세요.",
      ],
      contractTypes: ["jeonse"],
    },
  ];

  // 테스트용 부동산 정보
  const propertyInfo = {
    id: "property-123",
    address: "서울특별시 강남구 테헤란로 123",
    area: "85.5㎡",
    registrationDate: "2022-05-15",
  };

  // 테스트용 소유자 정보
  const ownerInfo = {
    name: "홍길동",
    acquisitionDate: "2020-03-10",
    ownership: "단독소유",
  };

  // 인쇄 모드 전환
  const togglePrintMode = () => {
    setShowPrintable(!showPrintable);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* 상단 네비게이션 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="flex items-center space-x-2 mb-4 sm:mb-0">
          <Button variant="outline" size="sm" asChild>
            <Link to="/history">
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>돌아가기</span>
            </Link>
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <RegistrationGuideModal>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-1" />
              <span>등기부등본 발급 가이드</span>
            </Button>
          </RegistrationGuideModal>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            className="print:hidden"
          >
            <Printer className="h-4 w-4 mr-1" />
            <span>인쇄</span>
          </Button>
        </div>
      </div>

      {/* 부동산 정보 헤더 */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg sm:text-xl">
            {propertyInfo.address}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium">면적:</span> {propertyInfo.area}
            </div>
            <div>
              <span className="font-medium">등기일자:</span>{" "}
              {propertyInfo.registrationDate}
            </div>
            <div>
              <span className="font-medium">소유자:</span> {ownerInfo.name} (
              {ownerInfo.ownership})
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 위험 점수 */}
      <div className="mb-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          부동산 위험 점수
        </h2>
        <div className="flex justify-center">
          <RiskScoreGauge score={riskScore} size="lg" showLabel />
        </div>
      </div>

      {/* 탭 컨텐츠 */}
      <Tabs defaultValue="issues" className="mb-6">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="issues">잠재적 문제</TabsTrigger>
          <TabsTrigger value="checklist">사기 방지 체크리스트</TabsTrigger>
          <TabsTrigger value="guide">계약 준비 가이드</TabsTrigger>
        </TabsList>
        <TabsContent value="issues">
          <PotentialIssuesAnalysis issues={potentialIssues} />
        </TabsContent>
        <TabsContent value="checklist">
          <FraudPreventionChecklist
            propertyId={propertyId}
            items={fraudPreventionItems}
          />
        </TabsContent>
        <TabsContent value="guide">
          <ContractPreparationGuide steps={contractGuideSteps} />
        </TabsContent>
      </Tabs>

      {/* 피드백 컴포넌트 */}
      <Separator className="my-6" />
      <FeedbackContainer propertyId={propertyId} />

      {/* 인쇄용 보고서 (화면에서는 숨김) */}
      <div className="hidden print:block">
        <PrintableReport
          propertyInfo={propertyInfo}
          ownerInfo={ownerInfo}
          riskScore={riskScore}
          issues={potentialIssues}
          checklistItems={fraudPreventionItems}
          contractSteps={contractGuideSteps}
        />
      </div>
    </div>
  );
}
