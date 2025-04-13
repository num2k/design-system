import styled, { css } from "styled-components";
import { BadgeProps } from "./Badge";
import { defaultTheme } from "../theme/theme";

export const BadgeContainer = styled.span<{
  $variant?: BadgeProps["variant"];
  $color?: BadgeProps["color"];
  $size?: BadgeProps["size"];
  $shape?: BadgeProps["shape"];
  $dot?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  font-family: var(--font-family-sans);
  font-weight: var(--font-weight-medium);

  /* Size variants */
  ${(props) => {
    switch (props.$size) {
      case "xs":
        return css`
          font-size: var(--font-size-xs);
          padding: ${props.$dot ? "0" : "0 var(--spacing-1)"};
          height: ${props.$dot ? "6px" : "18px"};
          min-width: ${props.$dot ? "6px" : "18px"};
        `;
      case "sm":
        return css`
          font-size: var(--font-size-xs);
          padding: ${props.$dot ? "0" : "0 var(--spacing-2)"};
          height: ${props.$dot ? "8px" : "20px"};
          min-width: ${props.$dot ? "8px" : "20px"};
        `;
      case "md":
        return css`
          font-size: var(--font-size-sm);
          padding: ${props.$dot ? "0" : "0 var(--spacing-2)"};
          height: ${props.$dot ? "10px" : "24px"};
          min-width: ${props.$dot ? "10px" : "24px"};
        `;
      case "lg":
        return css`
          font-size: var(--font-size-sm);
          padding: ${props.$dot ? "0" : "0 var(--spacing-3)"};
          height: ${props.$dot ? "12px" : "28px"};
          min-width: ${props.$dot ? "12px" : "28px"};
        `;
      default:
        return css`
          font-size: var(--font-size-xs);
          padding: ${props.$dot ? "0" : "0 var(--spacing-2)"};
          height: ${props.$dot ? "8px" : "20px"};
          min-width: ${props.$dot ? "8px" : "20px"};
        `;
    }
  }}

  /* Shape styles */
  ${(props) => {
    switch (props.$shape) {
      case "pill":
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
  
  /* Display as dot */
  ${(props) =>
    props.$dot &&
    css`
      border-radius: var(--radius-full);
      padding: 0;
      overflow: hidden;
    `}
  
  /* Color and variant styles */
  ${(props) => {
    // 기본 색상 값은 primary
    const color = props.$color || "primary";

    switch (props.$variant) {
      case "solid":
        return css`
          background-color: var(--color-${color}-500);
          color: white;
        `;
      case "outline":
        return css`
          background-color: transparent;
          color: var(--color-${color}-700);
          border: 1px solid var(--color-${color}-500);
        `;
      case "light":
        return css`
          background-color: var(--color-${color}-100);
          color: var(--color-${color}-800);
        `;
      case "subtle":
        return css`
          background-color: var(--color-${color}-50);
          color: var(--color-${color}-700);
        `;
      default:
        return css`
          background-color: var(--color-${color}-500);
          color: white;
        `;
    }
  }}
  
  /* Add specific overrides for neutral color */
  ${(props) =>
    props.$color === "neutral" &&
    css`
      ${props.$variant === "solid" &&
      css`
        background-color: var(--color-neutral-600);
        color: white;
      `}
      ${props.$variant === "outline" &&
      css`
        color: var(--color-neutral-700);
        border-color: var(--color-neutral-400);
      `}
      ${props.$variant === "light" &&
      css`
        background-color: var(--color-neutral-200);
        color: var(--color-neutral-800);
      `}
      ${props.$variant === "subtle" &&
      css`
        background-color: var(--color-neutral-100);
        color: var(--color-neutral-700);
      `}
    `}
`;

BadgeContainer.defaultProps = {
  theme: defaultTheme,
};

export const BadgeIcon = styled.span`
  display: inline-flex;
  margin-right: 4px;

  & > svg {
    width: 1em;
    height: 1em;
  }
`;

BadgeIcon.defaultProps = {
  theme: defaultTheme,
};

export const BadgeContent = styled.span`
  display: inline-block;
  line-height: 1;
  vertical-align: middle;
`;

BadgeContent.defaultProps = {
  theme: defaultTheme,
};
