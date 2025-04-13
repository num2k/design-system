import React from "react";
import { StyledStack, Divider } from "./Stack.styles";

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 방향 */
  direction?: "horizontal" | "vertical";
  /** 정렬 */
  align?: "start" | "end" | "center" | "stretch" | "baseline";
  /** 아이템 간 간격 */
  spacing?: number | string;
  /** 아이템을 균등하게 배치할지 여부 */
  distribute?:
    | "start"
    | "center"
    | "end"
    | "stretch"
    | "space-between"
    | "space-around"
    | "space-evenly";
  /** 구분선을 표시할지 여부 */
  divider?: boolean | React.ReactNode;
  /** 너비를 부모 요소에 맞춤 */
  fullWidth?: boolean;
  /** 높이를 부모 요소에 맞춤 */
  fullHeight?: boolean;
  /** 자식 요소들 */
  children: React.ReactNode;
  /** 추가 CSS 클래스 */
  className?: string;
}

export const Stack: React.FC<StackProps> = ({
  direction = "vertical",
  align,
  spacing = "var(--spacing-2)",
  distribute,
  divider = false,
  fullWidth = false,
  fullHeight = false,
  children,
  className = "",
  style,
  ...rest
}) => {
  // 구분선이 필요한 경우 자식 요소 사이에 구분선 추가
  const renderChildrenWithDividers = () => {
    const childrenArray = React.Children.toArray(children).filter(Boolean);

    if (!divider || childrenArray.length <= 1) {
      return childrenArray;
    }

    const dividerElement =
      typeof divider === "boolean" ? (
        <Divider $direction={direction} />
      ) : (
        divider
      );

    return childrenArray.map((child, index) => {
      return index < childrenArray.length - 1 ? (
        <React.Fragment key={index}>
          {child}
          {React.cloneElement(dividerElement as React.ReactElement, {
            key: `divider-${index}`,
          })}
        </React.Fragment>
      ) : (
        child
      );
    });
  };

  return (
    <StyledStack
      $direction={direction}
      $align={align}
      $spacing={spacing}
      $distribute={distribute}
      $divider={!!divider}
      $fullWidth={fullWidth}
      $fullHeight={fullHeight}
      className={className}
      style={style}
      {...rest}
    >
      {divider ? renderChildrenWithDividers() : children}
    </StyledStack>
  );
};
