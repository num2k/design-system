import React, { useState } from "react";
import {
  TableContainer,
  StyledTable,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
  CheckboxCell,
  EmptyState,
  SortIcon,
  LoadingOverlay,
  Spinner,
  PaginationContainer,
} from "./Table.styles";

// 테이블 열 정의 인터페이스
export interface TableColumn<T> {
  id: string;
  header: React.ReactNode;
  accessor: keyof T | ((data: T) => React.ReactNode);
  sortable?: boolean;
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  cell?: (value: any, row: T, index: number) => React.ReactNode;
}

// 테이블 속성 인터페이스
export interface TableProps<T> {
  /** 테이블에 표시할 데이터 배열 */
  data: T[];
  /** 테이블 열 정의 배열 */
  columns: TableColumn<T>[];
  /** 테이블 캡션 (접근성) */
  caption?: string;
  /** 행 선택 모드 */
  selectionMode?: "none" | "single" | "multiple";
  /** 선택된 행 */
  selectedRows?: string[] | number[];
  /** 행 선택 변경 핸들러 */
  onSelectionChange?: (selectedRows: (string | number)[]) => void;
  /** 테이블 스타일 변형 */
  variant?: "default" | "striped" | "bordered";
  /** 테이블 크기 */
  size?: "sm" | "md" | "lg";
  /** 테이블 너비를 100%로 확장 */
  fullWidth?: boolean;
  /** 행 높이를 내용에 맞게 자동으로 조정 */
  autoHeight?: boolean;
  /** 고정 헤더 사용 여부 */
  stickyHeader?: boolean;
  /** 고정 헤더 오프셋 (상단에서의 거리) */
  stickyOffset?: number;
  /** 로딩 상태 표시 */
  loading?: boolean;
  /** 행 클릭 이벤트 핸들러 */
  onRowClick?: (row: T, index: number) => void;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 빈 데이터 상태 표시 */
  emptyState?: React.ReactNode;
  /** 페이지네이션 */
  pagination?: React.ReactNode;
}

// 테이블 헤더 인터페이스
export interface TableHeaderProps {
  children: React.ReactNode;
  className?: string;
}

// 테이블 바디 인터페이스
export interface TableBodyProps {
  children: React.ReactNode;
  className?: string;
}

// 테이블 행 인터페이스
export interface TableRowProps {
  children: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLTableRowElement>) => void;
  className?: string;
}

// 테이블 셀 인터페이스
export interface TableCellProps {
  children: React.ReactNode;
  header?: boolean;
  align?: "left" | "center" | "right";
  truncate?: boolean;
  colSpan?: number;
  rowSpan?: number;
  width?: string | number;
  className?: string;
}

export function Table<T extends { id?: string | number }>({
  data,
  columns,
  caption,
  selectionMode = "none",
  selectedRows = [],
  onSelectionChange,
  variant = "default",
  size = "md",
  fullWidth = false,
  autoHeight = false,
  stickyHeader = false,
  stickyOffset = 0,
  loading = false,
  onRowClick,
  className = "",
  emptyState = "데이터가 없습니다.",
  pagination,
}: TableProps<T>) {
  // 정렬 상태 관리
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  // 선택 상태 관리
  const [internalSelectedRows, setInternalSelectedRows] = useState<
    (string | number)[]
  >([]);

  // 실제 사용할 선택 행 (외부 제어 또는 내부 상태)
  const effectiveSelectedRows =
    selectedRows.length > 0 ? selectedRows : internalSelectedRows;

  // 정렬 처리 함수
  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const column = columns.find((col) => col.id === sortConfig.key);
      if (!column) return 0;

      let aValue, bValue;

      if (typeof column.accessor === "function") {
        aValue = column.accessor(a);
        bValue = column.accessor(b);
      } else {
        aValue = a[column.accessor];
        bValue = b[column.accessor];
      }

      if (aValue === bValue) return 0;
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      if (sortConfig.direction === "asc") {
        return aValue < bValue ? -1 : 1;
      } else {
        return aValue > bValue ? -1 : 1;
      }
    });
  }, [data, columns, sortConfig]);

  // 정렬 토글 함수
  const handleSort = (columnId: string) => {
    const column = columns.find((col) => col.id === columnId);
    if (!column || !column.sortable) return;

    setSortConfig((prevSortConfig) => {
      if (!prevSortConfig || prevSortConfig.key !== columnId) {
        return { key: columnId, direction: "asc" };
      }
      if (prevSortConfig.direction === "asc") {
        return { key: columnId, direction: "desc" };
      }
      return null;
    });
  };

  // 행 선택 핸들러
  const handleRowSelection = (
    rowId: string | number | undefined,
    isSelected: boolean
  ) => {
    if (!rowId) return;

    let newSelectedRows: (string | number)[];

    if (selectionMode === "single") {
      newSelectedRows = isSelected ? [rowId] : [];
    } else {
      // 다중 선택 모드
      if (isSelected) {
        newSelectedRows = [...effectiveSelectedRows, rowId];
      } else {
        newSelectedRows = effectiveSelectedRows.filter((id) => id !== rowId);
      }
    }

    // 내부 상태 업데이트
    setInternalSelectedRows(newSelectedRows);

    // 외부 핸들러 호출
    onSelectionChange?.(newSelectedRows);
  };

  // 모든 행 선택/해제 토글
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = sortedData.map((row) => row.id).filter(Boolean) as (
        | string
        | number
      )[];
      setInternalSelectedRows(allIds);
      onSelectionChange?.(allIds);
    } else {
      setInternalSelectedRows([]);
      onSelectionChange?.([]);
    }
  };

  return (
    <TableContainer className={className}>
      <StyledTable
        $variant={variant}
        $size={size}
        $fullWidth={fullWidth}
        $autoHeight={autoHeight}
        $stickyHeader={stickyHeader}
        $loading={loading}
      >
        {caption && <caption>{caption}</caption>}

        <TableHeader $stickyHeader={stickyHeader} $stickyOffset={stickyOffset}>
          <tr>
            {/* 선택 체크박스 열 */}
            {selectionMode === "multiple" && (
              <TableHeaderCell as="th">
                <input
                  type="checkbox"
                  checked={
                    effectiveSelectedRows.length > 0 &&
                    effectiveSelectedRows.length ===
                      sortedData.filter((row) => row.id).length
                  }
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </TableHeaderCell>
            )}

            {/* 열 헤더 */}
            {columns.map((column) => (
              <TableHeaderCell
                key={column.id}
                $sortable={column.sortable}
                $sorted={
                  sortConfig?.key === column.id ? sortConfig.direction : null
                }
                $width={column.width}
                $minWidth={column.minWidth}
                $maxWidth={column.maxWidth}
                onClick={() => column.sortable && handleSort(column.id)}
              >
                {column.header}
                {column.sortable && (
                  <SortIcon
                    $direction={
                      sortConfig?.key === column.id
                        ? sortConfig.direction
                        : null
                    }
                  />
                )}
              </TableHeaderCell>
            ))}
          </tr>
        </TableHeader>

        <TableBody>
          {sortedData.length === 0 ? (
            <tr>
              <EmptyState
                colSpan={
                  columns.length + (selectionMode === "multiple" ? 1 : 0)
                }
              >
                {emptyState}
              </EmptyState>
            </tr>
          ) : (
            sortedData.map((row, rowIndex) => {
              const rowId = row.id;
              const isSelected = rowId
                ? effectiveSelectedRows.includes(rowId)
                : false;
              const isClickable = !!onRowClick;

              return (
                <TableRow
                  key={rowId || rowIndex}
                  $selected={isSelected}
                  $clickable={isClickable}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onRowClick) onRowClick(row, rowIndex);
                  }}
                >
                  {/* 선택 체크박스 */}
                  {selectionMode === "multiple" && rowId && (
                    <CheckboxCell>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleRowSelection(rowId, e.target.checked);
                        }}
                      />
                    </CheckboxCell>
                  )}

                  {/* 데이터 셀 */}
                  {columns.map((column) => {
                    let cellValue;

                    if (typeof column.accessor === "function") {
                      cellValue = column.accessor(row);
                    } else {
                      cellValue = row[column.accessor];
                    }

                    // 커스텀 셀 렌더러 사용
                    if (column.cell) {
                      cellValue = column.cell(cellValue, row, rowIndex);
                    }

                    return (
                      <TableCell key={column.id} $width={column.width}>
                        {cellValue === null || cellValue === undefined
                          ? ""
                          : React.isValidElement(cellValue)
                          ? cellValue
                          : typeof cellValue === "object"
                          ? JSON.stringify(cellValue)
                          : String(cellValue)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </StyledTable>

      {/* 로딩 오버레이 */}
      {loading && (
        <LoadingOverlay>
          <Spinner />
        </LoadingOverlay>
      )}

      {/* 페이지네이션 */}
      {pagination && <PaginationContainer>{pagination}</PaginationContainer>}
    </TableContainer>
  );
}

// 개별 컴포넌트로 사용할 수 있는 하위 컴포넌트들
export const TableHeaderComponent: React.FC<TableHeaderProps> = ({
  children,
  className = "",
}) => <TableHeader className={className}>{children}</TableHeader>;

export const TableBodyComponent: React.FC<TableBodyProps> = ({
  children,
  className = "",
}) => <TableBody className={className}>{children}</TableBody>;

export const TableRowComponent: React.FC<TableRowProps> = ({
  children,
  selected = false,
  disabled = false,
  onClick,
  className = "",
}) => (
  <TableRow
    $selected={selected}
    $disabled={disabled}
    onClick={onClick}
    className={className}
  >
    {children}
  </TableRow>
);

export const TableCellComponent: React.FC<TableCellProps> = ({
  children,
  header = false,
  align = "left",
  truncate = false,
  colSpan,
  rowSpan,
  width,
  className = "",
}) => {
  const Component = (header ? TableHeaderCell : TableCell) as React.ElementType;

  return (
    <Component
      as={header ? "th" : "td"}
      $align={align}
      $truncate={truncate}
      $width={width}
      colSpan={colSpan}
      rowSpan={rowSpan}
      className={className}
    >
      {children}
    </Component>
  );
};
