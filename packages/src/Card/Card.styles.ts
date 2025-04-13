import styled, { css } from "styled-components";
import { CardProps } from "./Card";
import { defaultTheme } from "../theme/theme";

export const CardContainer = styled.div<{
  $variant?: CardProps["variant"];
  $radius?: CardProps["radius"];
  $padding?: CardProps["padding"];
  $fullWidth?: boolean;
  $fullHeight?: boolean;
  $clickable?: boolean;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: var(--color-background-primary, white);
  transition: all 0.2s ease-in-out;

  /* Variant styles */
  ${(props) => {
    switch (props.$variant) {
      case "outlined":
        return css`
          border: 1px solid var(--color-neutral-200);
          background-color: transparent;

          [data-theme="dark"] & {
            border-color: var(--color-neutral-700);
          }
        `;
      case "elevated":
        return css`
          box-shadow: var(--shadow-md);

          [data-theme="dark"] & {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          }
        `;
      default: // default variant
        return css`
          border: none;
          background-color: var(--color-background-primary, white);
          box-shadow: var(--shadow-sm);

          [data-theme="dark"] & {
            background-color: var(--color-neutral-800);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          }
        `;
    }
  }}

  /* Border radius */
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
      case "lg":
        return css`
          border-radius: var(--radius-lg);
        `;
      case "full":
        return css`
          border-radius: var(--radius-full);
        `;
      default: // md
        return css`
          border-radius: var(--radius-md);
        `;
    }
  }}

  /* Padding */
  ${(props) => {
    const padding = props.$padding;
    // 이미지를 포함한 카드일 경우 패딩은 컨텐츠에만 적용하므로 여기서는 생략
    if (padding === "none") {
      return css`
        padding: 0;
      `;
    }
  }}

  /* Size */
  width: ${(props) => (props.$fullWidth ? "100%" : "auto")};
  height: ${(props) => (props.$fullHeight ? "100%" : "auto")};

  /* Clickable */
  ${(props) =>
    props.$clickable &&
    css`
      cursor: pointer;
      user-select: none;

      &:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);

        [data-theme="dark"] & {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
        }
      }

      &:active {
        transform: translateY(0);
      }

      &:focus-visible {
        outline: 2px solid var(--color-primary-500);
        outline-offset: 2px;

        [data-theme="dark"] & {
          outline-color: var(--color-primary-400);
        }
      }
    `}

  /* 다크모드 기본 스타일 */
  [data-theme="dark"] & {
    background-color: var(
      --color-background-secondary,
      var(--color-neutral-800)
    );
    color: var(--color-text-primary);
  }
`;

export const CardImage = styled.div`
  width: 100%;
  overflow: hidden;

  img {
    width: 100%;
    display: block;
    object-fit: cover;
  }

  /* 이미지가 처음에 오는 경우 아래쪽 radius 제거 */
  &:first-child img {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  [data-theme="dark"] & img {
    filter: brightness(0.9);
  }
`;

export const CardHeader = styled.div<{ $padding?: CardProps["padding"] }>`
  ${(props) => {
    switch (props.$padding) {
      case "none":
        return css`
          padding: 0;
        `;
      case "sm":
        return css`
          padding: var(--spacing-2);
        `;
      case "lg":
        return css`
          padding: var(--spacing-4);
        `;
      default: // md
        return css`
          padding: var(--spacing-3);
        `;
    }
  }}
  border-bottom: 1px solid var(--color-neutral-100);

  [data-theme="dark"] & {
    border-bottom-color: var(--color-neutral-700);
  }
`;

export const CardTitle = styled.div<{ $padding?: CardProps["padding"] }>`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary, var(--color-neutral-900));

  ${(props) => {
    switch (props.$padding) {
      case "none":
        return css`
          padding: 0;
        `;
      case "sm":
        return css`
          padding: var(--spacing-2) var(--spacing-2) 0;
        `;
      case "lg":
        return css`
          padding: var(--spacing-4) var(--spacing-4) 0;
        `;
      default: // md
        return css`
          padding: var(--spacing-3) var(--spacing-3) 0;
        `;
    }
  }}

  [data-theme="dark"] & {
    color: var(--color-text-primary, var(--color-neutral-100));
  }
`;

export const CardContent = styled.div<{ $padding?: CardProps["padding"] }>`
  flex: 1;
  color: var(--color-text-primary);

  ${(props) => {
    switch (props.$padding) {
      case "none":
        return css`
          padding: 0;
        `;
      case "sm":
        return css`
          padding: var(--spacing-2);
        `;
      case "lg":
        return css`
          padding: var(--spacing-4);
        `;
      default: // md
        return css`
          padding: var(--spacing-3);
        `;
    }
  }}

  [data-theme="dark"] & {
    color: var(--color-text-primary, var(--color-neutral-300));
  }
`;

export const CardFooter = styled.div<{ $padding?: CardProps["padding"] }>`
  display: flex;
  align-items: center;
  border-top: 1px solid var(--color-neutral-100);

  ${(props) => {
    switch (props.$padding) {
      case "none":
        return css`
          padding: 0;
        `;
      case "sm":
        return css`
          padding: var(--spacing-2);
        `;
      case "lg":
        return css`
          padding: var(--spacing-4);
        `;
      default: // md
        return css`
          padding: var(--spacing-3);
        `;
    }
  }}

  [data-theme="dark"] & {
    border-top-color: var(--color-neutral-700);
  }
`;

// ThemeProvider 없이 기본 테마 제공
CardContainer.defaultProps = {
  theme: defaultTheme,
};

// 모든 스타일드 컴포넌트에 기본 테마 제공
CardImage.defaultProps = {
  theme: defaultTheme,
};

CardHeader.defaultProps = {
  theme: defaultTheme,
};

CardTitle.defaultProps = {
  theme: defaultTheme,
};

CardContent.defaultProps = {
  theme: defaultTheme,
};

CardFooter.defaultProps = {
  theme: defaultTheme,
};
