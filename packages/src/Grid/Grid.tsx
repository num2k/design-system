import React from "react";
import { GridContainer, GridItemContainer } from "./Grid.styles";

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 그리드 컬럼 수 */
  columns: number | Array<number>;
  /** 아이템 간 간격 */
  gap?: number | string | Array<number | string>;
  /** 행 간격 */
  rowGap?: number | string | Array<number | string>;
  /** 열 간격 */
  columnGap?: number | string | Array<number | string>;
  /** 자식 요소가 배열될 방향 */
  flow?: "row" | "column" | "dense" | "row dense" | "column dense";
  /** 추가 CSS 클래스 */
  className?: string;
  /** 자식 요소 */
  children: React.ReactNode;
}

export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 아이템이 차지할 열 수 */
  colSpan?: number | Array<number>;
  /** 아이템이 차지할 행 수 */
  rowSpan?: number | Array<number>;
  /** 아이템의 시작 열 */
  colStart?: number | Array<number>;
  /** 아이템의 끝 열 */
  colEnd?: number | Array<number>;
  /** 아이템의 시작 행 */
  rowStart?: number | Array<number>;
  /** 아이템의 끝 행 */
  rowEnd?: number | Array<number>;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 자식 요소 */
  children: React.ReactNode;
}

export const Grid: React.FC<GridProps> = ({
  columns = 12,
  gap,
  rowGap,
  columnGap,
  flow,
  className = "",
  children,
  ...rest
}) => {
  return (
    <GridContainer
      $columns={columns}
      $gap={gap}
      $rowGap={rowGap}
      $columnGap={columnGap}
      $flow={flow}
      className={className}
      {...rest}
    >
      {children}
    </GridContainer>
  );
};

export const GridItem: React.FC<GridItemProps> = ({
  colSpan = 1,
  rowSpan,
  colStart,
  colEnd,
  rowStart,
  rowEnd,
  className = "",
  children,
  ...rest
}) => {
  return (
    <GridItemContainer
      $colSpan={colSpan}
      $rowSpan={rowSpan}
      $colStart={colStart}
      $colEnd={colEnd}
      $rowStart={rowStart}
      $rowEnd={rowEnd}
      className={className}
      {...rest}
    >
      {children}
    </GridItemContainer>
  );
};
