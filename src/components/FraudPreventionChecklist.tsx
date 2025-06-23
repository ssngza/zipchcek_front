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
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { useState } from "react";

// 체크리스트 항목 인터페이스
export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  importance: "high" | "medium" | "low"; // 중요도
}

// 체크리스트 항목 상태 인터페이스
interface ChecklistItemState {
  id: string;
  checked: boolean;
}

interface FraudPreventionChecklistProps {
  propertyId?: string; // 부동산 ID (로컬 스토리지 저장용)
  items: ChecklistItem[]; // 체크리스트 항목
  className?: string;
}

// 중요도 표시 이름
const importanceNames = {
  high: "높음",
  medium: "중간",
  low: "낮음",
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
  ];

  // 텍스트를 분석하여 용어가 포함된 경우 툴팁으로 감싸기
  let processedText = text;
  let parts: (string | JSX.Element)[] = [text];

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

export default function FraudPreventionChecklist({
  propertyId = "default",
  items,
  className = "",
}: FraudPreventionChecklistProps) {
  // 체크된 항목 상태 (로컬 스토리지에 저장)
  const [checkedItems, setCheckedItems] = useLocalStorage<string[]>(
    `checklist-${propertyId}`,
    []
  );

  // 필터 상태 (전체, 완료, 미완료)
  const [filter, setFilter] = useState<"all" | "checked" | "unchecked">("all");

  // 중요도 필터 상태
  const [importanceFilter, setImportanceFilter] = useState<
    "all" | "high" | "medium" | "low"
  >("all");

  // 완료 항목 수 계산
  const completedCount = checkedItems.length;
  const totalCount = items.length;

  // 필터링된 항목 계산
  const filteredItems = items.filter(item => {
    // 상태 필터링
    const statusMatch =
      filter === "all" ||
      (filter === "checked" && checkedItems.includes(item.id)) ||
      (filter === "unchecked" && !checkedItems.includes(item.id));

    // 중요도 필터링
    const importanceMatch =
      importanceFilter === "all" || item.importance === importanceFilter;

    return statusMatch && importanceMatch;
  });

  // 항목 체크 상태 변경
  const toggleItem = (id: string) => {
    setCheckedItems((prev: string[]) => {
      if (prev.includes(id)) {
        return prev.filter((itemId: string) => itemId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // 모든 항목 체크/해제
  const handleCheckAll = (checked: boolean) => {
    if (checked) {
      setCheckedItems(items.map(item => item.id));
    } else {
      setCheckedItems([]);
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0">
          <div>
            <CardTitle className="text-lg md:text-xl">
              사기 방지 체크리스트
            </CardTitle>
            <CardDescription>
              <TermTooltip definition={termDefinitions.전세사기}>
                전세사기
              </TermTooltip>{" "}
              예방을 위한 필수 확인 사항입니다
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCheckAll(true)}
              className={`text-xs md:text-sm whitespace-nowrap ${
                completedCount === totalCount
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : ""
              }`}
            >
              모두 체크
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCheckAll(false)}
              className={`text-xs md:text-sm whitespace-nowrap ${
                completedCount === 0
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : ""
              }`}
            >
              모두 해제
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        {/* 상태 필터 */}
        <div className="mb-4 flex flex-wrap gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
            className="text-xs md:text-sm h-8 px-2 sm:px-3"
          >
            전체 ({items.length})
          </Button>
          <Button
            variant={filter === "checked" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("checked")}
            className="text-xs md:text-sm h-8 px-2 sm:px-3"
          >
            완료 ({checkedItems.length})
          </Button>
          <Button
            variant={filter === "unchecked" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("unchecked")}
            className="text-xs md:text-sm h-8 px-2 sm:px-3"
          >
            미완료 ({items.length - checkedItems.length})
          </Button>
        </div>

        {/* 중요도 필터 */}
        <div className="mb-4 flex flex-wrap gap-2">
          <Button
            variant={importanceFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setImportanceFilter("all")}
            className="text-xs md:text-sm h-8 px-2 sm:px-3"
          >
            모든 중요도
          </Button>
          <Button
            variant={importanceFilter === "high" ? "default" : "outline"}
            size="sm"
            onClick={() => setImportanceFilter("high")}
            className="text-xs md:text-sm h-8 px-2 sm:px-3"
          >
            <AlertTriangle className="w-3 h-3 md:w-4 md:h-4 mr-1 text-red-500" />
            높음
          </Button>
          <Button
            variant={importanceFilter === "medium" ? "default" : "outline"}
            size="sm"
            onClick={() => setImportanceFilter("medium")}
            className="text-xs md:text-sm h-8 px-2 sm:px-3"
          >
            <Info className="w-3 h-3 md:w-4 md:h-4 mr-1 text-amber-500" />
            중간
          </Button>
          <Button
            variant={importanceFilter === "low" ? "default" : "outline"}
            size="sm"
            onClick={() => setImportanceFilter("low")}
            className="text-xs md:text-sm h-8 px-2 sm:px-3"
          >
            <Info className="w-3 h-3 md:w-4 md:h-4 mr-1 text-blue-500" />
            낮음
          </Button>
        </div>

        {/* 진행률 표시 */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-1">
            <span>완료 진행률</span>
            <span>
              {completedCount}/{totalCount} (
              {totalCount > 0
                ? Math.round((completedCount / totalCount) * 100)
                : 0}
              %)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-primary h-2.5 rounded-full transition-all duration-300 ease-in-out"
              style={{
                width: `${
                  totalCount > 0
                    ? Math.round((completedCount / totalCount) * 100)
                    : 0
                }%`,
              }}
            ></div>
          </div>
        </div>

        {/* 체크리스트 항목 */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">표시할 항목이 없습니다.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredItems.map(item => {
              const isChecked = checkedItems.includes(item.id);
              const ImportanceIcon =
                item.importance === "high"
                  ? AlertTriangle
                  : item.importance === "medium"
                    ? Info
                    : Info;
              const importanceColor =
                item.importance === "high"
                  ? "text-red-500"
                  : item.importance === "medium"
                    ? "text-amber-500"
                    : "text-blue-500";

              return (
                <div
                  key={item.id}
                  className={`border rounded-lg p-3 md:p-4 transition-colors ${
                    isChecked ? "bg-gray-50" : ""
                  }`}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-2 sm:mr-3">
                      <button
                        type="button"
                        onClick={() => toggleItem(item.id)}
                        className={`w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center border transition-colors ${
                          isChecked
                            ? "bg-primary border-primary text-primary-foreground"
                            : "border-gray-300"
                        }`}
                        aria-label={
                          isChecked ? "항목 체크 해제하기" : "항목 체크하기"
                        }
                      >
                        {isChecked && (
                          <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" />
                        )}
                      </button>
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-wrap items-center gap-1 mb-1">
                        <ImportanceIcon
                          className={`w-3 h-3 md:w-4 md:h-4 mr-1 ${importanceColor}`}
                        />
                        <span className="text-xs text-gray-500 mr-2">
                          {importanceNames[item.importance]}
                        </span>
                        <h3
                          className={`text-sm md:text-base font-medium ${
                            isChecked ? "text-gray-500" : "text-gray-900"
                          }`}
                        >
                          {processTextWithTooltips(item.title)}
                        </h3>
                      </div>
                      <p
                        className={`text-xs md:text-sm ${
                          isChecked ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {processTextWithTooltips(item.description)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
