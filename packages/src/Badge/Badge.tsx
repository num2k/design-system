import React from "react";
import { BadgeContainer, BadgeIcon, BadgeContent } from "./Badge.styles";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 배지에 표시할 내용 */
  children?: React.ReactNode;
  /** 배지 스타일 변형 */
  variant?: "solid" | "outline" | "light" | "subtle";
  /** 배지 색상 */
  color?: "primary" | "success" | "error" | "warning" | "info" | "neutral";
  /** 배지 크기 */
  size?: "xs" | "sm" | "md" | "lg";
  /** 배지 모양 */
  shape?: "pill" | "square" | "rounded";
  /** 아이콘 */
  icon?: React.ReactNode;
  /** 점 형태로 표시 (내용 없이 작은 점으로만) */
  dot?: boolean;
  /** 최대 표시 숫자 (children이 숫자일 경우) */
  max?: number;
  /** 표시 여부 */
  visible?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "solid",
  color = "primary",
  size = "sm",
  shape = "pill",
  icon,
  dot = false,
  max,
  visible = true,
  className = "",
  ...rest
}) => {
  if (!visible) {
    return null;
  }

  // max 값이 있고 children이 숫자인 경우 처리
  const content = React.useMemo(() => {
    if (max && typeof children === "number" && children > max) {
      return `${max}+`;
    }

    if (dot) {
      return null;
    }

    return children;
  }, [children, max, dot]);

  return (
    <BadgeContainer
      $variant={variant}
      $color={color}
      $size={size}
      $shape={shape}
      $dot={dot}
      className={className}
      {...rest}
    >
      {icon && <BadgeIcon>{icon}</BadgeIcon>}
      {content && <BadgeContent>{content}</BadgeContent>}
    </BadgeContainer>
  );
};

Badge.displayName = "Badge";
