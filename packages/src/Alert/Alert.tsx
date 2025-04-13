import React, { forwardRef } from "react";
import {
  StyledAlert,
  AlertIcon,
  AlertContent,
  AlertTitle,
  AlertDescription,
  AlertCloseButton,
  AlertActions,
} from "./Alert.styles";

// 아이콘 컴포넌트들
const InfoIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
    role="img"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 7C11 7.55228 10.5523 8 10 8C9.44772 8 9 7.55228 9 7C9 6.44772 9.44772 6 10 6C10.5523 6 11 6.44772 11 7ZM10 9C9.44772 9 9 9.44772 9 10V13C9 13.5523 9.44772 14 10 14C10.5523 14 11 13.5523 11 13V10C11 9.44772 10.5523 9 10 9Z"
      fill="currentColor"
    />
  </svg>
);

const SuccessIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
    role="img"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM13.7071 8.70711C14.0976 8.31658 14.0976 7.68342 13.7071 7.29289C13.3166 6.90237 12.6834 6.90237 12.2929 7.29289L9 10.5858L7.70711 9.29289C7.31658 8.90237 6.68342 8.90237 6.29289 9.29289C5.90237 9.68342 5.90237 10.3166 6.29289 10.7071L8.29289 12.7071C8.68342 13.0976 9.31658 13.0976 9.70711 12.7071L13.7071 8.70711Z"
      fill="currentColor"
    />
  </svg>
);

const WarningIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
    role="img"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.48189 3.24303C9.1499 2.15288 10.8501 2.15288 11.5181 3.24303L17.5793 13.0792C18.2262 14.1335 17.4105 15.5 16.0612 15.5H3.93878C2.58947 15.5 1.77375 14.1335 2.42065 13.0792L8.48189 3.24303ZM10 6C10.5523 6 11 6.44772 11 7V9C11 9.55228 10.5523 10 10 10C9.44772 10 9 9.55228 9 9V7C9 6.44772 9.44772 6 10 6ZM10 14C10.5523 14 11 13.5523 11 13C11 12.4477 10.5523 12 10 12C9.44772 12 9 12.4477 9 13C9 13.5523 9.44772 14 10 14Z"
      fill="currentColor"
    />
  </svg>
);

const ErrorIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
    role="img"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM8.70711 7.29289C8.31658 6.90237 7.68342 6.90237 7.29289 7.29289C6.90237 7.68342 6.90237 8.31658 7.29289 8.70711L8.58579 10L7.29289 11.2929C6.90237 11.6834 6.90237 12.3166 7.29289 12.7071C7.68342 13.0976 8.31658 13.0976 8.70711 12.7071L10 11.4142L11.2929 12.7071C11.6834 13.0976 12.3166 13.0976 12.7071 12.7071C13.0976 12.3166 13.0976 11.6834 12.7071 11.2929L11.4142 10L12.7071 8.70711C13.0976 8.31658 13.0976 7.68342 12.7071 7.29289C12.3166 6.90237 11.6834 6.90237 11.2929 7.29289L10 8.58579L8.70711 7.29289Z"
      fill="currentColor"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
    role="img"
  >
    <path
      d="M12 4L4 12M4 4L12 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** 알림의 상태 */
  status?: "info" | "success" | "warning" | "error";
  /** 알림의 제목 */
  title?: React.ReactNode;
  /** 알림의 내용 */
  children?: React.ReactNode;
  /** 알림의 시각적 스타일 */
  variant?: "default" | "solid" | "outline";
  /** 아이콘 표시 여부 */
  showIcon?: boolean;
  /** 닫기 버튼 클릭 시 호출될 함수 */
  onClose?: () => void;
  /** 추가 액션 버튼 */
  actions?: React.ReactNode;
  /** 커스텀 아이콘 */
  icon?: React.ReactNode;
  /** 추가 CSS 클래스 */
  className?: string;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      status = "info",
      title,
      children,
      variant = "default",
      showIcon = true,
      onClose,
      actions,
      icon,
      className = "",
      ...props
    },
    ref
  ) => {
    const statusIconMap = {
      info: <InfoIcon />,
      success: <SuccessIcon />,
      warning: <WarningIcon />,
      error: <ErrorIcon />,
    };

    const statusIcon = icon || statusIconMap[status];

    return (
      <StyledAlert
        ref={ref}
        status={status}
        variant={variant}
        className={className}
        role="alert"
        {...props}
      >
        {showIcon && (
          <AlertIcon status={status} variant={variant}>
            {statusIcon}
          </AlertIcon>
        )}

        <AlertContent>
          {title && <AlertTitle>{title}</AlertTitle>}
          {children && <AlertDescription>{children}</AlertDescription>}
          {actions && <AlertActions>{actions}</AlertActions>}
        </AlertContent>

        {onClose && (
          <AlertCloseButton
            variant={variant}
            onClick={onClose}
            type="button"
            aria-label="닫기"
          >
            <CloseIcon />
          </AlertCloseButton>
        )}
      </StyledAlert>
    );
  }
);

Alert.displayName = "Alert";
