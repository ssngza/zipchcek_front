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
    setCheckedItems((prev: string[]) =>
      prev.includes(id)
        ? prev.filter((itemId: string) => itemId !== id)
        : [...prev, id]
    );
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
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
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
          <div className="flex items-center space-x-2 mt-2 md:mt-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCheckAll(true)}
              className={`text-xs md:text-sm ${
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
              className={`text-xs md:text-sm ${
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
      <CardContent>
        {/* 상태 필터 */}
        <div className="mb-4 flex flex-wrap gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
            className="text-xs md:text-sm"
          >
            전체 ({items.length})
          </Button>
          <Button
            variant={filter === "checked" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("checked")}
            className="text-xs md:text-sm"
          >
            완료 ({checkedItems.length})
          </Button>
          <Button
            variant={filter === "unchecked" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("unchecked")}
            className="text-xs md:text-sm"
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
            className="text-xs md:text-sm"
          >
            모든 중요도
          </Button>
          <Button
            variant={importanceFilter === "high" ? "default" : "outline"}
            size="sm"
            onClick={() => setImportanceFilter("high")}
            className="text-xs md:text-sm"
          >
            <AlertTriangle className="w-3 h-3 md:w-4 md:h-4 mr-1 text-red-500" />
            높음
          </Button>
          <Button
            variant={importanceFilter === "medium" ? "default" : "outline"}
            size="sm"
            onClick={() => setImportanceFilter("medium")}
            className="text-xs md:text-sm"
          >
            <Info className="w-3 h-3 md:w-4 md:h-4 mr-1 text-amber-500" />
            중간
          </Button>
          <Button
            variant={importanceFilter === "low" ? "default" : "outline"}
            size="sm"
            onClick={() => setImportanceFilter("low")}
            className="text-xs md:text-sm"
          >
            <Info className="w-3 h-3 md:w-4 md:h-4 mr-1 text-blue-500" />
            낮음
          </Button>
        </div>

        <div className="space-y-3">
          {filteredItems.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <p className="text-gray-500">
                {filter === "checked"
                  ? "아직 완료한 항목이 없습니다."
                  : "표시할 항목이 없습니다."}
              </p>
            </div>
          ) : (
            filteredItems.map(item => {
              const isChecked = checkedItems.includes(item.id);
              return (
                <div
                  key={item.id}
                  className={`border rounded-lg p-3 md:p-4 transition-colors ${
                    isChecked ? "bg-green-50 border-green-200" : "bg-white"
                  }`}
                >
                  <div className="flex items-start">
                    <div
                      className={`flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded border flex items-center justify-center mr-3 cursor-pointer transition-colors ${
                        isChecked
                          ? "bg-green-500 border-green-500"
                          : "border-gray-300 hover:border-primary"
                      }`}
                      onClick={() => toggleItem(item.id)}
                    >
                      {isChecked && (
                        <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-white" />
                      )}
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <h3
                          className={`font-medium text-sm md:text-base mb-1 md:mb-0 ${
                            isChecked ? "text-green-700" : "text-gray-900"
                          }`}
                        >
                          {item.title}
                          {item.importance === "high" && (
                            <AlertTriangle className="inline-block w-3 h-3 md:w-4 md:h-4 ml-1 text-red-500" />
                          )}
                        </h3>
                        <div className="text-xs md:text-sm text-gray-500 mb-1 md:mb-0">
                          중요도:{" "}
                          <span
                            className={
                              item.importance === "high"
                                ? "text-red-500"
                                : item.importance === "medium"
                                  ? "text-amber-500"
                                  : "text-blue-500"
                            }
                          >
                            {importanceNames[item.importance]}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs md:text-sm text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* 진행 상황 표시 */}
        <div className="mt-6">
          <div className="flex justify-between mb-2 text-xs md:text-sm">
            <span>진행 상황</span>
            <span>
              {completedCount}/{totalCount} 완료
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-primary h-2.5 rounded-full"
              style={{
                width: `${(completedCount / totalCount) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
