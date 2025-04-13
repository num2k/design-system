import styled, { css } from "styled-components";
import { AspectRatioProps } from "./AspectRatio";

export const AspectRatioContainer = styled.div<{
  $maxWidth?: number | string;
  $minHeight?: number | string;
}>`
  position: relative;
  width: 100%;
  max-width: ${(props) =>
    typeof props.$maxWidth !== "undefined"
      ? typeof props.$maxWidth === "number"
        ? `${props.$maxWidth}px`
        : props.$maxWidth
      : "100%"};
  min-height: ${(props) =>
    typeof props.$minHeight !== "undefined"
      ? typeof props.$minHeight === "number"
        ? `${props.$minHeight}px`
        : props.$minHeight
      : "auto"};
`;

export const AspectRatioInner = styled.div<{
  $paddingBottom: string;
}>`
  position: relative;
  width: 100%;
  padding-bottom: ${(props) => props.$paddingBottom};
`;

export const AspectRatioContent = styled.div<{
  $contentFill: boolean;
}>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  ${(props) =>
    props.$contentFill &&
    css`
      & > * {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }
    `}

  & > iframe,
  & > embed,
  & > object,
  & > video {
    border: none;
  }
`;
