import React, { useRef, useState, useEffect } from 'react';
import './Popover.css';

export interface PopoverProps {
  /** Popover의 내용 */
  content: React.ReactNode;
  /** Popover를 트리거하는 요소 */
  children: React.ReactElement;
  /** Popover의 위치 */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** Popover의 너비 */
  width?: number | string;
  /** Popover의 높이 */
  height?: number | string;
  /** Popover가 표시되는 조건 */
  isOpen?: boolean;
  /** Popover가 닫힐 때 호출되는 콜백 */
  onClose?: () => void;
  /** 클릭 시 닫기 여부 */
  closeOnClick?: boolean;
  /** hover 시 닫기 여부 */
  closeOnHover?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
}

export const Popover: React.FC<PopoverProps> = ({
  content,
  children,
  placement = 'bottom',
  width = 'auto',
  height = 'auto',
  isOpen = false,
  onClose,
  closeOnClick = true,
  closeOnHover = false,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
        onClose?.();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsVisible(false);
        onClose?.();
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isVisible, onClose]);

  const handleTriggerClick = () => {
    if (closeOnClick) {
      setIsVisible(!isVisible);
      if (!isVisible) {
        onClose?.();
      }
    }
  };

  const handleTriggerHover = () => {
    if (closeOnHover) {
      setIsVisible(!isVisible);
      if (!isVisible) {
        onClose?.();
      }
    }
  };

  return (
    <div className="popover-container">
      <div
        ref={triggerRef}
        onClick={handleTriggerClick}
        onMouseEnter={handleTriggerHover}
        className="popover-trigger"
      >
        {children}
      </div>
      {isVisible && (
        <div
          ref={popoverRef}
          className={`popover popover--${placement} ${className}`}
          style={{ width, height }}
          role="tooltip"
        >
          {content}
        </div>
      )}
    </div>
  );
}; 