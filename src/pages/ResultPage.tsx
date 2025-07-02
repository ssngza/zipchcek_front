import ContractPreparationGuide, {
  ContractStep,
} from "@/components/ContractPreparationGuide";
import FeedbackContainer from "@/components/FeedbackContainer";
import FraudPreventionChecklist, {
  ChecklistItem,
} from "@/components/FraudPreventionChecklist";
import PotentialIssuesAnalysis, {
  Issue,
  IssueCategory,
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
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

// API 응답 타입 정의
interface AnalysisResponse {
  basic_info: {
    real_estate: string;
    identifier_number: string;
    examination_datetime: string;
    registry_office: string;
  };
  building: {
    structure: string;
    usage: string;
    floor_areas: Record<string, string>;
    total_floor_area: string;
    total_floor_area_pyeong: string;
  };
  ownership_history: Array<{
    event_date: string;
    event_type: string;
    owner_name: string;
    owner_id: string;
    owner_address: string;
    remarks: string;
  }>;
  lien_history: Array<{
    event_date: string;
    lien_type: string;
    lien_holder: string;
    remarks: string;
  }>;
  mortgage_history: Array<{
    mortgage_number: number;
    registration_date: string;
    max_loan_amount: string;
    mortgagor: string;
    mortgagee: string;
    cancellation_date: string;
  }>;
  sale_list: Array<{
    list_number: string;
    transaction_date: string;
    transaction_amount: string;
    properties: {
      land: string;
      building: string;
    };
  }>;
  risk_analysis: {
    positive_factors: string[];
    caution_factors: string[];
    risk_factors: string[];
  };
  lease_checkpoints: string[];
  safe_deposit_levels: {
    recommended_upper_limit: string;
    maximum_safe_limit: string;
  };
  insurance_and_protection: string[];
  overall_evaluation: {
    risk_score: number;
    comment: string;
  };
}

// IssueCategory 타입 정의
// 필요한 카테고리를 추가하세요

export default function ResultPage() {
  const { propertyId } = useParams<{ propertyId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // 분석 결과 상태
  const [analysisData, setAnalysisData] = useState<AnalysisResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // URL 쿼리 파라미터에서 id 가져오기
  const storageId = searchParams.get("id");

  // 분석 결과 로드
  useEffect(() => {
    const loadAnalysisData = () => {
      setIsLoading(true);
      setError(null);

      try {
        // 1. location.state에서 데이터 확인 (LoadingPage에서 직접 넘어온 경우)
        if (location.state?.analysisResult?.response) {
          setAnalysisData(location.state.analysisResult.response);

          // 필요한 경우 localStorage에도 저장 (이미 LoadingPage에서 저장했을 수 있음)
          console.log("데이터를 location.state에서 로드했습니다.");
          setIsLoading(false);
          return;
        }

        // 2. URL 쿼리 파라미터의 id로 localStorage에서 데이터 로드
        if (storageId) {
          const storedData = localStorage.getItem(storageId);
          if (storedData) {
            const parsedData = JSON.parse(storedData);
            setAnalysisData(parsedData.result);
            console.log("데이터를 localStorage에서 로드했습니다:", storageId);
            setIsLoading(false);
            return;
          }
        }

        // 3. 데이터를 찾을 수 없는 경우
        setError("분석 결과를 찾을 수 없습니다. 새로운 분석을 시작해주세요.");
        setIsLoading(false);
      } catch (err) {
        console.error("분석 데이터 로드 오류:", err);
        setError("분석 결과를 불러오는 중 오류가 발생했습니다.");
        setIsLoading(false);
      }
    };

    loadAnalysisData();
  }, [location.state, storageId]);

  // 인쇄 모드 상태
  const [showPrintable, setShowPrintable] = useState(false);

  // 위험 점수
  const riskScore = analysisData?.overall_evaluation?.risk_score || 15; // 0-100 사이의 값 (낮을수록 안전)

  // 잠재적 문제 데이터
  const [potentialIssues, setPotentialIssues] = useState<Issue[]>([]);

  // API 응답 데이터로 상태 업데이트
  useEffect(() => {
    if (analysisData) {
      // 위험 요소들을 잠재적 문제로 변환
      const issues: Issue[] = [];

      // 위험 요소 (높은 위험)
      if (analysisData.risk_analysis.risk_factors) {
        analysisData.risk_analysis.risk_factors.forEach((factor, index) => {
          issues.push({
            id: `risk-${index + 1}`,
            title: factor,
            description: getDescriptionForFactor(factor),
            severity: "high",
            category: getCategoryForFactor(factor),
            recommendation: getRecommendationForFactor(factor),
          });
        });
      }

      // 주의 요소 (중간 위험)
      if (analysisData.risk_analysis.caution_factors) {
        analysisData.risk_analysis.caution_factors.forEach((factor, index) => {
          issues.push({
            id: `caution-${index + 1}`,
            title: factor,
            description: getDescriptionForFactor(factor),
            severity: "medium",
            category: getCategoryForFactor(factor),
            recommendation: getRecommendationForFactor(factor),
          });
        });
      }

      setPotentialIssues(issues);
    }
  }, [analysisData]);

  // 요소에 따른 설명 생성
  const getDescriptionForFactor = (factor: string): string => {
    if (factor.includes("근저당")) {
      // 근저당 관련 설명
      const mortgage = analysisData?.mortgage_history?.find(
        m => !m.cancellation_date
      );
      if (mortgage) {
        return `현재 부동산에 ${mortgage.mortgagee}에 의한 ${mortgage.max_loan_amount}의 근저당권이 설정되어 있습니다. 채무 불이행 시 경매로 넘어갈 가능성이 있습니다.`;
      }
      return "현재 부동산에 근저당권이 설정되어 있습니다. 채무 불이행 시 경매로 넘어갈 가능성이 있습니다.";
    } else if (factor.includes("압류")) {
      // 압류 관련 설명
      const lien = analysisData?.lien_history?.find(l =>
        l.lien_type.includes("압류")
      );
      if (lien) {
        return `${lien.event_date}에 ${lien.lien_holder}에 의한 압류 기록이 있습니다. ${lien.remarks}`;
      }
      return "해당 부동산에 압류 기록이 존재합니다. 이는 소유자의 재정 상태에 문제가 있었을 가능성을 나타냅니다.";
    } else if (factor.includes("소유권")) {
      // 소유권 관련 설명
      const lastOwnership =
        analysisData?.ownership_history?.[
          analysisData.ownership_history.length - 1
        ];
      if (lastOwnership) {
        return `현재 소유자(${lastOwnership.owner_name})는 ${lastOwnership.event_date}에 ${lastOwnership.event_type} 절차를 통해 소유권을 취득했습니다.`;
      }
      return "소유권 관련 정보를 확인할 필요가 있습니다.";
    }

    return "해당 요소에 대한 자세한 정보를 확인하고 전문가와 상담하는 것이 좋습니다.";
  };

  // 요소에 따른 카테고리 생성
  const getCategoryForFactor = (factor: string): IssueCategory => {
    if (factor.includes("근저당")) return "mortgage";
    if (factor.includes("압류") || factor.includes("가압류")) return "rights";
    if (factor.includes("소유권")) return "ownership";
    return "other";
  };

  // 요소에 따른 추천사항 생성
  const getRecommendationForFactor = (factor: string): string => {
    if (factor.includes("근저당")) {
      return "근저당권 설정 금액과 채무 상환 계획을 소유자에게 확인하세요. 또한 임대차계약 시 보증금 보호를 위한 우선순위를 확인하는 것이 중요합니다.";
    } else if (factor.includes("압류")) {
      return "압류 사유와 해제 경위를 확인하고, 현재 다른 채무 관계가 있는지 확인하세요.";
    } else if (factor.includes("소유권")) {
      return "소유자에게 소유권 취득 경위를 확인하고, 필요시 이전 소유자 정보를 조회하세요.";
    }

    return "전문가와 상담하여 해당 요소에 대한 자세한 분석을 받아보세요.";
  };

  // 사기 방지 체크리스트 항목 생성
  const generateFraudPreventionItems = (): ChecklistItem[] => {
    const items: ChecklistItem[] = [
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
    ];

    // 체크포인트 추가
    if (analysisData?.lease_checkpoints) {
      analysisData.lease_checkpoints.forEach((checkpoint, index) => {
        items.push({
          id: `api-${index + 1}`,
          title: checkpoint,
          description: `AI 분석 결과 권장사항: ${checkpoint}`,
          importance: "high",
        });
      });
    }

    // 보험 및 보호 조치 추가
    if (analysisData?.insurance_and_protection) {
      analysisData.insurance_and_protection.forEach((protection, index) => {
        items.push({
          id: `protection-${index + 1}`,
          title: protection,
          description: `AI 권장 보호 조치: ${protection}`,
          importance: "medium",
        });
      });
    }

    return items;
  };

  // 사기 방지 체크리스트 항목
  const fraudPreventionItems = analysisData
    ? generateFraudPreventionItems()
    : [
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

  // 부동산 정보
  const propertyInfo = analysisData
    ? {
        id: analysisData.basic_info.identifier_number,
        address: analysisData.basic_info.real_estate,
        area: analysisData.building.total_floor_area,
        registrationDate:
          analysisData.basic_info.examination_datetime.split(" ")[0],
        structure: analysisData.building.structure,
        usage: analysisData.building.usage,
      }
    : {
        id: "property-123",
        address: "서울특별시 강남구 테헤란로 123",
        area: "85.5㎡",
        registrationDate: "2022-05-15",
      };

  // 소유자 정보
  const ownerInfo = analysisData?.ownership_history?.length
    ? {
        name: analysisData.ownership_history[
          analysisData.ownership_history.length - 1
        ].owner_name,
        acquisitionDate:
          analysisData.ownership_history[
            analysisData.ownership_history.length - 1
          ].event_date,
        ownership: "단독소유",
      }
    : {
        name: "홍길동",
        acquisitionDate: "2020-03-10",
        ownership: "단독소유",
      };

  // 안전 보증금 정보
  const safeDeposit = analysisData?.safe_deposit_levels
    ? {
        recommended: analysisData.safe_deposit_levels.recommended_upper_limit,
        maximum: analysisData.safe_deposit_levels.maximum_safe_limit,
      }
    : null;

  // 인쇄 모드 전환
  const togglePrintMode = () => {
    setShowPrintable(!showPrintable);
  };

  // IssueCategory와 ChecklistItem의 타입 호환성 문제 해결
  // 예시로, importance를 "high", "medium", "low" 중 하나로 설정
  const validCategories: IssueCategory[] = [
    "ownership",
    "mortgage",
    "rights",
    "other",
  ];

  const issues = potentialIssues.map((issue: any) => {
    const category = validCategories.includes(issue.category as IssueCategory)
      ? (issue.category as IssueCategory)
      : "other";
    return {
      ...issue,
      category,
    };
  });

  const checklistItems = fraudPreventionItems.map((item: any) => ({
    ...item,
    importance: item.importance as "high" | "medium" | "low", // 타입 캐스팅
  }));

  return (
    <div className="container mx-auto px-4 py-6">
      {/* 상단 네비게이션 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="flex items-center space-x-2 mb-4 sm:mb-0">
          <Button variant="outline" size="sm" asChild>
            <Link to="/upload">
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

      {/* 로딩 중이거나 오류 발생 시 표시 */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
          <p className="text-lg">분석 결과를 불러오는 중입니다...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-red-700 mb-2">오류 발생</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => navigate("/upload")}>새 분석 시작하기</Button>
        </div>
      ) : analysisData ? (
        <>
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
                  <span className="font-medium">면적:</span> {propertyInfo.area}{" "}
                  ({analysisData?.building?.total_floor_area_pyeong || ""})
                </div>
                <div>
                  <span className="font-medium">등기일자:</span>{" "}
                  {propertyInfo.registrationDate}
                </div>
                <div>
                  <span className="font-medium">소유자:</span> {ownerInfo.name}{" "}
                  ({ownerInfo.ownership})
                </div>
                {propertyInfo.structure && (
                  <div>
                    <span className="font-medium">구조:</span>{" "}
                    {propertyInfo.structure}
                  </div>
                )}
                {propertyInfo.usage && (
                  <div>
                    <span className="font-medium">용도:</span>{" "}
                    {propertyInfo.usage}
                  </div>
                )}
                {safeDeposit && (
                  <div>
                    <span className="font-medium">권장 보증금 한도:</span>{" "}
                    {safeDeposit.recommended}
                  </div>
                )}
              </div>

              {analysisData?.overall_evaluation?.comment && (
                <div className="mt-4 p-3 bg-accent/20 rounded-md">
                  <p className="text-sm font-medium">종합 평가</p>
                  <p className="text-sm">
                    {analysisData.overall_evaluation.comment}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 위험 점수 */}
          <div className="mb-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">
              부동산 위험 점수
            </h2>
            <div className="flex justify-center">
              <RiskScoreGauge score={riskScore * 10} size="lg" showLabel />
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
              <PotentialIssuesAnalysis issues={issues} />
            </TabsContent>
            <TabsContent value="checklist">
              <FraudPreventionChecklist
                propertyId={propertyId}
                items={checklistItems}
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
              issues={issues}
              checklistItems={checklistItems}
              contractSteps={contractGuideSteps}
            />
          </div>
        </>
      ) : (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-amber-700 mb-2">
            분석 결과 없음
          </h2>
          <p className="text-amber-600 mb-4">분석 결과를 찾을 수 없습니다.</p>
          <Button onClick={() => navigate("/upload")}>새 분석 시작하기</Button>
        </div>
      )}
    </div>
  );
}
