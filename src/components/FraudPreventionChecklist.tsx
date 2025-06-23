import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { useEffect, useState } from "react";

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

export default function FraudPreventionChecklist({
  propertyId = "default",
  items,
  className = "",
}: FraudPreventionChecklistProps) {
  // 로컬 스토리지 키
  const storageKey = `fraud-checklist-${propertyId}`;

  // 로컬 스토리지에서 체크 상태 가져오기
  const [savedState, setSavedState] = useLocalStorage<ChecklistItemState[]>(
    storageKey,
    []
  );

  // 현재 체크리스트 상태
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  // 초기화 시 로컬 스토리지 데이터 로드
  useEffect(() => {
    const initialState: Record<string, boolean> = {};

    // 저장된 상태가 있으면 로드
    if (savedState.length > 0) {
      savedState.forEach(item => {
        initialState[item.id] = item.checked;
      });
    } else {
      // 없으면 모든 항목 미체크 상태로 초기화
      items.forEach(item => {
        initialState[item.id] = false;
      });
    }

    setCheckedItems(initialState);
  }, [savedState, items]);

  // 체크 상태 변경 처리
  const handleCheckChange = (id: string) => {
    const newState = {
      ...checkedItems,
      [id]: !checkedItems[id],
    };

    setCheckedItems(newState);

    // 로컬 스토리지에 저장
    const stateToSave = Object.keys(newState).map(itemId => ({
      id: itemId,
      checked: newState[itemId],
    }));

    setSavedState(stateToSave);
  };

  // 모든 항목 체크/해제
  const handleCheckAll = (checked: boolean) => {
    const newState: Record<string, boolean> = {};

    items.forEach(item => {
      newState[item.id] = checked;
    });

    setCheckedItems(newState);

    // 로컬 스토리지에 저장
    const stateToSave = Object.keys(newState).map(itemId => ({
      id: itemId,
      checked: newState[itemId],
    }));

    setSavedState(stateToSave);
  };

  // 완료된 항목 수 계산
  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalCount = items.length;
  const progress =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // 중요도별 아이콘 및 스타일 매핑
  const importanceConfig = {
    high: {
      Icon: AlertTriangle,
      iconClass: "text-red-500",
      labelClass: "bg-red-100 text-red-700",
    },
    medium: {
      Icon: Info,
      iconClass: "text-yellow-500",
      labelClass: "bg-yellow-100 text-yellow-700",
    },
    low: {
      Icon: Info,
      iconClass: "text-blue-500",
      labelClass: "bg-blue-100 text-blue-700",
    },
  };

  // 중요도별 한글 이름
  const importanceNames = {
    high: "높음",
    medium: "중간",
    low: "낮음",
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <CardTitle className="text-xl">사기 방지 체크리스트</CardTitle>
            <CardDescription>
              등기부등본 확인 후 추가로 점검해야 할 항목들입니다.
            </CardDescription>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCheckAll(true)}
            >
              모두 체크
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCheckAll(false)}
            >
              모두 해제
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* 진행 상황 표시 */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              진행 상황: {completedCount}/{totalCount} 항목 완료
            </span>
            <span className="text-sm font-medium text-gray-700">
              {progress}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-primary h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* 체크리스트 항목 */}
        <div className="space-y-4">
          {items.map(item => {
            const { Icon, iconClass, labelClass } =
              importanceConfig[item.importance];
            const isChecked = checkedItems[item.id] || false;

            return (
              <div
                key={item.id}
                className={`border rounded-lg p-4 transition-colors ${
                  isChecked ? "bg-green-50 border-green-200" : "bg-white"
                }`}
              >
                <div className="flex items-start">
                  {/* 체크박스 */}
                  <div
                    className={`flex-shrink-0 w-6 h-6 rounded border cursor-pointer flex items-center justify-center mr-3 ${
                      isChecked
                        ? "bg-primary border-primary text-white"
                        : "border-gray-300"
                    }`}
                    onClick={() => handleCheckChange(item.id)}
                  >
                    {isChecked && <CheckCircle2 className="w-5 h-5" />}
                  </div>

                  {/* 내용 */}
                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                      <h3
                        className={`font-medium ${isChecked ? "text-gray-500 line-through" : "text-gray-900"}`}
                      >
                        {item.title}
                      </h3>
                      <div className="flex items-center mt-1 sm:mt-0">
                        <span
                          className={`text-xs px-2 py-1 rounded-full flex items-center ${labelClass}`}
                        >
                          <Icon className={`w-3 h-3 mr-1 ${iconClass}`} />
                          중요도: {importanceNames[item.importance]}
                        </span>
                      </div>
                    </div>
                    <p
                      className={`text-sm ${isChecked ? "text-gray-400" : "text-gray-600"}`}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 모든 항목이 체크된 경우 완료 메시지 */}
        {completedCount === totalCount && totalCount > 0 && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
            <CheckCircle2 className="mx-auto h-8 w-8 text-green-500 mb-2" />
            <p className="text-green-700 font-medium">
              모든 체크리스트 항목을 완료했습니다!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
