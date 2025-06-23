import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import React, { useState } from "react";

// 문제 심각도 타입
export type IssueSeverity = "high" | "medium" | "low" | "none";

// 문제 카테고리 타입
export type IssueCategory =
  | "ownership" // 소유권
  | "mortgage" // 근저당권
  | "rights" // 기타 권리관계
  | "restrictions" // 제한사항
  | "history" // 거래 이력
  | "other"; // 기타

// 문제 인터페이스
export interface Issue {
  id: string;
  title: string;
  description: string;
  severity: IssueSeverity;
  category: IssueCategory;
  recommendation: string;
}

// 카테고리 한글 이름 매핑
const categoryNames: Record<IssueCategory, string> = {
  ownership: "소유권 관련",
  mortgage: "근저당권 관련",
  rights: "기타 권리관계",
  restrictions: "제한사항",
  history: "거래 이력",
  other: "기타",
};

// 심각도 한글 이름 매핑
const severityNames: Record<IssueSeverity, string> = {
  high: "높음",
  medium: "중간",
  low: "낮음",
  none: "없음",
};

// 심각도별 색상 및 아이콘 매핑
const severityConfig: Record<
  IssueSeverity,
  {
    bgColor: string;
    textColor: string;
    borderColor: string;
    Icon: React.ElementType;
  }
> = {
  high: {
    bgColor: "bg-red-50",
    textColor: "text-red-700",
    borderColor: "border-red-200",
    Icon: AlertTriangle,
  },
  medium: {
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-700",
    borderColor: "border-yellow-200",
    Icon: AlertCircle,
  },
  low: {
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    borderColor: "border-blue-200",
    Icon: AlertCircle,
  },
  none: {
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    borderColor: "border-green-200",
    Icon: CheckCircle2,
  },
};

interface PotentialIssuesAnalysisProps {
  issues: Issue[];
  className?: string;
}

export default function PotentialIssuesAnalysis({
  issues,
  className = "",
}: PotentialIssuesAnalysisProps) {
  // 카테고리별로 문제 그룹화
  const issuesByCategory = issues.reduce<Record<IssueCategory, Issue[]>>(
    (acc, issue) => {
      if (!acc[issue.category]) {
        acc[issue.category] = [];
      }
      acc[issue.category].push(issue);
      return acc;
    },
    {} as Record<IssueCategory, Issue[]>
  );

  // 카테고리 확장 상태 관리
  const [expandedCategories, setExpandedCategories] = useState<
    Record<IssueCategory, boolean>
  >(() => {
    const initial: Record<IssueCategory, boolean> = {} as Record<
      IssueCategory,
      boolean
    >;
    // 기본적으로 심각도가 높은 카테고리만 펼침
    Object.keys(issuesByCategory).forEach(category => {
      const hasHighSeverity = issuesByCategory[category as IssueCategory].some(
        issue => issue.severity === "high"
      );
      initial[category as IssueCategory] = hasHighSeverity;
    });
    return initial;
  });

  // 문제 확장 상태 관리
  const [expandedIssues, setExpandedIssues] = useState<Record<string, boolean>>(
    {}
  );

  // 카테고리 토글 함수
  const toggleCategory = (category: IssueCategory) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // 문제 토글 함수
  const toggleIssue = (issueId: string) => {
    setExpandedIssues(prev => ({
      ...prev,
      [issueId]: !prev[issueId],
    }));
  };

  // 모든 카테고리 토글 함수
  const toggleAllCategories = (expand: boolean) => {
    const newState = {} as Record<IssueCategory, boolean>;
    Object.keys(issuesByCategory).forEach(category => {
      newState[category as IssueCategory] = expand;
    });
    setExpandedCategories(newState);
  };

  // 문제가 없는 경우
  if (issues.length === 0) {
    return (
      <Card className={`${className}`}>
        <CardHeader>
          <CardTitle className="text-xl">잠재적 문제 분석</CardTitle>
          <CardDescription>
            등기부등본에서 발견된 잠재적 문제점 분석 결과입니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-6 text-center">
            <div>
              <CheckCircle2 className="mx-auto h-12 w-12 text-green-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                문제가 발견되지 않았습니다
              </h3>
              <p className="text-gray-500">
                분석된 등기부등본에서 잠재적인 문제점이 발견되지 않았습니다.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${className}`}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl">잠재적 문제 분석</CardTitle>
            <CardDescription>
              등기부등본에서 발견된 잠재적 문제점 분석 결과입니다.
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleAllCategories(true)}
            >
              모두 펼치기
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleAllCategories(false)}
            >
              모두 접기
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 카테고리별 문제 목록 */}
        {Object.entries(issuesByCategory).map(([category, categoryIssues]) => {
          const typedCategory = category as IssueCategory;
          const isExpanded = expandedCategories[typedCategory];

          // 카테고리 내 가장 높은 심각도 찾기
          let highestSeverity: IssueSeverity = "none";
          for (const issue of categoryIssues) {
            if (
              issue.severity === "high" ||
              (issue.severity === "medium" && highestSeverity !== "high") ||
              (issue.severity === "low" && highestSeverity === "none")
            ) {
              highestSeverity = issue.severity;
            }
          }

          const { bgColor, textColor, borderColor, Icon } =
            severityConfig[highestSeverity];

          return (
            <div key={category} className={`border rounded-lg ${borderColor}`}>
              {/* 카테고리 헤더 */}
              <div
                className={`${bgColor} ${textColor} p-3 rounded-t-lg flex justify-between items-center cursor-pointer`}
                onClick={() => toggleCategory(typedCategory)}
              >
                <div className="flex items-center space-x-2">
                  <Icon className="h-5 w-5" />
                  <h3 className="font-medium">
                    {categoryNames[typedCategory]} ({categoryIssues.length})
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  {highestSeverity !== "none" && (
                    <span className="text-sm">
                      최고 심각도: {severityNames[highestSeverity]}
                    </span>
                  )}
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </div>
              </div>

              {/* 카테고리 내용 */}
              {isExpanded && (
                <div className="p-3 space-y-3">
                  {categoryIssues.map(issue => {
                    const { bgColor, textColor, Icon } =
                      severityConfig[issue.severity];
                    const isIssueExpanded = expandedIssues[issue.id];

                    return (
                      <div key={issue.id} className="border rounded-lg">
                        {/* 문제 헤더 */}
                        <div
                          className={`${bgColor} ${textColor} p-2 rounded-t-lg flex justify-between items-center cursor-pointer`}
                          onClick={() => toggleIssue(issue.id)}
                        >
                          <div className="flex items-center space-x-2">
                            <Icon className="h-4 w-4" />
                            <h4 className="font-medium">{issue.title}</h4>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs">
                              심각도: {severityNames[issue.severity]}
                            </span>
                            {isIssueExpanded ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </div>
                        </div>

                        {/* 문제 상세 내용 */}
                        {isIssueExpanded && (
                          <div className="p-3 space-y-2">
                            <div>
                              <h5 className="text-sm font-medium text-gray-700">
                                설명
                              </h5>
                              <p className="text-sm text-gray-600">
                                {issue.description}
                              </p>
                            </div>
                            <div>
                              <h5 className="text-sm font-medium text-gray-700">
                                권장 조치
                              </h5>
                              <p className="text-sm text-gray-600">
                                {issue.recommendation}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
