import { Flex } from "@/components/ui/base";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertTriangle,
  ArrowUpDown,
  Calendar,
  SlidersHorizontal,
} from "lucide-react";
import React from "react";

export type SortOption = "date-desc" | "date-asc" | "risk-desc" | "risk-asc";
export type FilterOption = "all" | "high-risk" | "medium-risk" | "low-risk";

interface HistoryFiltersProps {
  onSortChange: (value: SortOption) => void;
  onFilterChange: (value: FilterOption) => void;
  sortBy: SortOption;
  filterBy: FilterOption;
}

const HistoryFilters: React.FC<HistoryFiltersProps> = ({
  onSortChange,
  onFilterChange,
  sortBy,
  filterBy,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center w-full">
      {/* 필터링 옵션 */}
      <div className="flex flex-col xs:flex-row gap-2 w-full sm:w-auto">
        <div className="flex items-center">
          <SlidersHorizontal size={16} className="mr-2 text-gray-500" />
          <span className="text-sm font-medium">필터:</span>
        </div>
        <Select value={filterBy} onValueChange={onFilterChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="위험도 필터" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>위험도 필터</SelectLabel>
              <SelectItem value="all">모든 기록</SelectItem>
              <SelectItem value="high-risk">
                <Flex align="center" gap={1}>
                  <AlertTriangle size={14} className="text-red-500" />
                  <span>높은 위험 (70% 이상)</span>
                </Flex>
              </SelectItem>
              <SelectItem value="medium-risk">
                <Flex align="center" gap={1}>
                  <AlertTriangle size={14} className="text-amber-500" />
                  <span>중간 위험 (30-69%)</span>
                </Flex>
              </SelectItem>
              <SelectItem value="low-risk">
                <Flex align="center" gap={1}>
                  <AlertTriangle size={14} className="text-green-500" />
                  <span>낮은 위험 (30% 미만)</span>
                </Flex>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* 정렬 옵션 */}
      <div className="flex flex-col xs:flex-row gap-2 w-full sm:w-auto">
        <div className="flex items-center">
          <ArrowUpDown size={16} className="mr-2 text-gray-500" />
          <span className="text-sm font-medium">정렬:</span>
        </div>
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="정렬 기준" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>정렬 기준</SelectLabel>
              <SelectItem value="date-desc">
                <Flex align="center" gap={1}>
                  <Calendar size={14} />
                  <span>최신순</span>
                </Flex>
              </SelectItem>
              <SelectItem value="date-asc">
                <Flex align="center" gap={1}>
                  <Calendar size={14} />
                  <span>오래된순</span>
                </Flex>
              </SelectItem>
              <SelectItem value="risk-desc">
                <Flex align="center" gap={1}>
                  <AlertTriangle size={14} />
                  <span>위험도 높은순</span>
                </Flex>
              </SelectItem>
              <SelectItem value="risk-asc">
                <Flex align="center" gap={1}>
                  <AlertTriangle size={14} />
                  <span>위험도 낮은순</span>
                </Flex>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* 필터 초기화 버튼 */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          onFilterChange("all");
          onSortChange("date-desc");
        }}
        className="ml-auto sm:ml-0"
      >
        초기화
      </Button>
    </div>
  );
};

export default HistoryFilters;
