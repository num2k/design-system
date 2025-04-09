import React, { SelectHTMLAttributes, forwardRef } from 'react';
import { useTheme } from '@design-system/core';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Select options */
  options: SelectOption[];
  /** Select variant */
  variant?: 'default' | 'filled' | 'flushed';
  /** Select size */
  size?: 'sm' | 'md' | 'lg';
  /** Error state */
  isError?: boolean;
  /** Success state */
  isSuccess?: boolean;
  /** Full width select */
  fullWidth?: boolean;
  /** Helper text */
  helperText?: string;
  /** Error message */
  errorMessage?: string;
  /** Placeholder text */
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      variant = 'default',
      size = 'md',
      isError = false,
      isSuccess = false,
      fullWidth = false,
      helperText,
      errorMessage,
      placeholder,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();

    const baseStyles = {
      display: 'block',
      width: fullWidth ? '100%' : 'auto',
      fontFamily: theme.typography.fontFamily.sans,
      borderRadius: theme.spacing[1],
      transition: 'all 150ms ease-in-out',
      outline: 'none',
      backgroundColor: 'transparent',
      appearance: 'none',
      backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
      backgroundPosition: `right ${theme.spacing[2]} center`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: '1.5em 1.5em',
      paddingRight: theme.spacing[10],
    };

    const sizeStyles = {
      sm: {
        fontSize: theme.typography.fontSize.sm,
        padding: `${theme.spacing[1.5]} ${theme.spacing[2]}`,
      },
      md: {
        fontSize: theme.typography.fontSize.base,
        padding: `${theme.spacing[2]} ${theme.spacing[3]}`,
      },
      lg: {
        fontSize: theme.typography.fontSize.lg,
        padding: `${theme.spacing[2.5]} ${theme.spacing[4]}`,
      },
    };

    const variantStyles = {
      default: {
        border: `1px solid ${theme.colors.neutral[300]}`,
        '&:focus': {
          borderColor: theme.colors.primary[500],
          boxShadow: `0 0 0 1px ${theme.colors.primary[500]}`,
        },
        '&:hover:not(:disabled)': {
          borderColor: theme.colors.primary[400],
        },
      },
      filled: {
        border: '1px solid transparent',
        backgroundColor: theme.colors.neutral[100],
        '&:focus': {
          backgroundColor: 'white',
          borderColor: theme.colors.primary[500],
          boxShadow: `0 0 0 1px ${theme.colors.primary[500]}`,
        },
        '&:hover:not(:disabled)': {
          backgroundColor: theme.colors.neutral[200],
        },
      },
      flushed: {
        border: 'none',
        borderBottom: `1px solid ${theme.colors.neutral[300]}`,
        borderRadius: '0',
        paddingLeft: '0',
        '&:focus': {
          borderBottomColor: theme.colors.primary[500],
          boxShadow: `0 1px 0 0 ${theme.colors.primary[500]}`,
        },
        '&:hover:not(:disabled)': {
          borderBottomColor: theme.colors.primary[400],
        },
      },
    };

    const stateStyles = {
      error: {
        borderColor: `${theme.colors.error[500]} !important`,
        '&:focus': {
          boxShadow: `0 0 0 1px ${theme.colors.error[500]}`,
        },
      },
      success: {
        borderColor: `${theme.colors.success[500]} !important`,
        '&:focus': {
          boxShadow: `0 0 0 1px ${theme.colors.success[500]}`,
        },
      },
      disabled: {
        opacity: 0.6,
        cursor: 'not-allowed',
        backgroundColor: theme.colors.neutral[100],
      },
    };

    const styles = {
      ...baseStyles,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...(isError && stateStyles.error),
      ...(isSuccess && stateStyles.success),
      ...(disabled && stateStyles.disabled),
    };

    const helperTextStyles = {
      marginTop: theme.spacing[1],
      fontSize: theme.typography.fontSize.sm,
      color: isError
        ? theme.colors.error[500]
        : isSuccess
        ? theme.colors.success[500]
        : theme.colors.neutral[500],
    };

    return (
      <div style={{ width: fullWidth ? '100%' : 'auto' }}>
        <select
          ref={ref}
          disabled={disabled}
          style={styles}
          className={className}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        {(helperText || (isError && errorMessage)) && (
          <div style={helperTextStyles}>
            {isError ? errorMessage : helperText}
          </div>
        )}
      </div>
    );
  }
); 