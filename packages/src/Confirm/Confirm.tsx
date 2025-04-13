import React, { useCallback } from "react";
import { Button } from "../Button";
import { Modal } from "../Modal";
import {
  ConfirmContainer,
  ConfirmMessage,
  ConfirmButtons,
} from "./Confirm.styles";

export interface ConfirmProps {
  /**
   * 확인 대화상자에 표시될 메시지
   */
  message: string;
  /**
   * 확인 버튼에 표시될 텍스트
   */
  confirmText?: string;
  /**
   * 취소 버튼에 표시될 텍스트
   */
  cancelText?: string;
  /**
   * 확인 대화상자가 열려있는지 여부
   */
  isOpen: boolean;
  /**
   * 확인 버튼 클릭 시 호출될 함수
   */
  onConfirm: () => void;
  /**
   * 취소 버튼 클릭 시 또는 모달 닫기 시 호출될 함수
   */
  onCancel: () => void;
  /**
   * 확인 버튼 변형
   */
  confirmVariant?: "primary" | "danger";
  /**
   * 추가 CSS 클래스
   */
  className?: string;
}

export const Confirm: React.FC<ConfirmProps> = ({
  message,
  confirmText = "확인",
  cancelText = "취소",
  isOpen,
  onConfirm,
  onCancel,
  confirmVariant = "primary",
  className,
}) => {
  const handleConfirm = useCallback(() => {
    onConfirm();
  }, [onConfirm]);

  const handleCancel = useCallback(() => {
    onCancel();
  }, [onCancel]);

  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <ConfirmContainer className={className}>
        <ConfirmMessage>{message}</ConfirmMessage>
        <ConfirmButtons>
          <Button onClick={handleCancel} variant="outline">
            {cancelText}
          </Button>
          <Button onClick={handleConfirm} variant={confirmVariant}>
            {confirmText}
          </Button>
        </ConfirmButtons>
      </ConfirmContainer>
    </Modal>
  );
};

Confirm.displayName = "Confirm";
