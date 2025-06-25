import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

export type FilterOption = "all" | "high-risk" | "medium-risk" | "low-risk";
export type SortOption = "date-desc" | "date-asc" | "risk-desc" | "risk-asc";

interface HistoryFiltersProps {
  sortBy: SortOption;
  filterBy: FilterOption;
  onSortChange: (value: SortOption) => void;
  onFilterChange: (value: FilterOption) => void;
}

const HistoryFilters: React.FC<HistoryFiltersProps> = ({
  sortBy,
  filterBy,
  onSortChange,
  onFilterChange,
}) => {
  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="w-full sm:w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            위험도 필터
          </label>
          <Select
            value={filterBy}
            onValueChange={value => onFilterChange(value as FilterOption)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="위험도 필터" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체 보기</SelectItem>
              <SelectItem value="high-risk">고위험만 보기</SelectItem>
              <SelectItem value="medium-risk">중위험만 보기</SelectItem>
              <SelectItem value="low-risk">저위험만 보기</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full sm:w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            정렬 기준
          </label>
          <Select
            value={sortBy}
            onValueChange={value => onSortChange(value as SortOption)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="정렬 기준" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-desc">최신순</SelectItem>
              <SelectItem value="date-asc">오래된순</SelectItem>
              <SelectItem value="risk-desc">위험도 높은순</SelectItem>
              <SelectItem value="risk-asc">위험도 낮은순</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default HistoryFilters;
