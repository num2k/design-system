import React, { forwardRef, useId } from "react";
import {
  SwitchContainer,
  LabelContainer,
  Label,
  HiddenInput,
  Track,
  Thumb,
  Icon,
  HelpText,
} from "./Switch.styles";

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** 스위치 라벨 */
  label?: React.ReactNode;
  /** 스위치 오른쪽 위치 여부 */
  labelPosition?: "left" | "right";
  /** 크기 */
  size?: "sm" | "md" | "lg";
  /** 도움말 텍스트 */
  helpText?: React.ReactNode;
  /** 에러 메시지 */
  error?: React.ReactNode;
  /** 커스텀 색상 테마 */
  color?: "primary" | "success" | "warning" | "error" | "info";
  /** 스위치 아이콘 */
  icon?: React.ReactNode;
  /** 추가 CSS 클래스 */
  className?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      label,
      labelPosition = "right",
      size = "md",
      helpText,
      error,
      color = "primary",
      icon,
      className = "",
      disabled,
      checked,
      id: propId,
      onChange,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const id = propId || `switch-${generatedId}`;

    return (
      <SwitchContainer
        $size={size}
        $error={!!error}
        $disabled={disabled}
        $color={color}
        $labelPosition={labelPosition}
        className={className}
      >
        <LabelContainer htmlFor={id} $labelPosition={labelPosition}>
          {label && labelPosition === "left" && <Label>{label}</Label>}

          <HiddenInput
            ref={ref}
            type="checkbox"
            role="switch"
            id={id}
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            aria-checked={checked}
            {...rest}
          />
          <Track
            $size={size}
            $error={!!error}
            $color={color}
            className="switch__track"
          >
            <Thumb $size={size} className="switch__thumb">
              {icon && <Icon className="switch__icon">{icon}</Icon>}
            </Thumb>
          </Track>

          {label && labelPosition === "right" && <Label>{label}</Label>}
        </LabelContainer>

        {(helpText || error) && (
          <HelpText $error={!!error}>{error || helpText}</HelpText>
        )}
      </SwitchContainer>
    );
  }
);

Switch.displayName = "Switch";
