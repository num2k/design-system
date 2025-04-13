import styled, { css, keyframes } from "styled-components";
import { TooltipProps } from "./Tooltip";
import { defaultTheme } from "../theme/theme";

const tooltipFadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;

TooltipContainer.defaultProps = {
  theme: defaultTheme,
};

export const TooltipContent = styled.div<{
  $isVisible: boolean;
  $placement: TooltipProps["placement"];
  $maxWidth: TooltipProps["maxWidth"];
  $animated: boolean;
}>`
  position: absolute;
  z-index: var(--z-index-tooltip, 1000);
  background-color: var(--color-neutral-800);
  color: var(--color-neutral-50);
  font-size: var(--font-size-xs);
  border-radius: var(--radius-md);
  padding: var(--spacing-2) var(--spacing-3);
  box-shadow: var(--shadow-md);

  /* 텍스트 처리 */
  white-space: normal;
  text-align: center;
  min-width: 60px;
  width: max-content;
  word-break: keep-all;
  word-wrap: break-word;

  /* 포인터 이벤트 비활성화 */
  pointer-events: none;

  /* 가시성 */
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transition: opacity var(--transition-duration-fast) ease;

  /* 애니메이션 */
  ${(props) =>
    props.$animated &&
    css`
      animation: ${tooltipFadeIn} 0.2s ease-in-out forwards;
    `}

  /* 최대 너비 변형 */
  ${(props) => {
    switch (props.$maxWidth) {
      case "sm":
        return css`
          min-width: 80px;
          max-width: 150px;
        `;
      case "md":
        return css`
          min-width: 100px;
          max-width: 250px;
        `;
      case "lg":
        return css`
          min-width: 120px;
          max-width: 350px;
        `;
      default:
        return css`
          max-width: 200px;
        `;
    }
  }}
  
  /* 배치 변형 */
  ${(props) => {
    switch (props.$placement) {
      case "top":
        return css`
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(-8px);

          &::after {
            content: "";
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border-width: 6px;
            border-style: solid;
            border-color: var(--color-neutral-800) transparent transparent
              transparent;
          }
        `;
      case "bottom":
        return css`
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(8px);

          &::after {
            content: "";
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            border-width: 6px;
            border-style: solid;
            border-color: transparent transparent var(--color-neutral-800)
              transparent;
          }
        `;
      case "left":
        return css`
          right: 100%;
          top: 50%;
          transform: translateY(-50%) translateX(-8px);
          text-align: right;

          &::after {
            content: "";
            position: absolute;
            left: 100%;
            top: 50%;
            transform: translateY(-50%);
            border-width: 6px;
            border-style: solid;
            border-color: transparent transparent transparent
              var(--color-neutral-800);
          }
        `;
      case "right":
        return css`
          left: 100%;
          top: 50%;
          transform: translateY(-50%) translateX(8px);
          text-align: left;

          &::after {
            content: "";
            position: absolute;
            right: 100%;
            top: 50%;
            transform: translateY(-50%);
            border-width: 6px;
            border-style: solid;
            border-color: transparent var(--color-neutral-800) transparent
              transparent;
          }
        `;
      default:
        return css`
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(8px);
        `;
    }
  }}
  
  /* 다크모드 스타일 조정 */
  [data-theme="dark"] & {
    background-color: var(--color-neutral-700);
    color: var(--color-neutral-50);

    /* 화살표 색상 조정 */
    &::after {
      ${(props) => {
        switch (props.$placement) {
          case "top":
            return css`
              border-color: var(--color-neutral-700) transparent transparent
                transparent;
            `;
          case "bottom":
            return css`
              border-color: transparent transparent var(--color-neutral-700)
                transparent;
            `;
          case "left":
            return css`
              border-color: transparent transparent transparent
                var(--color-neutral-700);
            `;
          case "right":
            return css`
              border-color: transparent var(--color-neutral-700) transparent
                transparent;
            `;
          default:
            return "";
        }
      }}
    }
  }
`;

TooltipContent.defaultProps = {
  theme: defaultTheme,
};
