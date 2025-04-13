import React, { useState, useId, forwardRef } from "react";
import {
  RadioWrapper,
  RadioInput,
  RadioControl,
  RadioLabel,
  RadioGroupContainer,
  RadioGroupLabel,
  RadioGroupRequired,
  RadioGroupItems,
  RadioGroupHelperText,
} from "./Radio.styles";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** 라디오 라벨 */
  label?: React.ReactNode;
  /** 크기 */
  size?: "sm" | "md" | "lg";
  /** 커스텀 색상 */
  color?: "primary" | "error" | "success" | "warning" | "info";
  /** 도움말 텍스트 */
  helpText?: React.ReactNode;
  /** 에러 메시지 */
  error?: React.ReactNode;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 라디오 버튼의 위치 */
  radioPosition?: "left" | "right";
}

export interface RadioGroupProps {
  /** 라디오 그룹 내의 라디오 버튼들 */
  children: React.ReactNode;
  /** 라디오 그룹 레이블 */
  label?: React.ReactNode;
  /** 현재 선택된 값 */
  value?: string;
  /** 기본 선택 값 */
  defaultValue?: string;
  /** 값 변경 핸들러 */
  onChange?: (value: string) => void;
  /** 라디오 그룹 이름 */
  name?: string;
  /** 크기 */
  size?: "sm" | "md" | "lg";
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 수직/수평 배치 */
  orientation?: "horizontal" | "vertical";
  /** 오류 메시지 */
  error?: React.ReactNode;
  /** 도움말 텍스트 */
  helpText?: React.ReactNode;
  /** 필수 여부 표시 */
  required?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      size = "md",
      color,
      helpText,
      error,
      className = "",
      radioPosition = "left",
      disabled,
      id: propId,
      name,
      value,
      checked,
      onChange,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const id = propId || `radio-${generatedId}`;

    return (
      <div className={className}>
        <RadioWrapper $disabled={disabled}>
          <RadioInput
            ref={ref}
            type="radio"
            id={id}
            name={name}
            value={value}
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            {...rest}
          />
          <RadioControl $size={size} $checked={checked} $disabled={disabled} />

          {label && <RadioLabel $size={size}>{label}</RadioLabel>}
        </RadioWrapper>

        {(helpText || error) && <div>{error || helpText}</div>}
      </div>
    );
  }
);

Radio.displayName = "Radio";

export const RadioGroup: React.FC<RadioGroupProps> = ({
  children,
  label,
  value,
  defaultValue,
  onChange,
  name: groupName,
  size = "md",
  disabled = false,
  orientation = "vertical",
  error,
  helpText,
  required = false,
  className = "",
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue || "");
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : selectedValue;

  const groupId = useId();
  const name = groupName || `radio-group-${groupId}`;

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (!isControlled) {
      setSelectedValue(newValue);
    }

    onChange?.(newValue);
  };

  // RadioGroup에 속한 자식 Radio 컴포넌트 복제 및 속성 부여
  const radioItems = React.Children.map(children, (child) => {
    if (React.isValidElement<RadioProps>(child) && child.type === Radio) {
      return React.cloneElement(child, {
        name,
        size,
        disabled: child.props.disabled || disabled,
        checked: currentValue === child.props.value,
        onChange: handleRadioChange,
      } as Partial<RadioProps>);
    }
    return child;
  });

  return (
    <RadioGroupContainer
      $orientation={orientation}
      $error={!!error}
      className={className}
    >
      {label && (
        <RadioGroupLabel>
          {label}
          {required && <RadioGroupRequired>*</RadioGroupRequired>}
        </RadioGroupLabel>
      )}

      <RadioGroupItems $orientation={orientation}>{radioItems}</RadioGroupItems>

      {(helpText || error) && (
        <RadioGroupHelperText $error={!!error}>
          {error || helpText}
        </RadioGroupHelperText>
      )}
    </RadioGroupContainer>
  );
};
