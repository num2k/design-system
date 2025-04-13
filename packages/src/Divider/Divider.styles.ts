import styled, { css } from "styled-components";
import { DividerProps } from "./Divider";
import { defaultTheme } from "../theme/theme";

export const DividerContainer = styled.div<{
  $orientation?: DividerProps["orientation"];
  $size?: DividerProps["size"];
  $color?: DividerProps["color"];
  $variant?: DividerProps["variant"];
  $spacing?: DividerProps["spacing"];
  $align?: DividerProps["align"];
}>`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0;

  /* 가로 방향 */
  ${(props) =>
    props.$orientation === "horizontal" &&
    css`
      flex-direction: row;

      /* 간격 */
      ${() => {
        switch (props.$spacing) {
          case "xs":
            return css`
              margin: var(--spacing-1) 0;
            `;
          case "sm":
            return css`
              margin: var(--spacing-2) 0;
            `;
          case "md":
            return css`
              margin: var(--spacing-4) 0;
            `;
          case "lg":
            return css`
              margin: var(--spacing-6) 0;
            `;
          case "xl":
            return css`
              margin: var(--spacing-8) 0;
            `;
          default:
            return css`
              margin: var(--spacing-4) 0;
            `;
        }
      }}
    `}

  /* 세로 방향 */
  ${(props) =>
    props.$orientation === "vertical" &&
    css`
      flex-direction: column;
      height: 100%;
      width: auto;

      /* 간격 */
      ${() => {
        switch (props.$spacing) {
          case "xs":
            return css`
              margin: 0 var(--spacing-1);
            `;
          case "sm":
            return css`
              margin: 0 var(--spacing-2);
            `;
          case "md":
            return css`
              margin: 0 var(--spacing-4);
            `;
          case "lg":
            return css`
              margin: 0 var(--spacing-6);
            `;
          case "xl":
            return css`
              margin: 0 var(--spacing-8);
            `;
          default:
            return css`
              margin: 0 var(--spacing-4);
            `;
        }
      }}
    `}
`;

export const Line = styled.hr<{
  $orientation?: DividerProps["orientation"];
  $size?: DividerProps["size"];
  $color?: DividerProps["color"];
  $variant?: DividerProps["variant"];
  $align?: DividerProps["align"];
}>`
  border: none;
  flex-shrink: 0;

  /* 가로 방향 */
  ${(props) =>
    props.$orientation === "horizontal" &&
    css`
      width: 100%;

      /* 정렬 */
      ${props.$align === "left" &&
      css`
        margin-right: auto;
      `}

      ${props.$align === "center" &&
      css`
        margin: 0 auto;
      `}
    
    ${props.$align === "right" &&
      css`
        margin-left: auto;
      `}
    
    /* 두께 */
    ${() => {
        switch (props.$size) {
          case "xs":
            return css`
              height: 1px;
            `;
          case "sm":
            return css`
              height: 2px;
            `;
          case "md":
            return css`
              height: 3px;
            `;
          case "lg":
            return css`
              height: 4px;
            `;
          case "xl":
            return css`
              height: 6px;
            `;
          default:
            return css`
              height: 1px;
            `;
        }
      }}
    `}

  /* 세로 방향 */
  ${(props) =>
    props.$orientation === "vertical" &&
    css`
      height: 100%;

      /* 두께 */
      ${() => {
        switch (props.$size) {
          case "xs":
            return css`
              width: 1px;
            `;
          case "sm":
            return css`
              width: 2px;
            `;
          case "md":
            return css`
              width: 3px;
            `;
          case "lg":
            return css`
              width: 4px;
            `;
          case "xl":
            return css`
              width: 6px;
            `;
          default:
            return css`
              width: 1px;
            `;
        }
      }}
    `}
  
  /* 색상 */
  background-color: ${(props) => {
    if (props.$color) {
      if (props.$color.startsWith("#") || props.$color.startsWith("rgb")) {
        return props.$color;
      }
      return `var(--color-${props.$color}-${
        props.$variant === "light" ? "200" : "500"
      })`;
    }
    return `var(--color-neutral-${props.$variant === "light" ? "200" : "300"})`;
  }};

  /* 스타일 변형 */
  ${(props) =>
    props.$variant === "dashed" &&
    css`
      background-color: transparent;
      ${props.$orientation === "horizontal"
        ? css`
            background-image: linear-gradient(
              to right,
              ${props.$color
                  ? `var(--color-${props.$color}-500)`
                  : "var(--color-neutral-300)"}
                50%,
              transparent 50%
            );
            background-size: 16px 1px;
            background-repeat: repeat-x;
          `
        : css`
            background-image: linear-gradient(
              to bottom,
              ${props.$color
                  ? `var(--color-${props.$color}-500)`
                  : "var(--color-neutral-300)"}
                50%,
              transparent 50%
            );
            background-size: 1px 16px;
            background-repeat: repeat-y;
          `}
    `}

  ${(props) =>
    props.$variant === "dotted" &&
    css`
      background-color: transparent;
      ${props.$orientation === "horizontal"
        ? css`
            background-image: linear-gradient(
              to right,
              ${props.$color
                  ? `var(--color-${props.$color}-500)`
                  : "var(--color-neutral-300)"}
                50%,
              transparent 50%
            );
            background-size: 4px 1px;
            background-repeat: repeat-x;
          `
        : css`
            background-image: linear-gradient(
              to bottom,
              ${props.$color
                  ? `var(--color-${props.$color}-500)`
                  : "var(--color-neutral-300)"}
                50%,
              transparent 50%
            );
            background-size: 1px 4px;
            background-repeat: repeat-y;
          `}
    `}
`;

export const DividerLabel = styled.div<{
  $orientation?: DividerProps["orientation"];
  $align?: DividerProps["align"];
}>`
  padding: 0 var(--spacing-2);
  white-space: nowrap;
  font-size: var(--font-size-sm);
  color: var(--color-neutral-600);

  ${(props) =>
    props.$orientation === "horizontal" &&
    css`
      /* 정렬 */
      ${props.$align === "left" &&
      css`
        padding-left: 0;
      `}

      ${props.$align === "right" &&
      css`
        padding-right: 0;
      `}
    `}

  ${(props) =>
    props.$orientation === "vertical" &&
    css`
      padding: var(--spacing-2) 0;
      writing-mode: vertical-rl;
    `}
`;

export const DividerWithLabel = styled.div<{
  $orientation?: DividerProps["orientation"];
  $align?: DividerProps["align"];
}>`
  display: flex;
  align-items: center;
  width: 100%;

  ${(props) =>
    props.$orientation === "horizontal" &&
    css`
      flex-direction: row;

      /* 정렬 */
      ${props.$align === "left" &&
      css`
        & > ${Line}:first-of-type {
          width: auto;
          min-width: 24px;
          max-width: 48px;
        }

        & > ${Line}:last-of-type {
          flex-grow: 1;
        }
      `}

      ${props.$align === "center" &&
      css`
        & > ${Line} {
          flex-grow: 1;
        }
      `}
    
    ${props.$align === "right" &&
      css`
        & > ${Line}:first-of-type {
          flex-grow: 1;
        }

        & > ${Line}:last-of-type {
          width: auto;
          min-width: 24px;
          max-width: 48px;
        }
      `}
    `}

  ${(props) =>
    props.$orientation === "vertical" &&
    css`
      flex-direction: column;
      height: 100%;
      width: auto;

      & > ${Line} {
        flex-grow: 1;
      }
    `}
`;

// ThemeProvider 없이 기본 테마 제공
DividerContainer.defaultProps = {
  theme: defaultTheme,
};

Line.defaultProps = {
  theme: defaultTheme,
};

DividerLabel.defaultProps = {
  theme: defaultTheme,
};

DividerWithLabel.defaultProps = {
  theme: defaultTheme,
};
