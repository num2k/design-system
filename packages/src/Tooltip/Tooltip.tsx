import React, { useState, useRef, useEffect } from "react";
import { TooltipContainer, TooltipContent } from "./Tooltip.styles";

export interface TooltipProps {
  /** 툴팁 내용 */
  content: React.ReactNode;
  /** 툴팁이 표시될 위치 */
  placement?: "top" | "bottom" | "left" | "right";
  /** 지연 표시 시간 (밀리초) */
  delay?: number;
  /** 툴팁 활성화 여부 */
  disabled?: boolean;
  /** 툴팁 최대 너비 */
  maxWidth?: "sm" | "md" | "lg";
  /** 애니메이션 효과 */
  animated?: boolean;
  /** 자식 요소 */
  children: React.ReactNode;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 툴팁이 표시될 때 호출될 콜백 */
  onShow?: () => void;
  /** 툴팁이 숨겨질 때 호출될 콜백 */
  onHide?: () => void;
  /** 커스텀 스타일 */
  style?: React.CSSProperties;
  /** 툴팁 표시 방식 */
  trigger?: "hover" | "click" | "focus" | "manual";
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  placement = "top",
  delay = 300,
  disabled = false,
  maxWidth,
  animated = true,
  children,
  className = "",
  onShow,
  onHide,
  style,
  trigger = "hover",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 툴팁 표시
  const showTooltip = () => {
    if (disabled) return;

    // 지연 시간이 있는 경우 타임아웃 설정
    if (delay > 0) {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
        onShow?.();
      }, delay);
    } else {
      setIsVisible(true);
      onShow?.();
    }
  };

  // 툴팁 숨김
  const hideTooltip = () => {
    // 타임아웃 취소
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setIsVisible(false);
    onHide?.();
  };

  // 이벤트 핸들러 결정
  const getEventHandlers = () => {
    switch (trigger) {
      case "hover":
        return {
          onMouseEnter: showTooltip,
          onMouseLeave: hideTooltip,
        };
      case "click":
        return {
          onClick: () =>
            setIsVisible((prev) => {
              const newState = !prev;
              if (newState) onShow?.();
              else onHide?.();
              return newState;
            }),
        };
      case "focus":
        return {
          onFocus: showTooltip,
          onBlur: hideTooltip,
        };
      case "manual":
      default:
        return {};
    }
  };

  // 컴포넌트 언마운트 시 타임아웃 정리
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <TooltipContainer
      className={className}
      style={style}
      {...getEventHandlers()}
    >
      {children}
      <TooltipContent
        $isVisible={isVisible}
        $placement={placement}
        $maxWidth={maxWidth}
        $animated={animated}
        role="tooltip"
      >
        {content}
      </TooltipContent>
    </TooltipContainer>
  );
};
