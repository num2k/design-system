import React, { InputHTMLAttributes, forwardRef } from 'react';
import './Input.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'filled' | 'flushed';
  size?: 'sm' | 'md' | 'lg';
  isError?: boolean;
  isSuccess?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  helperText?: string;
  errorMessage?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'default',
      size = 'md',
      isError = false,
      isSuccess = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      helperText,
      errorMessage,
      disabled,
      className = '',
      ...props
    },
    ref
  ) => {
    const inputClasses = [
      'input',
      `input--${variant}`,
      `input--${size}`,
      isError ? 'input--error' : '',
      isSuccess ? 'input--success' : '',
      leftIcon ? 'input--with-left-icon' : '',
      rightIcon ? 'input--with-right-icon' : '',
      className
    ].filter(Boolean).join(' ');
    
    const wrapperClasses = [
      'input-wrapper',
      fullWidth ? 'input-wrapper--full-width' : ''
    ].filter(Boolean).join(' ');

    const helperTextClasses = [
      'input-helper-text',
      isError ? 'input-helper-text--error' : '',
      isSuccess ? 'input-helper-text--success' : 'input-helper-text--default'
    ].filter(Boolean).join(' ');

    return (
      <div className={wrapperClasses}>
        {leftIcon && <span className="input-icon input-icon--left">{leftIcon}</span>}
        <input
          ref={ref}
          disabled={disabled}
          className={inputClasses}
          {...props}
        />
        {rightIcon && <span className="input-icon input-icon--right">{rightIcon}</span>}
        {(helperText || (isError && errorMessage)) && (
          <div className={helperTextClasses}>
            {isError ? errorMessage : helperText}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';