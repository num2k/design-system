import React, { useEffect, useRef } from "react";
import {
  ModalBackdrop,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
} from "./Modal.styles";

export interface ModalProps {
  /** 모달이 열려있는지 여부 */
  isOpen: boolean;
  /** 모달이 닫힐 때 호출되는 콜백 */
  onClose: () => void;
  /** 모달 제목 */
  title?: string;
  /** 모달 내용 */
  children: React.ReactNode;
  /** 모달 크기 */
  size?: "sm" | "md" | "lg" | "xl";
  /** 닫기 버튼 표시 여부 */
  showCloseButton?: boolean;
  /** 오버레이 클릭 시 닫기 여부 */
  closeOnOverlayClick?: boolean;
  /** ESC 키 입력 시 닫기 여부 */
  closeOnEscape?: boolean;
  /** 애니메이션 적용 여부 */
  animated?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      title,
      children,
      size = "md",
      showCloseButton = true,
      closeOnOverlayClick = true,
      closeOnEscape = true,
      animated = true,
      className,
    },
    ref
  ) => {
    const innerRef = useRef<HTMLDivElement>(null);
    const modalRef = ref || innerRef;

    // ESC 키 이벤트 처리
    useEffect(() => {
      if (!isOpen) return;

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape" && closeOnEscape) {
          onClose();
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, closeOnEscape, onClose]);

    // body 스크롤 방지
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
      return () => {
        document.body.style.overflow = "unset";
      };
    }, [isOpen]);

    // 모달이 닫혀있으면 null 반환
    if (!isOpen) return null;

    return (
      <ModalBackdrop
        $animated={animated}
        $closeOnOverlayClick={closeOnOverlayClick}
        onClick={closeOnOverlayClick ? onClose : undefined}
        onKeyDown={
          closeOnOverlayClick
            ? (e) => e.key === "Enter" && onClose()
            : undefined
        }
        aria-labelledby={title ? "modal-title" : undefined}
        role="dialog"
        aria-modal="true"
      >
        <ModalContainer
          ref={modalRef as React.RefObject<HTMLDivElement>}
          $size={size}
          $animated={animated}
          className={className}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          {(title || showCloseButton) && (
            <ModalHeader>
              {title && <ModalTitle id="modal-title">{title}</ModalTitle>}
              {showCloseButton && (
                <CloseButton
                  type="button"
                  onClick={onClose}
                  aria-label="모달 닫기"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </CloseButton>
              )}
            </ModalHeader>
          )}
          <ModalBody>{children}</ModalBody>
        </ModalContainer>
      </ModalBackdrop>
    );
  }
);
