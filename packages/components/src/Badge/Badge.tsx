import React from 'react';
import { useTheme } from '@design-system/core';
import './Badge.css';

export type BadgeVariant = 'solid' | 'outline' | 'subtle';
export type BadgeColor = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
  /** 배지에 표시할 내용 */
  children?: React.ReactNode;
  /** 배지 변형 */
  variant?: BadgeVariant;
  /** 배지 색상 */
  color?: BadgeColor;
  /** 배지 크기 */
  size?: BadgeSize;
  /** 원형 배지 여부 */
  rounded?: boolean;
  /** 오른쪽 상단에 위치 (절대 위치) */
  floating?: boolean;
  /** 배지 앞에 표시할 아이콘 */
  leftIcon?: React.ReactNode;
  /** 배지 뒤에 표시할 아이콘 */
  rightIcon?: React.ReactNode;
  /** 최댓값 (숫자 배지에 사용) */
  max?: number;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 인라인 스타일 */
  style?: React.CSSProperties;
  /** 토글 상태 (표시 여부) */
  isVisible?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'solid',
  color = 'default',
  size = 'md',
  rounded = false,
  floating = false,
  leftIcon,
  rightIcon,
  max,
  className = '',
  style,
  isVisible = true,
  ...props
}) => {
  const theme = useTheme();
  
  if (!isVisible) {
    return null;
  }

  // 숫자를 최댓값 이하로 제한
  const content = typeof children === 'number' && max !== undefined && children > max
    ? `${max}+`
    : children;

  const badgeClasses = [
    'badge',
    `badge--${variant}`,
    `badge--${color}`,
    `badge--${size}`,
    rounded ? 'badge--rounded' : '',
    floating ? 'badge--floating' : '',
    leftIcon ? 'badge--with-left-icon' : '',
    rightIcon ? 'badge--with-right-icon' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <span 
      className={badgeClasses}
      style={style}
      {...props}
    >
      {leftIcon && <span className="badge__icon badge__icon--left">{leftIcon}</span>}
      {content}
      {rightIcon && <span className="badge__icon badge__icon--right">{rightIcon}</span>}
    </span>
  );
};