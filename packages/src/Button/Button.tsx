import React from "react";
import {
  StyledButton,
  ButtonSpinner,
  ButtonContent,
  ButtonIcon,
  ButtonText,
} from "./Button.styles";

export interface ButtonProps {
  /** 버튼 내용 */
  children: React.ReactNode;
  /** 버튼 타입 */
  type?: "button" | "submit" | "reset";
  /** 버튼 변형 */
  variant?: "primary" | "secondary" | "tertiary" | "danger" | "outline";
  /** 버튼 크기 */
  size?: "sm" | "md" | "lg";
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 로딩 상태 여부 */
  loading?: boolean;
  /** 너비 100% 적용 */
  fullWidth?: boolean;
  /** 클릭 핸들러 */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** 아이콘 (왼쪽) */
  leftIcon?: React.ReactNode;
  /** 아이콘 (오른쪽) */
  rightIcon?: React.ReactNode;
  /** 추가 CSS 클래스 */
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      type = "button",
      variant = "primary",
      size = "md",
      disabled = false,
      loading = false,
      fullWidth = false,
      onClick,
      leftIcon,
      rightIcon,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <StyledButton
        ref={ref}
        type={type}
        variant={variant}
        size={size}
        disabled={disabled || loading}
        loading={loading}
        fullWidth={fullWidth}
        onClick={onClick}
        className={className}
        {...props}
      >
        {loading && <ButtonSpinner />}
        <ButtonContent $loading={loading}>
          {leftIcon && <ButtonIcon $position="left">{leftIcon}</ButtonIcon>}
          <ButtonText>{children}</ButtonText>
          {rightIcon && <ButtonIcon $position="right">{rightIcon}</ButtonIcon>}
        </ButtonContent>
      </StyledButton>
    );
  }
);

Button.displayName = "Button";
