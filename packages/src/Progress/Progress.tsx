import React from "react";
import {
  ProgressContainer,
  ProgressBar,
  ProgressBarFill,
  ProgressLabel,
  CircularProgressContainer,
  CircularSvg,
  CircularTrack,
  CircularProgressBar,
  CircularProgressLabel,
} from "./Progress.styles";

export interface ProgressProps {
  /** 현재 값 */
  value: number;
  /** 최대 값 (기본값: 100) */
  max?: number;
  /** 최소 값 (기본값: 0) */
  min?: number;
  /** 진행 표시줄 높이 */
  height?: string;
  /** 진행 표시줄 색상 */
  color?: "primary" | "success" | "warning" | "error" | "info";
  /** 진행 표시줄 변형 */
  variant?: "default" | "striped" | "animated";
  /** 진행률 텍스트 표시 여부 */
  showLabel?: boolean;
  /** 테두리 반경 */
  radius?: "none" | "sm" | "md" | "lg" | "full";
  /** 추가 CSS 클래스 */
  className?: string;
  /** 인라인 스타일 */
  style?: React.CSSProperties;
}

export interface CircularProgressProps {
  /** 현재 값 */
  value: number;
  /** 최대 값 (기본값: 100) */
  max?: number;
  /** 최소 값 (기본값: 0) */
  min?: number;
  /** 크기 */
  size?: "sm" | "md" | "lg" | string;
  /** 두께 */
  thickness?: "thin" | "medium" | "thick" | string;
  /** 진행 표시줄 색상 */
  color?: "primary" | "success" | "warning" | "error" | "info";
  /** 트랙 색상 */
  trackColor?: string;
  /** 진행률 텍스트 표시 여부 */
  showLabel?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 컴포넌트 내부에 표시할 라벨 */
  label?: React.ReactNode;
  /** 인라인 스타일 */
  style?: React.CSSProperties;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  min = 0,
  height = "0.75rem",
  color = "primary",
  variant = "default",
  showLabel = false,
  radius = "full",
  className = "",
  style,
}) => {
  // 값이 범위 내에 있는지 확인
  const clampedValue = Math.max(min, Math.min(max, value));
  const percentage = ((clampedValue - min) / (max - min)) * 100;

  return (
    <ProgressContainer>
      <ProgressBar
        $height={height}
        $color={color}
        $variant={variant}
        $radius={radius}
        className={className}
        style={style}
        role="progressbar"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={clampedValue}
        tabIndex={0}
      >
        <ProgressBarFill $percentage={percentage} $variant={variant} />
      </ProgressBar>

      {showLabel && (
        <ProgressLabel>{`${Math.round(percentage)}%`}</ProgressLabel>
      )}
    </ProgressContainer>
  );
};

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  max = 100,
  min = 0,
  size = "md",
  thickness = "medium",
  color = "primary",
  trackColor = "var(--color-neutral-200)",
  showLabel = false,
  className = "",
  label,
  style,
}) => {
  // 값이 범위 내에 있는지 확인
  const clampedValue = Math.max(min, Math.min(max, value));
  const percentage = ((clampedValue - min) / (max - min)) * 100;

  // 원 둘레 계산
  const sizeValue =
    size === "sm" ? 80 : size === "md" ? 120 : size === "lg" ? 180 : 120;
  const thicknessValue =
    thickness === "thin"
      ? 4
      : thickness === "medium"
      ? 8
      : thickness === "thick"
      ? 12
      : 8;

  const radius = sizeValue / 2;
  const normalizedRadius = radius - thicknessValue / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // 사용자 정의 크기나 두께가 문자열로 제공된 경우 처리
  const actualSize =
    typeof size === "string" && !["sm", "md", "lg"].includes(size)
      ? size
      : size;

  const actualThickness =
    typeof thickness === "string" &&
    !["thin", "medium", "thick"].includes(thickness)
      ? thickness
      : `${thicknessValue}px`;

  return (
    <CircularProgressContainer
      $size={actualSize}
      $color={color}
      className={className}
      style={style}
      role="progressbar"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={clampedValue}
      tabIndex={0}
    >
      <CircularSvg
        viewBox={`0 0 ${sizeValue} ${sizeValue}`}
        width="100%"
        height="100%"
        aria-hidden="true"
        role="img"
      >
        <title>Progress indicator: {Math.round(percentage)}%</title>
        <CircularTrack
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          strokeWidth={thicknessValue}
          $trackColor={trackColor}
        />
        <CircularProgressBar
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          strokeWidth={thicknessValue}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${radius} ${radius})`}
        />
      </CircularSvg>
      {(showLabel || label) && (
        <CircularProgressLabel>
          {label || `${Math.round(percentage)}%`}
        </CircularProgressLabel>
      )}
    </CircularProgressContainer>
  );
};
