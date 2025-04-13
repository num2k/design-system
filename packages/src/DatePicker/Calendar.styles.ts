import styled, { css } from "styled-components";

export const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 280px;
  background-color: white;
  border-radius: var(--radius-md);
  overflow: hidden;
  user-select: none;
`;

export const CalendarHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: var(--spacing-2);
  background-color: var(--color-primary-50);
  border-bottom: 1px solid var(--color-neutral-200);
`;

export const CalendarYearNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-1);
`;

export const CalendarMonthNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CalendarYear = styled.span`
  font-weight: var(--font-weight-medium);
  color: var(--color-neutral-900);
`;

export const CalendarMonth = styled.span`
  font-weight: var(--font-weight-medium);
  color: var(--color-neutral-900);
`;

export const CalendarNavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background-color: transparent;
  color: var(--color-neutral-800);
  font-size: var(--font-size-lg);
  cursor: pointer;
  border-radius: var(--radius-full);
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--color-primary-100);
    color: var(--color-primary-700);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-primary-200);
  }
`;

export const CalendarWeekdays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  padding: var(--spacing-2) var(--spacing-1);
  border-bottom: 1px solid var(--color-neutral-200);
`;

export const CalendarWeekday = styled.div`
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-neutral-600);
  width: 36px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CalendarDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, auto);
  padding: var(--spacing-1);
`;

export const CalendarDay = styled.button<{
  $isOtherMonth?: boolean;
  $isSelected?: boolean;
  $isDisabled?: boolean;
  $isToday?: boolean;
  $isInRange?: boolean;
  $isRangeStart?: boolean;
  $isRangeEnd?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  font-size: var(--font-size-sm);
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  background-color: transparent;
  transition: all 0.2s ease;
  position: relative;
  padding: 0;

  /* 기본 스타일 */
  color: var(--color-neutral-900);

  /* 다른 달 날짜 스타일 */
  ${(props) =>
    props.$isOtherMonth &&
    css`
      color: var(--color-neutral-400);
    `}

  /* 선택된 날짜 스타일 */
  ${(props) =>
    props.$isSelected &&
    css`
      background-color: var(--color-primary-500);
      color: white;
      font-weight: var(--font-weight-medium);

      &:hover {
        background-color: var(--color-primary-600);
      }
    `}
  
  /* 비활성화된 날짜 스타일 */
  ${(props) =>
    props.$isDisabled &&
    css`
      color: var(--color-neutral-300);
      cursor: not-allowed;
      pointer-events: none;
    `}
  
  /* 오늘 날짜 스타일 */
  ${(props) =>
    props.$isToday &&
    css`
      font-weight: var(--font-weight-bold);
      box-shadow: inset 0 0 0 1px var(--color-primary-400);
    `}
  
  /* 범위 내 날짜 스타일 */
  ${(props) =>
    props.$isInRange &&
    !props.$isSelected &&
    css`
      background-color: var(--color-primary-100);
    `}
  
  /* 범위 시작 날짜 스타일 */
  ${(props) =>
    props.$isRangeStart &&
    css`
      background-color: var(--color-primary-500);
      color: white;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    `}
  
  /* 범위 종료 날짜 스타일 */
  ${(props) =>
    props.$isRangeEnd &&
    css`
      background-color: var(--color-primary-500);
      color: white;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    `}
  
  /* 호버 스타일 (비활성화되지 않은 경우만) */
  &:not(:disabled):hover {
    background-color: ${(props) =>
      props.$isSelected
        ? "var(--color-primary-600)"
        : "var(--color-primary-100)"};
  }

  /* 포커스 스타일 */
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-primary-200);
  }
`;
