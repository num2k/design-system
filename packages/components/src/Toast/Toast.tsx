import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Alert, AlertProps } from '../Alert';
import './Toast.css';

export interface ToastProps extends Omit<AlertProps, 'closable'> {
  /** Toast가 자동으로 닫힐 시간(ms). 0이면 자동으로 닫히지 않음 */
  duration?: number;
  /** Toast가 나타날 위치 */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top' | 'bottom';
  /** Toast가 닫힌 후 호출될 콜백 */
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  duration = 5000,
  position = 'bottom-right',
  onClose,
  ...alertProps
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  const closeToast = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose?.();
    }, 300); // 애니메이션 시간과 맞춤
  }, [onClose]);

  // 자동으로 닫히는 타이머 설정
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (duration > 0) {
      timer = setTimeout(() => {
        closeToast();
      }, duration);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [duration, closeToast]);

  // Toast 컨테이너 요소 생성
  useEffect(() => {
    // 해당 위치의 컨테이너가 있는지 확인
    let container = document.getElementById(`toast-container-${position}`);
    
    // 없으면 새로 생성
    if (!container) {
      container = document.createElement('div');
      container.id = `toast-container-${position}`;
      container.className = `toast-container toast-container--${position}`;
      document.body.appendChild(container);
    }
    
    setPortalContainer(container);
    
    // clean up
    return () => {
      // 마지막 Toast가 제거되면 컨테이너도 제거
      if (container?.childElementCount === 0) {
        document.body.removeChild(container);
      }
    };
  }, [position]);

  // 포털 컨테이너가 준비될 때까지 렌더링하지 않음
  if (!portalContainer) return null;

  return ReactDOM.createPortal(
    <div 
      className={`toast toast--${position} ${isVisible ? 'toast--visible' : 'toast--hidden'}`}
      role="status"
      aria-live="polite"
    >
      <Alert 
        {...alertProps} 
        closable={true}
        onClose={closeToast}
        className={`${alertProps.className || ''} toast__alert`}
      />
    </div>,
    portalContainer
  );
};

// Toast 컴포넌트를 프로그래밍 방식으로 사용하기 위한 유틸리티 함수들
interface ToastOptions extends Omit<ToastProps, 'children'> {
  message: React.ReactNode;
}

// 활성화된 모든 Toast를 추적하기 위한 배열
const activeToasts: Array<{ id: string; remove: () => void }> = [];

// Toast ID 생성기
let toastIdCounter = 0;

// Toast를 생성하는 함수
function createToast(options: ToastOptions): string {
  const toastId = `toast-${++toastIdCounter}`;
  const { message, ...rest } = options;
  
  const toastContainer = document.createElement('div');
  toastContainer.id = toastId;
  document.body.appendChild(toastContainer);
  
  const removeToast = () => {
    const index = activeToasts.findIndex(toast => toast.id === toastId);
    if (index > -1) {
      activeToasts.splice(index, 1);
    }
    
    // React 요소 언마운트
    ReactDOM.unmountComponentAtNode(toastContainer);
    
    // DOM에서 컨테이너 제거
    if (document.body.contains(toastContainer)) {
      document.body.removeChild(toastContainer);
    }
  };
  
  // 콜백에 토스트 삭제 로직 추가
  const onToastClose = () => {
    removeToast();
    rest.onClose?.();
  };
  
  // Toast 렌더링
  ReactDOM.render(
    <Toast {...rest} onClose={onToastClose}>
      {message}
    </Toast>,
    toastContainer
  );
  
  // 활성 토스트 추적을 위해 저장
  activeToasts.push({ id: toastId, remove: removeToast });
  
  return toastId;
}

// 각 상태별 Toast 생성 함수
export const toast = {
  info: (message: React.ReactNode, options?: Omit<ToastOptions, 'message' | 'status'>) => 
    createToast({ message, status: 'info', ...options }),
    
  success: (message: React.ReactNode, options?: Omit<ToastOptions, 'message' | 'status'>) => 
    createToast({ message, status: 'success', ...options }),
    
  warning: (message: React.ReactNode, options?: Omit<ToastOptions, 'message' | 'status'>) => 
    createToast({ message, status: 'warning', ...options }),
    
  error: (message: React.ReactNode, options?: Omit<ToastOptions, 'message' | 'status'>) => 
    createToast({ message, status: 'error', ...options }),
    
  // 특정 ID의 Toast 제거
  remove: (id: string) => {
    const toastToRemove = activeToasts.find(toast => toast.id === id);
    if (toastToRemove) {
      toastToRemove.remove();
      return true;
    }
    return false;
  },
  
  // 모든 Toast 제거
  removeAll: () => {
    activeToasts.forEach(toast => toast.remove());
    activeToasts.length = 0;
  }
};