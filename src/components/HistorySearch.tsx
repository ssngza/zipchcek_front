import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import React, { useState } from "react";

interface HistorySearchProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

const HistorySearch: React.FC<HistorySearchProps> = ({
  onSearch,
  initialQuery = "",
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery.trim());
  };

  const handleClear = () => {
    setSearchQuery("");
    onSearch("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center">
        <div className="absolute left-3 text-gray-400">
          <Search size={18} />
        </div>
        <Input
          type="text"
          placeholder="파일명으로 검색..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="pl-10 pr-16 py-6 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-[70px] text-gray-400 hover:text-gray-600"
            aria-label="검색어 지우기"
          >
            <X size={18} />
          </button>
        )}
        <Button
          type="submit"
          variant="default"
          size="sm"
          className="absolute right-2 px-3"
        >
          검색
        </Button>
      </div>
    </form>
  );
};

export default HistorySearch;
