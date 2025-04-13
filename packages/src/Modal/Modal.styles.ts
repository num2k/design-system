import styled, { css, keyframes } from "styled-components";
import { ModalProps } from "./Modal";
import { defaultTheme } from "../theme/theme";

// 모달 오버레이 페이드인 애니메이션
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// 모달 콘텐츠 줌인 애니메이션
const zoomIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const ModalBackdrop = styled.div<{
  $animated?: boolean;
  $closeOnOverlayClick?: boolean;
}>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-index-modal);
  overflow-y: auto;
  padding: var(--spacing-4);
  box-sizing: border-box;
  cursor: ${(props) => (props.$closeOnOverlayClick ? "pointer" : "default")};

  ${(props) =>
    props.$animated &&
    css`
      animation: ${fadeIn} 0.2s ease-out;
    `}

  /* 다크모드에서는 배경을 좀 더 진하게 설정 */
  [data-theme="dark"] & {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

export const ModalContainer = styled.div<{
  $size?: ModalProps["size"];
  $animated?: boolean;
}>`
  background-color: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  width: 100%;
  max-height: calc(100vh - var(--spacing-8));
  display: flex;
  flex-direction: column;
  cursor: default;
  overflow: hidden;
  position: relative;

  /* 크기 변형 */
  ${(props) => {
    switch (props.$size) {
      case "sm":
        return css`
          max-width: 400px;
        `;
      case "md":
        return css`
          max-width: 500px;
        `;
      case "lg":
        return css`
          max-width: 650px;
        `;
      case "xl":
        return css`
          max-width: 800px;
        `;
      default:
        return css`
          max-width: 500px;
        `;
    }
  }}

  ${(props) =>
    props.$animated &&
    css`
      animation: ${zoomIn} 0.2s ease-out;
    `}
    
  /* 다크모드 */
  [data-theme="dark"] & {
    background-color: var(
      --color-background-secondary,
      var(--color-neutral-800)
    );
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.8);
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-4) var(--spacing-6);
  border-bottom: 1px solid var(--color-neutral-200);

  /* 다크모드 */
  [data-theme="dark"] & {
    border-bottom-color: var(--color-neutral-700);
  }
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-neutral-900);
  line-height: 1.4;

  /* 다크모드 */
  [data-theme="dark"] & {
    color: var(--color-text-primary, var(--color-neutral-100));
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  padding: var(--spacing-1);
  margin: calc(var(--spacing-1) * -1);
  cursor: pointer;
  color: var(--color-neutral-500);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: var(--color-neutral-100);
    color: var(--color-neutral-800);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-primary-100);
  }

  /* 다크모드 */
  [data-theme="dark"] & {
    color: var(--color-neutral-400);

    &:hover {
      background-color: var(--color-neutral-700);
      color: var(--color-neutral-100);
    }

    &:focus {
      box-shadow: 0 0 0 2px var(--color-primary-900);
    }
  }
`;

export const ModalBody = styled.div`
  padding: var(--spacing-6);
  overflow-y: auto;
  flex-grow: 1;

  /* 다크모드 */
  [data-theme="dark"] & {
    color: var(--color-text-primary, var(--color-neutral-200));
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--spacing-3);
  padding: var(--spacing-4) var(--spacing-6);
  border-top: 1px solid var(--color-neutral-200);

  /* 다크모드 */
  [data-theme="dark"] & {
    border-top-color: var(--color-neutral-700);
  }

  /* 버튼들의 여백 및 크기 조정 */
  & > button {
    min-width: 80px;
  }
`;

// 모달 닫기 애니메이션
const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const zoomOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
`;

export const ClosingModalBackdrop = styled(ModalBackdrop)`
  animation: ${fadeOut} 0.2s ease-out forwards;
`;

export const ClosingModalContainer = styled(ModalContainer)`
  animation: ${zoomOut} 0.2s ease-out forwards;
`;

// ThemeProvider 없이 기본 테마 제공
ModalBackdrop.defaultProps = {
  theme: defaultTheme,
};

ModalContainer.defaultProps = {
  theme: defaultTheme,
};

ModalHeader.defaultProps = {
  theme: defaultTheme,
};

ModalTitle.defaultProps = {
  theme: defaultTheme,
};

CloseButton.defaultProps = {
  theme: defaultTheme,
};

ModalBody.defaultProps = {
  theme: defaultTheme,
};

ModalFooter.defaultProps = {
  theme: defaultTheme,
};

ClosingModalBackdrop.defaultProps = {
  theme: defaultTheme,
};

ClosingModalContainer.defaultProps = {
  theme: defaultTheme,
};
