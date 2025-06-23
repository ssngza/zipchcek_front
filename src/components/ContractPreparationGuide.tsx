import TermTooltip from "@/components/TermTooltip";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import termDefinitions from "@/data/termDefinitions";
import {
  ChevronDown,
  ChevronUp,
  FileCheck,
  FileText,
  FileWarning,
} from "lucide-react";
import { useState } from "react";

// 계약 유형
export type ContractType = "jeonse" | "monthly" | "purchase" | "all";

// 계약 단계
export interface ContractStep {
  id: string;
  title: string;
  description: string;
  documents: string[];
  tips: string[];
  contractType: ContractType;
}

interface ContractPreparationGuideProps {
  steps: ContractStep[];
  className?: string;
}

export default function ContractPreparationGuide({
  steps,
  className = "",
}: ContractPreparationGuideProps) {
  // 현재 선택된 계약 유형
  const [contractType, setContractType] = useState<ContractType>("all");

  // 확장된 단계 ID 목록
  const [expandedSteps, setExpandedSteps] = useState<string[]>([]);

  // 단계 확장/축소 토글
  const toggleStep = (id: string) => {
    setExpandedSteps(prev =>
      prev.includes(id) ? prev.filter(stepId => stepId !== id) : [...prev, id]
    );
  };

  // 모든 단계 확장/축소
  const toggleAllSteps = (expand: boolean) => {
    if (expand) {
      setExpandedSteps(steps.map(step => step.id));
    } else {
      setExpandedSteps([]);
    }
  };

  // 계약 유형별 필터링
  const filteredSteps = steps.filter(
    step =>
      step.contractType === contractType ||
      step.contractType === "all" ||
      contractType === "all"
  );

  // 계약 유형 한글명
  const contractTypeNames = {
    all: "모든 계약",
    jeonse: "전세",
    monthly: "월세",
    purchase: "매매",
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <CardTitle className="text-lg md:text-xl">
              계약서 준비 가이드
            </CardTitle>
            <CardDescription>
              안전한 계약을 위한 단계별 준비 가이드입니다
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2 mt-2 md:mt-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleAllSteps(true)}
              className="text-xs md:text-sm"
            >
              <ChevronDown className="w-3 h-3 md:w-4 md:h-4 mr-1" />
              모두 펼치기
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleAllSteps(false)}
              className="text-xs md:text-sm"
            >
              <ChevronUp className="w-3 h-3 md:w-4 md:h-4 mr-1" />
              모두 접기
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* 계약 유형 필터 */}
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(contractTypeNames).map(([type, name]) => (
            <Button
              key={type}
              variant={contractType === type ? "default" : "outline"}
              size="sm"
              onClick={() => setContractType(type as any)}
              className="text-xs md:text-sm"
            >
              {type === "jeonse" ? (
                <TermTooltip definition={termDefinitions.전세계약}>
                  {name}
                </TermTooltip>
              ) : type === "monthly" ? (
                <TermTooltip definition={termDefinitions.월세계약}>
                  {name}
                </TermTooltip>
              ) : type === "purchase" ? (
                <TermTooltip definition={termDefinitions.매매계약}>
                  {name}
                </TermTooltip>
              ) : (
                name
              )}
            </Button>
          ))}
        </div>

        {/* 단계별 가이드 */}
        <div className="space-y-4">
          {filteredSteps.length === 0 ? (
            <div className="text-center py-8">
              <FileWarning className="w-12 h-12 text-amber-500 mx-auto mb-4" />
              <p className="text-gray-500">
                선택한 계약 유형에 대한 가이드가 없습니다
              </p>
            </div>
          ) : (
            filteredSteps.map((step, index) => {
              const isExpanded = expandedSteps.includes(step.id);
              return (
                <div
                  key={step.id}
                  className="border rounded-lg overflow-hidden"
                >
                  <div
                    className="flex items-center p-3 md:p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                    onClick={() => toggleStep(step.id)}
                  >
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-xs md:text-sm font-medium">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-sm md:text-base text-gray-900">
                        {step.title}
                      </h3>
                    </div>
                    <div className="ml-2 flex-shrink-0">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="p-3 md:p-4 border-t">
                      <p className="text-xs md:text-sm text-gray-700 mb-4">
                        {step.description}
                      </p>

                      {/* 필요 서류 */}
                      <div className="mb-4">
                        <h4 className="font-medium text-xs md:text-sm mb-2 flex items-center">
                          <FileText className="w-3 h-3 md:w-4 md:h-4 mr-1 text-blue-500" />
                          필요 서류
                        </h4>
                        <ul className="space-y-1 pl-5 md:pl-6 list-disc text-xs md:text-sm text-gray-600">
                          {step.documents.map((doc, i) => (
                            <li key={i}>{doc}</li>
                          ))}
                        </ul>
                      </div>

                      {/* 팁 */}
                      <div>
                        <h4 className="font-medium text-xs md:text-sm mb-2 flex items-center">
                          <FileCheck className="w-3 h-3 md:w-4 md:h-4 mr-1 text-green-500" />
                          체크 포인트
                        </h4>
                        <ul className="space-y-1 pl-5 md:pl-6 list-disc text-xs md:text-sm text-gray-600">
                          {step.tips.map((tip, i) => (
                            <li key={i}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
