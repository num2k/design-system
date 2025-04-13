import styled, { css, keyframes } from "styled-components";
import { ProgressProps, CircularProgressProps } from "./Progress";
import { defaultTheme } from "../theme/theme";

// 줄무늬 애니메이션을 위한 keyframes
const stripeAnimation = keyframes`
  from { background-position: 1rem 0; }
  to { background-position: 0 0; }
`;

// ===== 직선형 Progress 컴포넌트 스타일 =====
export const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  width: 100%;
`;

ProgressContainer.defaultProps = {
  theme: defaultTheme,
};

export const ProgressBar = styled.div<{
  $height?: string;
  $color?: ProgressProps["color"];
  $variant?: ProgressProps["variant"];
  $radius?: ProgressProps["radius"];
}>`
  width: 100%;
  background-color: var(--color-neutral-100);
  overflow: hidden;
  position: relative;
  height: ${(props) => props.$height || "0.75rem"};

  /* 색상 변형 */
  ${(props) => {
    switch (props.$color) {
      case "success":
        return css`
          --progress-color: var(--color-success-500);
        `;
      case "warning":
        return css`
          --progress-color: var(--color-warning-500);
        `;
      case "error":
        return css`
          --progress-color: var(--color-error-500);
        `;
      case "info":
        return css`
          --progress-color: var(--color-info-500);
        `;
      default:
        return css`
          --progress-color: var(--color-primary-500);
        `;
    }
  }}

  /* 모서리 반경 */
  ${(props) => {
    switch (props.$radius) {
      case "none":
        return css`
          border-radius: 0;
        `;
      case "sm":
        return css`
          border-radius: var(--radius-sm);
        `;
      case "md":
        return css`
          border-radius: var(--radius-md);
        `;
      case "lg":
        return css`
          border-radius: var(--radius-lg);
        `;
      case "full":
        return css`
          border-radius: 9999px;
        `;
      default:
        return css`
          border-radius: 9999px;
        `;
    }
  }}
`;

ProgressBar.defaultProps = {
  theme: defaultTheme,
};

export const ProgressBarFill = styled.div<{
  $percentage: number;
  $variant?: ProgressProps["variant"];
}>`
  height: 100%;
  width: ${(props) => `${props.$percentage}%`};
  background-color: var(--progress-color);
  transition: width 0.3s ease;

  /* 변형 스타일 */
  ${(props) => {
    switch (props.$variant) {
      case "striped":
        return css`
          background-image: linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.15) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.15) 50%,
            rgba(255, 255, 255, 0.15) 75%,
            transparent 75%,
            transparent
          );
          background-size: 1rem 1rem;
        `;
      case "animated":
        return css`
          background-image: linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.15) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.15) 50%,
            rgba(255, 255, 255, 0.15) 75%,
            transparent 75%,
            transparent
          );
          background-size: 1rem 1rem;
          animation: ${stripeAnimation} 1s linear infinite;
        `;
      default:
        return "";
    }
  }}
`;

ProgressBarFill.defaultProps = {
  theme: defaultTheme,
};

export const ProgressLabel = styled.span`
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-neutral-700);
  flex-shrink: 0;
`;

ProgressLabel.defaultProps = {
  theme: defaultTheme,
};

// ===== 원형 Progress 컴포넌트 스타일 =====
export const CircularProgressContainer = styled.div<{
  $size?: CircularProgressProps["size"];
  $color?: CircularProgressProps["color"];
}>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  /* 색상 변형 */
  ${(props) => {
    switch (props.$color) {
      case "success":
        return css`
          --progress-color: var(--color-success-500);
        `;
      case "warning":
        return css`
          --progress-color: var(--color-warning-500);
        `;
      case "error":
        return css`
          --progress-color: var(--color-error-500);
        `;
      case "info":
        return css`
          --progress-color: var(--color-info-500);
        `;
      default:
        return css`
          --progress-color: var(--color-primary-500);
        `;
    }
  }}

  /* 크기 변형 */
  ${(props) => {
    if (typeof props.$size === "string") {
      switch (props.$size) {
        case "sm":
          return css`
            width: 80px;
            height: 80px;
          `;
        case "lg":
          return css`
            width: 180px;
            height: 180px;
          `;
        case "md":
        default:
          return css`
            width: 120px;
            height: 120px;
          `;
      }
    }
    return css`
      width: ${props.$size};
      height: ${props.$size};
    `;
  }}
`;

CircularProgressContainer.defaultProps = {
  theme: defaultTheme,
};

export const CircularSvg = styled.svg`
  transform: rotate(-90deg);
`;

CircularSvg.defaultProps = {
  theme: defaultTheme,
};

export const CircularTrack = styled.circle<{
  $trackColor?: string;
}>`
  stroke: ${(props) => props.$trackColor || "var(--color-neutral-200)"};
  fill: transparent;
`;

CircularTrack.defaultProps = {
  theme: defaultTheme,
};

export const CircularProgressBar = styled.circle`
  stroke: var(--progress-color);
  fill: transparent;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.3s ease;
`;

CircularProgressBar.defaultProps = {
  theme: defaultTheme,
};

export const CircularProgressLabel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  color: var(--color-neutral-900);
`;

CircularProgressLabel.defaultProps = {
  theme: defaultTheme,
};
