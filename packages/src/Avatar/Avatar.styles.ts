import styled, { css } from "styled-components";
import { AvatarProps } from "./Avatar";
import { defaultTheme } from "../theme/theme";

export const AvatarContainer = styled.div<{
  $size?: AvatarProps["size"];
  $shape?: AvatarProps["shape"];
  $status?: AvatarProps["status"];
  $bordered?: boolean;
  $isClickable?: boolean;
  $bgColor?: string;
}>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background-color: ${(props) => props.$bgColor || "var(--color-neutral-200)"};
  color: var(--color-neutral-700);
  font-family: var(--font-family-sans);
  font-weight: var(--font-weight-medium);
  overflow: hidden;
  user-select: none;
  vertical-align: middle;

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
    
  /* Bordered style */
  ${(props) =>
    props.$bordered &&
    css`
      border: 2px solid white;
      box-shadow: 0 0 0 1px var(--color-neutral-200);
    `}

  /* Clickable style */
  ${(props) =>
    props.$isClickable &&
    css`
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      &:active {
        transform: translateY(0);
      }
    `}
`;

AvatarContainer.defaultProps = {
  theme: defaultTheme,
};

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

AvatarImage.defaultProps = {
  theme: defaultTheme,
};

export const AvatarInitials = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-transform: uppercase;
`;

AvatarInitials.defaultProps = {
  theme: defaultTheme,
};

export const AvatarIcon = styled.svg`
  width: 60%;
  height: 60%;
`;

AvatarIcon.defaultProps = {
  theme: defaultTheme,
};

export const AvatarStatus = styled.span<{
  $status?: AvatarProps["status"];
  $size?: AvatarProps["size"];
}>`
  position: absolute;
  bottom: 0;
  right: 0;
  width: ${(props) => {
    if (typeof props.$size === "number") {
      return `${props.$size * 0.3}px`;
    }

    switch (props.$size) {
      case "xs":
        return "8px";
      case "sm":
        return "10px";
      case "md":
        return "12px";
      case "lg":
        return "12px";
      case "xl":
        return "14px";
      default:
        return "12px";
    }
  }};
  height: ${(props) => {
    if (typeof props.$size === "number") {
      return `${props.$size * 0.3}px`;
    }

    switch (props.$size) {
      case "xs":
        return "8px";
      case "sm":
        return "10px";
      case "md":
        return "12px";
      case "lg":
        return "12px";
      case "xl":
        return "14px";
      default:
        return "12px";
    }
  }};
  border-radius: 50%;
  border: 2px solid white;

  ${(props) => {
    switch (props.$status) {
      case "online":
        return css`
          background-color: var(--color-success-500);
        `;
      case "busy":
        return css`
          background-color: var(--color-error-500);
        `;
      case "away":
        return css`
          background-color: var(--color-warning-500);
        `;
      case "offline":
        return css`
          background-color: var(--color-neutral-400);
        `;
      default:
        return css`
          display: none;
        `;
    }
  }}
`;

AvatarStatus.defaultProps = {
  theme: defaultTheme,
};
