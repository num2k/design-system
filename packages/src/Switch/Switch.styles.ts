import styled from "styled-components";
import { SwitchProps } from "./Switch";
import { defaultTheme } from "../theme/theme";

export const SwitchContainer = styled.div<{
  $size?: SwitchProps["size"];
  $error?: boolean;
  $disabled?: boolean;
  $color?: SwitchProps["color"];
  $labelPosition?: SwitchProps["labelPosition"];
}>`
  display: inline-flex;
  flex-direction: column;
  gap: var(--spacing-1);

  ${(props) =>
    props.$disabled &&
    `
    opacity: 0.6;
    cursor: not-allowed;
  `}
`;

export const LabelContainer = styled.label<{
  $labelPosition?: SwitchProps["labelPosition"];
}>`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  gap: var(--spacing-2);
  flex-direction: ${(props) =>
    props.$labelPosition === "left" ? "row-reverse" : "row"};
`;

export const Label = styled.span`
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
`;

export const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

export const Track = styled.span<{
  $size?: SwitchProps["size"];
  $error?: boolean;
  $color?: SwitchProps["color"];
}>`
  position: relative;
  display: inline-block;
  transition: background-color 0.2s;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border-default);
  background-color: var(--color-neutral-200);

  /* 크기에 따른 스타일 */
  ${(props) => {
    switch (props.$size) {
      case "sm":
        return `
          width: 32px;
          height: 16px;
        `;
      case "lg":
        return `
          width: 52px;
          height: 28px;
        `;
      default:
        return `
          width: 44px;
          height: 22px;
        `;
    }
  }}

  /* 에러 상태 */
  ${(props) =>
    props.$error &&
    `
    border-color: var(--color-error-500);
  `}
  
  /* 체크된 상태 - 입력 요소에 의해 제어됨 */
  input:checked + & {
    background-color: ${(props) => {
      switch (props.$color) {
        case "success":
          return "var(--color-success-500)";
        case "warning":
          return "var(--color-warning-500)";
        case "error":
          return "var(--color-error-500)";
        case "info":
          return "var(--color-info-500)";
        default:
          return "var(--color-primary-500)";
      }
    }};
    border-color: transparent;
  }

  /* 포커스 상태 */
  input:focus + & {
    box-shadow: 0 0 0 2px var(--color-primary-100);
  }

  /* 다크모드에서의 특별한 스타일이 필요한 경우 */
  [data-theme="dark"] & {
    input:focus + & {
      box-shadow: 0 0 0 2px var(--color-primary-900);
    }
  }
`;

export const Thumb = styled.span<{
  $size?: SwitchProps["size"];
}>`
  position: absolute;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.2s;
  top: 50%;
  transform: translateY(-50%);

  /* 크기에 따른 스타일 */
  ${(props) => {
    switch (props.$size) {
      case "sm":
        return `
          width: 12px;
          height: 12px;
          left: 2px;
          
          input:checked + .switch__track & {
            transform: translateY(-50%) translateX(16px);
          }
        `;
      case "lg":
        return `
          width: 24px;
          height: 24px;
          left: 2px;
          
          input:checked + .switch__track & {
            transform: translateY(-50%) translateX(24px);
          }
        `;
      default:
        return `
          width: 18px;
          height: 18px;
          left: 2px;
          
          input:checked + .switch__track & {
            transform: translateY(-50%) translateX(22px);
          }
        `;
    }
  }}

  /* 다크모드에서의 추가 스타일 */
  [data-theme="dark"] & {
    background-color: var(--color-neutral-50);
  }
`;

export const Icon = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: var(--color-primary-500);
`;

export const HelpText = styled.div<{
  $error?: boolean;
}>`
  font-size: var(--font-size-xs);
  color: ${(props) =>
    props.$error ? "var(--color-error-500)" : "var(--color-text-secondary)"};
  margin-top: calc(var(--spacing-1) / 2);
`;

// ThemeProvider 없이 기본 테마 제공
SwitchContainer.defaultProps = {
  theme: defaultTheme,
};

LabelContainer.defaultProps = {
  theme: defaultTheme,
};

Label.defaultProps = {
  theme: defaultTheme,
};

HiddenInput.defaultProps = {
  theme: defaultTheme,
};

Track.defaultProps = {
  theme: defaultTheme,
};

Thumb.defaultProps = {
  theme: defaultTheme,
};

Icon.defaultProps = {
  theme: defaultTheme,
};

HelpText.defaultProps = {
  theme: defaultTheme,
};
