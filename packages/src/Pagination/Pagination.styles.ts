import styled, { css } from "styled-components";
import { PaginationProps } from "./Pagination";
import { defaultTheme } from "../theme/theme";

type PaginationContainerProps = {
  $size?: PaginationProps["size"];
  $shape?: PaginationProps["shape"];
  $disabled?: boolean;
};

type PaginationButtonProps = {
  $isActive?: boolean;
  $isControl?: boolean;
  $size?: PaginationProps["size"];
  $shape?: PaginationProps["shape"];
};

export const PaginationContainer = styled.nav<PaginationContainerProps>`
  display: flex;
  width: fit-content;
  opacity: ${(props) => (props.$disabled ? 0.5 : 1)};
  pointer-events: ${(props) => (props.$disabled ? "none" : "auto")};
`;

export const PaginationList = styled.ul`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
  gap: var(--spacing-1);
`;

export const PaginationItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PaginationButton = styled.button<PaginationButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-neutral-200);
  background-color: var(--color-background-primary, white);
  color: var(--color-text-primary, var(--color-neutral-800));
  user-select: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  /* 크기에 따른 스타일 */
  ${(props) => {
    switch (props.$size) {
      case "sm":
        return css`
          min-width: 24px;
          height: 24px;
          font-size: var(--font-size-xs);
        `;
      case "lg":
        return css`
          min-width: 40px;
          height: 40px;
          font-size: var(--font-size-md);
        `;
      default:
        return css`
          min-width: 32px;
          height: 32px;
          font-size: var(--font-size-sm);
        `;
    }
  }}

  /* 모양에 따른 스타일 */
  ${(props) => {
    switch (props.$shape) {
      case "square":
        return css`
          border-radius: 0;
        `;
      case "pill":
        return css`
          border-radius: var(--radius-full);
        `;
      default:
        return css`
          border-radius: var(--radius-md);
        `;
    }
  }}

  /* 활성화 상태 */
  ${(props) =>
    props.$isActive &&
    css`
      background-color: var(--color-primary-500);
      color: white;
      border-color: var(--color-primary-500);
      font-weight: var(--font-weight-semibold);

      /* 활성화 상태 다크모드 */
      [data-theme="dark"] & {
        background-color: var(--color-primary-600);
        border-color: var(--color-primary-600);
        color: white;
      }
    `}
  
  /* 컨트롤 버튼 (이전, 다음 등) */
  ${(props) =>
    props.$isControl &&
    css`
      background-color: var(--color-neutral-50);

      /* 컨트롤 버튼 다크모드 */
      [data-theme="dark"] & {
        background-color: var(--color-neutral-800);
      }
    `}
  
  /* 비활성화 상태 */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: var(--color-neutral-100);
    color: var(--color-neutral-400);
    border-color: var(--color-neutral-200);

    /* 비활성화 상태 다크모드 */
    [data-theme="dark"] & {
      background-color: var(--color-neutral-800);
      color: var(--color-neutral-600);
      border-color: var(--color-neutral-700);
    }
  }

  /* 호버 상태 */
  &:hover:not(:disabled) {
    background-color: var(--color-neutral-100);
    border-color: var(--color-neutral-300);

    /* 활성화된 버튼 호버 */
    ${(props) =>
      props.$isActive &&
      css`
        background-color: var(--color-primary-600);
        border-color: var(--color-primary-600);
      `}

    /* 호버 상태 다크모드 */
    [data-theme="dark"] & {
      background-color: var(--color-neutral-700);
      border-color: var(--color-neutral-600);

      /* 활성화된 버튼 호버 - 다크모드 */
      ${(props) =>
        props.$isActive &&
        css`
          background-color: var(--color-primary-500);
          border-color: var(--color-primary-500);
        `}
    }
  }

  /* 포커스 상태 */
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-primary-100);

    /* 포커스 상태 다크모드 */
    [data-theme="dark"] & {
      box-shadow: 0 0 0 2px var(--color-primary-900);
    }
  }

  /* 다크모드 기본 스타일 */
  [data-theme="dark"] & {
    background-color: var(--color-background-primary, var(--color-neutral-900));
    color: var(--color-text-primary, var(--color-neutral-200));
    border-color: var(--color-neutral-700);
  }
`;

export const PaginationEllipsis = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  color: var(--color-neutral-500);

  /* 다크모드 */
  [data-theme="dark"] & {
    color: var(--color-neutral-400);
  }
`;

export const PaginationIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75em;
  font-weight: var(--font-weight-bold);
`;

// ThemeProvider 없이 기본 테마 제공
PaginationContainer.defaultProps = {
  theme: defaultTheme,
};

PaginationList.defaultProps = {
  theme: defaultTheme,
};

PaginationItem.defaultProps = {
  theme: defaultTheme,
};

PaginationButton.defaultProps = {
  theme: defaultTheme,
};

PaginationEllipsis.defaultProps = {
  theme: defaultTheme,
};

PaginationIcon.defaultProps = {
  theme: defaultTheme,
};
