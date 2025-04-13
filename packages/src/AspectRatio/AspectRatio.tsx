import React, { forwardRef } from "react";
import {
  AspectRatioContainer,
  AspectRatioInner,
  AspectRatioContent,
} from "./AspectRatio.styles";

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 비율 (width/height). 예: 16/9, 4/3, 1, 0.5 등 */
  ratio?: number;
  /** 최대 너비 */
  maxWidth?: number | string;
  /** 최소 높이 */
  minHeight?: number | string;
  /** 컨텐츠가 부모 요소에 맞게 확장되는지 여부 */
  contentFill?: boolean;
  /** 자식 요소들 */
  children: React.ReactNode;
  /** 추가 CSS 클래스 */
  className?: string;
}

export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  (
    {
      ratio = 16 / 9,
      maxWidth,
      minHeight,
      contentFill = true,
      children,
      className = "",
      style,
      ...rest
    },
    ref
  ) => {
    // 비율 계산 (패딩)
    const paddingBottom = `${(1 / ratio) * 100}%`;

    return (
      <AspectRatioContainer
        ref={ref}
        $maxWidth={maxWidth}
        $minHeight={minHeight}
        className={className}
        style={style}
        {...rest}
      >
        <AspectRatioInner $paddingBottom={paddingBottom}>
          <AspectRatioContent $contentFill={contentFill}>
            {children}
          </AspectRatioContent>
        </AspectRatioInner>
      </AspectRatioContainer>
    );
  }
);

AspectRatio.displayName = "AspectRatio";
