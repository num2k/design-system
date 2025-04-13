import React, { useMemo } from "react";
import {
  PaginationContainer,
  PaginationList,
  PaginationItem,
  PaginationButton,
  PaginationEllipsis,
  PaginationIcon,
} from "./Pagination.styles";

export interface PaginationProps {
  /** 전체 아이템 수 */
  totalItems: number;
  /** 페이지당 아이템 수 */
  itemsPerPage: number;
  /** 현재 페이지 */
  currentPage: number;
  /** 페이지 변경 시 호출되는 콜백 함수 */
  onPageChange: (newPage: number) => void;
  /** 페이지 그룹 크기 (한 번에 보여지는 페이지 숫자 수) */
  pageGroupSize?: number;
  /** 처음/끝 페이지 버튼 표시 여부 */
  showFirstLastButtons?: boolean;
  /** 버튼 크기 */
  size?: "sm" | "md" | "lg";
  /** 버튼 모양 */
  shape?: "square" | "rounded" | "pill";
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
}

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      totalItems,
      itemsPerPage,
      currentPage,
      onPageChange,
      pageGroupSize = 5,
      showFirstLastButtons = true,
      size = "md",
      shape = "rounded",
      disabled = false,
      className = "",
    },
    ref
  ) => {
    // 전체 페이지 수 계산
    const totalPages = useMemo(
      () => Math.ceil(totalItems / itemsPerPage),
      [totalItems, itemsPerPage]
    );

    // 현재 페이지 그룹의 시작과 끝 페이지 계산
    const { startPage, endPage } = useMemo(() => {
      // 현재 페이지가 속한 그룹 찾기
      const currentGroup = Math.ceil(currentPage / pageGroupSize);

      const start = (currentGroup - 1) * pageGroupSize + 1;
      const end = Math.min(currentGroup * pageGroupSize, totalPages);

      return { startPage: start, endPage: end };
    }, [currentPage, pageGroupSize, totalPages]);

    // 페이지 번호 배열 생성
    const pageNumbers = useMemo(() => {
      const numbers: number[] = [];
      for (let i = startPage; i <= endPage; i++) {
        numbers.push(i);
      }
      return numbers;
    }, [startPage, endPage]);

    const handlePageClick = (page: number) => {
      if (
        page !== currentPage &&
        page >= 1 &&
        page <= totalPages &&
        !disabled
      ) {
        onPageChange(page);
      }
    };

    return (
      <PaginationContainer
        ref={ref}
        $size={size}
        $shape={shape}
        $disabled={disabled}
        className={className}
        aria-label="페이지 내비게이션"
      >
        <PaginationList>
          {/* 첫 페이지 버튼 */}
          {showFirstLastButtons && (
            <PaginationItem>
              <PaginationButton
                type="button"
                $isControl
                $size={size}
                $shape={shape}
                onClick={() => handlePageClick(1)}
                disabled={currentPage === 1 || disabled}
                aria-label="첫 페이지"
              >
                <PaginationIcon>{"<<"}</PaginationIcon>
              </PaginationButton>
            </PaginationItem>
          )}

          {/* 이전 페이지 버튼 */}
          <PaginationItem>
            <PaginationButton
              type="button"
              $isControl
              $size={size}
              $shape={shape}
              onClick={() => handlePageClick(currentPage - 1)}
              disabled={currentPage === 1 || disabled}
              aria-label="이전 페이지"
            >
              <PaginationIcon>{"<"}</PaginationIcon>
            </PaginationButton>
          </PaginationItem>

          {/* 처음에 줄임표가 필요한 경우 */}
          {startPage > 1 && (
            <>
              <PaginationItem>
                <PaginationButton
                  type="button"
                  $size={size}
                  $shape={shape}
                  onClick={() => handlePageClick(1)}
                  disabled={disabled}
                >
                  1
                </PaginationButton>
              </PaginationItem>
              {startPage > 2 && (
                <PaginationItem>
                  <PaginationEllipsis aria-hidden="true">
                    ...
                  </PaginationEllipsis>
                </PaginationItem>
              )}
            </>
          )}

          {/* 페이지 번호 */}
          {pageNumbers.map((number) => (
            <PaginationItem key={number}>
              <PaginationButton
                type="button"
                $isActive={number === currentPage}
                $size={size}
                $shape={shape}
                onClick={() => handlePageClick(number)}
                disabled={disabled}
                aria-current={number === currentPage ? "page" : undefined}
              >
                {number}
              </PaginationButton>
            </PaginationItem>
          ))}

          {/* 끝에 줄임표가 필요한 경우 */}
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <PaginationItem>
                  <PaginationEllipsis aria-hidden="true">
                    ...
                  </PaginationEllipsis>
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationButton
                  type="button"
                  $size={size}
                  $shape={shape}
                  onClick={() => handlePageClick(totalPages)}
                  disabled={disabled}
                >
                  {totalPages}
                </PaginationButton>
              </PaginationItem>
            </>
          )}

          {/* 다음 페이지 버튼 */}
          <PaginationItem>
            <PaginationButton
              type="button"
              $isControl
              $size={size}
              $shape={shape}
              onClick={() => handlePageClick(currentPage + 1)}
              disabled={currentPage === totalPages || disabled}
              aria-label="다음 페이지"
            >
              <PaginationIcon>{">"}</PaginationIcon>
            </PaginationButton>
          </PaginationItem>

          {/* 마지막 페이지 버튼 */}
          {showFirstLastButtons && (
            <PaginationItem>
              <PaginationButton
                type="button"
                $isControl
                $size={size}
                $shape={shape}
                onClick={() => handlePageClick(totalPages)}
                disabled={currentPage === totalPages || disabled}
                aria-label="마지막 페이지"
              >
                <PaginationIcon>{">>"}</PaginationIcon>
              </PaginationButton>
            </PaginationItem>
          )}
        </PaginationList>
      </PaginationContainer>
    );
  }
);

Pagination.displayName = "Pagination";
