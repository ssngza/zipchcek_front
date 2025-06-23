import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  FileCheck,
  FileText,
  FileWarning,
} from "lucide-react";
import { useState } from "react";

// 계약 유형
export type ContractType = "jeonse" | "monthly" | "purchase";

// 계약 단계
export interface ContractStep {
  id: string;
  title: string;
  description: string;
  documents: DocumentItem[];
  tips: string[];
  contractTypes: ContractType[]; // 이 단계가 적용되는 계약 유형
}

// 문서 항목
export interface DocumentItem {
  id: string;
  name: string;
  description: string;
  required: boolean;
  url?: string; // 문서 템플릿이나 추가 정보 링크
}

interface ContractPreparationGuideProps {
  steps: ContractStep[];
  className?: string;
}

export default function ContractPreparationGuide({
  steps,
  className = "",
}: ContractPreparationGuideProps) {
  // 선택된 계약 유형 (기본값: 전세)
  const [selectedContractType, setSelectedContractType] =
    useState<ContractType>("jeonse");

  // 확장된 단계 ID 관리
  const [expandedStepIds, setExpandedStepIds] = useState<
    Record<string, boolean>
  >({
    [steps[0]?.id || ""]: true, // 첫 번째 단계는 기본적으로 확장
  });

  // 계약 유형 한글 이름
  const contractTypeNames: Record<ContractType, string> = {
    jeonse: "전세",
    monthly: "월세",
    purchase: "매매",
  };

  // 단계 확장 토글
  const toggleStep = (stepId: string) => {
    setExpandedStepIds(prev => ({
      ...prev,
      [stepId]: !prev[stepId],
    }));
  };

  // 선택된 계약 유형에 맞는 단계만 필터링
  const filteredSteps = steps.filter(step =>
    step.contractTypes.includes(selectedContractType)
  );

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <CardTitle className="text-xl">계약서 준비 가이드</CardTitle>
            <CardDescription>
              안전한 계약을 위한 단계별 준비 가이드입니다.
            </CardDescription>
          </div>

          {/* 계약 유형 선택 버튼 */}
          <div className="flex space-x-2 mt-4 md:mt-0">
            {Object.entries(contractTypeNames).map(([type, name]) => (
              <Button
                key={type}
                variant={selectedContractType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedContractType(type as ContractType)}
              >
                {name}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 선택된 계약 유형 표시 */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium text-blue-800 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            {contractTypeNames[selectedContractType]} 계약 준비 가이드
          </h3>
          <p className="text-sm text-blue-700 mt-1">
            {selectedContractType === "jeonse" &&
              "전세 계약은 큰 금액이 오가는 만큼 특히 주의가 필요합니다. 아래 단계를 꼼꼼히 확인하세요."}
            {selectedContractType === "monthly" &&
              "월세 계약도 보증금이 있는 경우 위험 요소가 있을 수 있습니다. 아래 단계를 참고하세요."}
            {selectedContractType === "purchase" &&
              "부동산 매매는 큰 금액이 오가는 중요한 거래입니다. 아래 단계를 통해 안전한 계약을 준비하세요."}
          </p>
        </div>

        {/* 단계별 가이드 */}
        <div className="space-y-4">
          {filteredSteps.length > 0 ? (
            filteredSteps.map((step, index) => {
              const isExpanded = expandedStepIds[step.id] || false;

              return (
                <div
                  key={step.id}
                  className="border rounded-lg overflow-hidden"
                >
                  {/* 단계 헤더 */}
                  <div
                    className={`flex items-center justify-between p-4 cursor-pointer ${
                      isExpanded ? "bg-gray-50" : "bg-white"
                    }`}
                    onClick={() => toggleStep(step.id)}
                  >
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-medium mr-3">
                        {index + 1}
                      </div>
                      <h3 className="font-medium text-gray-900">
                        {step.title}
                      </h3>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>

                  {/* 단계 내용 */}
                  {isExpanded && (
                    <div className="p-4 border-t">
                      <p className="text-gray-700 mb-4">{step.description}</p>

                      {/* 필요 문서 목록 */}
                      {step.documents.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-900 mb-2">
                            필요 서류
                          </h4>
                          <div className="space-y-2">
                            {step.documents.map(doc => (
                              <div
                                key={doc.id}
                                className="flex items-start p-3 bg-gray-50 rounded-lg"
                              >
                                {doc.required ? (
                                  <FileCheck className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                                ) : (
                                  <FileWarning className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                                )}
                                <div>
                                  <div className="flex items-center">
                                    <h5 className="font-medium text-gray-900">
                                      {doc.name}
                                    </h5>
                                    {doc.required && (
                                      <span className="ml-2 text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded-full">
                                        필수
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {doc.description}
                                  </p>
                                  {doc.url && (
                                    <a
                                      href={doc.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-sm text-primary flex items-center mt-1 hover:underline"
                                    >
                                      <ChevronRight className="w-4 h-4 mr-1" />
                                      샘플 확인하기
                                    </a>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 팁 목록 */}
                      {step.tips.length > 0 && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">
                            주의사항 및 팁
                          </h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {step.tips.map((tip, tipIndex) => (
                              <li
                                key={tipIndex}
                                className="text-sm text-gray-700"
                              >
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="flex items-center justify-center p-8 text-center">
              <div>
                <CheckCircle2 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  선택한 계약 유형에 대한 가이드가 없습니다
                </h3>
                <p className="text-gray-500">
                  다른 계약 유형을 선택하거나 나중에 다시 확인해 주세요.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 법률 전문가 조언 안내 */}
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-700">
            이 가이드는 일반적인 정보 제공을 목적으로 합니다. 구체적인 법률
            조언이 필요한 경우 법무사나 변호사와 상담하세요.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
