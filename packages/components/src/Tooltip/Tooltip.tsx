import React, { useState } from 'react';
import { useTheme } from '@design-system/core';
import './Tooltip.css';

export interface TooltipProps {
  /** 툴팁에 표시될 내용 */
  content: React.ReactNode;
  /** 툴팁을 트리거하는 요소 */
  children: React.ReactElement;
  /** 툴팁의 위치 */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** 툴팁이 표시되는 지연 시간(ms) */
  delay?: number;
  /** 툴팁의 최대 너비 */
  maxWidth?: number | string;
  /** Tooltip에 적용할 추가 CSS 클래스 */
  className?: string;
  /** 툴팁 표시 여부를 직접 제어 */
  isOpen?: boolean;
  /** 툴팁이 닫힐 때 호출되는 콜백 */
  onClose?: () => void;
  /** 툴팁이 열릴 때 호출되는 콜백 */
  onOpen?: () => void;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = 'top',
  delay = 300,
  maxWidth = '200px',
  className = '',
  isOpen: controlledIsOpen,
  onClose,
  onOpen,
}) => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  
  // 제어 모드 또는 비제어 모드 처리
  const isControlled = controlledIsOpen !== undefined;
  const showTooltip = isControlled ? controlledIsOpen : isVisible;

  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    
    const id = setTimeout(() => {
      if (!isControlled) {
        setIsVisible(true);
      }
      onOpen?.();
    }, delay);
    
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    
    if (!isControlled) {
      setIsVisible(false);
    }
    onClose?.();
  };

  const tooltipStyles = {
    maxWidth,
    backgroundColor: theme.colors.neutral[800],
    color: theme.colors.neutral[50],
    fontSize: theme.typography.fontSize.xs,
    borderRadius: theme.spacing[1],
    padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
    boxShadow: `0 4px 6px -1px ${theme.colors.neutral[900]}20`,
  };

  return (
    <div className="tooltip-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      {showTooltip && (
        <div 
          className={`tooltip tooltip--${placement} ${className}`} 
          style={tooltipStyles}
          role="tooltip"
          aria-live="polite"
        >
          {content}
        </div>
      )}
    </div>
  );
};