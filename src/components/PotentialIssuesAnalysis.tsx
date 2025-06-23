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

// 용어 강조 및 툴팁 처리 함수
const processTextWithTooltips = (text: string) => {
  // 용어와 해당 용어 정의 매핑
  const terms = [
    { term: "등기부등본", definition: termDefinitions.등기부등본 },
    { term: "근저당권", definition: termDefinitions.근저당권 },
    { term: "전세권", definition: termDefinitions.전세권 },
    { term: "가압류", definition: termDefinitions.가압류 },
    { term: "가처분", definition: termDefinitions.가처분 },
    { term: "전세사기", definition: termDefinitions.전세사기 },
    { term: "대항력", definition: termDefinitions.대항력 },
    { term: "확정일자", definition: termDefinitions.확정일자 },
    { term: "우선변제권", definition: termDefinitions.우선변제권 },
    { term: "임차권", definition: termDefinitions.임차권 },
    { term: "소유권", definition: termDefinitions.소유권 },
    { term: "등기권리증", definition: termDefinitions.등기권리증 },
    { term: "등기필증", definition: termDefinitions.등기필증 },
    { term: "건축물대장", definition: termDefinitions.건축물대장 },
    {
      term: "토지이용계획확인서",
      definition: termDefinitions.토지이용계획확인서,
    },
    { term: "선순위", definition: termDefinitions["선순위 권리자"] },
    { term: "후순위", definition: termDefinitions["선순위 권리자"] },
    { term: "채권자", definition: termDefinitions.채권자 },
    { term: "채무자", definition: termDefinitions.채무자 },
    { term: "담보", definition: termDefinitions.담보 },
  ];

  // 텍스트를 분석하여 용어가 포함된 경우 툴팁으로 감싸기
  let processedText = text;
  let parts = [text];

  // 용어를 찾아 툴팁으로 대체
  terms.forEach(({ term, definition }) => {
    if (definition && text.includes(term)) {
      parts = [];
      let remainingText = text;

      // 텍스트에서 해당 용어를 모두 찾아 툴팁으로 대체
      while (remainingText.includes(term)) {
        const index = remainingText.indexOf(term);
        if (index > 0) {
          parts.push(remainingText.substring(0, index));
        }

        // 용어를 툴팁으로 대체
        parts.push(
          <TermTooltip key={`${term}-${parts.length}`} definition={definition}>
            {term}
          </TermTooltip>
        );

        remainingText = remainingText.substring(index + term.length);
      }

      // 남은 텍스트 추가
      if (remainingText) {
        parts.push(remainingText);
      }

      // 처리된 결과를 텍스트로 설정
      text = remainingText;
    }
  });

  return parts.length > 1 ? parts : processedText;
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

  // 카테고리별 이슈 개수
  const categoryCounts = Object.entries(issuesByCategory).reduce(
    (acc, [category, issues]) => {
      acc[category] = issues.length;
      return acc;
    },
    {} as Record<string, number>
  );

  // 선택된 카테고리 상태
  const [selectedCategory, setSelectedCategory] =
    useState<IssueCategory | null>(null);

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
  const [expandedIssues, setExpandedIssues] = useState<string[]>([]);

  // 카테고리 토글 함수
  const toggleCategory = (category: IssueCategory) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // 문제 토글 함수
  const toggleIssue = (issueId: string) => {
    setExpandedIssues(prev =>
      prev.includes(issueId)
        ? prev.filter(id => id !== issueId)
        : [...prev, issueId]
    );
  };

  // 모든 카테고리 토글 함수
  const toggleAllCategories = () => {
    const allExpanded = Object.values(expandedCategories).every(Boolean);
    const newState = {} as Record<IssueCategory, boolean>;
    Object.keys(issuesByCategory).forEach(category => {
      newState[category as IssueCategory] = !allExpanded;
    });
    setExpandedCategories(newState);
  };

  // 필터링된 이슈 목록
  const filteredIssues = selectedCategory
    ? issuesByCategory[selectedCategory] || []
    : issues;

  // 문제가 없는 경우
  if (issues.length === 0) {
    return (
      <Card className={`${className}`}>
        <CardHeader>
          <CardTitle className="text-xl">잠재적 문제 분석</CardTitle>
          <CardDescription>
            <TermTooltip definition={termDefinitions.등기부등본}>
              등기부등본
            </TermTooltip>
            에서 발견된 잠재적 문제점 분석 결과입니다.
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
                분석된{" "}
                <TermTooltip definition={termDefinitions.등기부등본}>
                  등기부등본
                </TermTooltip>
                에서 잠재적인 문제점이 발견되지 않았습니다.
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <CardTitle className="text-lg md:text-xl">
              잠재적 문제 분석
            </CardTitle>
            <CardDescription>
              <TermTooltip definition={termDefinitions.등기부등본}>
                등기부등본
              </TermTooltip>
              에서 발견된 잠재적 문제 사항입니다
            </CardDescription>
          </div>
          {issues.length > 0 && (
            <div className="flex items-center space-x-2 mt-2 md:mt-0">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleAllCategories}
                className="text-xs md:text-sm"
              >
                {Object.values(expandedCategories).every(Boolean) ? (
                  <>
                    <ChevronUp className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                    모두 접기
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                    모두 펼치기
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {/* 문제가 없는 경우 */}
        {issues.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <CheckCircle2 className="w-12 h-12 text-green-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              문제가 발견되지 않았습니다
            </h3>
            <p className="text-gray-500 text-center max-w-md">
              분석된{" "}
              <TermTooltip definition={termDefinitions.등기부등본}>
                등기부등본
              </TermTooltip>
              에서 잠재적 문제 사항이 발견되지 않았습니다. 이는 일반적으로
              안전한 거래를 의미합니다.
            </p>
          </div>
        ) : (
          <>
            {/* 카테고리 필터 */}
            <div className="flex flex-wrap gap-2 mb-4 overflow-x-auto pb-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className="text-xs md:text-sm whitespace-nowrap"
              >
                전체 ({issues.length})
              </Button>
              {Object.entries(categoryCounts).map(([category, count]) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category as IssueCategory)}
                  className="text-xs md:text-sm whitespace-nowrap"
                >
                  {categoryNames[category as IssueCategory]} ({count})
                </Button>
              ))}
            </div>

            {/* 심각도 범례 */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
              <div className="flex items-center">
                <AlertCircle className="w-4 h-4 text-red-500 mr-1" />
                <span className="text-xs md:text-sm">높음</span>
              </div>
              <div className="flex items-center">
                <AlertTriangle className="w-4 h-4 text-amber-500 mr-1" />
                <span className="text-xs md:text-sm">중간</span>
              </div>
              <div className="flex items-center">
                <AlertTriangle className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-xs md:text-sm">낮음</span>
              </div>
            </div>

            {/* 문제 목록 */}
            <div className="space-y-4">
              {filteredIssues.map(issue => (
                <div
                  key={issue.id}
                  className="border rounded-lg overflow-hidden"
                >
                  <div
                    className="flex items-center p-3 md:p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                    onClick={() => toggleIssue(issue.id)}
                  >
                    {/* 심각도 아이콘 */}
                    <div className="mr-3 flex-shrink-0">
                      {issue.severity === "high" ? (
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      ) : issue.severity === "medium" ? (
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-blue-500" />
                      )}
                    </div>

                    {/* 제목 및 카테고리 */}
                    <div className="flex-grow">
                      <h3 className="font-medium text-gray-900 text-sm md:text-base">
                        {processTextWithTooltips(issue.title)}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-500">
                        {categoryNames[issue.category]}
                      </p>
                    </div>

                    {/* 확장/축소 아이콘 */}
                    <div className="ml-2 flex-shrink-0">
                      {expandedIssues.includes(issue.id) ? (
                        <ChevronUp className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      )}
                    </div>
                  </div>

                  {/* 확장된 내용 */}
                  {expandedIssues.includes(issue.id) && (
                    <div className="p-3 md:p-4 border-t">
                      <p className="text-sm md:text-base text-gray-700 mb-4">
                        {processTextWithTooltips(issue.description)}
                      </p>
                      <div className="bg-amber-50 p-3 rounded-md">
                        <h4 className="font-medium text-amber-800 text-xs md:text-sm mb-1">
                          권장사항
                        </h4>
                        <p className="text-xs md:text-sm text-amber-700">
                          {processTextWithTooltips(issue.recommendation)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
