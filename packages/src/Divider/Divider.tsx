import React from "react";
import {
  DividerContainer,
  Line,
  DividerLabel,
  DividerWithLabel,
} from "./Divider.styles";

export interface DividerProps {
  /** 구분선 방향 */
  orientation?: "horizontal" | "vertical";
  /** 구분선 두께 */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** 구분선 색상 */
  color?: string;
  /** 구분선 스타일 */
  variant?: "solid" | "dashed" | "dotted" | "light";
  /** 구분선 주변 간격 */
  spacing?: "xs" | "sm" | "md" | "lg" | "xl";
  /** 레이블 텍스트 (제공시 텍스트와 함께 구분선 표시) */
  children?: React.ReactNode;
  /** 레이블 정렬 (가로 모드에서만 적용) */
  align?: "left" | "center" | "right";
  /** 추가 CSS 클래스 */
  className?: string;
  /** 추가 스타일 */
  style?: React.CSSProperties;
  /** 데이터 속성 */
  dataAttributes?: Record<string, string>;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = "horizontal",
  size = "xs",
  color,
  variant = "solid",
  spacing = "md",
  children,
  align = "center",
  className = "",
  style,
  dataAttributes,
}) => {
  // data-* 속성 생성
  const dataProps = dataAttributes
    ? Object.fromEntries(
        Object.entries(dataAttributes).map(([key, value]) => [
          `data-${key}`,
          value,
        ])
      )
    : {};

  // 레이블이 있는 경우
  if (children) {
    return (
      <DividerContainer
        className={className}
        style={style}
        $orientation={orientation}
        $spacing={spacing}
        {...dataProps}
      >
        <DividerWithLabel $orientation={orientation} $align={align}>
          {/* 왼쪽/위쪽 라인 */}
          <Line
            $orientation={orientation}
            $size={size}
            $color={color}
            $variant={variant}
            $align={align}
            role="separator"
            aria-orientation={orientation}
          />

          {/* 레이블 */}
          <DividerLabel $orientation={orientation} $align={align}>
            {children}
          </DividerLabel>

          {/* 오른쪽/아래쪽 라인 */}
          <Line
            $orientation={orientation}
            $size={size}
            $color={color}
            $variant={variant}
            $align={align}
            role="separator"
            aria-orientation={orientation}
          />
        </DividerWithLabel>
      </DividerContainer>
    );
  }

  // 레이블이 없는 일반 구분선
  return (
    <DividerContainer
      className={className}
      style={style}
      $orientation={orientation}
      $spacing={spacing}
      {...dataProps}
    >
      <Line
        $orientation={orientation}
        $size={size}
        $color={color}
        $variant={variant}
        $align={align}
        role="separator"
        aria-orientation={orientation}
      />
    </DividerContainer>
  );
};

Divider.displayName = "Divider";
