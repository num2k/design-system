import styled, { css } from "styled-components";
import { TabsProps } from "./Tabs";
import { defaultTheme } from "../theme/theme";

type TabsStyledProps = {
  $variant?: TabsProps["variant"];
  $placement?: TabsProps["placement"];
  $size?: TabsProps["size"];
  $fullWidth?: boolean;
};

export const TabsContainer = styled.div<TabsStyledProps>`
  display: flex;
  flex-direction: ${(props) => {
    if (props.$placement === "left") return "row";
    if (props.$placement === "right") return "row-reverse";
    if (props.$placement === "bottom") return "column-reverse";
    return "column"; // 기본값 top
  }};
  width: 100%;

  /* 변형에 따른 스타일 */
  ${(props) => {
    switch (props.$variant) {
      case "enclosed":
        return css`
          border: 1px solid var(--color-border-default);
          border-radius: var(--radius-md);
          overflow: hidden;

          [data-theme="dark"] & {
            border-color: var(--color-neutral-700);
          }
        `;
      default:
        return "";
    }
  }}
`;

export const TabsList = styled.div<TabsStyledProps>`
  position: relative;
  display: flex;
  flex-direction: ${(props) =>
    props.$placement === "left" || props.$placement === "right"
      ? "column"
      : "row"};
  ${(props) => props.$fullWidth && "width: 100%;"}

  /* 변형에 따른 스타일 */
  ${(props) => {
    switch (props.$variant) {
      case "default":
        return css`
          border-bottom: 1px solid var(--color-border-default);

          [data-theme="dark"] & {
            border-bottom-color: var(--color-neutral-700);
          }
        `;
      case "enclosed":
        return css`
          background-color: var(--color-background-secondary);

          ${props.$placement === "top" &&
          css`
            border-bottom: 1px solid var(--color-border-default);
          `}
          ${props.$placement === "bottom" &&
          css`
            border-top: 1px solid var(--color-border-default);
          `}
          ${props.$placement === "left" &&
          css`
            border-right: 1px solid var(--color-border-default);
          `}
          ${props.$placement === "right" &&
          css`
            border-left: 1px solid var(--color-border-default);
          `}
          
          [data-theme="dark"] & {
            background-color: var(--color-neutral-100);
            border-color: var(--color-neutral-700);
          }
        `;
      case "underline":
        return css`
          border-bottom: 1px solid var(--color-border-default);

          [data-theme="dark"] & {
            border-bottom-color: var(--color-neutral-700);
          }
        `;
      case "pills":
        return css`
          gap: var(--spacing-2);
          margin: var(--spacing-1) 0;
        `;
      default:
        return "";
    }
  }}
`;

export const TabButton = styled.button<
  TabsStyledProps & { $isActive: boolean }
>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  border: none;
  background: none;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  ${(props) => props.$fullWidth && "flex: 1;"}

  /* 크기에 따른 스타일 */
  ${(props) => {
    switch (props.$size) {
      case "sm":
        return css`
          padding: var(--spacing-1) var(--spacing-2);
          font-size: var(--font-size-xs);
        `;
      case "lg":
        return css`
          padding: var(--spacing-3) var(--spacing-4);
          font-size: var(--font-size-md);
        `;
      default: // md
        return css`
          padding: var(--spacing-2) var(--spacing-3);
          font-size: var(--font-size-sm);
        `;
    }
  }}
  
  /* 변형에 따른 스타일 */
  ${(props) => {
    switch (props.$variant) {
      case "default":
        return css`
          color: ${props.$isActive
            ? "var(--color-primary-600)"
            : "var(--color-text-primary)"};
          font-weight: ${props.$isActive
            ? "var(--font-weight-medium)"
            : "var(--font-weight-normal)"};

          &:hover:not(:disabled) {
            color: var(--color-primary-500);
          }

          &:focus {
            outline: none;
            box-shadow: 0 0 0 2px var(--color-primary-100);
          }

          [data-theme="dark"] & {
            color: ${props.$isActive
              ? "var(--color-primary-400)"
              : "var(--color-text-primary)"};

            &:hover:not(:disabled) {
              color: var(--color-primary-300);
            }

            &:focus {
              box-shadow: 0 0 0 2px var(--color-primary-800);
            }
          }
        `;
      case "enclosed":
        return css`
          color: ${props.$isActive
            ? "var(--color-primary-600)"
            : "var(--color-text-primary)"};
          font-weight: ${props.$isActive
            ? "var(--font-weight-medium)"
            : "var(--font-weight-normal)"};
          background-color: ${props.$isActive
            ? "var(--color-background-primary)"
            : "transparent"};

          &:hover:not(:disabled) {
            color: var(--color-primary-500);
            background-color: ${props.$isActive
              ? "var(--color-background-primary)"
              : "var(--color-neutral-100)"};
          }

          &:focus {
            outline: none;
            box-shadow: inset 0 0 0 2px var(--color-primary-100);
          }

          [data-theme="dark"] & {
            color: ${props.$isActive
              ? "var(--color-primary-400)"
              : "var(--color-text-primary)"};
            background-color: ${props.$isActive
              ? "var(--color-background-primary)"
              : "transparent"};

            &:hover:not(:disabled) {
              color: var(--color-primary-300);
              background-color: ${props.$isActive
                ? "var(--color-background-primary)"
                : "var(--color-neutral-200)"};
            }

            &:focus {
              box-shadow: inset 0 0 0 2px var(--color-primary-800);
            }
          }
        `;
      case "underline":
        return css`
          color: ${props.$isActive
            ? "var(--color-primary-600)"
            : "var(--color-text-primary)"};
          font-weight: ${props.$isActive
            ? "var(--font-weight-medium)"
            : "var(--font-weight-normal)"};

          &:hover:not(:disabled) {
            color: var(--color-primary-500);
          }

          &:focus {
            outline: none;
            box-shadow: 0 0 0 2px var(--color-primary-100);
          }

          [data-theme="dark"] & {
            color: ${props.$isActive
              ? "var(--color-primary-400)"
              : "var(--color-text-primary)"};

            &:hover:not(:disabled) {
              color: var(--color-primary-300);
            }

            &:focus {
              box-shadow: 0 0 0 2px var(--color-primary-800);
            }
          }
        `;
      case "pills":
        return css`
          color: ${props.$isActive
            ? "var(--color-neutral-50)"
            : "var(--color-text-primary)"};
          background-color: ${props.$isActive
            ? "var(--color-primary-600)"
            : "transparent"};
          border-radius: var(--radius-full);
          font-weight: ${props.$isActive
            ? "var(--font-weight-medium)"
            : "var(--font-weight-normal)"};

          &:hover:not(:disabled) {
            background-color: ${props.$isActive
              ? "var(--color-primary-700)"
              : "var(--color-neutral-100)"};
          }

          &:focus {
            outline: none;
            box-shadow: 0 0 0 2px var(--color-primary-100);
          }

          [data-theme="dark"] & {
            color: ${props.$isActive
              ? "var(--color-neutral-50)"
              : "var(--color-text-primary)"};
            background-color: ${props.$isActive
              ? "var(--color-primary-600)"
              : "transparent"};

            &:hover:not(:disabled) {
              background-color: ${props.$isActive
                ? "var(--color-primary-700)"
                : "var(--color-neutral-200)"};
            }

            &:focus {
              box-shadow: 0 0 0 2px var(--color-primary-800);
            }
          }
        `;
      default:
        return "";
    }
  }}
  
  /* 비활성화 스타일 */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const TabIcon = styled.span`
  display: flex;
  align-items: center;
  font-size: 1.2em;
`;

export const TabIndicator = styled.div<{
  $placement?: TabsProps["placement"];
  $animated?: boolean;
}>`
  position: absolute;
  background-color: var(--color-primary-500);
  transition: ${(props) => (props.$animated ? "all 0.2s ease-in-out" : "none")};

  ${(props) => {
    if (props.$placement === "left" || props.$placement === "right") {
      return css`
        width: 3px;
        left: ${props.$placement === "left" ? "auto" : "0"};
        right: ${props.$placement === "left" ? "0" : "auto"};
      `;
    }
    return css`
      height: 3px;
      bottom: ${props.$placement === "top" ? "0" : "auto"};
      top: ${props.$placement === "bottom" ? "0" : "auto"};
    `;
  }}

  [data-theme="dark"] & {
    background-color: var(--color-primary-400);
  }
`;

export const TabPanel = styled.div<{ $animated?: boolean }>`
  padding: var(--spacing-4);

  ${(props) =>
    props.$animated &&
    css`
      animation: fadeIn 0.2s ease-in-out;

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    `}
`;

// ThemeProvider 없이 기본 테마 제공
TabsContainer.defaultProps = {
  theme: defaultTheme,
};

TabsList.defaultProps = {
  theme: defaultTheme,
};

TabButton.defaultProps = {
  theme: defaultTheme,
};

TabIcon.defaultProps = {
  theme: defaultTheme,
};

TabIndicator.defaultProps = {
  theme: defaultTheme,
};

TabPanel.defaultProps = {
  theme: defaultTheme,
};
