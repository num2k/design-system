import React from "react";
import type { InputHTMLAttributes } from "react";
import { forwardRef, useEffect } from "react";
import {
  CheckboxContainer,
  CheckboxLabel,
  HiddenCheckbox,
  CheckboxControl,
  CheckboxLabelText,
  HelperText,
} from "./Checkbox.styles";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /** 체크박스 크기 */
  size?: "sm" | "md" | "lg";
  /** 체크박스 라벨 */
  label?: string;
  /** 에러 상태 */
  isError?: boolean;
  /** 성공 상태 */
  isSuccess?: boolean;
  /** 도움말 텍스트 */
  helperText?: string;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 부분 선택 상태 */
  isIndeterminate?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      size = "md",
      label,
      isError = false,
      isSuccess = false,
      helperText,
      errorMessage,
      isIndeterminate = false,
      disabled,
      className = "",
      ...props
    },
    ref
  ) => {
    // indeterminate 상태를 DOM에 적용
    useEffect(() => {
      if (ref && "current" in ref && ref.current) {
        ref.current.indeterminate = isIndeterminate;
      }
    }, [isIndeterminate, ref]);

    // 체크박스에 표시할 도움말이나 에러 메시지 결정
    const helpText = isError ? errorMessage : helperText;

    return (
      <CheckboxContainer className={className}>
        <CheckboxLabel $disabled={disabled}>
          <HiddenCheckbox
            type="checkbox"
            ref={ref}
            disabled={disabled}
            {...props}
          />
          <CheckboxControl
            $size={size}
            $isError={isError}
            $isSuccess={isSuccess}
            $isIndeterminate={isIndeterminate}
            $disabled={disabled}
          />
          {label && (
            <CheckboxLabelText $size={size} $disabled={disabled}>
              {label}
            </CheckboxLabelText>
          )}
        </CheckboxLabel>

        {helpText && (
          <HelperText $isError={isError} $isSuccess={isSuccess}>
            {helpText}
          </HelperText>
        )}
      </CheckboxContainer>
    );
  }
);

Checkbox.displayName = "Checkbox";
