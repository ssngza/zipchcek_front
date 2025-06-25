import HistoryCard from "@/components/HistoryCard";
import HistoryCardSkeleton from "@/components/HistoryCardSkeleton";
import HistoryFilters, {
  FilterOption,
  SortOption,
} from "@/components/HistoryFilters";
import HistoryPagination from "@/components/HistoryPagination";
import HistorySearch from "@/components/HistorySearch";
import { Navbar } from "@/components/Navbar";
import { Box, Container, Flex, Heading, Text } from "@/components/ui/base";
import { Loader2 } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

// 임시 데이터 (상태로 관리하여 삭제 기능 구현)
const initialMockData = [
  {
    id: "abcd1234efgh5678",
    fileName: "서울시 강남구 역삼동 123-456.pdf",
    analysisDate: "2023-06-15",
    riskScore: 75,
    issueCount: 3,
  },
  {
    id: "ijkl9012mnop3456",
    fileName: "경기도 성남시 분당구 서현동 789-101.pdf",
    analysisDate: "2023-06-10",
    riskScore: 45,
    issueCount: 1,
  },
  {
    id: "qrst7890uvwx1234",
    fileName: "서울시 서초구 반포동 234-567.pdf",
    analysisDate: "2023-06-05",
    riskScore: 15,
    issueCount: 0,
  },
  // 페이지네이션 테스트를 위한 추가 데이터
  {
    id: "abcd1111efgh2222",
    fileName: "서울시 마포구 합정동 111-222.pdf",
    analysisDate: "2023-06-04",
    riskScore: 85,
    issueCount: 5,
  },
  {
    id: "ijkl3333mnop4444",
    fileName: "경기도 고양시 일산동구 장항동 333-444.pdf",
    analysisDate: "2023-06-03",
    riskScore: 35,
    issueCount: 1,
  },
  {
    id: "qrst5555uvwx6666",
    fileName: "서울시 송파구 잠실동 555-666.pdf",
    analysisDate: "2023-06-02",
    riskScore: 25,
    issueCount: 0,
  },
  {
    id: "abcd7777efgh8888",
    fileName: "경기도 안양시 동안구 평촌동 777-888.pdf",
    analysisDate: "2023-06-01",
    riskScore: 65,
    issueCount: 2,
  },
  {
    id: "ijkl9999mnop0000",
    fileName: "서울시 영등포구 여의도동 999-000.pdf",
    analysisDate: "2023-05-31",
    riskScore: 55,
    issueCount: 1,
  },
  {
    id: "qrst1212uvwx3434",
    fileName: "경기도 수원시 영통구 원천동 121-343.pdf",
    analysisDate: "2023-05-30",
    riskScore: 10,
    issueCount: 0,
  },
  {
    id: "abcd5656efgh7878",
    fileName: "서울시 강동구 천호동 565-787.pdf",
    analysisDate: "2023-05-29",
    riskScore: 80,
    issueCount: 4,
  },
];

const ITEMS_PER_PAGE = 4; // 페이지당 표시할 항목 수

const HistoryPage: React.FC = () => {
  const [historyData, setHistoryData] = useState<typeof initialMockData>([]);
  const [sortBy, setSortBy] = useState<SortOption>("date-desc");
  const [filterBy, setFilterBy] = useState<FilterOption>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  // 데이터 로딩 시뮬레이션
  useEffect(() => {
    // 초기 데이터 로딩
    const loadInitialData = () => {
      setIsLoading(true);
      // 로딩 시간 시뮬레이션 (1-2초)
      setTimeout(() => {
        setHistoryData(initialMockData);
        setIsLoading(false);
      }, 1500);
    };

    loadInitialData();
  }, []);

  // 검색 시 로딩 시뮬레이션
  const handleSearch = (query: string) => {
    setIsSearching(true);
    setSearchQuery(query);

    // 검색 시간 시뮬레이션 (0.5-1초)
    setTimeout(() => {
      setIsSearching(false);
      setCurrentPage(1); // 검색 시 첫 페이지로 이동
    }, 800);
  };

  // 필터 변경 시 로딩 시뮬레이션
  const handleFilterChange = (value: FilterOption) => {
    setIsSearching(true);
    setFilterBy(value);

    // 필터링 시간 시뮬레이션 (0.3-0.7초)
    setTimeout(() => {
      setIsSearching(false);
      setCurrentPage(1); // 필터 변경 시 첫 페이지로 이동
    }, 500);
  };

  // 정렬 변경 시 로딩 시뮬레이션
  const handleSortChange = (value: SortOption) => {
    setIsSearching(true);
    setSortBy(value);

    // 정렬 시간 시뮬레이션 (0.3-0.5초)
    setTimeout(() => {
      setIsSearching(false);
    }, 400);
  };

  // 분석 기록 삭제 처리
  const handleDeleteHistory = (id: string) => {
    setHistoryData(prev => prev.filter(item => item.id !== id));
    toast.success("분석 기록이 삭제되었습니다.");
  };

  // 필터링 및 정렬된 데이터
  const filteredAndSortedData = useMemo(() => {
    // 1. 검색 및 필터링
    let filtered = [...historyData];

    // 검색어 필터링
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.fileName.toLowerCase().includes(query)
      );
    }

    // 위험도 필터링
    if (filterBy === "high-risk") {
      filtered = filtered.filter(item => item.riskScore >= 70);
    } else if (filterBy === "medium-risk") {
      filtered = filtered.filter(
        item => item.riskScore >= 30 && item.riskScore < 70
      );
    } else if (filterBy === "low-risk") {
      filtered = filtered.filter(item => item.riskScore < 30);
    }

    // 2. 정렬
    return filtered.sort((a, b) => {
      if (sortBy === "date-desc") {
        return (
          new Date(b.analysisDate).getTime() -
          new Date(a.analysisDate).getTime()
        );
      } else if (sortBy === "date-asc") {
        return (
          new Date(a.analysisDate).getTime() -
          new Date(b.analysisDate).getTime()
        );
      } else if (sortBy === "risk-desc") {
        return b.riskScore - a.riskScore;
      } else {
        // risk-asc
        return a.riskScore - b.riskScore;
      }
    });
  }, [sortBy, filterBy, searchQuery, historyData]);

  // 페이지네이션 데이터
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedData, currentPage]);

  // 총 페이지 수 계산
  const totalPages = useMemo(() => {
    return Math.ceil(filteredAndSortedData.length / ITEMS_PER_PAGE);
  }, [filteredAndSortedData]);

  // 필터 및 검색 초기화
  const handleResetFilters = () => {
    setIsSearching(true);
    setSortBy("date-desc");
    setFilterBy("all");
    setSearchQuery("");
    setCurrentPage(1); // 필터 초기화 시 첫 페이지로 이동

    // 초기화 시간 시뮬레이션 (0.3초)
    setTimeout(() => {
      setIsSearching(false);
    }, 300);
  };

  // 페이지 변경 처리
  const handlePageChange = (page: number) => {
    setIsSearching(true);
    setCurrentPage(page);

    // 페이지 변경 시간 시뮬레이션 (0.3초)
    setTimeout(() => {
      setIsSearching(false);
      // 페이지 상단으로 스크롤
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 300);
  };

  // 스켈레톤 로더 렌더링
  const renderSkeletons = () => {
    return Array(ITEMS_PER_PAGE)
      .fill(0)
      .map((_, index) => <HistoryCardSkeleton key={index} />);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      <Navbar />
      <Container className="py-8">
        <Heading level={1} className="text-3xl font-bold mb-6">
          분석 기록
        </Heading>
        <Text className="text-gray-600 mb-8">
          이전에 분석한 등기부등본 목록입니다. 클릭하여 분석 결과를 다시 확인할
          수 있습니다.
        </Text>

        {/* 검색 영역 */}
        <Box className="mb-4">
          <HistorySearch onSearch={handleSearch} initialQuery={searchQuery} />
        </Box>

        {/* 필터링 및 정렬 영역 */}
        <Box className="mb-8 p-4 bg-white rounded-lg shadow-sm">
          <HistoryFilters
            sortBy={sortBy}
            filterBy={filterBy}
            onSortChange={handleSortChange}
            onFilterChange={handleFilterChange}
          />
        </Box>

        {/* 검색 결과 요약 - 로딩 중이 아닐 때만 표시 */}
        {!isLoading && searchQuery && (
          <Box className="mb-4">
            <Text className="text-sm">
              {isSearching ? (
                <span className="flex items-center">
                  <Loader2 size={14} className="animate-spin mr-1" />
                  검색 중...
                </span>
              ) : (
                <>
                  "{searchQuery}" 검색 결과: {filteredAndSortedData.length}개의
                  항목 찾음
                  {filteredAndSortedData.length === 0 && (
                    <button
                      onClick={handleResetFilters}
                      className="ml-2 text-primary hover:underline"
                    >
                      필터 초기화
                    </button>
                  )}
                </>
              )}
            </Text>
          </Box>
        )}

        {/* 분석 기록 목록 영역 */}
        <Box className="bg-white rounded-lg shadow-lg p-6">
          <Flex direction="column" gap={4}>
            {isLoading ? (
              // 초기 로딩 중
              renderSkeletons()
            ) : isSearching ? (
              // 검색, 필터링, 정렬 중
              renderSkeletons()
            ) : paginatedData.length > 0 ? (
              // 데이터 있음
              paginatedData.map(item => (
                <HistoryCard
                  key={item.id}
                  id={item.id}
                  fileName={item.fileName}
                  analysisDate={item.analysisDate}
                  riskScore={item.riskScore}
                  issueCount={item.issueCount}
                  onDelete={handleDeleteHistory}
                />
              ))
            ) : (
              // 데이터 없음
              <Box className="p-8 text-center">
                <Text className="text-gray-500">
                  {searchQuery
                    ? `"${searchQuery}"에 대한 검색 결과가 없습니다.`
                    : filterBy !== "all"
                      ? "해당 필터 조건에 맞는 분석 기록이 없습니다."
                      : "분석 기록이 없습니다."}
                </Text>
                {(searchQuery || filterBy !== "all") && (
                  <button
                    onClick={handleResetFilters}
                    className="mt-2 text-primary hover:underline"
                  >
                    필터 초기화
                  </button>
                )}
              </Box>
            )}
          </Flex>
        </Box>

        {/* 페이지네이션 영역 - 로딩 중이 아닐 때만 표시 */}
        {!isLoading && (
          <Flex justify="center" className="mt-8">
            {isSearching ? (
              <div className="flex items-center text-sm text-gray-500">
                <Loader2 size={16} className="animate-spin mr-2" />
                로딩 중...
              </div>
            ) : filteredAndSortedData.length > 0 ? (
              <HistoryPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            ) : (
              <Text className="text-sm text-gray-500">
                검색 결과가 없습니다
              </Text>
            )}
          </Flex>
        )}

        {/* 페이지 정보 표시 - 로딩 중이 아니고 데이터가 있을 때만 표시 */}
        {!isLoading && !isSearching && filteredAndSortedData.length > 0 && (
          <Text className="text-xs text-gray-500 text-center mt-2">
            총 {filteredAndSortedData.length}개 항목 중{" "}
            {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
            {Math.min(
              currentPage * ITEMS_PER_PAGE,
              filteredAndSortedData.length
            )}
            개 표시
          </Text>
        )}
      </Container>
    </div>
  );
};

export default HistoryPage;
