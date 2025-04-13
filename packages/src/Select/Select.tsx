import React, { forwardRef } from "react";
import { SelectWrapper, StyledSelect, SelectHelperText } from "./Select.styles";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  /** Select options */
  options: SelectOption[];
  /** Select variant */
  variant?: "default" | "filled" | "flushed";
  /** Select size */
  size?: "sm" | "md" | "lg";
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
      variant = "default",
      size = "md",
      isError = false,
      isSuccess = false,
      fullWidth = false,
      helperText,
      errorMessage,
      placeholder,
      disabled,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <SelectWrapper $fullWidth={fullWidth}>
        <StyledSelect
          ref={ref}
          disabled={disabled}
          $variant={variant}
          $size={size}
          $isError={isError}
          $isSuccess={isSuccess}
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
        </StyledSelect>

        {(helperText || (isError && errorMessage)) && (
          <SelectHelperText $isError={isError} $isSuccess={isSuccess}>
            {isError ? errorMessage : helperText}
          </SelectHelperText>
        )}
      </SelectWrapper>
    );
  }
);

Select.displayName = "Select";
