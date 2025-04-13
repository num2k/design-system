import React, { useState, useEffect } from "react";
import {
  CalendarContainer,
  CalendarHeader,
  CalendarYearNavigation,
  CalendarMonthNavigation,
  CalendarYear,
  CalendarMonth,
  CalendarNavButton,
  CalendarWeekdays,
  CalendarWeekday,
  CalendarDays,
  CalendarDay,
} from "./Calendar.styles";

export interface CalendarProps {
  /** 현재 선택된 날짜 */
  value?: Date | null;
  /** 날짜 선택 시 호출되는 함수 */
  onChange?: (date: Date) => void;
  /** 최소 선택 가능 날짜 */
  minDate?: Date;
  /** 최대 선택 가능 날짜 */
  maxDate?: Date;
  /** 달력 헤더 표시 여부 */
  showHeader?: boolean;
  /** 날짜 선택 가능 여부를 결정하는 함수 */
  isDateDisabled?: (date: Date) => boolean;
  /** 달력 시작 요일 (0: 일요일, 1: 월요일, ...) */
  startOfWeek?: number;
  /** 현재 표시할 월 (DateRangePicker에서 사용) */
  month?: Date;
  /** 월 변경 콜백 (DateRangePicker에서 사용) */
  onMonthChange?: (date: Date) => void;
  /** 이전 달 이동 콜백 */
  onPrevMonth?: () => void;
  /** 다음 달 이동 콜백 */
  onNextMonth?: () => void;
  /** 날짜가 범위 내에 있는지 확인하는 함수 */
  isDateInRange?: (date: Date) => boolean;
  /** 날짜에 적용할 스타일 클래스를 반환하는 함수 */
  getDateStyles?: (date: Date) => string;
}

const DAYS_OF_WEEK = ["일", "월", "화", "수", "목", "금", "토"];
const MONTHS = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

export const Calendar: React.FC<CalendarProps> = ({
  value,
  onChange,
  minDate,
  maxDate,
  showHeader = true,
  isDateDisabled,
  startOfWeek = 0, // 기본값: 일요일
  month,
  onMonthChange,
  onPrevMonth,
  onNextMonth,
  isDateInRange,
  getDateStyles,
}) => {
  // 현재 표시 중인 달력의 연도와 월
  const [viewingDate, setViewingDate] = useState<Date>(() => {
    if (month) return new Date(month);
    if (value) return new Date(value);
    return new Date();
  });

  // 선택된 날짜
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);

  // month prop이 변경되면 viewingDate 업데이트
  useEffect(() => {
    if (month) {
      setViewingDate(new Date(month));
    }
  }, [month]);

  // 현재 월의 날짜 배열 생성
  const getDaysInMonth = (year: number, month: number) => {
    const daysInMonth: Date[] = [];
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // 시작 요일에 맞춰 이전 달 날짜 채우기
    const firstDayWeekday = firstDayOfMonth.getDay();
    const diff = (firstDayWeekday - startOfWeek + 7) % 7;

    if (diff > 0) {
      for (let i = diff - 1; i >= 0; i--) {
        const prevMonthDay = new Date(year, month, -i);
        daysInMonth.push(prevMonthDay);
      }
    }

    // 현재 월 날짜 추가
    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      daysInMonth.push(new Date(year, month, day));
    }

    // 다음 달 날짜로 채우기 (총 칸이 42개가 되도록)
    const remainingDays = 42 - daysInMonth.length;
    for (let day = 1; day <= remainingDays; day++) {
      daysInMonth.push(new Date(year, month + 1, day));
    }

    return daysInMonth;
  };

  const daysInMonth = getDaysInMonth(
    viewingDate.getFullYear(),
    viewingDate.getMonth()
  );

  // 이전 달로 이동
  const goToPreviousMonth = () => {
    if (onPrevMonth) {
      onPrevMonth();
      return;
    }

    setViewingDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);

      if (onMonthChange) {
        onMonthChange(newDate);
      }

      return newDate;
    });
  };

  // 다음 달로 이동
  const goToNextMonth = () => {
    if (onNextMonth) {
      onNextMonth();
      return;
    }

    setViewingDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);

      if (onMonthChange) {
        onMonthChange(newDate);
      }

      return newDate;
    });
  };

  // 이전 년도로 이동
  const goToPreviousYear = () => {
    setViewingDate((prev) => {
      const newDate = new Date(prev);
      newDate.setFullYear(prev.getFullYear() - 1);

      if (onMonthChange) {
        onMonthChange(newDate);
      }

      return newDate;
    });
  };

  // 다음 년도로 이동
  const goToNextYear = () => {
    setViewingDate((prev) => {
      const newDate = new Date(prev);
      newDate.setFullYear(prev.getFullYear() + 1);

      if (onMonthChange) {
        onMonthChange(newDate);
      }

      return newDate;
    });
  };

  // 날짜 선택 핸들러
  const handleDayClick = (day: Date) => {
    // 비활성화된 날짜인지 확인
    if (isDateDisabled?.(day)) return;
    if (minDate && day < minDate) return;
    if (maxDate && day > maxDate) return;

    // 날짜 시간 부분을 00:00:00으로 초기화
    const selectedDay = new Date(day);
    selectedDay.setHours(0, 0, 0, 0);

    setSelectedDate(selectedDay);
    onChange?.(selectedDay);
  };

  // 날짜가 선택 가능한지 확인
  const isDisabled = (day: Date) => {
    // 최소/최대 날짜 범위 확인
    if (minDate && day < minDate) return true;
    if (maxDate && day > maxDate) return true;

    // 커스텀 비활성화 규칙 확인
    if (isDateDisabled?.(day)) return true;

    return false;
  };

  // 동일한 날짜인지 비교 (연, 월, 일만 비교)
  const isSameDate = (date1: Date | null, date2: Date | null) => {
    if (!date1 || !date2) return false;
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  // 현재 달에 속하는지 확인
  const isCurrentMonth = (day: Date) => {
    return day.getMonth() === viewingDate.getMonth();
  };

  // 오늘 날짜인지 확인
  const isToday = (day: Date) => {
    const today = new Date();
    return (
      day.getFullYear() === today.getFullYear() &&
      day.getMonth() === today.getMonth() &&
      day.getDate() === today.getDate()
    );
  };

  // value prop이 변경되면 selectedDate 업데이트
  useEffect(() => {
    setSelectedDate(value || null);
  }, [value]);

  // 요일 헤더에 표시할 요일 배열
  const displayDaysOfWeek = [
    ...DAYS_OF_WEEK.slice(startOfWeek),
    ...DAYS_OF_WEEK.slice(0, startOfWeek),
  ];

  // 날짜 범위 및 시작/끝 확인 (DateRangePicker에서 사용)
  const isRangeStart = (day: Date) => {
    if (!getDateStyles) return false;
    return getDateStyles(day).includes("selected-start");
  };

  const isRangeEnd = (day: Date) => {
    if (!getDateStyles) return false;
    return getDateStyles(day).includes("selected-end");
  };

  return (
    <CalendarContainer>
      {showHeader && (
        <CalendarHeader>
          <CalendarYearNavigation>
            <CalendarNavButton
              type="button"
              onClick={goToPreviousYear}
              aria-label="이전 년도"
            >
              «
            </CalendarNavButton>
            <CalendarYear>{viewingDate.getFullYear()}년</CalendarYear>
            <CalendarNavButton
              type="button"
              onClick={goToNextYear}
              aria-label="다음 년도"
            >
              »
            </CalendarNavButton>
          </CalendarYearNavigation>
          <CalendarMonthNavigation>
            <CalendarNavButton
              type="button"
              onClick={goToPreviousMonth}
              aria-label="이전 달"
            >
              ‹
            </CalendarNavButton>
            <CalendarMonth>{MONTHS[viewingDate.getMonth()]}</CalendarMonth>
            <CalendarNavButton
              type="button"
              onClick={goToNextMonth}
              aria-label="다음 달"
            >
              ›
            </CalendarNavButton>
          </CalendarMonthNavigation>
        </CalendarHeader>
      )}

      <CalendarWeekdays>
        {displayDaysOfWeek.map((day) => (
          <CalendarWeekday key={`weekday-${day}`}>{day}</CalendarWeekday>
        ))}
      </CalendarWeekdays>

      <CalendarDays>
        {daysInMonth.map((day) => (
          <CalendarDay
            key={`day-${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`}
            type="button"
            onClick={() => handleDayClick(day)}
            disabled={isDisabled(day)}
            tabIndex={isCurrentMonth(day) ? 0 : -1}
            $isOtherMonth={!isCurrentMonth(day)}
            $isSelected={isSameDate(day, selectedDate)}
            $isDisabled={isDisabled(day)}
            $isToday={isToday(day)}
            $isInRange={isDateInRange ? isDateInRange(day) : false}
            $isRangeStart={isRangeStart(day)}
            $isRangeEnd={isRangeEnd(day)}
          >
            {day.getDate()}
          </CalendarDay>
        ))}
      </CalendarDays>
    </CalendarContainer>
  );
};
