import React, { InputHTMLAttributes, forwardRef } from 'react';
import { useTheme } from '@design-system/core';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Checkbox size */
  size?: 'sm' | 'md' | 'lg';
  /** Checkbox label */
  label?: string;
  /** Error state */
  isError?: boolean;
  /** Success state */
  isSuccess?: boolean;
  /** Helper text */
  helperText?: string;
  /** Error message */
  errorMessage?: string;
  /** Indeterminate state */
  isIndeterminate?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      size = 'md',
      label,
      isError = false,
      isSuccess = false,
      helperText,
      errorMessage,
      isIndeterminate = false,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();

    React.useEffect(() => {
      if (ref && 'current' in ref && ref.current) {
        ref.current.indeterminate = isIndeterminate;
      }
    }, [isIndeterminate, ref]);

    const sizeStyles = {
      sm: {
        width: theme.spacing[3],
        height: theme.spacing[3],
      },
      md: {
        width: theme.spacing[4],
        height: theme.spacing[4],
      },
      lg: {
        width: theme.spacing[5],
        height: theme.spacing[5],
      },
    };

    const baseStyles = {
      appearance: 'none',
      display: 'inline-block',
      position: 'relative' as const,
      border: `2px solid ${theme.colors.neutral[300]}`,
      borderRadius: theme.spacing[0.5],
      backgroundColor: 'white',
      transition: 'all 150ms ease-in-out',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      '&:hover:not(:disabled)': {
        borderColor: theme.colors.primary[400],
      },
      '&:focus': {
        outline: 'none',
        borderColor: theme.colors.primary[500],
        boxShadow: `0 0 0 2px ${theme.colors.primary[200]}`,
      },
      '&:checked': {
        backgroundColor: theme.colors.primary[500],
        borderColor: theme.colors.primary[500],
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60%',
          height: '60%',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        },
      },
    };

    const stateStyles = {
      error: {
        borderColor: theme.colors.error[500],
        '&:focus': {
          boxShadow: `0 0 0 2px ${theme.colors.error[200]}`,
        },
      },
      success: {
        borderColor: theme.colors.success[500],
        '&:focus': {
          boxShadow: `0 0 0 2px ${theme.colors.success[200]}`,
        },
      },
    };

    const labelStyles = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: theme.spacing[2],
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontSize: theme.typography.fontSize[size],
      color: disabled ? theme.colors.neutral[400] : theme.colors.neutral[900],
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

    const checkboxStyles = {
      ...baseStyles,
      ...sizeStyles[size],
      ...(isError && stateStyles.error),
      ...(isSuccess && stateStyles.success),
    };

    return (
      <div>
        <label style={labelStyles}>
          <input
            type="checkbox"
            ref={ref}
            disabled={disabled}
            style={checkboxStyles}
            className={className}
            {...props}
          />
          {label && <span>{label}</span>}
        </label>
        {(helperText || (isError && errorMessage)) && (
          <div style={helperTextStyles}>
            {isError ? errorMessage : helperText}
          </div>
        )}
      </div>
    );
  }
); 