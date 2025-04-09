import React, { ButtonHTMLAttributes } from 'react';
import './Button.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  /** Button size */
  size?: 'sm' | 'md' | 'lg';
  /** Full width button */
  fullWidth?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Icon component */
  icon?: React.ReactNode;
  /** Icon position */
  iconPosition?: 'left' | 'right';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      icon,
      iconPosition = 'left',
      children,
      disabled,
      className = '',
      ...props
    },
    ref
  ) => {
    const buttonClasses = [
      'button',
      `button--${variant}`,
      `button--${size}`,
      fullWidth ? 'button--full-width' : '',
      loading ? 'button--loading' : '',
      className
    ].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={buttonClasses}
        {...props}
      >
        {loading && (
          <span className="button__spinner" aria-hidden="true" />
        )}
        {icon && iconPosition === 'left' && <span className="button__icon">{icon}</span>}
        {children}
        {icon && iconPosition === 'right' && <span className="button__icon">{icon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';