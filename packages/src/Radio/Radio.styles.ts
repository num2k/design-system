import styled, { css } from "styled-components";
import { defaultTheme } from "../theme/theme";
import { RadioProps, RadioGroupProps } from "./Radio";

// === Radio 컴포넌트 스타일 ===
export const RadioWrapper = styled.label<{ $disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  position: relative;
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  user-select: none;
  opacity: ${(props) => (props.$disabled ? 0.6 : 1)};
`;

export const RadioInput = styled.input.attrs({ type: "radio" })<RadioProps>`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;

  &:focus-visible + div {
    box-shadow: 0 0 0 2px
      ${(props) =>
        props.theme?.colors?.primary?.[100] ||
        "var(--color-primary-100, #dbeafe)"};
  }
`;

export const RadioControl = styled.div<{
  $checked?: boolean;
  $disabled?: boolean;
  $size?: RadioProps["size"];
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) =>
    props.$size === "sm" ? "14px" : props.$size === "lg" ? "22px" : "18px"};
  height: ${(props) =>
    props.$size === "sm" ? "14px" : props.$size === "lg" ? "22px" : "18px"};
  border-radius: 50%;
  border: 2px solid
    ${(props) =>
      props.$checked
        ? props.theme?.colors?.primary?.[500] ||
          "var(--color-primary-500, #3b82f6)"
        : props.theme?.colors?.neutral?.[400] ||
          "var(--color-neutral-400, #9ca3af)"};
  background-color: ${(props) =>
    props.theme?.colors?.background?.primary ||
    "var(--color-background-primary, #f9fafb)"};
  transition: all 0.2s;

  &:after {
    content: "";
    width: ${(props) =>
      props.$size === "sm" ? "6px" : props.$size === "lg" ? "12px" : "10px"};
    height: ${(props) =>
      props.$size === "sm" ? "6px" : props.$size === "lg" ? "12px" : "10px"};
    border-radius: 50%;
    background-color: ${(props) =>
      props.theme?.colors?.primary?.[500] ||
      "var(--color-primary-500, #3b82f6)"};
    opacity: ${(props) => (props.$checked ? 1 : 0)};
    transition: opacity 0.2s;
  }
`;

export const RadioLabel = styled.span<{ $size?: RadioProps["size"] }>`
  margin-left: ${(props) =>
    props.theme?.spacing?.[2] || "var(--spacing-2, 0.5rem)"};
  font-size: ${(props) =>
    props.$size === "sm"
      ? props.theme?.typography?.fontSize?.xs || "var(--font-size-xs, 0.75rem)"
      : props.$size === "lg"
      ? props.theme?.typography?.fontSize?.lg || "var(--font-size-lg, 1.125rem)"
      : props.theme?.typography?.fontSize?.md || "var(--font-size-md, 1rem)"};
  color: ${(props) =>
    props.theme?.colors?.text?.primary || "var(--color-text-primary, #111827)"};
`;

// 모든 스타일드 컴포넌트에 기본 테마 설정
RadioWrapper.defaultProps = {
  theme: defaultTheme,
};

RadioInput.defaultProps = {
  theme: defaultTheme,
};

RadioControl.defaultProps = {
  theme: defaultTheme,
};

RadioLabel.defaultProps = {
  theme: defaultTheme,
};

export const RadioGroupContainer = styled.fieldset<{
  $orientation?: RadioGroupProps["orientation"];
  $error?: boolean;
}>`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
  border: none;
  padding: 0;
  margin: 0;
`;

export const RadioGroupLabel = styled.legend`
  color: var(--color-neutral-800);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-2);

  /* 다크모드 그룹 라벨 */
  [data-theme="dark"] & {
    color: var(--color-neutral-200);
  }
`;

export const RadioGroupRequired = styled.span`
  color: var(--color-error-500);
  margin-left: var(--spacing-1);

  /* 다크모드 필수 표시자 */
  [data-theme="dark"] & {
    color: var(--color-error-400);
  }
`;

export const RadioGroupItems = styled.div<{
  $orientation?: RadioGroupProps["orientation"];
}>`
  display: flex;
  flex-direction: ${(props) =>
    props.$orientation === "horizontal" ? "row" : "column"};
  gap: ${(props) =>
    props.$orientation === "horizontal"
      ? "var(--spacing-4)"
      : "var(--spacing-2)"};
`;

export const RadioGroupHelperText = styled.div<{
  $error?: boolean;
}>`
  font-size: var(--font-size-xs);
  color: ${(props) =>
    props.$error ? "var(--color-error-600)" : "var(--color-neutral-600)"};
  margin-top: calc(var(--spacing-1) / 2);

  /* 다크모드 그룹 도움말/에러 텍스트 */
  [data-theme="dark"] & {
    color: ${(props) =>
      props.$error ? "var(--color-error-400)" : "var(--color-neutral-400)"};
  }
`;

// RadioGroup 관련 스타일드 컴포넌트에도 기본 테마 설정
RadioGroupContainer.defaultProps = {
  theme: defaultTheme,
};

RadioGroupLabel.defaultProps = {
  theme: defaultTheme,
};

RadioGroupRequired.defaultProps = {
  theme: defaultTheme,
};

RadioGroupItems.defaultProps = {
  theme: defaultTheme,
};

RadioGroupHelperText.defaultProps = {
  theme: defaultTheme,
};
