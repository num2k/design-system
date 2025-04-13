import React from "react";
import {
  TagWrapper,
  Avatar,
  Icon,
  Text,
  CloseButton,
  TagGroupWrapper,
} from "./Tag.styles";

export interface TagProps {
  /** 태그 내용 */
  children: React.ReactNode;
  /** 태그 색상 */
  color?: "default" | "primary" | "success" | "warning" | "error" | "info";
  /** 태그 크기 */
  size?: "sm" | "md" | "lg";
  /** 태그 변형 */
  variant?: "solid" | "outline" | "subtle";
  /** 태그 모양 */
  shape?: "rounded" | "pill" | "square";
  /** 삭제 가능 여부 */
  closable?: boolean;
  /** 삭제 시 호출될 함수 */
  onClose?: () => void;
  /** 클릭 핸들러 */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** 태그 아이콘 (앞쪽) */
  icon?: React.ReactNode;
  /** 태그 아바타 (앞쪽) */
  avatar?: React.ReactNode;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
}

export const Tag: React.FC<TagProps> = ({
  children,
  color = "default",
  size = "md",
  variant = "solid",
  shape = "rounded",
  closable = false,
  onClose,
  onClick,
  icon,
  avatar,
  disabled = false,
  className = "",
}) => {
  // 클릭 핸들러
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    onClick?.(event);
  };

  // 닫기 버튼 클릭 핸들러
  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (disabled) return;
    onClose?.();
  };

  return (
    <TagWrapper
      $color={color}
      $size={size}
      $variant={variant}
      $shape={shape}
      $disabled={disabled}
      $clickable={!!onClick}
      onClick={handleClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
      className={className}
    >
      {avatar && <Avatar $size={size}>{avatar}</Avatar>}
      {icon && <Icon $size={size}>{icon}</Icon>}
      <Text>{children}</Text>
      {closable && !disabled && (
        <CloseButton
          type="button"
          $size={size}
          onClick={handleClose}
          aria-label="Close"
          tabIndex={-1}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 18L18 6M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </CloseButton>
      )}
    </TagWrapper>
  );
};

// TagGroup 컴포넌트
export interface TagGroupProps {
  /** 태그 그룹 내부에 표시할 태그들 */
  children: React.ReactNode;
  /** 그룹 간격 */
  spacing?: "sm" | "md" | "lg";
  /** 태그를 감쌀지 여부 */
  wrap?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
}

export const TagGroup: React.FC<TagGroupProps> = ({
  children,
  spacing = "md",
  wrap = true,
  className = "",
}) => {
  return (
    <TagGroupWrapper $spacing={spacing} $wrap={wrap} className={className}>
      {children}
    </TagGroupWrapper>
  );
};
