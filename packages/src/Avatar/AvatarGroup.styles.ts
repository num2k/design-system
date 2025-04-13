import styled, { css } from "styled-components";
import { AvatarGroupProps } from "./AvatarGroup";
import { AvatarProps } from "./Avatar";
import { defaultTheme } from "../theme/theme";

export const AvatarGroupContainer = styled.div<{
  $spacing?: AvatarGroupProps["spacing"];
  $direction?: AvatarGroupProps["direction"];
  $max?: AvatarGroupProps["max"];
}>`
  display: inline-flex;
  align-items: center;
  flex-direction: ${(props) =>
    props.$direction === "vertical" ? "column" : "row"};

  ${(props) =>
    props.$direction === "horizontal" &&
    css`
      & > *:not(:first-child) {
        margin-left: -${props.$spacing || "8px"};
      }
    `}

  ${(props) =>
    props.$direction === "vertical" &&
    css`
      & > *:not(:first-child) {
        margin-top: -${props.$spacing || "8px"};
      }
    `}
`;

export const AvatarCounter = styled.div<{
  $size?: AvatarProps["size"];
  $shape?: AvatarProps["shape"];
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-neutral-100);
  color: var(--color-neutral-700);
  position: relative;
  overflow: hidden;
  font-weight: var(--font-weight-medium);

  /* Size styles as string */
  ${(props) => {
    if (typeof props.$size === "string") {
      switch (props.$size) {
        case "xs":
          return css`
            width: 24px;
            height: 24px;
            font-size: var(--font-size-xs);
          `;
        case "sm":
          return css`
            width: 32px;
            height: 32px;
            font-size: var(--font-size-sm);
          `;
        case "md":
          return css`
            width: 40px;
            height: 40px;
            font-size: var(--font-size-md);
          `;
        case "lg":
          return css`
            width: 48px;
            height: 48px;
            font-size: var(--font-size-lg);
          `;
        case "xl":
          return css`
            width: 64px;
            height: 64px;
            font-size: var(--font-size-xl);
          `;
        default:
          return css`
            width: 40px;
            height: 40px;
            font-size: var(--font-size-md);
          `;
      }
    } else if (typeof props.$size === "number") {
      return css`
        width: ${props.$size}px;
        height: ${props.$size}px;
        font-size: calc(${props.$size}px * 0.4);
      `;
    }
  }}

  /* Shape styles */
  ${(props) => {
    switch (props.$shape) {
      case "circle":
        return css`
          border-radius: var(--radius-full);
        `;
      case "square":
        return css`
          border-radius: var(--radius-sm);
        `;
      case "rounded":
        return css`
          border-radius: var(--radius-md);
        `;
      default:
        return css`
          border-radius: var(--radius-full);
        `;
    }
  }}
  
  border: 2px solid white;
`;

// ThemeProvider 없이 기본 테마 제공
AvatarGroupContainer.defaultProps = {
  theme: defaultTheme,
};
AvatarCounter.defaultProps = {
  theme: defaultTheme,
};
