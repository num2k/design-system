import styled, { css, keyframes } from "styled-components";
import { ToastProps } from "./Toast";
import { defaultTheme } from "../theme/theme";

// 토스트 위치에 따른 애니메이션 정의
const slideInTop = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideInBottom = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideInRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideInLeft = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOutTop = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

const slideOutBottom = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100%);
    opacity: 0;
  }
`;

const slideOutRight = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const slideOutLeft = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
`;

export const ToastContainer = styled.div<{
  $position: NonNullable<ToastProps["position"]>;
}>`
  position: fixed;
  z-index: var(--z-index-toast, 9999);
  display: flex;
  flex-direction: column;
  pointer-events: none;
  padding: var(--spacing-3);
  max-width: 100%;
  max-height: 100vh;
  overflow-y: auto;
  scrollbar-width: none; // Firefox

  &::-webkit-scrollbar {
    display: none; // Chrome, Safari
  }

  /* 위치에 따른 스타일 */
  ${(props) => {
    switch (props.$position) {
      case "top-right":
        return css`
          top: 0;
          right: 0;
        `;
      case "top-left":
        return css`
          top: 0;
          left: 0;
        `;
      case "bottom-right":
        return css`
          bottom: 0;
          right: 0;
        `;
      case "bottom-left":
        return css`
          bottom: 0;
          left: 0;
        `;
      case "top":
        return css`
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          align-items: center;
        `;
      case "bottom":
        return css`
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          align-items: center;
        `;
      default:
        return css`
          top: 0;
          right: 0;
        `;
    }
  }}
`;

export const ToastItem = styled.div<{
  $position: NonNullable<ToastProps["position"]>;
  $isVisible: boolean;
}>`
  pointer-events: auto;
  min-width: 280px;
  max-width: 480px;
  margin-bottom: var(--spacing-2);
  box-shadow: var(--shadow-md);
  transition: transform 0.3s, opacity 0.3s;

  &:last-child {
    margin-bottom: 0;
  }

  /* 애니메이션 */
  ${(props) => {
    if (props.$isVisible) {
      switch (props.$position) {
        case "top":
        case "top-left":
        case "top-right":
          return css`
            animation: ${slideInTop} 0.3s ease forwards;
          `;
        case "bottom":
        case "bottom-left":
        case "bottom-right":
          return css`
            animation: ${slideInBottom} 0.3s ease forwards;
          `;
        default:
          return css`
            animation: ${slideInRight} 0.3s ease forwards;
          `;
      }
    } else {
      switch (props.$position) {
        case "top":
        case "top-left":
        case "top-right":
          return css`
            animation: ${slideOutTop} 0.3s ease forwards;
          `;
        case "bottom":
        case "bottom-left":
        case "bottom-right":
          return css`
            animation: ${slideOutBottom} 0.3s ease forwards;
          `;
        case "top-left":
        case "bottom-left":
          return css`
            animation: ${slideOutLeft} 0.3s ease forwards;
          `;
        default:
          return css`
            animation: ${slideOutRight} 0.3s ease forwards;
          `;
      }
    }
  }}

  /* Alert 내부 스타일 보강 */
  .alert {
    border-radius: var(--radius-md);

    /* 다크모드 일 때 그림자 보강 */
    [data-theme="dark"] & {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
  }
`;

// 토스트 진행 표시기
export const ToastProgressBar = styled.div<{
  $status?: "info" | "success" | "warning" | "error";
  $duration: number;
}>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background-color: ${(props) => {
    switch (props.$status) {
      case "success":
        return "var(--color-success-500)";
      case "warning":
        return "var(--color-warning-500)";
      case "error":
        return "var(--color-error-500)";
      case "info":
      default:
        return "var(--color-primary-500)";
    }
  }};

  animation: shrink ${(props) => props.$duration}ms linear forwards;

  @keyframes shrink {
    from {
      width: 100%;
    }
    to {
      width: 0%;
    }
  }

  /* 다크모드 */
  [data-theme="dark"] & {
    opacity: 0.8;
  }
`;

// ThemeProvider 없이 기본 테마 제공
ToastContainer.defaultProps = {
  theme: defaultTheme,
};

ToastItem.defaultProps = {
  theme: defaultTheme,
};

ToastProgressBar.defaultProps = {
  theme: defaultTheme,
};
