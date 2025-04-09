import React, { useState } from 'react';
import { useTheme } from '@design-system/core';
import './Alert.css';

// 아이콘은 추후 @design-system/icons 패키지에서 가져올 예정
// 임시로 간단한 SVG 아이콘 사용
const icons = {
  info: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>,
  success: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>,
  warning: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>,
  error: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>,
};

export type AlertStatus = 'info' | 'success' | 'warning' | 'error';
export type AlertVariant = 'subtle' | 'solid' | 'outline';

export interface AlertProps {
  /** 알림의 상태/유형 */
  status?: AlertStatus;
  /** 시각적 스타일 변형 */
  variant?: AlertVariant;
  /** 알림의 주요 내용 */
  children: React.ReactNode;
  /** 알림의 제목 (선택 사항) */
  title?: React.ReactNode;
  /** 사용자 지정 아이콘 (기본값: 상태에 따른 아이콘) */
  icon?: React.ReactNode;
  /** 닫기 버튼 표시 여부 */
  closable?: boolean;
  /** 닫기 버튼 클릭 시 호출될 함수 */
  onClose?: () => void;
  /** 액션 버튼(들) */
  actions?: React.ReactNode;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 접근성을 위한 ARIA 역할 (기본값: 'alert') */
  role?: string;
}

export const Alert: React.FC<AlertProps> = ({
  status = 'info',
  variant = 'subtle',
  children,
  title,
  icon,
  closable = false,
  onClose,
  actions,
  className = '',
  role = 'alert',
  ...props
}) => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) {
    return null;
  }

  const alertIcon = icon ?? icons[status];

  return (
    <div 
      className={`alert alert--${status} alert--${variant} ${className}`}
      role={role}
      {...props}
    >
      {alertIcon && (
        <div className="alert__icon">
          {alertIcon}
        </div>
      )}
      
      <div className="alert__content">
        {title && <div className="alert__title">{title}</div>}
        <div className="alert__message">{children}</div>
        
        {actions && (
          <div className="alert__actions">
            {actions}
          </div>
        )}
      </div>
      
      {closable && (
        <button 
          className="alert__close" 
          aria-label="Close alert" 
          onClick={handleClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      )}
    </div>
  );
};