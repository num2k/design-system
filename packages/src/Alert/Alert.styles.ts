import styled, { css, keyframes } from "styled-components";
import { AlertProps } from "./Alert";
import { defaultTheme } from "../theme/theme";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const StyledAlert = styled.div<{
  variant: AlertProps["variant"];
  status: AlertProps["status"];
}>`
  display: flex;
  align-items: flex-start;
  border-radius: var(--radius-md);
  padding: var(--spacing-4);
  gap: var(--spacing-3);
  animation: ${fadeIn} 0.2s ease-in-out;

  /* Status styles */
  ${(props) =>
    props.status === "info" &&
    css`
      background-color: var(--color-info-50);
      border-left: 4px solid var(--color-info-500);
      color: var(--color-neutral-900);
    `}

  ${(props) =>
    props.status === "success" &&
    css`
      background-color: var(--color-success-50);
      border-left: 4px solid var(--color-success-500);
      color: var(--color-neutral-900);
    `}
  
  ${(props) =>
    props.status === "warning" &&
    css`
      background-color: var(--color-warning-50);
      border-left: 4px solid var(--color-warning-500);
      color: var(--color-neutral-900);
    `}
  
  ${(props) =>
    props.status === "error" &&
    css`
      background-color: var(--color-error-50);
      border-left: 4px solid var(--color-error-500);
      color: var(--color-neutral-900);
    `}
    
  /* Variant styles */
  ${(props) =>
    props.variant === "solid" &&
    css`
      border-left: none;

      ${props.status === "info" &&
      css`
        background-color: var(--color-info-500);
        color: white;
      `}

      ${props.status === "success" &&
      css`
        background-color: var(--color-success-500);
        color: white;
      `}
      
      ${props.status === "warning" &&
      css`
        background-color: var(--color-warning-500);
        color: white;
      `}
      
      ${props.status === "error" &&
      css`
        background-color: var(--color-error-500);
        color: white;
      `}
    `}
    
  ${(props) =>
    props.variant === "outline" &&
    css`
      background-color: transparent;
      border: 1px solid;

      ${props.status === "info" &&
      css`
        border-color: var(--color-info-500);
      `}

      ${props.status === "success" &&
      css`
        border-color: var(--color-success-500);
      `}
      
      ${props.status === "warning" &&
      css`
        border-color: var(--color-warning-500);
      `}
      
      ${props.status === "error" &&
      css`
        border-color: var(--color-error-500);
      `}
    `}
`;

StyledAlert.defaultProps = {
  theme: defaultTheme,
};

export const AlertIcon = styled.div<{
  status: AlertProps["status"];
  variant: AlertProps["variant"];
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  ${(props) =>
    props.variant === "default" &&
    css`
      color: ${props.status === "info"
        ? "var(--color-info-500)"
        : props.status === "success"
        ? "var(--color-success-500)"
        : props.status === "warning"
        ? "var(--color-warning-500)"
        : "var(--color-error-500)"};
    `}

  ${(props) =>
    props.variant === "solid" &&
    css`
      color: white;
    `}
    
  ${(props) =>
    props.variant === "outline" &&
    css`
      color: ${props.status === "info"
        ? "var(--color-info-500)"
        : props.status === "success"
        ? "var(--color-success-500)"
        : props.status === "warning"
        ? "var(--color-warning-500)"
        : "var(--color-error-500)"};
    `}
`;

AlertIcon.defaultProps = {
  theme: defaultTheme,
};

export const AlertContent = styled.div`
  flex: 1;
`;

AlertContent.defaultProps = {
  theme: defaultTheme,
};

export const AlertTitle = styled.div`
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-1);
`;

AlertTitle.defaultProps = {
  theme: defaultTheme,
};

export const AlertDescription = styled.div`
  font-size: var(--font-size-sm);
`;

AlertDescription.defaultProps = {
  theme: defaultTheme,
};

export const AlertCloseButton = styled.button<{
  variant: AlertProps["variant"];
}>`
  background: none;
  border: none;
  padding: var(--spacing-1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  flex-shrink: 0;
  opacity: 0.7;
  transition: opacity var(--transition-duration-fast);
  color: ${(props) =>
    props.variant === "solid" ? "white" : "var(--color-neutral-700)"};

  &:hover {
    opacity: 1;
  }

  &:focus-visible {
    outline: var(--focus-ring-width) solid var(--focus-ring-color);
    outline-offset: var(--focus-ring-offset);
  }
`;

AlertCloseButton.defaultProps = {
  theme: defaultTheme,
};

export const AlertActions = styled.div`
  display: flex;
  gap: var(--spacing-2);
  margin-top: var(--spacing-2);
`;

AlertActions.defaultProps = {
  theme: defaultTheme,
};
