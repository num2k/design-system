import styled, { css } from "styled-components";
import { SelectProps } from "./Select";
import { defaultTheme } from "../theme/theme";

export const SelectWrapper = styled.div<{
  $fullWidth?: boolean;
}>`
  position: relative;
  display: ${(props) => (props.$fullWidth ? "block" : "inline-block")};
  width: ${(props) => (props.$fullWidth ? "100%" : "auto")};
`;

export const StyledSelect = styled.select<{
  $variant?: SelectProps["variant"];
  $size?: SelectProps["size"];
  $isError?: boolean;
  $isSuccess?: boolean;
}>`
  display: block;
  width: 100%;
  font-family: var(--font-family-sans);
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23718096' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1em;
  outline: none;
  transition: all 0.2s ease-in-out;

  /* 다크모드 기본 스타일 */
  [data-theme="dark"] & {
    background-color: var(--color-neutral-900);
    color: var(--color-neutral-100);
    border-color: var(--color-neutral-700);
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a0aec0' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  }

  &:disabled {
    background-color: var(--color-neutral-100);
    border-color: var(--color-neutral-300);
    color: var(--color-neutral-500);
    cursor: not-allowed;

    /* 다크모드 비활성화 상태 */
    [data-theme="dark"] & {
      background-color: var(--color-neutral-800);
      border-color: var(--color-neutral-700);
      color: var(--color-neutral-600);
    }
  }

  /* 크기 변형 */
  ${(props) => {
    switch (props.$size) {
      case "sm":
        return css`
          height: 32px;
          font-size: var(--font-size-xs);
          padding: 0 var(--spacing-6) 0 var(--spacing-2);
          border-radius: var(--radius-sm);
        `;
      case "lg":
        return css`
          height: 48px;
          font-size: var(--font-size-md);
          padding: 0 var(--spacing-8) 0 var(--spacing-3);
          border-radius: var(--radius-md);
        `;
      default: // md
        return css`
          height: 40px;
          font-size: var(--font-size-sm);
          padding: 0 var(--spacing-7) 0 var(--spacing-3);
          border-radius: var(--radius-md);
        `;
    }
  }}

  /* 변형 스타일 */
  ${(props) => {
    switch (props.$variant) {
      case "filled":
        return css`
          background-color: var(--color-neutral-100);
          border: 1px solid var(--color-neutral-200);

          &:focus {
            background-color: white;
            border-color: var(--color-primary-500);
            box-shadow: 0 0 0 2px var(--color-primary-100);
          }

          &:hover:not(:disabled) {
            background-color: var(--color-neutral-200);
          }

          /* 다크모드 filled 변형 */
          [data-theme="dark"] & {
            background-color: var(--color-neutral-800);
            border-color: var(--color-neutral-700);

            &:focus {
              background-color: var(--color-neutral-900);
              border-color: var(--color-primary-400);
              box-shadow: 0 0 0 2px var(--color-primary-900);
            }

            &:hover:not(:disabled) {
              background-color: var(--color-neutral-700);
            }
          }
        `;
      case "flushed":
        return css`
          border-width: 0;
          border-radius: 0;
          border-bottom: 1px solid var(--color-neutral-300);
          padding-left: 0;

          &:focus {
            box-shadow: none;
            border-color: var(--color-primary-500);
            border-width: 0;
            border-bottom-width: 2px;
          }

          /* 다크모드 flushed 변형 */
          [data-theme="dark"] & {
            background-color: transparent;
            border-bottom-color: var(--color-neutral-600);

            &:focus {
              border-color: var(--color-primary-400);
            }
          }
        `;
      default: // default
        return css`
          background-color: white;
          border: 1px solid var(--color-neutral-300);

          &:focus {
            border-color: var(--color-primary-500);
            box-shadow: 0 0 0 2px var(--color-primary-100);
          }

          &:hover:not(:disabled) {
            border-color: var(--color-neutral-400);
          }

          /* 다크모드 default 변형 */
          [data-theme="dark"] & {
            background-color: var(--color-neutral-900);
            border-color: var(--color-neutral-700);

            &:focus {
              border-color: var(--color-primary-400);
              box-shadow: 0 0 0 2px var(--color-primary-900);
            }

            &:hover:not(:disabled) {
              border-color: var(--color-neutral-600);
            }
          }
        `;
    }
  }}
  
  /* 에러 상태 */
  ${(props) =>
    props.$isError &&
    css`
      border-color: var(--color-error-500);

      &:focus {
        border-color: var(--color-error-500);
        box-shadow: 0 0 0 2px var(--color-error-100);
      }

      ${props.$variant === "flushed" &&
      css`
        &:focus {
          box-shadow: none;
          border-bottom-width: 2px;
        }
      `}

      /* 다크모드 에러 상태 */
      [data-theme="dark"] & {
        border-color: var(--color-error-400);

        &:focus {
          border-color: var(--color-error-400);
          box-shadow: 0 0 0 2px var(--color-error-900);
        }
      }
    `}
  
  /* 성공 상태 */
  ${(props) =>
    props.$isSuccess &&
    css`
      border-color: var(--color-success-500);

      &:focus {
        border-color: var(--color-success-500);
        box-shadow: 0 0 0 2px var(--color-success-100);
      }

      ${props.$variant === "flushed" &&
      css`
        &:focus {
          box-shadow: none;
          border-bottom-width: 2px;
        }
      `}

      /* 다크모드 성공 상태 */
      [data-theme="dark"] & {
        border-color: var(--color-success-400);

        &:focus {
          border-color: var(--color-success-400);
          box-shadow: 0 0 0 2px var(--color-success-900);
        }
      }
    `}
`;

export const SelectHelperText = styled.div<{
  $isError?: boolean;
  $isSuccess?: boolean;
}>`
  margin-top: var(--spacing-1);
  font-size: var(--font-size-xs);

  ${(props) => {
    if (props.$isError) {
      return css`
        color: var(--color-error-600);

        /* 다크모드 에러 텍스트 */
        [data-theme="dark"] & {
          color: var(--color-error-400);
        }
      `;
    } else if (props.$isSuccess) {
      return css`
        color: var(--color-success-600);

        /* 다크모드 성공 텍스트 */
        [data-theme="dark"] & {
          color: var(--color-success-400);
        }
      `;
    } else {
      return css`
        color: var(--color-neutral-600);

        /* 다크모드 일반 텍스트 */
        [data-theme="dark"] & {
          color: var(--color-neutral-400);
        }
      `;
    }
  }}
`;

// ThemeProvider 없이 기본 테마 제공
SelectWrapper.defaultProps = {
  theme: defaultTheme,
};

StyledSelect.defaultProps = {
  theme: defaultTheme,
};

SelectHelperText.defaultProps = {
  theme: defaultTheme,
};
