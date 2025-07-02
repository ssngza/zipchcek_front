import EmptyState from "@/components/EmptyState";
import HistoryCard from "@/components/HistoryCard";
import HistoryCardSkeleton from "@/components/HistoryCardSkeleton";
import HistoryFilters, {
  FilterOption,
  SortOption,
} from "@/components/HistoryFilters";
import HistoryPagination from "@/components/HistoryPagination";
import HistorySearch from "@/components/HistorySearch";
import { Box, Container, Flex, Heading, Text } from "@/components/ui/base";
import {
  AlertTriangle,
  FileX,
  Loader2,
  RefreshCw,
  Search,
  Upload,
} from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// 분석 결과 인터페이스 정의
interface AnalysisResult {
  basic_info: {
    real_estate: string;
    identifier_number: string;
    examination_datetime: string;
    registry_office: string;
  };
  risk_analysis: {
    positive_factors: string[];
    caution_factors: string[];
    risk_factors: string[];
  };
  // 기타 필요한 필드들...
}

// 분석 이력 항목 인터페이스 정의
interface HistoryItem {
  id: string; // localStorage 키
  fileName: string;
  analysisDate: string;
  riskScore: number;
  issueCount: number;
  data?: AnalysisResult; // 실제 분석 데이터 (필요시 로드)
}

// 모바일 환경에서는 페이지당 항목 수를 줄임
const getItemsPerPage = () => {
  return window.innerWidth < 640 ? 3 : 4;
};

const HistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("date-desc");
  const [filterBy, setFilterBy] = useState<FilterOption>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

  // 화면 크기 변경 감지하여 페이지당 항목 수 조정
  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // localStorage에서 분석 이력 로드
  useEffect(() => {
    const loadHistoryFromLocalStorage = () => {
      setIsLoading(true);

      try {
        // 이력 인덱스 가져오기
        const historyIndexJson = localStorage.getItem("zipcheck_history_index");
        const historyIndex = historyIndexJson
          ? JSON.parse(historyIndexJson)
          : [];

        // 각 항목의 상세 데이터 로드
        const historyItems: HistoryItem[] = [];

        for (const key of historyIndex) {
          try {
            const analysisDataJson = localStorage.getItem(key);
            if (analysisDataJson) {
              const analysisData = JSON.parse(analysisDataJson);

              // 파일명 추출 (키 형식: zipcheck_analysis_파일명)
              const fileName =
                key.replace("zipcheck_analysis_", "").replace(/_/g, " ") +
                ".pdf";

              // 분석 날짜 (현재는 데이터에 없으므로 현재 날짜 사용)
              const analysisDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

              // 위험 점수 계산 (위험 요소 개수에 따라)
              const riskFactorsCount =
                analysisData.risk_analysis?.risk_factors?.length || 0;
              const cautionFactorsCount =
                analysisData.risk_analysis?.caution_factors?.length || 0;

              // 위험 점수 계산 (위험 요소 * 20 + 주의 요소 * 10, 최대 100점)
              const riskScore = Math.min(
                100,
                riskFactorsCount * 20 + cautionFactorsCount * 10
              );

              // 이슈 개수 (위험 요소 + 주의 요소)
              const issueCount = riskFactorsCount + cautionFactorsCount;

              historyItems.push({
                id: key,
                fileName,
                analysisDate,
                riskScore,
                issueCount,
                data: analysisData,
              });
            }
          } catch (error) {
            console.error(`분석 데이터 로드 오류 (${key}):`, error);
          }
        }

        setHistoryData(historyItems);
      } catch (error) {
        console.error("이력 데이터 로드 오류:", error);
        toast.error("분석 이력을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    loadHistoryFromLocalStorage();
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
    try {
      // 로컬 스토리지에서 해당 항목 삭제
      localStorage.removeItem(id);

      // 인덱스에서도 해당 항목 삭제
      const historyIndexJson = localStorage.getItem("zipcheck_history_index");
      if (historyIndexJson) {
        const historyIndex = JSON.parse(historyIndexJson);
        const updatedIndex = historyIndex.filter((key: string) => key !== id);
        localStorage.setItem(
          "zipcheck_history_index",
          JSON.stringify(updatedIndex)
        );
      }

      // 상태 업데이트
      setHistoryData(prev => prev.filter(item => item.id !== id));
      toast.success("분석 기록이 삭제되었습니다.");
    } catch (error) {
      console.error("분석 기록 삭제 오류:", error);
      toast.error("분석 기록 삭제 중 오류가 발생했습니다.");
    }
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
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedData, currentPage, itemsPerPage]);

  // 총 페이지 수 계산
  const totalPages = useMemo(() => {
    return Math.ceil(filteredAndSortedData.length / itemsPerPage);
  }, [filteredAndSortedData, itemsPerPage]);

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

  // 새로운 분석 시작 처리
  const handleStartNewAnalysis = () => {
    navigate("/upload");
  };

  // 스켈레톤 로더 렌더링
  const renderSkeletons = () => {
    return Array(itemsPerPage)
      .fill(0)
      .map((_, index) => <HistoryCardSkeleton key={index} />);
  };

  // 빈 상태 렌더링 - 상황에 맞는 EmptyState 컴포넌트 반환
  const renderEmptyState = () => {
    // 1. 초기 데이터가 없는 경우 (첫 사용자)
    if (historyData.length === 0) {
      return (
        <EmptyState
          icon={FileX}
          title="분석 기록이 없습니다"
          description="등기부등본을 분석하여 첫 번째 기록을 만들어보세요."
          actionLabel="새 분석 시작하기"
          onAction={handleStartNewAnalysis}
        />
      );
    }

    // 2. 검색 결과가 없는 경우
    if (searchQuery) {
      return (
        <EmptyState
          icon={Search}
          title={`"${searchQuery}"에 대한 검색 결과가 없습니다`}
          description="다른 검색어를 시도하거나 필터를 초기화해보세요."
          actionLabel="필터 초기화"
          onAction={handleResetFilters}
        />
      );
    }

    // 3. 필터 결과가 없는 경우
    if (filterBy !== "all") {
      let filterDescription = "";
      let filterIcon = AlertTriangle;

      if (filterBy === "high-risk") {
        filterDescription = "고위험 등급의 분석 기록이 없습니다.";
      } else if (filterBy === "medium-risk") {
        filterDescription = "중위험 등급의 분석 기록이 없습니다.";
      } else if (filterBy === "low-risk") {
        filterDescription = "저위험 등급의 분석 기록이 없습니다.";
      }

      return (
        <EmptyState
          icon={filterIcon}
          title="필터 조건에 맞는 결과가 없습니다"
          description={filterDescription}
          actionLabel="필터 초기화"
          onAction={handleResetFilters}
        />
      );
    }

    // 4. 기본 빈 상태 (발생하지 않아야 함)
    return (
      <EmptyState
        icon={RefreshCw}
        title="표시할 데이터가 없습니다"
        description="새로고침하거나 다시 시도해주세요."
        actionLabel="새로고침"
        onAction={() => window.location.reload()}
      />
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Container className="py-4 sm:py-8 px-4 sm:px-6">
        <Heading
          level={1}
          className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6"
        >
          분석 기록
        </Heading>
        <Text className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
          이전에 분석한 등기부등본 목록입니다. 클릭하여 분석 결과를 다시 확인할
          수 있습니다.
        </Text>

        {/* 검색 영역 - 데이터가 있을 때만 표시 */}
        {!isLoading && historyData.length > 0 && (
          <Box className="mb-4">
            <HistorySearch onSearch={handleSearch} initialQuery={searchQuery} />
          </Box>
        )}

        {/* 필터링 및 정렬 영역 - 데이터가 있을 때만 표시 */}
        {!isLoading && historyData.length > 0 && (
          <Box className="mb-6 sm:mb-8 p-3 sm:p-4 bg-white rounded-lg shadow-sm">
            <HistoryFilters
              sortBy={sortBy}
              filterBy={filterBy}
              onSortChange={handleSortChange}
              onFilterChange={handleFilterChange}
            />
          </Box>
        )}

        {/* 검색 결과 요약 - 로딩 중이 아니고 검색어가 있을 때만 표시 */}
        {!isLoading && searchQuery && historyData.length > 0 && (
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
        <Box className="bg-white rounded-lg shadow-lg p-3 sm:p-6">
          <Flex direction="column" gap={3} className="sm:gap-4">
            {isLoading
              ? // 초기 로딩 중
                renderSkeletons()
              : isSearching
                ? // 검색, 필터링, 정렬 중
                  renderSkeletons()
                : paginatedData.length > 0
                  ? // 데이터 있음
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
                  : // 데이터 없음 - 상황별 빈 상태 UI
                    renderEmptyState()}
          </Flex>
        </Box>

        {/* 페이지네이션 영역 - 로딩 중이 아니고 데이터가 있을 때만 표시 */}
        {!isLoading && historyData.length > 0 && (
          <Flex justify="center" className="mt-6 sm:mt-8">
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
            ) : null}
          </Flex>
        )}

        {/* 페이지 정보 표시 - 로딩 중이 아니고 데이터가 있을 때만 표시 */}
        {!isLoading && !isSearching && filteredAndSortedData.length > 0 && (
          <Text className="text-xs text-gray-500 text-center mt-2">
            총 {filteredAndSortedData.length}개 항목 중{" "}
            {(currentPage - 1) * itemsPerPage + 1}-
            {Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)}
            개 표시
          </Text>
        )}

        {/* 빈 상태일 때 하단 버튼 - 데이터가 없고 로딩 중이 아닐 때만 표시 */}
        {!isLoading && historyData.length === 0 && (
          <Flex justify="center" className="mt-6 sm:mt-8">
            <button
              onClick={handleStartNewAnalysis}
              className="flex items-center gap-2 text-primary hover:underline text-sm sm:text-base"
            >
              <Upload size={16} />새 분석 시작하기
            </button>
          </Flex>
        )}
      </Container>
    </div>
  );
};

export default HistoryPage;
