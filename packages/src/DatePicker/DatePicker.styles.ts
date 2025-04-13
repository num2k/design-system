import styled, { css } from "styled-components";
import { DatePickerProps } from "./DatePicker";

export const DatePickerContainer = styled.div<{
  $size?: DatePickerProps["size"];
  $isError?: boolean;
  $isSuccess?: boolean;
  $disabled?: boolean;
  $readOnly?: boolean;
}>`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;

  ${(props) =>
    props.$disabled &&
    css`
      opacity: 0.6;
      cursor: not-allowed;
    `}
`;

export const DatePickerLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-1);
  font-size: var(--font-size-sm);
  color: var(--color-neutral-800);

  /* 다크모드 */
  [data-theme="dark"] & {
    color: var(--color-neutral-100);
  }
`;

export const DatePickerRequired = styled.span`
  color: var(--color-error-500);
  margin-left: var(--spacing-1);

  /* 다크모드 */
  [data-theme="dark"] & {
    color: var(--color-error-400);
  }
`;

export const DatePickerInputContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
`;

export const DatePickerInput = styled.input<{
  $size?: DatePickerProps["size"];
  $isError?: boolean;
  $isSuccess?: boolean;
}>`
  width: 100%;
  padding-right: 36px; /* 아이콘 공간 확보 */
  border: 1px solid var(--color-neutral-300);
  border-radius: var(--radius-md);
  font-family: var(--font-family-sans);
  transition: all 0.2s ease;
  background-color: white;
  color: var(--color-neutral-900);

  &:focus {
    outline: none;
    border-color: var(--color-primary-500);
    box-shadow: 0 0 0 2px var(--color-primary-100);
  }

  &::placeholder {
    color: var(--color-neutral-400);
  }

  /* 다크모드 */
  [data-theme="dark"] & {
    background-color: var(--color-neutral-900);
    color: var(--color-neutral-100);
    border-color: var(--color-neutral-700);

    &:focus {
      border-color: var(--color-primary-400);
      box-shadow: 0 0 0 2px var(--color-primary-900);
    }

    &::placeholder {
      color: var(--color-neutral-500);
    }
  }

  /* Size variants */
  ${(props) =>
    props.$size === "sm" &&
    css`
      height: 32px;
      padding-left: var(--spacing-2);
      font-size: var(--font-size-xs);
    `}

  ${(props) =>
    props.$size === "md" &&
    css`
      height: 40px;
      padding-left: var(--spacing-3);
      font-size: var(--font-size-sm);
    `}
  
  ${(props) =>
    props.$size === "lg" &&
    css`
      height: 48px;
      padding-left: var(--spacing-3);
      font-size: var(--font-size-md);
    `}
  
  /* Error state */
  ${(props) =>
    props.$isError &&
    css`
      border-color: var(--color-error-500);

      &:focus {
        border-color: var(--color-error-500);
        box-shadow: 0 0 0 2px var(--color-error-100);
      }

      /* 다크모드 에러 상태 */
      [data-theme="dark"] & {
        border-color: var(--color-error-400);

        &:focus {
          box-shadow: 0 0 0 2px var(--color-error-900);
        }
      }
    `}
  
  /* Success state */
  ${(props) =>
    props.$isSuccess &&
    css`
      border-color: var(--color-success-500);

      &:focus {
        border-color: var(--color-success-500);
        box-shadow: 0 0 0 2px var(--color-success-100);
      }

      /* 다크모드 성공 상태 */
      [data-theme="dark"] & {
        border-color: var(--color-success-400);

        &:focus {
          box-shadow: 0 0 0 2px var(--color-success-900);
        }
      }
    `}
`;

export const DatePickerIconButton = styled.button<{
  $disabled?: boolean;
}>`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: var(--color-neutral-600);
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  transition: color 0.2s ease;

  &:hover {
    color: ${(props) =>
      props.$disabled
        ? "var(--color-neutral-600)"
        : "var(--color-primary-600)"};
  }

  &:focus {
    outline: none;
  }

  /* 다크모드 */
  [data-theme="dark"] & {
    color: var(--color-neutral-400);

    &:hover {
      color: ${(props) =>
        props.$disabled
          ? "var(--color-neutral-400)"
          : "var(--color-primary-400)"};
    }
  }
`;

export const DatePickerDropdown = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: 10;
  background-color: white;
  border: 1px solid var(--color-neutral-200);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);

  /* 다크모드 */
  [data-theme="dark"] & {
    background-color: var(--color-neutral-800);
    border-color: var(--color-neutral-700);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  }
`;

export const DatePickerHelperText = styled.div<{
  $isError?: boolean;
}>`
  margin-top: var(--spacing-1);
  font-size: var(--font-size-xs);
  color: ${(props) =>
    props.$isError ? "var(--color-error-600)" : "var(--color-neutral-600)"};

  /* 다크모드 */
  [data-theme="dark"] & {
    color: ${(props) =>
      props.$isError ? "var(--color-error-400)" : "var(--color-neutral-400)"};
  }
`;

// DateRangePicker 관련 추가 스타일
export const DateRangePickerDropdown = styled(DatePickerDropdown)`
  width: 320px;
  padding: var(--spacing-2);
`;

export const DateRangePickerHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: var(--spacing-2);
  margin-bottom: var(--spacing-2);
  border-bottom: 1px solid var(--color-neutral-200);

  /* 다크모드 */
  [data-theme="dark"] & {
    border-bottom-color: var(--color-neutral-700);
  }
`;

export const DateRangeSelectionMode = styled.div`
  margin-bottom: var(--spacing-2);
`;

export const DateRangeModeIndicator = styled.span`
  font-weight: var(--font-weight-medium);
  color: var(--color-primary-600);

  /* 다크모드 */
  [data-theme="dark"] & {
    color: var(--color-primary-400);
  }
`;

export const DateRangeSelected = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-2);
`;

export const DateRangeDateDisplay = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DateRangeDateLabel = styled.span`
  font-size: var(--font-size-xs);
  color: var(--color-neutral-600);

  /* 다크모드 */
  [data-theme="dark"] & {
    color: var(--color-neutral-400);
  }
`;

export const DateRangeDateValue = styled.span`
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);

  /* 다크모드 */
  [data-theme="dark"] & {
    color: var(--color-neutral-100);
  }
`;

export const DateRangeSeparator = styled.span`
  color: var(--color-neutral-500);

  /* 다크모드 */
  [data-theme="dark"] & {
    color: var(--color-neutral-400);
  }
`;
