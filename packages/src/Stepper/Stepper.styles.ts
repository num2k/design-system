import styled, { css } from "styled-components";
import { StepperProps, StepProps } from "./Stepper";
import { defaultTheme } from "../theme/theme";

export const StepperContainer = styled.div<{
  $orientation?: StepperProps["orientation"];
  $alternativeLabel?: boolean;
  $variant?: StepperProps["variant"];
}>`
  display: flex;
  position: relative;

  /* 방향 설정 */
  ${(props) =>
    props.$orientation === "vertical"
      ? css`
          flex-direction: column;
          align-items: flex-start;
        `
      : css`
          flex-direction: row;
          align-items: center;
          ${props.$alternativeLabel &&
          css`
            flex-wrap: wrap;
            justify-content: space-between;
          `}
        `}

  /* 변형 설정 */
  ${(props) => {
    switch (props.$variant) {
      case "outlined":
        return css`
          padding: var(--spacing-4);
          border: 1px solid var(--color-neutral-200);
          border-radius: var(--radius-md);
        `;
      case "contained":
        return css`
          padding: var(--spacing-4);
          background: var(--color-neutral-50);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
        `;
      default:
        return css``;
    }
  }}
`;

export const StepContainer = styled.div<{
  $isActive?: boolean;
  $isCompleted?: boolean;
  $isDisabled?: boolean;
  $isClickable?: boolean;
  $orientation?: StepperProps["orientation"];
  $spacing?: StepperProps["spacing"];
  $isLastStep?: boolean;
}>`
  display: flex;
  flex-direction: column;
  position: relative;

  /* 방향에 따른 스타일 조정 */
  ${(props) =>
    props.$orientation === "horizontal"
      ? css`
          flex: ${props.$spacing === "auto" ? "1 1 0" : "unset"};
          margin-right: ${!props.$isLastStep ? props.$spacing : undefined};
          align-items: ${props.$spacing === "auto" ? "center" : "flex-start"};
        `
      : css`
          margin-bottom: ${!props.$isLastStep ? props.$spacing : undefined};
        `}

  /* 상태에 따른 스타일 */
  ${(props) =>
    props.$isActive &&
    css`
      .step__title {
        font-weight: var(--font-weight-bold);
        color: var(--color-primary-600);
      }
    `}
  
  ${(props) =>
    props.$isCompleted &&
    css`
      .step__title {
        color: var(--color-success-600);
      }
    `}
  
  ${(props) =>
    props.$isDisabled &&
    css`
      opacity: 0.5;
    `}
  
  /* 클릭 가능 여부에 따른 스타일 */
  cursor: ${(props) => (props.$isClickable ? "pointer" : "default")};
`;

export const StepIconContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const StepIcon = styled.span<{
  $isActive?: boolean;
  $isCompleted?: boolean;
  $isDisabled?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  transition: all 0.2s;

  /* 상태에 따른 스타일 */
  ${(props) => {
    if (props.$isCompleted) {
      return css`
        background-color: var(--color-success-500);
        color: white;
      `;
    } else if (props.$isActive) {
      return css`
        background-color: var(--color-primary-500);
        color: white;
        box-shadow: 0 0 0 4px var(--color-primary-100);
      `;
    } else if (props.$isDisabled) {
      return css`
        background-color: var(--color-neutral-200);
        color: var(--color-neutral-500);
      `;
    } else {
      return css`
        background-color: var(--color-neutral-100);
        color: var(--color-neutral-600);
        border: 1px solid var(--color-neutral-300);
      `;
    }
  }}
`;

export const StepConnector = styled.div<{
  $orientation?: StepperProps["orientation"];
  $isCompleted?: boolean;
}>`
  background-color: ${(props) =>
    props.$isCompleted
      ? "var(--color-success-500)"
      : "var(--color-neutral-300)"};

  ${(props) =>
    props.$orientation === "vertical"
      ? css`
          position: absolute;
          left: 14px;
          top: 28px;
          height: calc(100% - 28px);
          width: 1px;
        `
      : css`
          position: absolute;
          left: 28px;
          top: 50%;
          transform: translateY(-50%);
          height: 1px;
          width: calc(100% - 56px);
        `}
`;

export const StepContent = styled.div<{
  $orientation?: StepperProps["orientation"];
  $alternativeLabel?: boolean;
}>`
  display: flex;
  flex-direction: column;

  ${(props) => {
    if (props.$orientation === "horizontal") {
      return props.$alternativeLabel
        ? css`
            width: 100%;
            text-align: center;
            margin-top: var(--spacing-2);
          `
        : css`
            margin-left: var(--spacing-3);
          `;
    }
    return css`
      margin-left: var(--spacing-3);
    `;
  }}
`;

export const StepTitle = styled.div`
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-neutral-800);
  margin-bottom: var(--spacing-1);
`;

export const StepDescriptionDiv = styled.div`
  font-size: var(--font-size-xs);
  color: var(--color-neutral-600);
  margin-top: calc(var(--spacing-1) / 2);
`;

// ThemeProvider 없이 기본 테마 제공
StepperContainer.defaultProps = {
  theme: defaultTheme,
};

StepContainer.defaultProps = {
  theme: defaultTheme,
};

StepIconContainer.defaultProps = {
  theme: defaultTheme,
};

StepIcon.defaultProps = {
  theme: defaultTheme,
};

StepConnector.defaultProps = {
  theme: defaultTheme,
};

StepContent.defaultProps = {
  theme: defaultTheme,
};

StepTitle.defaultProps = {
  theme: defaultTheme,
};

StepDescriptionDiv.defaultProps = {
  theme: defaultTheme,
};
