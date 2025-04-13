import styled, { css } from "styled-components";
import { CheckboxProps } from "./Checkbox";
import { defaultTheme } from "../theme/theme";

export const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

CheckboxContainer.defaultProps = {
  theme: defaultTheme,
};

export const CheckboxLabel = styled.label<{ $disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  position: relative;
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  vertical-align: middle;
  user-select: none;
`;

CheckboxLabel.defaultProps = {
  theme: defaultTheme,
};

export const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;

  &:focus + span {
    box-shadow: 0 0 0 2px var(--color-primary-100);

    [data-theme="dark"] & {
      box-shadow: 0 0 0 2px var(--color-primary-900);
    }
  }

  &:checked + span {
    background-color: var(--color-primary-500);
    border-color: var(--color-primary-500);

    &::after {
      opacity: 1;
    }

    [data-theme="dark"] & {
      background-color: var(--color-primary-600);
      border-color: var(--color-primary-600);
    }
  }

  &:disabled + span {
    background-color: var(--color-neutral-100);
    border-color: var(--color-neutral-300);
    cursor: not-allowed;

    &::after {
      border-color: var(--color-neutral-400);
    }

    [data-theme="dark"] & {
      background-color: var(--color-neutral-800);
      border-color: var(--color-neutral-700);

      &::after {
        border-color: var(--color-neutral-500);
      }
    }
  }
`;

HiddenCheckbox.defaultProps = {
  theme: defaultTheme,
};

export const CheckboxControl = styled.span<{
  $size?: CheckboxProps["size"];
  $isError?: boolean;
  $isSuccess?: boolean;
  $isIndeterminate?: boolean;
  $disabled?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 1px solid var(--color-neutral-400);
  background-color: white;
  transition: all 0.2s ease;
  flex-shrink: 0;

  /* 다크모드 기본 스타일 */
  [data-theme="dark"] & {
    background-color: var(--color-neutral-900);
    border-color: var(--color-neutral-600);
  }

  /* Size styles */
  ${(props) => {
    switch (props.$size) {
      case "sm":
        return css`
          width: 14px;
          height: 14px;
          border-radius: var(--radius-sm);
        `;
      case "md":
        return css`
          width: 16px;
          height: 16px;
          border-radius: var(--radius-sm);
        `;
      case "lg":
        return css`
          width: 20px;
          height: 20px;
          border-radius: var(--radius-md);
        `;
      default:
        return css`
          width: 16px;
          height: 16px;
          border-radius: var(--radius-sm);
        `;
    }
  }}

  /* Check mark */
  &::after {
    content: "";
    display: block;
    opacity: 0;
    transition: transform 0.2s ease;

    ${(props) =>
      props.$isIndeterminate
        ? css`
            width: 60%;
            height: 2px;
            background-color: white;
            opacity: 1;

            [data-theme="dark"] & {
              background-color: white;
            }
          `
        : css`
            width: 30%;
            height: 60%;
            border-right: 2px solid white;
            border-bottom: 2px solid white;
            transform: rotate(45deg) translate(-2px, -2px);
            position: absolute;
            top: 2px;
            left: 5px;

            [data-theme="dark"] & {
              border-right-color: white;
              border-bottom-color: white;
            }
          `}
  }

  /* Error state */
  ${(props) =>
    props.$isError &&
    css`
      border-color: var(--color-error-500);
      background-color: ${props.$isIndeterminate || props.$disabled
        ? ""
        : "var(--color-error-50)"};

      &:hover {
        border-color: var(--color-error-600);
      }

      ${HiddenCheckbox}:checked + & {
        background-color: var(--color-error-500);
        border-color: var(--color-error-500);
      }

      /* 다크모드 에러 상태 */
      [data-theme="dark"] & {
        border-color: var(--color-error-400);
        background-color: ${props.$isIndeterminate || props.$disabled
          ? ""
          : "var(--color-error-900)"};

        &:hover {
          border-color: var(--color-error-300);
        }
      }

      ${HiddenCheckbox}:checked + &[data-theme="dark"] {
        background-color: var(--color-error-600);
        border-color: var(--color-error-600);
      }
    `}

  /* Success state */
  ${(props) =>
    props.$isSuccess &&
    css`
      border-color: var(--color-success-500);
      background-color: ${props.$isIndeterminate || props.$disabled
        ? ""
        : "var(--color-success-50)"};

      &:hover {
        border-color: var(--color-success-600);
      }

      ${HiddenCheckbox}:checked + & {
        background-color: var(--color-success-500);
        border-color: var(--color-success-500);
      }

      /* 다크모드 성공 상태 */
      [data-theme="dark"] & {
        border-color: var(--color-success-400);
        background-color: ${props.$isIndeterminate || props.$disabled
          ? ""
          : "var(--color-success-900)"};

        &:hover {
          border-color: var(--color-success-300);
        }
      }

      ${HiddenCheckbox}:checked + &[data-theme="dark"] {
        background-color: var(--color-success-600);
        border-color: var(--color-success-600);
      }
    `}
  
  /* Disabled state */
  ${(props) =>
    props.$disabled &&
    css`
      background-color: var(--color-neutral-100);
      border-color: var(--color-neutral-300);
      cursor: not-allowed;

      &:hover {
        border-color: var(--color-neutral-300);
      }

      /* 다크모드 비활성화 상태 */
      [data-theme="dark"] & {
        background-color: var(--color-neutral-800);
        border-color: var(--color-neutral-700);

        &:hover {
          border-color: var(--color-neutral-700);
        }
      }
    `}
  
  /* Hover state (only when not disabled) */
  ${(props) =>
    !props.$disabled &&
    css`
      &:hover {
        border-color: var(--color-primary-600);
      }

      /* 다크모드 호버 상태 */
      [data-theme="dark"] &:hover {
        border-color: var(--color-primary-400);
      }
    `}
`;

CheckboxControl.defaultProps = {
  theme: defaultTheme,
};

export const CheckboxLabelText = styled.span<{
  $size?: CheckboxProps["size"];
  $disabled?: boolean;
}>`
  margin-left: var(--spacing-2);
  color: ${(props) =>
    props.$disabled ? "var(--color-neutral-400)" : "var(--color-neutral-900)"};

  /* 다크모드 레이블 텍스트 */
  [data-theme="dark"] & {
    color: ${(props) =>
      props.$disabled
        ? "var(--color-neutral-600)"
        : "var(--color-neutral-100)"};
  }

  /* Size styles */
  ${(props) => {
    switch (props.$size) {
      case "sm":
        return css`
          font-size: var(--font-size-xs);
          line-height: 1.5;
        `;
      case "md":
        return css`
          font-size: var(--font-size-sm);
          line-height: 1.5;
        `;
      case "lg":
        return css`
          font-size: var(--font-size-md);
          line-height: 1.5;
        `;
      default:
        return css`
          font-size: var(--font-size-sm);
          line-height: 1.5;
        `;
    }
  }}
`;

CheckboxLabelText.defaultProps = {
  theme: defaultTheme,
};

export const HelperText = styled.div<{
  $isError?: boolean;
  $isSuccess?: boolean;
}>`
  margin-top: var(--spacing-1);
  font-size: var(--font-size-xs);

  ${(props) =>
    props.$isError &&
    css`
      color: var(--color-error-600);

      /* 다크모드 에러 텍스트 */
      [data-theme="dark"] & {
        color: var(--color-error-400);
      }
    `}

  ${(props) =>
    props.$isSuccess &&
    css`
      color: var(--color-success-600);

      /* 다크모드 성공 텍스트 */
      [data-theme="dark"] & {
        color: var(--color-success-400);
      }
    `}
  
  ${(props) =>
    !props.$isError &&
    !props.$isSuccess &&
    css`
      color: var(--color-neutral-600);

      /* 다크모드 일반 텍스트 */
      [data-theme="dark"] & {
        color: var(--color-neutral-400);
      }
    `}
`;

HelperText.defaultProps = {
  theme: defaultTheme,
};
