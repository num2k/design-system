import styled, { css } from "styled-components";
import { TagProps, TagGroupProps } from "./Tag";
import { defaultTheme } from "../theme/theme";

// 색상 배리언트 타입
type ColorVariant = NonNullable<TagProps["color"]>;
type SizeVariant = NonNullable<TagProps["size"]>;
type StyleVariant = NonNullable<TagProps["variant"]>;
type ShapeVariant = NonNullable<TagProps["shape"]>;

// 태그 스타일 속성
type TagStyledProps = {
  $color: ColorVariant;
  $size: SizeVariant;
  $variant: StyleVariant;
  $shape: ShapeVariant;
  $disabled: boolean;
  $clickable: boolean;
};

// 색상 변형에 따른 스타일 설정
const getColorStyles = (color: ColorVariant, variant: StyleVariant) => {
  // 기본 색상 변수 설정
  let bgColor = "var(--color-neutral-100)";
  let textColor = "var(--color-text-primary)";
  let borderColor = "var(--color-border-default)";

  // 다크모드 색상 변수
  let darkBgColor = "var(--color-neutral-700)";
  let darkTextColor = "var(--color-text-primary)";
  let darkBorderColor = "var(--color-border-default)";

  // 색상에 따른 변수 설정
  switch (color) {
    case "primary":
      bgColor = "var(--color-primary-500)";
      textColor = "var(--color-neutral-50)";
      borderColor = "var(--color-primary-500)";
      darkBgColor = "var(--color-primary-600)";
      darkTextColor = "var(--color-neutral-50)";
      darkBorderColor = "var(--color-primary-600)";
      break;
    case "success":
      bgColor = "var(--color-success-500)";
      textColor = "var(--color-neutral-50)";
      borderColor = "var(--color-success-500)";
      darkBgColor = "var(--color-success-600)";
      darkTextColor = "var(--color-neutral-50)";
      darkBorderColor = "var(--color-success-600)";
      break;
    case "warning":
      bgColor = "var(--color-warning-500)";
      textColor = "var(--color-neutral-800)";
      borderColor = "var(--color-warning-500)";
      darkBgColor = "var(--color-warning-600)";
      darkTextColor = "var(--color-neutral-800)";
      darkBorderColor = "var(--color-warning-600)";
      break;
    case "error":
      bgColor = "var(--color-error-500)";
      textColor = "var(--color-neutral-50)";
      borderColor = "var(--color-error-500)";
      darkBgColor = "var(--color-error-600)";
      darkTextColor = "var(--color-neutral-50)";
      darkBorderColor = "var(--color-error-600)";
      break;
    case "info":
      bgColor = "var(--color-info-500)";
      textColor = "var(--color-neutral-50)";
      borderColor = "var(--color-info-500)";
      darkBgColor = "var(--color-info-600)";
      darkTextColor = "var(--color-neutral-50)";
      darkBorderColor = "var(--color-info-600)";
      break;
    default: // default
      bgColor = "var(--color-neutral-100)";
      textColor = "var(--color-text-primary)";
      borderColor = "var(--color-border-default)";
      darkBgColor = "var(--color-neutral-700)";
      darkTextColor = "var(--color-text-primary)";
      darkBorderColor = "var(--color-neutral-600)";
      break;
  }

  // 변형에 따른 스타일 반환
  switch (variant) {
    case "outline":
      return css`
        background-color: transparent;
        border: 1px solid ${borderColor};
        color: ${color === "default" ? textColor : borderColor};

        [data-theme="dark"] & {
          background-color: transparent;
          border: 1px solid ${darkBorderColor};
          color: ${color === "default" ? darkTextColor : darkBorderColor};
        }
      `;
    case "subtle":
      return css`
        background-color: ${color === "default"
          ? "var(--color-neutral-50)"
          : `var(--color-${color}-50)`};
        border: 1px solid transparent;
        color: ${color === "default" ? textColor : `var(--color-${color}-700)`};

        [data-theme="dark"] & {
          background-color: ${color === "default"
            ? "var(--color-neutral-800)"
            : `var(--color-${color}-900)`};
          color: ${color === "default"
            ? darkTextColor
            : `var(--color-${color}-300)`};
        }
      `;
    default: // solid
      return css`
        background-color: ${bgColor};
        border: 1px solid transparent;
        color: ${textColor};

        [data-theme="dark"] & {
          background-color: ${darkBgColor};
          color: ${darkTextColor};
        }
      `;
  }
};

// 태그 크기에 따른 스타일
const getSizeStyles = (size: SizeVariant) => {
  switch (size) {
    case "sm":
      return css`
        font-size: var(--font-size-xs);
        padding: 0 var(--spacing-1);
        height: 20px;
      `;
    case "lg":
      return css`
        font-size: var(--font-size-md);
        padding: var(--spacing-1) var(--spacing-3);
        height: 32px;
      `;
    default: // md
      return css`
        font-size: var(--font-size-sm);
        padding: 0 var(--spacing-2);
        height: 24px;
      `;
  }
};

// 태그 모양에 따른 스타일
const getShapeStyles = (shape: ShapeVariant) => {
  switch (shape) {
    case "pill":
      return css`
        border-radius: var(--radius-full);
      `;
    case "square":
      return css`
        border-radius: var(--radius-sm);
      `;
    default: // rounded
      return css`
        border-radius: var(--radius-md);
      `;
  }
};

// 태그 컨테이너
export const TagWrapper = styled.div<TagStyledProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  max-width: 100%;
  transition: all 0.2s ease;
  user-select: none;

  /* 색상 변형 스타일 */
  ${(props) => getColorStyles(props.$color, props.$variant)}

  /* 크기 변형 스타일 */
  ${(props) => getSizeStyles(props.$size)}
  
  /* 모양 변형 스타일 */
  ${(props) => getShapeStyles(props.$shape)}
  
  /* 비활성화 스타일 */
  ${(props) =>
    props.$disabled &&
    css`
      opacity: 0.6;
      cursor: not-allowed;

      &:hover {
        filter: none;
      }
    `}
  
  /* 클릭 가능 스타일 */
  ${(props) =>
    props.$clickable &&
    !props.$disabled &&
    css`
      cursor: pointer;

      &:hover {
        filter: brightness(0.95);
      }

      &:active {
        filter: brightness(0.9);
      }
    `}
`;

// 아바타 컨테이너
export const Avatar = styled.span<{ $size: SizeVariant }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: var(--spacing-1);

  ${(props) => {
    switch (props.$size) {
      case "sm":
        return css`
          font-size: 12px;
          height: 16px;
          width: 16px;
        `;
      case "lg":
        return css`
          font-size: 18px;
          height: 24px;
          width: 24px;
        `;
      default: // md
        return css`
          font-size: 14px;
          height: 18px;
          width: 18px;
        `;
    }
  }}

  img, svg {
    max-width: 100%;
    max-height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

// 아이콘 컨테이너
export const Icon = styled.span<{ $size: SizeVariant }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: var(--spacing-1);

  ${(props) => {
    switch (props.$size) {
      case "sm":
        return css`
          font-size: 12px;
          height: 12px;
          width: 12px;
        `;
      case "lg":
        return css`
          font-size: 18px;
          height: 18px;
          width: 18px;
        `;
      default: // md
        return css`
          font-size: 14px;
          height: 14px;
          width: 14px;
        `;
    }
  }}

  svg {
    width: 100%;
    height: 100%;
  }
`;

// 텍스트 컨테이너
export const Text = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  min-width: 0;
`;

// 닫기 버튼
export const CloseButton = styled.button<{ $size: SizeVariant }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  margin-left: var(--spacing-1);
  color: currentColor;
  opacity: 0.7;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }

  &:focus {
    opacity: 1;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);

    [data-theme="dark"] & {
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2);
    }
  }

  ${(props) => {
    switch (props.$size) {
      case "sm":
        return css`
          width: 12px;
          height: 12px;
        `;
      case "lg":
        return css`
          width: 18px;
          height: 18px;
        `;
      default: // md
        return css`
          width: 14px;
          height: 14px;
        `;
    }
  }}

  svg {
    width: 100%;
    height: 100%;
  }
`;

// 태그 그룹 컨테이너
export const TagGroupWrapper = styled.div<{
  $spacing: NonNullable<TagGroupProps["spacing"]>;
  $wrap: boolean;
}>`
  display: flex;
  flex-wrap: ${(props) => (props.$wrap ? "wrap" : "nowrap")};

  /* 간격 설정 */
  ${(props) => {
    switch (props.$spacing) {
      case "sm":
        return css`
          gap: var(--spacing-1);
        `;
      case "lg":
        return css`
          gap: var(--spacing-3);
        `;
      default: // md
        return css`
          gap: var(--spacing-2);
        `;
    }
  }}

  /* 가로 스크롤 설정 */
  ${(props) =>
    !props.$wrap &&
    css`
      overflow-x: auto;
      white-space: nowrap;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: thin;

      &::-webkit-scrollbar {
        height: 4px;
      }

      &::-webkit-scrollbar-track {
        background: var(--color-neutral-100);

        [data-theme="dark"] & {
          background: var(--color-neutral-800);
        }
      }

      &::-webkit-scrollbar-thumb {
        background: var(--color-neutral-400);
        border-radius: var(--radius-full);

        [data-theme="dark"] & {
          background: var(--color-neutral-600);
        }
      }
    `}
`;

// ThemeProvider 없이 기본 테마 제공
TagWrapper.defaultProps = {
  theme: defaultTheme,
};

Avatar.defaultProps = {
  theme: defaultTheme,
};

Icon.defaultProps = {
  theme: defaultTheme,
};

Text.defaultProps = {
  theme: defaultTheme,
};

CloseButton.defaultProps = {
  theme: defaultTheme,
};

TagGroupWrapper.defaultProps = {
  theme: defaultTheme,
};
