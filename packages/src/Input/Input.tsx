import React, { InputHTMLAttributes, forwardRef } from "react";
import {
  InputWrapper,
  InputContainer,
  StyledInput,
  InputIcon,
  InputHelperText,
} from "./Input.styles";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** 입력 필드 변형 */
  variant?: "default" | "filled" | "flushed";
  /** 입력 필드 크기 */
  inputSize?: "sm" | "md" | "lg";
  /** 에러 상태 */
  isError?: boolean;
  /** 성공 상태 */
  isSuccess?: boolean;
  /** 전체 너비 사용 */
  fullWidth?: boolean;
  /** 왼쪽 아이콘 */
  leftIcon?: React.ReactNode;
  /** 오른쪽 아이콘 */
  rightIcon?: React.ReactNode;
  /** 도움말 텍스트 */
  helperText?: string;
  /** 에러 메시지 */
  errorMessage?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "default",
      inputSize = "md",
      isError = false,
      isSuccess = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      helperText,
      errorMessage,
      disabled,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <InputWrapper $fullWidth={fullWidth} className={className}>
        <InputContainer $disabled={disabled}>
          {leftIcon && (
            <InputIcon $position="left" $inputSize={inputSize}>
              {leftIcon}
            </InputIcon>
          )}

          <StyledInput
            ref={ref}
            disabled={disabled}
            $variant={variant}
            $inputSize={inputSize}
            $isError={isError}
            $isSuccess={isSuccess}
            $hasLeftIcon={!!leftIcon}
            $hasRightIcon={!!rightIcon}
            {...props}
          />

          {rightIcon && (
            <InputIcon $position="right" $inputSize={inputSize}>
              {rightIcon}
            </InputIcon>
          )}
        </InputContainer>

        {(helperText || (isError && errorMessage)) && (
          <InputHelperText $isError={isError} $isSuccess={isSuccess}>
            {isError ? errorMessage : helperText}
          </InputHelperText>
        )}
      </InputWrapper>
    );
  }
);

Input.displayName = "Input";
