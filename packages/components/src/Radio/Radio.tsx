import React, { useState, useId, forwardRef } from 'react';
import { useTheme } from '@design-system/core';
import './Radio.css';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** 라디오 라벨 */
  label?: React.ReactNode;
  /** 크기 */
  size?: 'sm' | 'md' | 'lg';
  /** 커스텀 색상 */
  color?: string;
  /** 도움말 텍스트 */
  helpText?: React.ReactNode;
  /** 에러 메시지 */
  error?: React.ReactNode;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 라디오 버튼의 위치 */
  radioPosition?: 'left' | 'right';
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
  size?: 'sm' | 'md' | 'lg';
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 수직/수평 배치 */
  orientation?: 'horizontal' | 'vertical';
  /** 오류 메시지 */
  error?: React.ReactNode;
  /** 도움말 텍스트 */
  helpText?: React.ReactNode;
  /** 필수 여부 표시 */
  required?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(({
  label,
  size = 'md',
  color,
  helpText,
  error,
  className = '',
  radioPosition = 'left',
  disabled,
  id: propId,
  name,
  value,
  checked,
  onChange,
  ...rest
}, ref) => {
  const theme = useTheme();
  const generatedId = useId();
  const id = propId || `radio-${generatedId}`;
  
  // 색상 관리
  const radioColor = color || theme.colors.primary[500];
  const errorColor = theme.colors.error[500];
  const disabledColor = theme.colors.neutral[300];
  
  // 클래스 계산
  const radioClasses = [
    'radio',
    `radio--${size}`,
    radioPosition === 'right' ? 'radio--right' : '',
    error ? 'radio--error' : '',
    disabled ? 'radio--disabled' : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div className={radioClasses}>
      <label htmlFor={id} className="radio__label-container">
        <input
          ref={ref}
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="radio__input"
          style={{
            '--radio-color': error ? errorColor : disabled ? disabledColor : radioColor
          } as React.CSSProperties}
          {...rest}
        />
        <span className="radio__control"></span>
        
        {label && <span className="radio__label">{label}</span>}
      </label>
      
      {(helpText || error) && (
        <div className={`radio__help-text ${error ? 'radio__help-text--error' : ''}`}>
          {error || helpText}
        </div>
      )}
    </div>
  );
});

Radio.displayName = 'Radio';

export const RadioGroup: React.FC<RadioGroupProps> = ({
  children,
  label,
  value,
  defaultValue,
  onChange,
  name: groupName,
  size = 'md',
  disabled = false,
  orientation = 'vertical',
  error,
  helpText,
  required = false,
  className = '',
}) => {
  const theme = useTheme();
  const [selectedValue, setSelectedValue] = useState(defaultValue || '');
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
    if (React.isValidElement(child) && child.type === Radio) {
      return React.cloneElement(child, {
        name,
        size,
        disabled: child.props.disabled || disabled,
        checked: currentValue === child.props.value,
        onChange: handleRadioChange
      });
    }
    return child;
  });
  
  const radioGroupClasses = [
    'radio-group',
    `radio-group--${orientation}`,
    error ? 'radio-group--error' : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <fieldset className={radioGroupClasses}>
      {label && (
        <legend className="radio-group__label">
          {label}
          {required && <span className="radio-group__required">*</span>}
        </legend>
      )}
      
      <div className="radio-group__items">
        {radioItems}
      </div>
      
      {(helpText || error) && (
        <div className={`radio-group__help-text ${error ? 'radio-group__help-text--error' : ''}`}>
          {error || helpText}
        </div>
      )}
    </fieldset>
  );
};