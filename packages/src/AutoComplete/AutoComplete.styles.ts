import styled, { css } from "styled-components";

type InputSizeProps = {
  $size?: "sm" | "md" | "lg";
  $error?: boolean;
  $fullWidth?: boolean;
  $disabled?: boolean;
};

type DropdownProps = {
  $isOpen: boolean;
  $maxHeight: string | number;
  $width?: string | number;
  $position: "top" | "bottom";
};

type OptionProps = {
  $isHighlighted: boolean;
  $isSelected: boolean;
};

export const AutoCompleteContainer = styled.div<InputSizeProps>`
  position: relative;
  display: inline-block;
  width: ${(props) => (props.$fullWidth ? "100%" : "auto")};
  font-family: var(--font-family);

  label {
    display: block;
    margin-bottom: var(--spacing-1);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-primary);

    [data-theme="dark"] & {
      color: var(--color-text-primary);
    }
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const AutoCompleteInput = styled.input<InputSizeProps>`
  width: ${(props) => (props.$fullWidth ? "100%" : "250px")};
  font-family: inherit;
  background-color: var(--color-background-primary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  transition: all 0.2s ease;
  outline: none;
  padding-right: 2rem; /* 아이콘 공간 확보 */

  /* 크기별 스타일링 */
  ${(props) => {
    switch (props.$size) {
      case "sm":
        return css`
          padding: var(--spacing-1) var(--spacing-2);
          font-size: var(--font-size-xs);
          height: 30px;
        `;
      case "lg":
        return css`
          padding: var(--spacing-3) var(--spacing-4);
          font-size: var(--font-size-md);
          height: 48px;
        `;
      default: // md
        return css`
          padding: var(--spacing-2) var(--spacing-3);
          font-size: var(--font-size-sm);
          height: 40px;
        `;
    }
  }}

  /* 에러 상태 */
  ${(props) =>
    props.$error &&
    css`
      border-color: var(--color-error-500);

      &:focus {
        border-color: var(--color-error-500);
        box-shadow: 0 0 0 2px var(--color-error-100);
      }

      [data-theme="dark"] & {
        border-color: var(--color-error-400);

        &:focus {
          box-shadow: 0 0 0 2px var(--color-error-900);
        }
      }
    `}
  
  /* 포커스 상태 */
  &:focus {
    border-color: var(--color-primary-500);
    box-shadow: 0 0 0 2px var(--color-primary-100);

    [data-theme="dark"] & {
      border-color: var(--color-primary-400);
      box-shadow: 0 0 0 2px var(--color-primary-900);
    }
  }

  /* 비활성화 상태 */
  ${(props) =>
    props.$disabled &&
    css`
      background-color: var(--color-neutral-100);
      color: var(--color-text-disabled);
      border-color: var(--color-border-disabled);
      cursor: not-allowed;

      [data-theme="dark"] & {
        background-color: var(--color-neutral-800);
        color: var(--color-text-disabled);
        border-color: var(--color-neutral-700);
      }
    `}

  /* 다크모드 기본 스타일 */
  [data-theme="dark"] & {
    background-color: var(--color-background-primary);
    color: var(--color-text-primary);
    border-color: var(--color-border-default);

    &:hover:not(:disabled) {
      border-color: var(--color-neutral-500);
    }
  }

  /* 플레이스홀더 스타일 */
  &::placeholder {
    color: var(--color-text-secondary);

    [data-theme="dark"] & {
      color: var(--color-neutral-500);
    }
  }
`;

export const AutoCompleteDropdown = styled.div<DropdownProps>`
  position: absolute;
  z-index: 10;
  width: ${(props) => (props.$width ? props.$width : "100%")};
  max-height: ${(props) =>
    typeof props.$maxHeight === "number"
      ? `${props.$maxHeight}px`
      : props.$maxHeight};
  overflow-y: auto;
  background-color: var(--color-background-primary);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  display: ${(props) => (props.$isOpen ? "block" : "none")};
  ${(props) => (props.$position === "top" ? "bottom: 100%;" : "top: 100%;")}
  margin-top: ${(props) => (props.$position === "bottom" ? "4px" : "0")};
  margin-bottom: ${(props) => (props.$position === "top" ? "4px" : "0")};

  /* 스크롤바 스타일링 */
  scrollbar-width: thin;
  scrollbar-color: var(--color-neutral-300) transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--color-neutral-300);
    border-radius: var(--radius-full);
  }

  /* 다크모드 스타일 */
  [data-theme="dark"] & {
    background-color: var(--color-background-secondary);
    border-color: var(--color-neutral-700);
    box-shadow: var(--shadow-lg);

    /* 다크모드 스크롤바 */
    scrollbar-color: var(--color-neutral-600) transparent;

    &::-webkit-scrollbar-thumb {
      background-color: var(--color-neutral-600);
    }
  }
`;

export const AutoCompleteOption = styled.div<OptionProps>`
  padding: var(--spacing-2) var(--spacing-3);
  cursor: pointer;
  transition: background-color 0.2s ease;

  /* 호버 상태 */
  &:hover {
    background-color: var(--color-neutral-100);

    [data-theme="dark"] & {
      background-color: var(--color-neutral-700);
    }
  }

  /* 하이라이트 상태 */
  ${(props) =>
    props.$isHighlighted &&
    css`
      background-color: var(--color-neutral-100);

      [data-theme="dark"] & {
        background-color: var(--color-neutral-700);
      }
    `}

  /* 선택된 상태 */
  ${(props) =>
    props.$isSelected &&
    css`
      background-color: var(--color-primary-50);
      color: var(--color-primary-700);
      font-weight: var(--font-weight-medium);

      [data-theme="dark"] & {
        background-color: var(--color-primary-900);
        color: var(--color-primary-200);
      }

      &:hover {
        background-color: var(--color-primary-100);

        [data-theme="dark"] & {
          background-color: var(--color-primary-800);
        }
      }
    `}
  
  /* 다크모드 기본 텍스트 색상 */
  [data-theme="dark"] & {
    color: var(--color-text-primary);
  }
`;

export const NoResults = styled.div`
  padding: var(--spacing-3);
  text-align: center;
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);

  [data-theme="dark"] & {
    color: var(--color-neutral-400);
  }
`;

export const ErrorText = styled.div`
  margin-top: var(--spacing-1);
  color: var(--color-error-600);
  font-size: var(--font-size-xs);

  [data-theme="dark"] & {
    color: var(--color-error-400);
  }
`;

export const LoadingIndicator = styled.div`
  position: absolute;
  right: var(--spacing-3);
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  [data-theme="dark"] & {
    color: var(--color-neutral-400);
  }
`;

export const ClearButton = styled.button`
  position: absolute;
  right: var(--spacing-3);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: color 0.2s ease;

  &:hover {
    color: var(--color-text-primary);
  }

  &:focus {
    outline: none;
    color: var(--color-primary-600);
  }

  [data-theme="dark"] & {
    color: var(--color-neutral-500);

    &:hover {
      color: var(--color-neutral-300);
    }

    &:focus {
      color: var(--color-primary-400);
    }
  }
`;
