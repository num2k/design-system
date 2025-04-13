import styled, { css } from "styled-components";
import { AccordionProps, AccordionItemProps } from "./Accordion";
import { defaultTheme } from "../theme/theme";

export const AccordionContainer = styled.div<{
  variant?: AccordionProps["variant"];
}>`
  width: 100%;

  /* Variant styles */
  ${(props) =>
    props.variant === "default" &&
    css`
      border: none;
    `}

  ${(props) =>
    props.variant === "bordered" &&
    css`
      border: 1px solid var(--color-neutral-200);
      border-radius: var(--radius-md);
      overflow: hidden;
    `}
    
  ${(props) =>
    props.variant === "separated" &&
    css`
      border: none;
      & > * + * {
        margin-top: var(--spacing-2);
      }
    `}
`;

AccordionContainer.defaultProps = {
  theme: defaultTheme,
};

export const AccordionItemContainer = styled.div<{
  isLast?: boolean;
  isOpen?: boolean;
  disabled?: boolean;
  variant?: AccordionProps["variant"];
}>`
  ${(props) =>
    props.variant === "bordered" &&
    !props.isLast &&
    css`
      border-bottom: 1px solid var(--color-neutral-200);
    `}

  ${(props) =>
    props.variant === "separated" &&
    css`
      border: 1px solid var(--color-neutral-200);
      border-radius: var(--radius-md);
      overflow: hidden;
      background-color: white;
    `}
    
  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.6;
    `}
`;

AccordionItemContainer.defaultProps = {
  theme: defaultTheme,
};

export const AccordionHeader = styled.button<{
  $isOpen?: boolean;
  disabled?: boolean;
  size?: AccordionProps["size"];
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: none;
  border: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  text-align: left;
  font-family: var(--font-family-sans);
  color: var(--color-neutral-900);
  transition: background-color var(--transition-duration-fast);

  /* Size styles */
  ${(props) =>
    props.size === "sm" &&
    css`
      padding: var(--spacing-2) var(--spacing-3);
      font-size: var(--font-size-sm);
    `}

  ${(props) =>
    props.size === "md" &&
    css`
      padding: var(--spacing-3) var(--spacing-4);
      font-size: var(--font-size-md);
    `}
    
  ${(props) =>
    props.size === "lg" &&
    css`
      padding: var(--spacing-4) var(--spacing-5);
      font-size: var(--font-size-lg);
    `}

  &:hover:not(:disabled) {
    background-color: var(--color-neutral-50);
  }

  &:focus-visible {
    outline: var(--focus-ring-width) solid var(--focus-ring-color);
    outline-offset: var(--focus-ring-offset);
    z-index: 1;
  }

  ${(props) =>
    props.$isOpen &&
    css`
      background-color: var(--color-neutral-50);
    `}
`;

AccordionHeader.defaultProps = {
  theme: defaultTheme,
};

export const AccordionPanel = styled.section<{
  $isOpen: boolean;
  size?: AccordionProps["size"];
}>`
  overflow: hidden;
  height: ${(props) => (props.$isOpen ? "auto" : "0")};
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  transition: height var(--transition-duration-normal) ease-in-out,
    visibility var(--transition-duration-normal) ease-in-out;
`;

AccordionPanel.defaultProps = {
  theme: defaultTheme,
};

export const AccordionContent = styled.div<{
  size?: AccordionProps["size"];
}>`
  color: var(--color-neutral-700);

  /* Size styles */
  ${(props) =>
    props.size === "sm" &&
    css`
      padding: var(--spacing-2) var(--spacing-3);
      font-size: var(--font-size-sm);
    `}

  ${(props) =>
    props.size === "md" &&
    css`
      padding: var(--spacing-3) var(--spacing-4);
      font-size: var(--font-size-md);
    `}
    
  ${(props) =>
    props.size === "lg" &&
    css`
      padding: var(--spacing-4) var(--spacing-5);
      font-size: var(--font-size-lg);
    `}
`;

AccordionContent.defaultProps = {
  theme: defaultTheme,
};

export const AccordionIcon = styled.span<{ $isOpen?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform var(--transition-duration-fast);

  ${(props) =>
    props.$isOpen &&
    css`
      transform: rotate(180deg);
    `}
`;

AccordionContent.defaultProps = {
  theme: defaultTheme,
};

export const AccordionTitle = styled.span`
  flex: 1;
  font-weight: var(--font-weight-medium);
`;

AccordionTitle.defaultProps = {
  theme: defaultTheme,
};

export const AccordionHeading = styled.h3`
  margin: 0;
  padding: 0;
`;

AccordionHeading.defaultProps = {
  theme: defaultTheme,
};
