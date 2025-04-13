import React, { useState, useRef, useEffect } from "react";
import { Calendar } from "./Calendar";
import {
  DatePickerContainer,
  DatePickerLabel,
  DatePickerInputContainer,
  DatePickerInput,
  DatePickerIconButton,
  DatePickerHelperText,
  DateRangePickerDropdown,
  DateRangePickerHeader,
  DateRangeSelectionMode,
  DateRangeModeIndicator,
  DateRangeSelected,
  DateRangeDateDisplay,
  DateRangeDateLabel,
  DateRangeDateValue,
  DateRangeSeparator,
} from "./DatePicker.styles";

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

export interface DateRangePickerProps {
  /** 시작 날짜 */
  startDate?: Date | null;
  /** 종료 날짜 */
  endDate?: Date | null;
  /** 날짜 범위가 변경될 때 호출되는 함수 */
  onChange?: (dateRange: DateRange) => void;
  /** 기본 시작 날짜 */
  defaultStartDate?: Date | null;
  /** 기본 종료 날짜 */
  defaultEndDate?: Date | null;
  /** 최소 선택 가능 날짜 */
  minDate?: Date;
  /** 최대 선택 가능 날짜 */
  maxDate?: Date;
  /** 플레이스홀더 텍스트 */
  placeholder?: string;
  /** 날짜 포맷 문자열 (예: 'yyyy-MM-dd') */
  format?: string;
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
  /** 추가 CSS 클래스 */
  className?: string;
  /** 라벨 텍스트 */
  label?: string;
  /** 인풋 크기 */
  size?: "sm" | "md" | "lg";
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate: controlledStartDate,
  endDate: controlledEndDate,
  onChange,
  defaultStartDate,
  defaultEndDate,
  minDate,
  maxDate,
  placeholder = "날짜 범위 선택",
  format = "yyyy-MM-dd",
  disabled = false,
  readOnly = false,
  isError = false,
  errorMessage,
  helperText,
  className = "",
  label,
  size = "md",
}) => {
  const [startDate, setStartDate] = useState<Date | null>(
    controlledStartDate !== undefined
      ? controlledStartDate
      : defaultStartDate || null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    controlledEndDate !== undefined ? controlledEndDate : defaultEndDate || null
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectionMode, setSelectionMode] = useState<"start" | "end">("start");
  const [calendarMonth, setCalendarMonth] = useState<Date>(new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  const isControlled =
    controlledStartDate !== undefined && controlledEndDate !== undefined;

  useEffect(() => {
    if (isControlled) {
      setStartDate(controlledStartDate);
      setEndDate(controlledEndDate);
    }
  }, [controlledStartDate, controlledEndDate, isControlled]);

  // 날짜 선택 시 호출
  const handleDateSelect = (date: Date) => {
    if (selectionMode === "start") {
      // 시작 날짜 선택
      const newStartDate = date;

      if (!isControlled) {
        setStartDate(newStartDate);

        // 시작 날짜가 종료 날짜보다 크면 종료 날짜를 null로 설정
        if (endDate && newStartDate > endDate) {
          setEndDate(null);
        }
      }

      setSelectionMode("end");

      // 컨트롤드 모드에서는 onChange 호출
      if (isControlled) {
        onChange?.({
          startDate: date,
          endDate: endDate && date > endDate ? null : endDate,
        });
      } else {
        onChange?.({
          startDate: newStartDate,
          endDate: endDate && newStartDate > endDate ? null : endDate,
        });
      }
    } else {
      // 종료 날짜 선택
      // 시작 날짜보다 이전 날짜를 선택하면 시작 날짜로 설정
      if (startDate && date < startDate) {
        if (!isControlled) {
          setStartDate(date);
          setEndDate(startDate);
        }

        onChange?.({ startDate: date, endDate: startDate });
      } else {
        if (!isControlled) {
          setEndDate(date);
        }

        onChange?.({ startDate: startDate, endDate: date });
      }

      setSelectionMode("start");
      setIsOpen(false); // 두 날짜를 모두 선택했으므로 달력 닫기
    }
  };

  // DateRangePicker 열기
  const handleOpen = () => {
    if (!disabled && !readOnly) {
      setIsOpen(true);
    }
  };

  // 외부 클릭 처리
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
        setSelectionMode("start");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  // 날짜 포맷 함수
  const formatDate = (date: Date | null): string => {
    if (!date) return "";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return format
      .replace("yyyy", String(year))
      .replace("MM", month)
      .replace("dd", day);
  };

  // 표시 텍스트 생성
  const displayText =
    startDate || endDate
      ? `${startDate ? formatDate(startDate) : ""} ~ ${
          endDate ? formatDate(endDate) : ""
        }`
      : "";

  // 이전/다음 달로 이동하는 함수
  const handlePrevMonth = () => {
    const prevMonth = new Date(calendarMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCalendarMonth(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(calendarMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCalendarMonth(nextMonth);
  };

  // 달력에 표시할 날짜 범위 하이라이트
  const isDateInRange = (date: Date) => {
    if (!startDate || !endDate) return false;
    return date >= startDate && date <= endDate;
  };

  // 선택된 날짜 스타일
  const getDateStyles = (date: Date) => {
    if (startDate && date.getTime() === startDate.getTime()) {
      return "calendar__day--selected-start";
    }
    if (endDate && date.getTime() === endDate.getTime()) {
      return "calendar__day--selected-end";
    }
    if (isDateInRange(date)) {
      return "calendar__day--in-range";
    }
    return "";
  };

  return (
    <DatePickerContainer
      className={className}
      ref={containerRef}
      $size={size}
      $isError={isError}
      $disabled={disabled}
      $readOnly={readOnly}
    >
      {label && <DatePickerLabel>{label}</DatePickerLabel>}

      <DatePickerInputContainer>
        <DatePickerInput
          type="text"
          placeholder={placeholder}
          value={displayText}
          onClick={handleOpen}
          onFocus={handleOpen}
          readOnly
          disabled={disabled}
          aria-invalid={isError}
          $size={size}
          $isError={isError}
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
          <DateRangePickerDropdown>
            <DateRangePickerHeader>
              <DateRangeSelectionMode>
                <DateRangeModeIndicator>
                  {selectionMode === "start" ? "시작일 선택" : "종료일 선택"}
                </DateRangeModeIndicator>
              </DateRangeSelectionMode>
              <DateRangeSelected>
                <DateRangeDateDisplay>
                  <DateRangeDateLabel>시작일:</DateRangeDateLabel>
                  <DateRangeDateValue>
                    {startDate ? formatDate(startDate) : "-"}
                  </DateRangeDateValue>
                </DateRangeDateDisplay>
                <DateRangeSeparator>~</DateRangeSeparator>
                <DateRangeDateDisplay>
                  <DateRangeDateLabel>종료일:</DateRangeDateLabel>
                  <DateRangeDateValue>
                    {endDate ? formatDate(endDate) : "-"}
                  </DateRangeDateValue>
                </DateRangeDateDisplay>
              </DateRangeSelected>
            </DateRangePickerHeader>
            <Calendar
              value={selectionMode === "start" ? startDate : endDate}
              onChange={handleDateSelect}
              minDate={
                selectionMode === "end" && startDate ? startDate : minDate
              }
              maxDate={maxDate}
              month={calendarMonth}
              onMonthChange={setCalendarMonth}
              isDateInRange={isDateInRange}
              getDateStyles={getDateStyles}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
            />
          </DateRangePickerDropdown>
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

DateRangePicker.displayName = "DateRangePicker";
