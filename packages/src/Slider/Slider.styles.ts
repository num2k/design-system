import styled, { css } from "styled-components";
import { SliderProps } from "./Slider";
import { defaultTheme } from "../theme/theme";

// 컬러 변형에 따른 스타일 함수
const getColorStyle = (color: SliderProps["color"] = "primary") => {
  switch (color) {
    case "success":
      return css`
        --slider-color: var(--color-success-500);
        --slider-hover-color: var(--color-success-600);
        --slider-active-color: var(--color-success-700);

        /* 다크모드 색상 */
        [data-theme="dark"] & {
          --slider-color: var(--color-success-400);
          --slider-hover-color: var(--color-success-500);
          --slider-active-color: var(--color-success-600);
        }
      `;
    case "warning":
      return css`
        --slider-color: var(--color-warning-500);
        --slider-hover-color: var(--color-warning-600);
        --slider-active-color: var(--color-warning-700);

        /* 다크모드 색상 */
        [data-theme="dark"] & {
          --slider-color: var(--color-warning-400);
          --slider-hover-color: var(--color-warning-500);
          --slider-active-color: var(--color-warning-600);
        }
      `;
    case "error":
      return css`
        --slider-color: var(--color-error-500);
        --slider-hover-color: var(--color-error-600);
        --slider-active-color: var(--color-error-700);

        /* 다크모드 색상 */
        [data-theme="dark"] & {
          --slider-color: var(--color-error-400);
          --slider-hover-color: var(--color-error-500);
          --slider-active-color: var(--color-error-600);
        }
      `;
    case "info":
      return css`
        --slider-color: var(--color-info-500);
        --slider-hover-color: var(--color-info-600);
        --slider-active-color: var(--color-info-700);

        /* 다크모드 색상 */
        [data-theme="dark"] & {
          --slider-color: var(--color-info-400);
          --slider-hover-color: var(--color-info-500);
          --slider-active-color: var(--color-info-600);
        }
      `;
    default:
      return css`
        --slider-color: var(--color-primary-500);
        --slider-hover-color: var(--color-primary-600);
        --slider-active-color: var(--color-primary-700);

        /* 다크모드 색상 */
        [data-theme="dark"] & {
          --slider-color: var(--color-primary-400);
          --slider-hover-color: var(--color-primary-500);
          --slider-active-color: var(--color-primary-600);
        }
      `;
  }
};

// 크기 변형에 따른 스타일 함수
const getSizeStyle = (size: SliderProps["size"] = "md") => {
  switch (size) {
    case "sm":
      return css`
        --thumb-size: 12px;
        --track-height: 4px;
        --tooltip-font-size: var(--font-size-xs);
        --tooltip-padding: 2px 6px;
      `;
    case "lg":
      return css`
        --thumb-size: 20px;
        --track-height: 8px;
        --tooltip-font-size: var(--font-size-sm);
        --tooltip-padding: 4px 10px;
      `;
    default: // md
      return css`
        --thumb-size: 16px;
        --track-height: 6px;
        --tooltip-font-size: var(--font-size-xs);
        --tooltip-padding: 3px 8px;
      `;
  }
};

// 기본 슬라이더 컨테이너
export const SliderContainer = styled.div<{
  $vertical?: boolean;
  $size?: SliderProps["size"];
  $color?: SliderProps["color"];
  $disabled?: boolean;
  $isDragging?: boolean;
}>`
  position: relative;
  box-sizing: border-box;
  touch-action: none;

  ${(props) => getColorStyle(props.$color)}
  ${(props) => getSizeStyle(props.$size)}
  
  /* 수직/수평 방향 */
  ${(props) =>
    props.$vertical
      ? css`
          height: 100%;
          width: var(--track-height);
          padding: calc(var(--thumb-size) / 2) 0;
        `
      : css`
          width: 100%;
          height: var(--track-height);
          padding: 0 calc(var(--thumb-size) / 2);
        `}
  
  /* 비활성화 상태 */
  ${(props) =>
    props.$disabled &&
    css`
      opacity: 0.6;
      cursor: not-allowed;
      pointer-events: none;
    `}
  
  /* 드래그 중 상태 */
  ${(props) =>
    props.$isDragging &&
    css`
      cursor: grabbing;
    `}
`;

// 슬라이더 트랙
export const Track = styled.div`
  position: relative;
  border-radius: 9999px;
  background-color: var(--color-neutral-200);
  cursor: pointer;
  width: 100%;
  height: 100%;

  /* 다크모드 트랙 배경색 */
  [data-theme="dark"] & {
    background-color: var(--color-neutral-700);
  }
`;

// 진행 표시 트랙
export const TrackProgress = styled.div<{
  $vertical?: boolean;
}>`
  position: absolute;
  background-color: var(--slider-color);
  border-radius: 9999px;

  /* 수직/수평 방향에 따른 스타일링 */
  ${(props) =>
    props.$vertical
      ? css`
          width: 100%;
          bottom: 0;
        `
      : css`
          height: 100%;
          left: 0;
        `}
`;

// 슬라이더 썸(핸들)
export const Thumb = styled.div<{
  $vertical?: boolean;
}>`
  position: absolute;
  width: var(--thumb-size);
  height: var(--thumb-size);
  background-color: white;
  border: 2px solid var(--slider-color);
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: grab;
  transform: translate(-50%, -50%);
  z-index: 1;
  transition: box-shadow 0.2s, transform 0.1s;

  /* 다크모드 썸 스타일 */
  [data-theme="dark"] & {
    background-color: var(--color-neutral-800);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  /* 수직/수평 방향에 따른 위치 조정 */
  ${(props) =>
    props.$vertical
      ? css`
          left: 50%;
          transform: translate(-50%, 50%);

          &:hover {
            box-shadow: 0 0 0 4px rgba(var(--slider-color-rgb), 0.2);
          }

          &:active {
            transform: translate(-50%, 50%) scale(1.1);
          }
        `
      : css`
          top: 50%;

          &:hover {
            box-shadow: 0 0 0 4px rgba(var(--slider-color-rgb), 0.2);
          }

          &:active {
            transform: translate(-50%, -50%) scale(1.1);
          }
        `}
`;

// 툴팁
export const Tooltip = styled.div<{
  $vertical?: boolean;
}>`
  position: absolute;
  background-color: var(--color-neutral-800);
  color: white;
  font-size: var(--tooltip-font-size);
  padding: var(--tooltip-padding);
  border-radius: var(--radius-sm);
  white-space: nowrap;
  transform: translate(-50%, -100%);
  top: -10px;
  left: 50%;

  /* 다크모드 툴팁 스타일 */
  [data-theme="dark"] & {
    background-color: var(--color-neutral-900);
    color: var(--color-neutral-100);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
  }

  /* 수직/수평 방향에 따른 위치 조정 */
  ${(props) =>
    props.$vertical &&
    css`
      transform: translate(calc(-100% - 10px), -50%);
      top: 50%;
      left: 0;
    `}

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 100%;
    transform: translateX(-50%);
    border-width: 4px;
    border-style: solid;
    border-color: var(--color-neutral-800) transparent transparent transparent;

    /* 다크모드 툴팁 화살표 */
    [data-theme="dark"] & {
      border-color: var(--color-neutral-900) transparent transparent transparent;
    }

    /* 수직/수평 방향에 따른 화살표 조정 */
    ${(props) =>
      props.$vertical &&
      css`
        transform: rotate(90deg);
        top: 50%;
        left: 100%;
        margin-top: -4px;

        /* 다크모드 수직 화살표 */
        [data-theme="dark"] & {
          border-color: var(--color-neutral-900) transparent transparent
            transparent;
        }
      `}
  }
`;

// 마크 컨테이너
export const Mark = styled.div<{
  $vertical?: boolean;
  $active?: boolean;
}>`
  position: absolute;
  display: flex;
  flex-direction: ${(props) => (props.$vertical ? "row" : "column")};
  align-items: center;

  /* 수직/수평 방향에 따른 위치 조정 */
  ${(props) =>
    props.$vertical
      ? css`
          left: calc(100% + 8px);
          transform: translateY(50%);
        `
      : css`
          top: calc(100% + 8px);
          transform: translateX(-50%);
        `}
`;

// 마크 점
export const MarkDot = styled.div<{
  $active?: boolean;
}>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.$active ? "var(--slider-color)" : "var(--color-neutral-300)"};

  /* 다크모드 마크 점 */
  [data-theme="dark"] & {
    background-color: ${(props) =>
      props.$active ? "var(--slider-color)" : "var(--color-neutral-600)"};
  }
`;

// 마크 라벨
export const MarkLabel = styled.div<{
  $vertical?: boolean;
  $active?: boolean;
}>`
  font-size: var(--font-size-xs);
  color: ${(props) =>
    props.$active ? "var(--color-neutral-900)" : "var(--color-neutral-500)"};
  margin-top: ${(props) => (props.$vertical ? "0" : "4px")};
  margin-left: ${(props) => (props.$vertical ? "4px" : "0")};

  /* 다크모드 마크 라벨 */
  [data-theme="dark"] & {
    color: ${(props) =>
      props.$active ? "var(--color-neutral-100)" : "var(--color-neutral-500)"};
  }
`;

// 레인지 슬라이더에 대한 추가 스타일
export const RangeSliderContainer = styled(SliderContainer)`
  /* 레인지 슬라이더 특화 스타일 */
`;

// ThemeProvider 없이 기본 테마 제공
SliderContainer.defaultProps = {
  theme: defaultTheme,
};

Track.defaultProps = {
  theme: defaultTheme,
};

TrackProgress.defaultProps = {
  theme: defaultTheme,
};

Thumb.defaultProps = {
  theme: defaultTheme,
};

Tooltip.defaultProps = {
  theme: defaultTheme,
};

Mark.defaultProps = {
  theme: defaultTheme,
};

MarkDot.defaultProps = {
  theme: defaultTheme,
};

MarkLabel.defaultProps = {
  theme: defaultTheme,
};

RangeSliderContainer.defaultProps = {
  theme: defaultTheme,
};
