import React, { forwardRef } from "react";
import {
  CardContainer,
  CardImage,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./Card.styles";

export interface CardProps {
  /** 카드의 내용 */
  children: React.ReactNode;
  /** 카드 제목 (선택사항) */
  title?: React.ReactNode;
  /** 카드 하단 액션 영역 (선택사항) */
  footer?: React.ReactNode;
  /** 카드 헤더 영역 (선택사항) */
  header?: React.ReactNode;
  /** 카드 상단 이미지 (선택사항) */
  image?: string;
  /** 이미지 대체 텍스트 */
  imageAlt?: string;
  /** 카드 변형 */
  variant?: "default" | "outlined" | "elevated";
  /** 둥근 모서리 크기 */
  radius?: "none" | "sm" | "md" | "lg" | "full";
  /** 카드 패딩 크기 */
  padding?: "none" | "sm" | "md" | "lg";
  /** 카드 너비가 부모 요소에 맞춰 확장됩니다 */
  fullWidth?: boolean;
  /** 카드 높이가 부모 요소에 맞춰 확장됩니다 */
  fullHeight?: boolean;
  /** 카드를 클릭 가능하게 만듭니다 (호버 효과 추가) */
  clickable?: boolean;
  /** 클릭 이벤트 핸들러 */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 데이터 속성 */
  dataAttributes?: Record<string, string>;
  /** 추가 스타일 */
  style?: React.CSSProperties;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      title,
      footer,
      header,
      image,
      imageAlt = "",
      variant = "default",
      radius = "md",
      padding = "md",
      fullWidth = false,
      fullHeight = false,
      clickable = false,
      onClick,
      className = "",
      dataAttributes,
      style,
    },
    ref
  ) => {
    const dataProps = dataAttributes
      ? Object.fromEntries(
          Object.entries(dataAttributes).map(([key, value]) => [
            `data-${key}`,
            value,
          ])
        )
      : {};

    // 클릭 가능한 카드인 경우 키보드 이벤트 처리
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (
        clickable &&
        onClick &&
        (event.key === "Enter" || event.key === " ")
      ) {
        event.preventDefault();
        onClick(event as unknown as React.MouseEvent<HTMLDivElement>);
      }
    };

    return (
      <CardContainer
        ref={ref}
        $variant={variant}
        $radius={radius}
        $padding={padding}
        $fullWidth={fullWidth}
        $fullHeight={fullHeight}
        $clickable={clickable}
        className={className}
        style={style}
        onClick={clickable ? onClick : undefined}
        onKeyDown={clickable ? handleKeyDown : undefined}
        tabIndex={clickable ? 0 : undefined}
        role={clickable ? "button" : undefined}
        {...dataProps}
      >
        {image && (
          <CardImage>
            <img src={image} alt={imageAlt} />
          </CardImage>
        )}

        {header && <CardHeader $padding={padding}>{header}</CardHeader>}

        {title && <CardTitle $padding={padding}>{title}</CardTitle>}

        <CardContent $padding={padding}>{children}</CardContent>

        {footer && <CardFooter $padding={padding}>{footer}</CardFooter>}
      </CardContainer>
    );
  }
);

Card.displayName = "Card";
