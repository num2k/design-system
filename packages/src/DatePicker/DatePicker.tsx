import React, { useState, useRef, useEffect } from "react";
import { Calendar } from "./Calendar";
import {
  DatePickerContainer,
  DatePickerLabel,
  DatePickerRequired,
  DatePickerInputContainer,
  DatePickerInput,
  DatePickerIconButton,
  DatePickerDropdown,
  DatePickerHelperText,
} from "./DatePicker.styles";

export interface DatePickerProps {
  /** 현재 선택된 날짜 값 */
  value?: Date | null;
  /** 날짜가 변경될 때 호출되는 함수 */
  onChange?: (date: Date | null) => void;
  /** 기본 표시 날짜 */
  defaultValue?: Date;
  /** 최소 선택 가능 날짜 */
  minDate?: Date;
  /** 최대 선택 가능 날짜 */
  maxDate?: Date;
  /** 플레이스홀더 텍스트 */
  placeholder?: string;
  /** 날짜 포맷 문자열 (예: 'yyyy-MM-dd') */
  format?: string;
  /** 달력 열기/닫기 제어 */
  isOpen?: boolean;
  /** 달력이 닫힐 때 호출되는 함수 */
  onClose?: () => void;
  /** 달력이 열릴 때 호출되는 함수 */
  onOpen?: () => void;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 읽기 전용 여부 */
  readOnly?: boolean;
  /** 에러 상태 */
  isError?: boolean;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 도움말 텍스트 */
  helperText?: string;
  /** 성공 상태 */
  isSuccess?: boolean;
  /** 필수 입력 여부 */
  required?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 라벨 텍스트 */
  label?: string;
  /** 인풋 크기 */
  size?: "sm" | "md" | "lg";
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  defaultValue,
  minDate,
  maxDate,
  placeholder = "날짜 선택",
  format = "yyyy-MM-dd",
  isOpen: controlledIsOpen,
  onClose,
  onOpen,
  disabled = false,
  readOnly = false,
  isError = false,
  errorMessage,
  helperText,
  isSuccess = false,
  required = false,
  className = "",
  label,
  size = "md",
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value || defaultValue || null
  );
  const [isOpen, setIsOpen] = useState<boolean>(controlledIsOpen || false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isControlled = value !== undefined;
  const currentDate = isControlled ? value : selectedDate;

  // 날짜 선택 시 호출
  const handleDateSelect = (date: Date | null) => {
    if (!isControlled) {
      setSelectedDate(date);
    }
    onChange?.(date);
    handleClose();
  };

  // DatePicker 열기
  const handleOpen = () => {
    if (!disabled && !readOnly) {
      setIsOpen(true);
      onOpen?.();
    }
  };

  // DatePicker 닫기
  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  // 외부 클릭 처리
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  // 제어 컴포넌트인 경우 isOpen 상태 동기화
  useEffect(() => {
    if (controlledIsOpen !== undefined) {
      setIsOpen(controlledIsOpen);
    }
  }, [controlledIsOpen]);

  // 날짜 포맷 함수
  const formatDate = (date: Date | null): string => {
    if (!date) return "";

    // 간단한 날짜 포맷 구현 (실제 구현에서는 더 견고한 라이브러리 사용 권장)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return format
      .replace("yyyy", String(year))
      .replace("MM", month)
      .replace("dd", day);
  };

  return (
    <DatePickerContainer
      className={className}
      ref={containerRef}
      $size={size}
      $isError={isError}
      $isSuccess={isSuccess}
      $disabled={disabled}
      $readOnly={readOnly}
    >
      {label && (
        <DatePickerLabel>
          {label}
          {required && <DatePickerRequired>*</DatePickerRequired>}
        </DatePickerLabel>
      )}

      <DatePickerInputContainer>
        <DatePickerInput
          type="text"
          placeholder={placeholder}
          value={formatDate(currentDate)}
          onChange={() => {
            /* 입력 변경 시 처리할 내용 */
          }}
          onClick={handleOpen}
          onFocus={handleOpen}
          disabled={disabled}
          readOnly={true}
          required={required}
          aria-invalid={isError}
          $size={size}
          $isError={isError}
          $isSuccess={isSuccess}
        />

        <DatePickerIconButton
          type="button"
          onClick={handleOpen}
          $disabled={disabled || readOnly}
          disabled={disabled || readOnly}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2H13.5C14.3284 2 15 2.67157 15 3.5V13.5C15 14.3284 14.3284 15 13.5 15H2.5C1.67157 15 1 14.3284 1 13.5V3.5C1 2.67157 1.67157 2 2.5 2H4M12 2V1M12 2H4M4 2V1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              x="4"
              y="6"
              width="2"
              height="2"
              rx="0.5"
              fill="currentColor"
            />
            <rect
              x="7"
              y="6"
              width="2"
              height="2"
              rx="0.5"
              fill="currentColor"
            />
            <rect
              x="10"
              y="6"
              width="2"
              height="2"
              rx="0.5"
              fill="currentColor"
            />
            <rect
              x="4"
              y="9"
              width="2"
              height="2"
              rx="0.5"
              fill="currentColor"
            />
            <rect
              x="7"
              y="9"
              width="2"
              height="2"
              rx="0.5"
              fill="currentColor"
            />
            <rect
              x="10"
              y="9"
              width="2"
              height="2"
              rx="0.5"
              fill="currentColor"
            />
          </svg>
        </DatePickerIconButton>

        {isOpen && (
          <DatePickerDropdown>
            <Calendar
              value={currentDate}
              onChange={handleDateSelect}
              minDate={minDate}
              maxDate={maxDate}
            />
          </DatePickerDropdown>
        )}
      </DatePickerInputContainer>

      {(helperText || (isError && errorMessage)) && (
        <DatePickerHelperText $isError={isError}>
          {isError ? errorMessage : helperText}
        </DatePickerHelperText>
      )}
    </DatePickerContainer>
  );
};

DatePicker.displayName = "DatePicker";
