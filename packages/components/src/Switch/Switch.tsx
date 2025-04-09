import React, { forwardRef, useId } from 'react';
import { useTheme } from '@design-system/core';
import './Switch.css';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** 스위치 라벨 */
  label?: React.ReactNode;
  /** 스위치 오른쪽 위치 여부 */
  labelPosition?: 'left' | 'right';
  /** 크기 */
  size?: 'sm' | 'md' | 'lg';
  /** 도움말 텍스트 */
  helpText?: React.ReactNode;
  /** 에러 메시지 */
  error?: React.ReactNode;
  /** 커스텀 색상 (활성화 상태일 때) */
  color?: string;
  /** 스위치 아이콘 */
  icon?: React.ReactNode;
  /** 추가 CSS 클래스 */
  className?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(({
  label,
  labelPosition = 'right',
  size = 'md',
  helpText,
  error,
  color,
  icon,
  className = '',
  disabled,
  checked,
  id: propId,
  onChange,
  ...rest
}, ref) => {
  const theme = useTheme();
  const generatedId = useId();
  const id = propId || `switch-${generatedId}`;
  
  // 색상 관리
  const switchColor = color || theme.colors.primary[500];
  const errorColor = theme.colors.error[500];
  const disabledColor = theme.colors.neutral[300];
  
  // 클래스 계산
  const switchClasses = [
    'switch',
    `switch--${size}`,
    labelPosition === 'left' ? 'switch--label-left' : '',
    error ? 'switch--error' : '',
    disabled ? 'switch--disabled' : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div className={switchClasses}>
      <label htmlFor={id} className="switch__label-container">
        {label && labelPosition === 'left' && (
          <span className="switch__label">{label}</span>
        )}
        
        <span 
          className="switch__track"
          style={{ 
            backgroundColor: checked 
              ? (error ? errorColor : disabled ? disabledColor : switchColor) 
              : disabled ? theme.colors.neutral[200] : theme.colors.neutral[300] 
          }}
        >
          <input
            ref={ref}
            type="checkbox"
            role="switch"
            id={id}
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            className="switch__input"
            aria-checked={checked}
            {...rest}
          />
          <span className="switch__thumb">
            {icon && <span className="switch__icon">{icon}</span>}
          </span>
        </span>
        
        {label && labelPosition === 'right' && (
          <span className="switch__label">{label}</span>
        )}
      </label>
      
      {(helpText || error) && (
        <div className={`switch__help-text ${error ? 'switch__help-text--error' : ''}`}>
          {error || helpText}
        </div>
      )}
    </div>
  );
});

Switch.displayName = 'Switch';