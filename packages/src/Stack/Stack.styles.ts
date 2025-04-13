import styled, { css } from "styled-components";
import { StackProps } from "./Stack";
import { defaultTheme } from "../theme/theme";

// FlexBox 정렬/분배 값 변환 헬퍼 함수
const getFlexValue = (value?: string) => {
  if (!value) return undefined;
  if (value === "start") return "flex-start";
  if (value === "end") return "flex-end";
  return value;
};

export const StyledStack = styled.div<{
  $direction?: StackProps["direction"];
  $align?: StackProps["align"];
  $spacing?: StackProps["spacing"];
  $distribute?: StackProps["distribute"];
  $divider?: boolean;
  $fullWidth?: boolean;
  $fullHeight?: boolean;
}>`
  display: flex;
  box-sizing: border-box;

  /* 방향 설정 */
  ${(props) =>
    props.$direction === "vertical"
      ? css`
          flex-direction: column;

          /* 정렬 및 분배 */
          align-items: ${props.$align ? getFlexValue(props.$align) : undefined};
          justify-content: ${props.$distribute
            ? getFlexValue(props.$distribute)
            : undefined};
        `
      : css`
          flex-direction: row;

          /* 정렬 및 분배 */
          justify-content: ${props.$align
            ? getFlexValue(props.$align)
            : undefined};
          align-items: ${props.$distribute
            ? getFlexValue(props.$distribute)
            : undefined};
        `}

  /* 간격 설정 */
  gap: ${(props) =>
    typeof props.$spacing === "number"
      ? `${props.$spacing}px`
      : props.$spacing};

  /* 전체 너비/높이 */
  width: ${(props) => (props.$fullWidth ? "100%" : "auto")};
  height: ${(props) => (props.$fullHeight ? "100%" : "auto")};

  /* 구분선이 있는 경우의 스타일링 */
  ${(props) =>
    props.$divider &&
    css`
      position: relative;

      /* 구분선이 있는 경우에도 gap을 적용하기 위한 처리 */
      ${props.$direction === "vertical"
        ? css`
            > *:not(:last-child) {
              margin-bottom: calc(
                ${typeof props.$spacing === "number"
                    ? `${props.$spacing}px`
                    : props.$spacing} / 2
              );
            }
            > *:not(:first-child) {
              margin-top: calc(
                ${typeof props.$spacing === "number"
                    ? `${props.$spacing}px`
                    : props.$spacing} / 2
              );
            }
          `
        : css`
            > *:not(:last-child) {
              margin-right: calc(
                ${typeof props.$spacing === "number"
                    ? `${props.$spacing}px`
                    : props.$spacing} / 2
              );
            }
            > *:not(:first-child) {
              margin-left: calc(
                ${typeof props.$spacing === "number"
                    ? `${props.$spacing}px`
                    : props.$spacing} / 2
              );
            }
          `}
    `}
`;

StyledStack.defaultProps = {
  theme: defaultTheme,
};

export const Divider = styled.div<{
  $direction?: StackProps["direction"];
}>`
  flex-shrink: 0;

  ${(props) =>
    props.$direction === "vertical"
      ? css`
          width: 100%;
          height: 1px;
          background-color: var(--color-neutral-200);
        `
      : css`
          width: 1px;
          height: auto;
          align-self: stretch;
          background-color: var(--color-neutral-200);
        `}
`;

Divider.defaultProps = {
  theme: defaultTheme,
};
