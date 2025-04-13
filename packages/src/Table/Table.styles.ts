import styled, { css } from "styled-components";
import { TableProps } from "./Table";
import { defaultTheme } from "../theme/theme";

export const TableContainer = styled.div`
  position: relative;
  width: 100%;
  overflow-x: auto;
`;

TableContainer.defaultProps = {
  theme: defaultTheme,
};

export const StyledTable = styled.table<{
  $variant?: TableProps<any>["variant"];
  $size?: TableProps<any>["size"];
  $fullWidth?: boolean;
  $autoHeight?: boolean;
  $stickyHeader?: boolean;
  $loading?: boolean;
}>`
  border-collapse: separate;
  border-spacing: 0;
  width: ${(props) => (props.$fullWidth ? "100%" : "auto")};
  color: var(--color-text-primary);

  /* 크기 변형 */
  ${(props) => {
    switch (props.$size) {
      case "sm":
        return css`
          font-size: var(--font-size-xs);

          th,
          td {
            padding: var(--spacing-1) var(--spacing-2);
          }
        `;
      case "lg":
        return css`
          font-size: var(--font-size-md);

          th,
          td {
            padding: var(--spacing-3) var(--spacing-4);
          }
        `;
      default: // md
        return css`
          font-size: var(--font-size-sm);

          th,
          td {
            padding: var(--spacing-2) var(--spacing-3);
          }
        `;
    }
  }}

  /* 스타일 변형 */
  ${(props) => {
    switch (props.$variant) {
      case "striped":
        return css`
          tbody tr:nth-child(odd) {
            background-color: var(--color-neutral-50);

            [data-theme="dark"] & {
              background-color: var(--color-neutral-100);
            }
          }
        `;
      case "bordered":
        return css`
          border: 1px solid var(--color-border-default);
          border-radius: var(--radius-md);

          th,
          td {
            border: 1px solid var(--color-border-default);
          }

          th:first-child {
            border-top-left-radius: var(--radius-md);
          }

          th:last-child {
            border-top-right-radius: var(--radius-md);
          }

          tr:last-child td:first-child {
            border-bottom-left-radius: var(--radius-md);
          }

          tr:last-child td:last-child {
            border-bottom-right-radius: var(--radius-md);
          }
        `;
      default:
        return css`
          thead tr {
            border-bottom: 2px solid var(--color-border-default);
          }

          tbody tr {
            border-bottom: 1px solid var(--color-border-default);
          }
        `;
    }
  }}
  
  /* 행 높이 자동 조정 */
  ${(props) =>
    props.$autoHeight &&
    css`
      td,
      th {
        height: auto;
        white-space: normal;
      }
    `}
  
  /* 로딩 상태 */
  ${(props) =>
    props.$loading &&
    css`
      opacity: 0.7;
      pointer-events: none;
    `}
  
  /* 다크모드 스타일 */
  [data-theme="dark"] & {
    color: var(--color-text-primary);

    tbody tr:hover {
      background-color: var(--color-neutral-200);
    }
  }
`;

StyledTable.defaultProps = {
  theme: defaultTheme,
};

export const TableHeader = styled.thead<{
  $stickyHeader?: boolean;
  $stickyOffset?: number;
}>`
  background-color: var(--color-background-secondary);

  ${(props) =>
    props.$stickyHeader &&
    css`
      position: sticky;
      top: ${props.$stickyOffset || 0}px;
      z-index: 1;
      background-color: var(--color-background-secondary);
      box-shadow: 0 1px 0 0 var(--color-border-default);
    `}

  /* 다크모드 스타일 */
  [data-theme="dark"] & {
    background-color: var(--color-neutral-100);
  }
`;

TableHeader.defaultProps = {
  theme: defaultTheme,
};

export const TableBody = styled.tbody`
  background-color: var(--color-background-primary);

  /* 다크모드 스타일 */
  [data-theme="dark"] & {
    background-color: var(--color-background-primary);
  }
`;

TableBody.defaultProps = {
  theme: defaultTheme,
};

export const TableRow = styled.tr<{
  $selected?: boolean;
  $disabled?: boolean;
  $clickable?: boolean;
}>`
  transition: background-color 0.2s;

  ${(props) =>
    props.$clickable &&
    css`
      cursor: pointer;
    `}

  /* 호버 효과 */
  &:hover {
    background-color: var(--color-neutral-100);
  }

  /* 선택된 행 스타일 */
  ${(props) =>
    props.$selected &&
    css`
      background-color: var(--color-primary-50) !important;

      [data-theme="dark"] & {
        background-color: var(--color-primary-900) !important;
      }
    `}

  /* 비활성화 행 스타일 */
  ${(props) =>
    props.$disabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `}
  
  /* 다크모드 스타일 */
  [data-theme="dark"] &:hover {
    background-color: var(--color-neutral-200);
  }
`;

TableRow.defaultProps = {
  theme: defaultTheme,
};

export const TableHeaderCell = styled.th<{
  $sortable?: boolean;
  $sorted?: "asc" | "desc" | null;
  $width?: string | number;
  $minWidth?: string | number;
  $maxWidth?: string | number;
  $align?: "left" | "center" | "right";
}>`
  text-align: ${(props) => props.$align || "left"};
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  white-space: nowrap;
  transition: background-color 0.2s;
  width: ${(props) => props.$width || "auto"};
  min-width: ${(props) => props.$minWidth || "auto"};
  max-width: ${(props) => props.$maxWidth || "none"};

  /* 정렬 가능 스타일 */
  ${(props) =>
    props.$sortable &&
    css`
      cursor: pointer;
      user-select: none;

      &:hover {
        background-color: var(--color-neutral-100);
      }

      /* 다크모드 호버 */
      [data-theme="dark"] &:hover {
        background-color: var(--color-neutral-300);
      }
    `}

  /* 정렬 상태 스타일 */
  ${(props) =>
    props.$sorted &&
    css`
      background-color: var(--color-neutral-100);

      [data-theme="dark"] & {
        background-color: var(--color-neutral-200);
      }
    `}
`;

TableHeaderCell.defaultProps = {
  theme: defaultTheme,
};

export const TableCell = styled.td<{
  $align?: "left" | "center" | "right";
  $truncate?: boolean;
  $width?: string | number;
}>`
  text-align: ${(props) => props.$align || "left"};
  transition: background-color 0.2s;
  width: ${(props) => props.$width || "auto"};

  /* 텍스트 줄임 처리 */
  ${(props) =>
    props.$truncate &&
    css`
      max-width: 200px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `}
`;

TableCell.defaultProps = {
  theme: defaultTheme,
};

export const CheckboxCell = styled.td`
  width: 40px;
  text-align: center;
  padding: 0 var(--spacing-1);

  input {
    cursor: pointer;
  }
`;

CheckboxCell.defaultProps = {
  theme: defaultTheme,
};

export const EmptyState = styled.td`
  text-align: center;
  padding: var(--spacing-6) !important;
  color: var(--color-text-secondary);

  [data-theme="dark"] & {
    color: var(--color-neutral-400);
  }
`;

EmptyState.defaultProps = {
  theme: defaultTheme,
};

export const SortIcon = styled.span<{
  $direction?: "asc" | "desc" | null;
}>`
  margin-left: var(--spacing-1);
  display: inline-block;

  &::after {
    content: ${(props) => {
      if (!props.$direction) return '"↕"';
      return props.$direction === "asc" ? '"↑"' : '"↓"';
    }};
    opacity: ${(props) => (props.$direction ? 1 : 0.5)};
  }
`;

SortIcon.defaultProps = {
  theme: defaultTheme,
};

export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;

  [data-theme="dark"] & {
    background: rgba(0, 0, 0, 0.5);
  }
`;

LoadingOverlay.defaultProps = {
  theme: defaultTheme,
};

export const Spinner = styled.div`
  border: 3px solid var(--color-neutral-200);
  border-top: 3px solid var(--color-primary-500);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  [data-theme="dark"] & {
    border-color: var(--color-neutral-700);
    border-top-color: var(--color-primary-400);
  }
`;

Spinner.defaultProps = {
  theme: defaultTheme,
};

export const PaginationContainer = styled.div`
  margin-top: var(--spacing-3);
  display: flex;
  justify-content: flex-end;
`;

PaginationContainer.defaultProps = {
  theme: defaultTheme,
};
