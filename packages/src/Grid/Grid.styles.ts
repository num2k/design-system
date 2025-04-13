import styled, { css } from "styled-components";
import { GridProps, GridItemProps } from "./Grid";
import { defaultTheme } from "../theme/theme";

type ResponsiveValue<T> = T | Array<T>;

// 반응형 값 적용 함수
const applyResponsiveValue = <T extends string | number>(
  value: ResponsiveValue<T> | undefined,
  propertyName: string,
  transform: (val: T) => string = (val) => `${val}`
) => {
  if (value === undefined) return "";

  if (Array.isArray(value)) {
    return css``;
  }

  return css`
    ${propertyName}: ${transform(value)};
  `;
};

// 미디어 쿼리 유틸리티
const breakpoints = {
  md: "@media (min-width: 768px)",
  lg: "@media (min-width: 1024px)",
};

// 값을 CSS px 문자열로 변환하는 도우미 함수
const toPx = (value: number | string): string => {
  return typeof value === "number" ? `${value}px` : value;
};

// Grid 컨테이너 컴포넌트
export const GridContainer = styled.div<{
  $columns: GridProps["columns"];
  $gap?: GridProps["gap"];
  $rowGap?: GridProps["rowGap"];
  $columnGap?: GridProps["columnGap"];
  $flow?: GridProps["flow"];
}>`
  display: grid;

  /* 컬럼 처리 - 기본값 */
  ${(props) => {
    if (Array.isArray(props.$columns)) {
      return css`
        grid-template-columns: repeat(${props.$columns[0]}, minmax(0, 1fr));

        ${props.$columns.length > 1 && breakpoints.md} {
          grid-template-columns: repeat(${props.$columns[1]}, minmax(0, 1fr));
        }

        ${props.$columns.length > 2 && breakpoints.lg} {
          grid-template-columns: repeat(${props.$columns[2]}, minmax(0, 1fr));
        }
      `;
    }

    return css`
      grid-template-columns: repeat(${props.$columns}, minmax(0, 1fr));
    `;
  }}

  /* gap 처리 */
  ${(props) => {
    if (props.$gap !== undefined) {
      if (Array.isArray(props.$gap)) {
        return css`
          gap: ${toPx(props.$gap[0])};

          ${props.$gap.length > 1 && breakpoints.md} {
            gap: ${toPx(props.$gap[1])};
          }

          ${props.$gap.length > 2 && breakpoints.lg} {
            gap: ${toPx(props.$gap[2])};
          }
        `;
      }

      return css`
        gap: ${toPx(props.$gap)};
      `;
    }
    return null;
  }}
  
  /* rowGap 처리 */
  ${(props) => {
    if (props.$rowGap !== undefined) {
      if (Array.isArray(props.$rowGap)) {
        return css`
          row-gap: ${toPx(props.$rowGap[0])};

          ${props.$rowGap.length > 1 && breakpoints.md} {
            row-gap: ${toPx(props.$rowGap[1])};
          }

          ${props.$rowGap.length > 2 && breakpoints.lg} {
            row-gap: ${toPx(props.$rowGap[2])};
          }
        `;
      }

      return css`
        row-gap: ${toPx(props.$rowGap)};
      `;
    }
    return null;
  }}
  
  /* columnGap 처리 */
  ${(props) => {
    if (props.$columnGap !== undefined) {
      if (Array.isArray(props.$columnGap)) {
        return css`
          column-gap: ${toPx(props.$columnGap[0])};

          ${props.$columnGap.length > 1 && breakpoints.md} {
            column-gap: ${toPx(props.$columnGap[1])};
          }

          ${props.$columnGap.length > 2 && breakpoints.lg} {
            column-gap: ${toPx(props.$columnGap[2])};
          }
        `;
      }

      return css`
        column-gap: ${toPx(props.$columnGap)};
      `;
    }
    return null;
  }}
  
  /* flow 처리 */
  ${(props) =>
    props.$flow &&
    css`
      grid-auto-flow: ${props.$flow};
    `}
`;

// GridItem 컴포넌트
export const GridItemContainer = styled.div<{
  $colSpan?: GridItemProps["colSpan"];
  $rowSpan?: GridItemProps["rowSpan"];
  $colStart?: GridItemProps["colStart"];
  $colEnd?: GridItemProps["colEnd"];
  $rowStart?: GridItemProps["rowStart"];
  $rowEnd?: GridItemProps["rowEnd"];
}>`
  /* colSpan 처리 */
  ${(props) => {
    if (props.$colSpan) {
      if (Array.isArray(props.$colSpan)) {
        return css`
          grid-column: span ${props.$colSpan[0]};

          ${props.$colSpan.length > 1 && breakpoints.md} {
            grid-column: span ${props.$colSpan[1]};
          }

          ${props.$colSpan.length > 2 && breakpoints.lg} {
            grid-column: span ${props.$colSpan[2]};
          }
        `;
      }

      return css`
        grid-column: span ${props.$colSpan};
      `;
    }
    return null;
  }}

  /* rowSpan 처리 */
  ${(props) => {
    if (props.$rowSpan) {
      if (Array.isArray(props.$rowSpan)) {
        return css`
          grid-row: span ${props.$rowSpan[0]};

          ${props.$rowSpan.length > 1 && breakpoints.md} {
            grid-row: span ${props.$rowSpan[1]};
          }

          ${props.$rowSpan.length > 2 && breakpoints.lg} {
            grid-row: span ${props.$rowSpan[2]};
          }
        `;
      }

      return css`
        grid-row: span ${props.$rowSpan};
      `;
    }
    return null;
  }}
  
  /* colStart 처리 */
  ${(props) => {
    if (props.$colStart) {
      if (Array.isArray(props.$colStart)) {
        return css`
          grid-column-start: ${props.$colStart[0]};

          ${props.$colStart.length > 1 && breakpoints.md} {
            grid-column-start: ${props.$colStart[1]};
          }

          ${props.$colStart.length > 2 && breakpoints.lg} {
            grid-column-start: ${props.$colStart[2]};
          }
        `;
      }

      return css`
        grid-column-start: ${props.$colStart};
      `;
    }
    return null;
  }}
  
  /* colEnd 처리 */
  ${(props) => {
    if (props.$colEnd) {
      if (Array.isArray(props.$colEnd)) {
        return css`
          grid-column-end: ${props.$colEnd[0]};

          ${props.$colEnd.length > 1 && breakpoints.md} {
            grid-column-end: ${props.$colEnd[1]};
          }

          ${props.$colEnd.length > 2 && breakpoints.lg} {
            grid-column-end: ${props.$colEnd[2]};
          }
        `;
      }

      return css`
        grid-column-end: ${props.$colEnd};
      `;
    }
    return null;
  }}
  
  /* rowStart 처리 */
  ${(props) => {
    if (props.$rowStart) {
      if (Array.isArray(props.$rowStart)) {
        return css`
          grid-row-start: ${props.$rowStart[0]};

          ${props.$rowStart.length > 1 && breakpoints.md} {
            grid-row-start: ${props.$rowStart[1]};
          }

          ${props.$rowStart.length > 2 && breakpoints.lg} {
            grid-row-start: ${props.$rowStart[2]};
          }
        `;
      }

      return css`
        grid-row-start: ${props.$rowStart};
      `;
    }
    return null;
  }}
  
  /* rowEnd 처리 */
  ${(props) => {
    if (props.$rowEnd) {
      if (Array.isArray(props.$rowEnd)) {
        return css`
          grid-row-end: ${props.$rowEnd[0]};

          ${props.$rowEnd.length > 1 && breakpoints.md} {
            grid-row-end: ${props.$rowEnd[1]};
          }

          ${props.$rowEnd.length > 2 && breakpoints.lg} {
            grid-row-end: ${props.$rowEnd[2]};
          }
        `;
      }

      return css`
        grid-row-end: ${props.$rowEnd};
      `;
    }
    return null;
  }}
`;

// ThemeProvider 없이 기본 테마 제공
GridContainer.defaultProps = {
  theme: defaultTheme,
};

GridItemContainer.defaultProps = {
  theme: defaultTheme,
};
