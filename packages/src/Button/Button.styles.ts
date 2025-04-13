import styled, { css, keyframes } from "styled-components";
import { ButtonProps } from "./Button";
import { defaultTheme } from "../theme/theme";

const buttonSpinner = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

// CSS 변수와 theme prop을 함께 사용하는 하이브리드 접근법
export const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${(props) =>
    props.theme?.radii?.md || "0.25rem"}; /* 직접 값 제공 */
  font-family: ${(props) =>
    props.theme?.typography?.fontFamily?.sans ||
    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"};
  font-weight: ${(props) =>
    props.theme?.typography?.fontWeight?.medium || "500"};
  transition: all
    ${(props) => props.theme?.transitions?.duration?.fast || "150ms"};
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border: none;
  line-height: 1;

  /* CSS 변수를 사용하되 직접적인 폴백 값도 제공 */
  --button-border-radius: var(--radius-md, 0.25rem);
  --button-font-family: var(
    --font-family-sans,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    "Helvetica Neue",
    Arial,
    sans-serif
  );
  --button-font-weight: var(--font-weight-medium, 500);
  --button-transition: var(--transition-duration-fast, 150ms);
  --button-focus-ring-width: var(--focus-ring-width, 3px);
  --button-focus-ring-color: var(--focus-ring-color, rgba(59, 130, 246, 0.5));
  --button-focus-ring-offset: var(--focus-ring-offset, 2px);

  &:focus-visible {
    outline: var(--button-focus-ring-width) solid var(--button-focus-ring-color);
    outline-offset: var(--button-focus-ring-offset);
  }

  /* Size styles */
  ${(props) =>
    props.size === "sm" &&
    css`
      height: 32px;
      padding: 0 var(--spacing-3, 0.75rem);
      font-size: var(--font-size-sm, 0.875rem);
      min-width: 64px;
      gap: var(--spacing-1, 0.25rem);
    `}

  ${(props) =>
    props.size === "md" &&
    css`
      height: 40px;
      padding: 0 var(--spacing-4, 1rem);
      font-size: var(--font-size-md, 1rem);
      min-width: 80px;
      gap: var(--spacing-2, 0.5rem);
    `}

  ${(props) =>
    props.size === "lg" &&
    css`
      height: 48px;
      padding: 0 var(--spacing-5, 1.25rem);
      font-size: var(--font-size-lg, 1.125rem);
      min-width: 96px;
      gap: var(--spacing-2, 0.5rem);
    `}

  /* Variant styles - 직접적인 색상 폴백 값 제공 */
  ${(props) =>
    props.variant === "primary" &&
    css`
      --button-primary-bg: var(--color-primary-500, #3b82f6);
      --button-primary-hover: var(--color-primary-600, #2563eb);
      --button-primary-active: var(--color-primary-700, #1d4ed8);

      background-color: var(--button-primary-bg);
      color: white;

      &:hover:not(:disabled) {
        background-color: var(--button-primary-hover);
      }

      &:active:not(:disabled) {
        background-color: var(--button-primary-active);
      }
    `}

  ${(props) =>
    props.variant === "secondary" &&
    css`
      --button-secondary-bg: var(--color-neutral-200, #e5e7eb);
      --button-secondary-text: var(--color-neutral-800, #1f2937);
      --button-secondary-hover: var(--color-neutral-300, #d1d5db);
      --button-secondary-active: var(--color-neutral-400, #9ca3af);

      background-color: var(--button-secondary-bg);
      color: var(--button-secondary-text);

      &:hover:not(:disabled) {
        background-color: var(--button-secondary-hover);
      }

      &:active:not(:disabled) {
        background-color: var(--button-secondary-active);
      }
    `}
    
  ${(props) =>
    props.variant === "tertiary" &&
    css`
      --button-tertiary-text: var(--color-primary-500, #3b82f6);
      --button-tertiary-hover: var(--color-primary-50, #eff6ff);
      --button-tertiary-active: var(--color-primary-100, #dbeafe);

      background-color: transparent;
      color: var(--button-tertiary-text);

      &:hover:not(:disabled) {
        background-color: var(--button-tertiary-hover);
      }

      &:active:not(:disabled) {
        background-color: var(--button-tertiary-active);
      }
    `}

  ${(props) =>
    props.variant === "danger" &&
    css`
      --button-danger-bg: var(--color-error-500, #ef4444);
      --button-danger-hover: var(--color-error-600, #dc2626);
      --button-danger-active: var(--color-error-700, #b91c1c);

      background-color: var(--button-danger-bg);
      color: white;

      &:hover:not(:disabled) {
        background-color: var(--button-danger-hover);
      }

      &:active:not(:disabled) {
        background-color: var(--button-danger-active);
      }
    `}

  ${(props) =>
    props.variant === "outline" &&
    css`
      --button-outline-border: var(--color-neutral-300, #d1d5db);
      --button-outline-text: var(--color-neutral-800, #1f2937);
      --button-outline-hover-bg: var(--color-neutral-50, #f9fafb);
      --button-outline-hover-border: var(--color-neutral-400, #9ca3af);
      --button-outline-active-bg: var(--color-neutral-100, #f3f4f6);

      background-color: transparent;
      border: 1px solid var(--button-outline-border);
      color: var(--button-outline-text);

      &:hover:not(:disabled) {
        background-color: var(--button-outline-hover-bg);
        border-color: var(--button-outline-hover-border);
      }

      &:active:not(:disabled) {
        background-color: var(--button-outline-active-bg);
      }
    `}

  /* State styles */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${(props) =>
    props.fullWidth &&
    css`
      display: flex;
      width: 100%;
    `}

  ${(props) =>
    props.loading &&
    css`
      cursor: progress;
    `}
`;

// ThemeProvider 없이 기본 테마 제공
StyledButton.defaultProps = {
  theme: defaultTheme,
};

// 나머지 스타일은 동일하게 유지
export const ButtonSpinner = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;
  width: 1rem;
  height: 1rem;

  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 2px solid currentColor;
    border-top-color: transparent;
    animation: ${buttonSpinner} 0.8s linear infinite;
  }
`;

ButtonSpinner.defaultProps = {
  theme: defaultTheme,
};

export const ButtonContent = styled.span<{ $loading?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.$loading &&
    css`
      opacity: 0;
      visibility: hidden;
    `}
`;

ButtonContent.defaultProps = {
  theme: defaultTheme,
};

export const ButtonIcon = styled.span<{ $position?: "left" | "right" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

ButtonIcon.defaultProps = {
  theme: defaultTheme,
};

export const ButtonText = styled.span``;

ButtonText.defaultProps = {
  theme: defaultTheme,
};
