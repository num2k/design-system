import styled, { css, keyframes } from "styled-components";
import { SkeletonProps } from "./Skeleton";

const pulse = keyframes`
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.6;
  }
`;

export const StyledSkeleton = styled.div<{
  $width?: number | string;
  $height?: number | string;
  $radius?: SkeletonProps["radius"];
  $variant?: SkeletonProps["variant"];
  $animate?: boolean;
}>`
  display: block;
  background-color: var(--color-neutral-200);
  width: ${(props) =>
    typeof props.$width === "number"
      ? `${props.$width}px`
      : props.$width || "100%"};
  height: ${(props) =>
    typeof props.$height === "number"
      ? `${props.$height}px`
      : props.$height || "1em"};

  /* 다크모드 배경색 */
  [data-theme="dark"] & {
    background-color: var(--color-neutral-700);
  }

  /* 애니메이션 */
  ${(props) =>
    props.$animate &&
    css`
      animation: ${pulse} 1.5s ease-in-out infinite;

      /* 다크모드에서는 더 미묘한 애니메이션 효과 */
      [data-theme="dark"] & {
        animation: ${pulse} 2s ease-in-out infinite;
      }
    `}

  /* 변형 */
  ${(props) => {
    switch (props.$variant) {
      case "text":
        return css`
          border-radius: var(--radius-sm);
        `;
      case "rectangular":
        return css`
          border-radius: 0;
        `;
      case "circular":
        return css`
          border-radius: 50%;
        `;
      case "rounded":
        return css`
          border-radius: var(--radius-md);
        `;
      default:
        return css`
          border-radius: var(--radius-sm);
        `;
    }
  }}
  
  /* 테두리 반경 */
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
        return css``;
    }
  }}
`;

export const SkeletonTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: var(--spacing-2);
`;
