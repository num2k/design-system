import styled, { css } from "styled-components";
import { defaultTheme } from "../theme/theme";

export const InputWrapper = styled.div<{
  $fullWidth?: boolean;
}>`
  position: relative;
  width: ${(props) => (props.$fullWidth ? "100%" : "auto")};
`;

InputWrapper.defaultProps = {
  theme: defaultTheme,
};

export const InputContainer = styled.div<{
  $disabled?: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  opacity: ${(props) => (props.$disabled ? "0.6" : "1")};
`;

InputContainer.defaultProps = {
  theme: defaultTheme,
};

export const StyledInput = styled.input<{
  $variant?: "default" | "filled" | "flushed";
  $inputSize?: "sm" | "md" | "lg";
  $isError?: boolean;
  $isSuccess?: boolean;
  $hasLeftIcon?: boolean;
  $hasRightIcon?: boolean;
}>`
  width: 100%;
  font-family: ${(props) =>
    props.theme?.typography?.fontFamily?.sans || "var(--font-family-sans)"};
  background-color: ${(props) =>
    props.theme?.colors?.background?.primary ||
    "var(--color-background-primary, #f9fafb)"};
  color: ${(props) =>
    props.theme?.colors?.text?.primary || "var(--color-text-primary, #111827)"};
  border: 1px solid
    ${(props) =>
      props.$isError
        ? props.theme?.colors?.error?.[500] || "var(--color-error-500, #ef4444)"
        : props.theme?.colors?.border?.default ||
          "var(--color-border-default, #d1d5db)"};
  outline: none;
  transition: all 0.2s ease-in-out;

  /* 아이콘에 따른 패딩 조정 */
  padding-left: ${(props) => (props.$hasLeftIcon ? "2.5rem" : "0.75rem")};
  padding-right: ${(props) => (props.$hasRightIcon ? "2.5rem" : "0.75rem")};

  &:focus {
    border-color: ${(props) =>
      props.$isError
        ? props.theme?.colors?.error?.[500] || "var(--color-error-500, #ef4444)"
        : props.theme?.colors?.primary?.[500] ||
          "var(--color-primary-500, #3b82f6)"};
    box-shadow: 0 0 0 2px
      ${(props) =>
        props.$isError
          ? props.theme?.colors?.error?.[100] ||
            "var(--color-error-100, #fee2e2)"
          : props.theme?.colors?.primary?.[100] ||
            "var(--color-primary-100, #dbeafe)"};
  }

  &:disabled {
    background-color: ${(props) =>
      props.theme?.colors?.neutral?.[100] ||
      "var(--color-neutral-100, #f3f4f6)"};
    color: ${(props) =>
      props.theme?.colors?.text?.disabled ||
      "var(--color-text-disabled, #9ca3af)"};
    cursor: not-allowed;
  }

  /* 크기별 스타일 */
  ${(props) => {
    switch (props.$inputSize) {
      case "sm":
        return css`
          height: 32px;
          font-size: ${props.theme?.typography?.fontSize?.sm ||
          "var(--font-size-sm, 0.875rem)"};
          border-radius: ${props.theme?.radii?.sm ||
          "var(--radius-sm, 0.125rem)"};
        `;
      case "lg":
        return css`
          height: 48px;
          font-size: ${props.theme?.typography?.fontSize?.lg ||
          "var(--font-size-lg, 1.125rem)"};
          border-radius: ${props.theme?.radii?.md ||
          "var(--radius-md, 0.25rem)"};
        `;
      default: // md
        return css`
          height: 40px;
          font-size: ${props.theme?.typography?.fontSize?.md ||
          "var(--font-size-md, 1rem)"};
          border-radius: ${props.theme?.radii?.md ||
          "var(--radius-md, 0.25rem)"};
        `;
    }
  }}

  /* 변형별 스타일 */
  ${(props) => {
    switch (props.$variant) {
      case "filled":
        return css`
          background-color: ${props.theme?.colors?.neutral?.[100] ||
          "var(--color-neutral-100, #f3f4f6)"};

          &:focus {
            background-color: ${props.theme?.colors?.background?.primary ||
            "var(--color-background-primary, #f9fafb)"};
          }
        `;
      case "flushed":
        return css`
          border-width: 0;
          border-radius: 0;
          border-bottom-width: 1px;

          &:focus {
            box-shadow: 0 1px 0 0
              ${props.$isError
                ? props.theme?.colors?.error?.[500] ||
                  "var(--color-error-500, #ef4444)"
                : props.theme?.colors?.primary?.[500] ||
                  "var(--color-primary-500, #3b82f6)"};
          }
        `;
      default: // default
        return css`
          background-color: ${props.theme?.colors?.background?.primary ||
          "var(--color-background-primary, #f9fafb)"};
        `;
    }
  }}

  /* 성공 상태 스타일 */
  ${(props) =>
    props.$isSuccess &&
    css`
      border-color: ${props.theme?.colors?.success?.[500] ||
      "var(--color-success-500)"};

      &:focus {
        border-color: ${props.theme?.colors?.success?.[500] ||
        "var(--color-success-500)"};
        box-shadow: 0 0 0 2px
          ${props.theme?.colors?.success?.[100] || "var(--color-success-100)"};
      }
    `}
`;

StyledInput.defaultProps = {
  theme: defaultTheme,
};

export const InputIcon = styled.span<{
  $position: "left" | "right";
  $inputSize?: "sm" | "md" | "lg";
}>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-neutral-500);
  pointer-events: none;

  ${(props) =>
    props.$position === "left"
      ? css`
          left: ${props.$inputSize === "sm" ? "8px" : "12px"};
        `
      : css`
          right: ${props.$inputSize === "sm" ? "8px" : "12px"};
        `}

  ${(props) => {
    switch (props.$inputSize) {
      case "sm":
        return css`
          width: 16px;
          height: 16px;
          font-size: var(--font-size-xs);
        `;
      case "lg":
        return css`
          width: 24px;
          height: 24px;
          font-size: var(--font-size-lg);
        `;
      default:
        return css`
          width: 20px;
          height: 20px;
          font-size: var(--font-size-md);
        `;
    }
  }}
  
  & > svg {
    width: 100%;
    height: 100%;
  }

  [data-theme="dark"] & {
    color: var(--color-neutral-400);
  }
`;

InputIcon.defaultProps = {
  theme: defaultTheme,
};

export const InputHelperText = styled.div<{
  $isError?: boolean;
  $isSuccess?: boolean;
}>`
  margin-top: var(--spacing-1);
  font-size: var(--font-size-xs);

  ${(props) => {
    if (props.$isError) {
      return css`
        color: var(--color-error-600);

        [data-theme="dark"] & {
          color: var(--color-error-400);
        }
      `;
    } else if (props.$isSuccess) {
      return css`
        color: var(--color-success-600);

        [data-theme="dark"] & {
          color: var(--color-success-400);
        }
      `;
    } else {
      return css`
        color: var(--color-neutral-600);

        [data-theme="dark"] & {
          color: var(--color-neutral-400);
        }
      `;
    }
  }}
`;

InputHelperText.defaultProps = {
  theme: defaultTheme,
};
