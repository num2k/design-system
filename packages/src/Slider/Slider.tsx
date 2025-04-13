import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  SliderContainer,
  Track,
  TrackProgress,
  Thumb,
  Tooltip,
  Mark,
  MarkDot,
  MarkLabel,
  RangeSliderContainer,
} from "./Slider.styles";

export interface SliderProps {
  /** 최소값 */
  min?: number;
  /** 최대값 */
  max?: number;
  /** 현재 값 */
  value?: number;
  /** 기본값 */
  defaultValue?: number;
  /** 값 변경 콜백 */
  onChange?: (value: number) => void;
  /** 최종 값 변경 콜백 (드래그 끝났을 때) */
  onChangeComplete?: (value: number) => void;
  /** 스텝 크기 */
  step?: number;
  /** 크기 */
  size?: "sm" | "md" | "lg";
  /** 색상 변형 */
  color?: "primary" | "success" | "warning" | "error" | "info";
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 수직 방향 */
  vertical?: boolean;
  /** 슬라이더 높이 (vertical=true일 때만 사용) */
  height?: number;
  /** 툴팁 표시 여부 */
  tooltip?: boolean | "always";
  /** 툴팁 포맷 함수 */
  tipFormatter?: (value: number) => string;
  /** 표시할 마크 목록 */
  marks?: Record<number, React.ReactNode>;
  /** 추가 CSS 클래스 */
  className?: string;
}

export interface RangeSliderProps
  extends Omit<
    SliderProps,
    "value" | "defaultValue" | "onChange" | "onChangeComplete"
  > {
  /** 현재 값 [최소, 최대] */
  value?: [number, number];
  /** 기본값 [최소, 최대] */
  defaultValue?: [number, number];
  /** 값 변경 콜백 */
  onChange?: (value: [number, number]) => void;
  /** 최종 값 변경 콜백 (드래그 끝났을 때) */
  onChangeComplete?: (value: [number, number]) => void;
  /** 핸들 간 최소 거리 */
  minDistance?: number;
}

export const Slider: React.FC<SliderProps> = ({
  min = 0,
  max = 100,
  value: controlledValue,
  defaultValue = 0,
  onChange,
  onChangeComplete,
  step = 1,
  size = "md",
  color = "primary",
  disabled = false,
  vertical = false,
  height = 200,
  tooltip = false,
  tipFormatter = (value) => `${value}`,
  marks,
  className = "",
}) => {
  const [value, setValue] = useState(defaultValue);
  const [isDragging, setIsDragging] = useState(false);
  const [showTooltip, setShowTooltip] = useState(tooltip === "always");
  const trackRef = useRef<HTMLDivElement>(null);
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : value;

  // 백분율로 변환
  const getPercentage = useCallback(
    (value: number) => {
      return ((value - min) / (max - min)) * 100;
    },
    [min, max]
  );

  // 퍼센트를 값으로 변환
  const getValueFromPercentage = useCallback(
    (percentage: number) => {
      let rawValue = min + (percentage / 100) * (max - min);

      // step에 맞게 값을 조정
      if (step > 0) {
        rawValue = Math.round(rawValue / step) * step;
      }

      // min, max 범위 내로 제한
      return Math.max(min, Math.min(max, rawValue));
    },
    [min, max, step]
  );

  // 마크 렌더링
  const renderMarks = () => {
    if (!marks) return null;

    return Object.entries(marks).map(([markValue, label]) => {
      const numericValue = Number(markValue);
      const percentage = getPercentage(numericValue);
      const isActive = numericValue <= currentValue;

      const markStyle = vertical
        ? { bottom: `${percentage}%` }
        : { left: `${percentage}%` };

      return (
        <Mark
          key={markValue}
          style={markStyle}
          $vertical={vertical}
          $active={isActive}
        >
          <MarkDot $active={isActive} />
          {label && (
            <MarkLabel $vertical={vertical} $active={isActive}>
              {label}
            </MarkLabel>
          )}
        </Mark>
      );
    });
  };

  // 마우스 또는 터치 이벤트에서 위치 계산
  const getPositionFromEvent = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!trackRef.current) return 0;

      const rect = trackRef.current.getBoundingClientRect();
      const pageX = "touches" in e ? e.touches[0].pageX : e.pageX;
      const pageY = "touches" in e ? e.touches[0].pageY : e.pageY;

      if (vertical) {
        const offsetY = pageY - rect.top - window.scrollY;
        return 100 - (offsetY / rect.height) * 100;
      } else {
        const offsetX = pageX - rect.left - window.scrollX;
        return (offsetX / rect.width) * 100;
      }
    },
    [vertical]
  );

  // 위치에서 값 계산하여 업데이트
  const updateValue = useCallback(
    (percentage: number) => {
      const newValue = getValueFromPercentage(percentage);

      if (!isControlled) {
        setValue(newValue);
      }

      onChange?.(newValue);
    },
    [getValueFromPercentage, onChange, isControlled]
  );

  // 드래그 시작 처리
  const handleDragStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (disabled) return;

      e.preventDefault();
      setIsDragging(true);

      if (tooltip && tooltip !== "always") {
        setShowTooltip(true);
      }

      const percentage = getPositionFromEvent(e.nativeEvent);
      updateValue(percentage);
    },
    [disabled, tooltip, getPositionFromEvent, updateValue]
  );

  // 드래그 중 처리
  const handleDrag = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;

      const percentage = getPositionFromEvent(e);
      updateValue(percentage);
    },
    [isDragging, getPositionFromEvent, updateValue]
  );

  // 드래그 끝 처리
  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;

    setIsDragging(false);

    if (tooltip && tooltip !== "always") {
      setShowTooltip(false);
    }

    onChangeComplete?.(isControlled ? controlledValue! : value);
  }, [
    isDragging,
    tooltip,
    onChangeComplete,
    isControlled,
    controlledValue,
    value,
  ]);

  // 이벤트 리스너 설정
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleDrag);
      document.addEventListener("mouseup", handleDragEnd);
      document.addEventListener("touchmove", handleDrag);
      document.addEventListener("touchend", handleDragEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", handleDragEnd);
      document.removeEventListener("touchmove", handleDrag);
      document.removeEventListener("touchend", handleDragEnd);
    };
  }, [isDragging, handleDrag, handleDragEnd]);

  // 마우스 오버/아웃 처리
  const handleMouseEnter = () => {
    if (tooltip && tooltip !== "always") {
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    if (tooltip && tooltip !== "always" && !isDragging) {
      setShowTooltip(false);
    }
  };

  // 스타일 계산
  const percentage = getPercentage(currentValue);
  const trackStyle = vertical
    ? { height: `${percentage}%` }
    : { width: `${percentage}%` };
  const thumbStyle = vertical
    ? { bottom: `${percentage}%` }
    : { left: `${percentage}%` };

  const containerStyle = vertical ? { height: `${height}px` } : undefined;

  return (
    <SliderContainer
      $vertical={vertical}
      $size={size}
      $color={color}
      $disabled={disabled}
      $isDragging={isDragging}
      className={className}
      style={containerStyle}
    >
      <Track
        ref={trackRef}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        <TrackProgress $vertical={vertical} style={trackStyle} />
        <Thumb
          $vertical={vertical}
          style={thumbStyle}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={currentValue}
        >
          {(showTooltip || tooltip === "always") && (
            <Tooltip $vertical={vertical}>{tipFormatter(currentValue)}</Tooltip>
          )}
        </Thumb>

        {marks && renderMarks()}
      </Track>
    </SliderContainer>
  );
};

export const RangeSlider: React.FC<RangeSliderProps> = ({
  min = 0,
  max = 100,
  value: controlledValue,
  defaultValue = [25, 75],
  onChange,
  onChangeComplete,
  step = 1,
  size = "md",
  color = "primary",
  disabled = false,
  vertical = false,
  height = 200,
  tooltip = false,
  tipFormatter = (value) => `${value}`,
  marks,
  className = "",
  minDistance = 0,
}) => {
  const [values, setValues] = useState<[number, number]>(defaultValue);
  const [activeThumb, setActiveThumb] = useState<0 | 1 | null>(null);
  const [showTooltips, setShowTooltips] = useState<[boolean, boolean]>([
    tooltip === "always",
    tooltip === "always",
  ]);
  const trackRef = useRef<HTMLDivElement>(null);
  const isControlled = controlledValue !== undefined;
  const currentValues = isControlled ? controlledValue : values;

  // 백분율로 변환
  const getPercentage = useCallback(
    (value: number) => {
      return ((value - min) / (max - min)) * 100;
    },
    [min, max]
  );

  // 퍼센트에서 값 변환
  const getValueFromPercentage = useCallback(
    (percentage: number) => {
      let rawValue = min + (percentage / 100) * (max - min);

      // step에 맞게 조정
      if (step > 0) {
        rawValue = Math.round(rawValue / step) * step;
      }

      return Math.max(min, Math.min(max, rawValue));
    },
    [min, max, step]
  );

  // 마우스/터치 이벤트에서 위치 계산
  const getPositionFromEvent = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!trackRef.current) return 0;

      const rect = trackRef.current.getBoundingClientRect();
      const pageX = "touches" in e ? e.touches[0].pageX : e.pageX;
      const pageY = "touches" in e ? e.touches[0].pageY : e.pageY;

      if (vertical) {
        const offsetY = pageY - rect.top - window.scrollY;
        return 100 - (offsetY / rect.height) * 100;
      } else {
        const offsetX = pageX - rect.left - window.scrollX;
        return (offsetX / rect.width) * 100;
      }
    },
    [vertical]
  );

  // 값 업데이트
  const updateValue = useCallback(
    (percentage: number, thumbIndex: 0 | 1) => {
      if (activeThumb === null) return;

      const newValue = getValueFromPercentage(percentage);
      const otherThumbIndex = thumbIndex === 0 ? 1 : 0;
      const otherThumbValue = currentValues[otherThumbIndex];

      // 최소 거리 제약 처리
      let adjustedValue = newValue;
      if (minDistance > 0) {
        if (thumbIndex === 0) {
          // 첫 번째 핸들(왼쪽/아래)
          adjustedValue = Math.min(newValue, otherThumbValue - minDistance);
        } else {
          // 두 번째 핸들(오른쪽/위)
          adjustedValue = Math.max(newValue, otherThumbValue + minDistance);
        }
      }

      // 순서 유지 (첫 번째 값은 두 번째보다 항상 작거나 같아야 함)
      adjustedValue =
        thumbIndex === 0
          ? Math.min(adjustedValue, otherThumbValue)
          : Math.max(adjustedValue, otherThumbValue);

      const newValues: [number, number] = [...currentValues] as [
        number,
        number
      ];
      newValues[thumbIndex] = adjustedValue;

      if (!isControlled) {
        setValues(newValues);
      }

      onChange?.(newValues);
    },
    [
      activeThumb,
      currentValues,
      isControlled,
      getValueFromPercentage,
      minDistance,
      onChange,
    ]
  );

  // 가장 가까운 썸네일 인덱스 찾기
  const getClosestThumbIndex = useCallback(
    (percentage: number) => {
      const val = getValueFromPercentage(percentage);
      const distanceFromMin = Math.abs(val - currentValues[0]);
      const distanceFromMax = Math.abs(val - currentValues[1]);

      return distanceFromMin <= distanceFromMax ? 0 : 1;
    },
    [currentValues, getValueFromPercentage]
  );

  // 드래그 시작 처리
  const handleDragStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent, thumbIndex?: 0 | 1) => {
      if (disabled) return;

      e.stopPropagation();

      // 썸네일 직접 클릭 또는 트랙 클릭
      const index =
        thumbIndex !== undefined
          ? thumbIndex
          : getClosestThumbIndex(getPositionFromEvent(e.nativeEvent));

      setActiveThumb(index);

      if (tooltip && tooltip !== "always") {
        const newShowTooltips = [...showTooltips];
        newShowTooltips[index] = true;
        setShowTooltips(newShowTooltips as [boolean, boolean]);
      }

      const percentage = getPositionFromEvent(e.nativeEvent);
      updateValue(percentage, index);
    },
    [
      disabled,
      tooltip,
      showTooltips,
      getClosestThumbIndex,
      getPositionFromEvent,
      updateValue,
    ]
  );

  // 드래그 중 처리
  const handleDrag = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (activeThumb === null) return;

      const percentage = getPositionFromEvent(e);
      updateValue(percentage, activeThumb);
    },
    [activeThumb, getPositionFromEvent, updateValue]
  );

  // 드래그 끝 처리
  const handleDragEnd = useCallback(() => {
    if (activeThumb === null) return;

    if (tooltip && tooltip !== "always") {
      const newShowTooltips = [...showTooltips];
      newShowTooltips[activeThumb] = false;
      setShowTooltips(newShowTooltips as [boolean, boolean]);
    }

    onChangeComplete?.(isControlled ? controlledValue! : values);
    setActiveThumb(null);
  }, [
    activeThumb,
    tooltip,
    showTooltips,
    onChangeComplete,
    isControlled,
    controlledValue,
    values,
  ]);

  // 이벤트 리스너 설정
  useEffect(() => {
    if (activeThumb !== null) {
      document.addEventListener("mousemove", handleDrag);
      document.addEventListener("mouseup", handleDragEnd);
      document.addEventListener("touchmove", handleDrag);
      document.addEventListener("touchend", handleDragEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", handleDragEnd);
      document.removeEventListener("touchmove", handleDrag);
      document.removeEventListener("touchend", handleDragEnd);
    };
  }, [activeThumb, handleDrag, handleDragEnd]);

  // 마우스 오버/아웃 처리
  const handleMouseEnter = (thumbIndex: 0 | 1) => {
    if (tooltip && tooltip !== "always") {
      const newShowTooltips = [...showTooltips];
      newShowTooltips[thumbIndex] = true;
      setShowTooltips(newShowTooltips as [boolean, boolean]);
    }
  };

  const handleMouseLeave = (thumbIndex: 0 | 1) => {
    if (tooltip && tooltip !== "always" && activeThumb !== thumbIndex) {
      const newShowTooltips = [...showTooltips];
      newShowTooltips[thumbIndex] = false;
      setShowTooltips(newShowTooltips as [boolean, boolean]);
    }
  };

  // 마크 렌더링
  const renderMarks = () => {
    if (!marks) return null;

    return Object.entries(marks).map(([markValue, label]) => {
      const numericValue = Number(markValue);
      const percentage = getPercentage(numericValue);
      const isActive =
        numericValue >= currentValues[0] && numericValue <= currentValues[1];

      const markStyle = vertical
        ? { bottom: `${percentage}%` }
        : { left: `${percentage}%` };

      return (
        <Mark
          key={markValue}
          style={markStyle}
          $vertical={vertical}
          $active={isActive}
        >
          <MarkDot $active={isActive} />
          {label && (
            <MarkLabel $vertical={vertical} $active={isActive}>
              {label}
            </MarkLabel>
          )}
        </Mark>
      );
    });
  };

  // 스타일 계산
  const minPercentage = getPercentage(currentValues[0]);
  const maxPercentage = getPercentage(currentValues[1]);

  const trackStyle = vertical
    ? {
        bottom: `${minPercentage}%`,
        height: `${maxPercentage - minPercentage}%`,
      }
    : {
        left: `${minPercentage}%`,
        width: `${maxPercentage - minPercentage}%`,
      };

  const minThumbStyle = vertical
    ? { bottom: `${minPercentage}%` }
    : { left: `${minPercentage}%` };

  const maxThumbStyle = vertical
    ? { bottom: `${maxPercentage}%` }
    : { left: `${maxPercentage}%` };

  const containerStyle = vertical ? { height: `${height}px` } : undefined;

  return (
    <RangeSliderContainer
      $vertical={vertical}
      $size={size}
      $color={color}
      $disabled={disabled}
      $isDragging={activeThumb !== null}
      className={className}
      style={containerStyle}
    >
      <Track
        ref={trackRef}
        onMouseDown={(e) => handleDragStart(e)}
        onTouchStart={(e) => handleDragStart(e)}
      >
        <TrackProgress $vertical={vertical} style={trackStyle} />
      </Track>

      <Thumb
        $vertical={vertical}
        style={minThumbStyle}
        onMouseDown={(e) => handleDragStart(e, 0)}
        onTouchStart={(e) => handleDragStart(e, 0)}
        onMouseEnter={() => handleMouseEnter(0)}
        onMouseLeave={() => handleMouseLeave(0)}
      >
        {(tooltip === "always" || showTooltips[0]) && (
          <Tooltip $vertical={vertical}>
            {tipFormatter(currentValues[0])}
          </Tooltip>
        )}
      </Thumb>

      <Thumb
        $vertical={vertical}
        style={maxThumbStyle}
        onMouseDown={(e) => handleDragStart(e, 1)}
        onTouchStart={(e) => handleDragStart(e, 1)}
        onMouseEnter={() => handleMouseEnter(1)}
        onMouseLeave={() => handleMouseLeave(1)}
      >
        {(tooltip === "always" || showTooltips[1]) && (
          <Tooltip $vertical={vertical}>
            {tipFormatter(currentValues[1])}
          </Tooltip>
        )}
      </Thumb>

      {renderMarks()}
    </RangeSliderContainer>
  );
};
