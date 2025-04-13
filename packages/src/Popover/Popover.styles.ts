import styled, { css, keyframes } from "styled-components";
import { PopoverProps } from "./Popover";
import { defaultTheme } from "../theme/theme";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const PopoverContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const PopoverTrigger = styled.div`
  display: inline-flex;
  cursor: pointer;
`;

export const PopoverContent = styled.div<{
  $placement?: PopoverProps["placement"];
  $width?: PopoverProps["width"];
  $height?: PopoverProps["height"];
}>`
  position: absolute;
  z-index: 1000;
  background-color: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  padding: var(--spacing-3);
  animation: ${fadeIn} 0.2s ease-out;
  width: ${(props) =>
    typeof props.$width === "number" ? `${props.$width}px` : props.$width};
  height: ${(props) =>
    typeof props.$height === "number" ? `${props.$height}px` : props.$height};
  max-width: calc(100vw - 20px);

  /* 다크모드 스타일 */
  [data-theme="dark"] & {
    background-color: var(--color-neutral-800);
    color: var(--color-neutral-100);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    border: 1px solid var(--color-neutral-700);
  }

  /* 화살표 스타일 */
  &::before {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    background: white;
    transform: rotate(45deg);
    box-shadow: var(--shadow-sm);
    z-index: -1;

    /* 다크모드 화살표 스타일 */
    [data-theme="dark"] & {
      background: var(--color-neutral-800);
      border: 1px solid var(--color-neutral-700);
      border-right: none;
      border-bottom: none;
    }
  }

  /* 위치에 따른 스타일 */
  ${(props) => {
    switch (props.$placement) {
      case "top":
        return css`
          bottom: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%);

          &::before {
            bottom: -5px;
            left: 50%;
            margin-left: -5px;

            /* 다크모드 top 위치 화살표 */
            [data-theme="dark"] & {
              border: 1px solid var(--color-neutral-700);
              border-top: none;
              border-left: none;
            }
          }
        `;
      case "bottom":
        return css`
          top: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%);

          &::before {
            top: -5px;
            left: 50%;
            margin-left: -5px;

            /* 다크모드 bottom 위치 화살표 */
            [data-theme="dark"] & {
              border: 1px solid var(--color-neutral-700);
              border-bottom: none;
              border-right: none;
            }
          }
        `;
      case "left":
        return css`
          right: calc(100% + 12px);
          top: 50%;
          transform: translateY(-50%);

          &::before {
            right: -5px;
            top: 50%;
            margin-top: -5px;

            /* 다크모드 left 위치 화살표 */
            [data-theme="dark"] & {
              border: 1px solid var(--color-neutral-700);
              border-left: none;
              border-bottom: none;
            }
          }
        `;
      case "right":
        return css`
          left: calc(100% + 12px);
          top: 50%;
          transform: translateY(-50%);

          &::before {
            left: -5px;
            top: 50%;
            margin-top: -5px;

            /* 다크모드 right 위치 화살표 */
            [data-theme="dark"] & {
              border: 1px solid var(--color-neutral-700);
              border-top: none;
              border-right: none;
            }
          }
        `;
      default:
        return css`
          top: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%);

          &::before {
            top: -5px;
            left: 50%;
            margin-left: -5px;

            /* 다크모드 default 위치 화살표 */
            [data-theme="dark"] & {
              border: 1px solid var(--color-neutral-700);
              border-bottom: none;
              border-right: none;
            }
          }
        `;
    }
  }}
`;

export const PopoverHeader = styled.div`
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-md);
  padding-bottom: var(--spacing-2);
  margin-bottom: var(--spacing-2);
  border-bottom: 1px solid var(--color-neutral-200);

  /* 다크모드 헤더 스타일 */
  [data-theme="dark"] & {
    border-bottom-color: var(--color-neutral-700);
  }
`;

export const PopoverBody = styled.div`
  font-size: var(--font-size-sm);
`;

export const PopoverFooter = styled.div`
  margin-top: var(--spacing-3);
  padding-top: var(--spacing-2);
  border-top: 1px solid var(--color-neutral-200);
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-2);

  /* 다크모드 푸터 스타일 */
  [data-theme="dark"] & {
    border-top-color: var(--color-neutral-700);
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: var(--spacing-2);
  right: var(--spacing-2);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-neutral-500);
  padding: var(--spacing-1);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: var(--color-neutral-100);
    color: var(--color-neutral-800);
  }

  /* 다크모드 닫기 버튼 */
  [data-theme="dark"] & {
    color: var(--color-neutral-400);

    &:hover {
      background-color: var(--color-neutral-700);
      color: var(--color-neutral-100);
    }
  }
`;

// ThemeProvider 없이 기본 테마 제공
PopoverContainer.defaultProps = {
  theme: defaultTheme,
};

PopoverTrigger.defaultProps = {
  theme: defaultTheme,
};

PopoverContent.defaultProps = {
  theme: defaultTheme,
};

PopoverHeader.defaultProps = {
  theme: defaultTheme,
};

PopoverBody.defaultProps = {
  theme: defaultTheme,
};

PopoverFooter.defaultProps = {
  theme: defaultTheme,
};

CloseButton.defaultProps = {
  theme: defaultTheme,
};
