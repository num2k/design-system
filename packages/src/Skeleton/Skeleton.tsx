import React from "react";
import { StyledSkeleton, SkeletonTextContainer } from "./Skeleton.styles";

export interface SkeletonProps {
  /** 스켈레톤 높이 */
  height?: number | string;
  /** 스켈레톤 너비 */
  width?: number | string;
  /** 테두리 반경 */
  radius?: "none" | "sm" | "md" | "lg" | "full";
  /** 애니메이션 활성화 여부 */
  animate?: boolean;
  /** 반복 횟수 */
  count?: number;
  /** 스켈레톤 형태 */
  variant?: "text" | "rectangular" | "circular" | "rounded";
  /** 추가 CSS 클래스 */
  className?: string;
  /** 인라인 스타일 */
  style?: React.CSSProperties;
}

export interface SkeletonTextProps {
  /** 줄 수 */
  noOfLines?: number;
  /** 줄 간격 */
  spacing?: string;
  /** 스켈레톤 높이 */
  height?: string;
  /** 스켈레톤 각 줄의 너비(배열) 또는 모든 줄의 너비(단일 값) */
  width?: string | string[];
  /** 마지막 줄의 너비(기본값: 80%) */
  lastLineWidth?: string;
  /** 첫 번째 줄의 너비(기본값: 100%) */
  firstLineWidth?: string;
  /** 애니메이션 활성화 여부 */
  animate?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 인라인 스타일 */
  style?: React.CSSProperties;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  height,
  width,
  radius = "md",
  animate = true,
  count = 1,
  variant = "text",
  className = "",
  style,
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <StyledSkeleton
          key={index}
          $height={height}
          $width={width}
          $radius={radius}
          $animate={animate}
          $variant={variant}
          className={className}
          style={style}
          aria-hidden="true"
          data-testid="skeleton"
        />
      ))}
    </>
  );
};

export const SkeletonText: React.FC<SkeletonTextProps> = ({
  noOfLines = 3,
  spacing = "0.5rem",
  height = "0.6rem",
  width,
  lastLineWidth = "80%",
  firstLineWidth = "100%",
  animate = true,
  className = "",
  style,
}) => {
  return (
    <SkeletonTextContainer className={className} style={style}>
      {Array.from({ length: noOfLines }).map((_, index) => {
        let lineWidth: string | undefined;

        if (Array.isArray(width)) {
          lineWidth = width[index] || undefined;
        } else if (width) {
          lineWidth = width;
        } else if (index === 0) {
          lineWidth = firstLineWidth;
        } else if (index === noOfLines - 1) {
          lineWidth = lastLineWidth;
        }

        return (
          <Skeleton
            key={index}
            variant="text"
            width={lineWidth}
            height={height}
            animate={animate}
            style={{
              marginBottom: index !== noOfLines - 1 ? spacing : undefined,
            }}
          />
        );
      })}
    </SkeletonTextContainer>
  );
};
