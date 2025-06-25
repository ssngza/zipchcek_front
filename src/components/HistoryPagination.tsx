import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";

interface HistoryPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const HistoryPagination: React.FC<HistoryPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // 페이지 번호 배열 생성 (모바일은 최대 3개, 데스크탑은 최대 5개)
  const getPageNumbers = () => {
    const pages = [];
    const isMobile = window.innerWidth < 640;
    const maxVisiblePages = isMobile ? 3 : 5;

    // 시작 페이지와 끝 페이지 계산
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // 페이지 수가 maxVisiblePages 미만일 경우 조정
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null; // 페이지가 1개 이하면 페이지네이션을 표시하지 않음
  }

  const pageNumbers = getPageNumbers();

  return (
    <Pagination>
      <PaginationContent className="flex flex-wrap justify-center gap-1">
        {/* 이전 페이지 버튼 */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            className={`${currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}`}
            aria-disabled={currentPage <= 1}
          />
        </PaginationItem>

        {/* 첫 페이지 표시 (현재 표시되는 페이지 범위에 1이 없는 경우) */}
        {pageNumbers[0] > 1 && (
          <>
            <PaginationItem className="hidden sm:inline-block">
              <PaginationLink
                onClick={() => onPageChange(1)}
                isActive={currentPage === 1}
              >
                1
              </PaginationLink>
            </PaginationItem>
            {pageNumbers[0] > 2 && (
              <PaginationItem className="hidden sm:inline-block">
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        {/* 페이지 번호 */}
        {pageNumbers.map(page => (
          <PaginationItem key={page}>
            <PaginationLink
              onClick={() => onPageChange(page)}
              isActive={currentPage === page}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* 마지막 페이지 표시 (현재 표시되는 페이지 범위에 totalPages가 없는 경우) */}
        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <PaginationItem className="hidden sm:inline-block">
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem className="hidden sm:inline-block">
              <PaginationLink
                onClick={() => onPageChange(totalPages)}
                isActive={currentPage === totalPages}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {/* 다음 페이지 버튼 */}
        <PaginationItem>
          <PaginationNext
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
            className={`${currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}`}
            aria-disabled={currentPage >= totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default HistoryPagination;
