import React from "react";
import {
  StepperContainer,
  StepContainer,
  StepIconContainer,
  StepIcon,
  StepConnector,
  StepContent,
  StepTitle,
  StepDescriptionDiv,
} from "./Stepper.styles";

export interface StepProps {
  /** 단계의 제목 */
  title: React.ReactNode;
  /** 단계의 설명 */
  description?: React.ReactNode;
  /** 단계의 아이콘 */
  icon?: React.ReactNode;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 완료 여부 */
  completed?: boolean;
  /** 전체 클릭 가능 여부 */
  clickable?: boolean;
  /** 현재 단계가 활성화되었을 때 호출될 함수 */
  onClick?: (index: number) => void;
  /** 커스텀 아이콘 */
  customIcon?: React.ReactNode;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 단계 번호 (자동으로 주입됨) */
  index?: number;
}

export interface StepperProps {
  /** Stepper의 단계들 */
  children: React.ReactNode;
  /** 현재 활성화된 단계 */
  activeStep?: number;
  /** 방향 */
  orientation?: "horizontal" | "vertical";
  /** 앞선 단계가 모두 완료됨을 표시 */
  allStepsCompleted?: boolean;
  /** 대체 라벨 위치 */
  alternativeLabel?: boolean;
  /** 스텝 사이 연결선 표시 여부 */
  showConnector?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 스텝 클릭 시 콜백 */
  onStepClick?: (index: number) => void;
  /** 단계 사이 간격 */
  spacing?: string;
  /** 변형 */
  variant?: "default" | "outlined" | "contained";
}

export const StepDescription: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return (
    <StepDescriptionDiv className={className}>{children}</StepDescriptionDiv>
  );
};

export const Step: React.FC<StepProps> = (props) => {
  // Step은 일반적으로 Stepper 내부에서만 사용되므로 이 컴포넌트는 내부 구현만 가짐
  return null;
};

export const Stepper: React.FC<StepperProps> = ({
  children,
  activeStep = 0,
  orientation = "horizontal",
  allStepsCompleted = false,
  alternativeLabel = false,
  showConnector = true,
  className = "",
  onStepClick,
  spacing = "auto",
  variant = "default",
}) => {
  // 유효한 Step 컴포넌트만 필터링
  const steps = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === Step
  );

  const getStepIcon = (index: number, step: React.ReactElement<StepProps>) => {
    const { completed, icon, customIcon, disabled } = step.props;
    const isActive = index === activeStep;
    const isCompleted = completed || (allStepsCompleted && index < activeStep);
    const isDisabled = disabled || (!isActive && !isCompleted);

    // 커스텀 아이콘이 제공되면 사용
    if (customIcon) {
      return customIcon;
    }

    // 완료된 단계는 체크 아이콘 표시
    if (isCompleted) {
      return (
        <StepIcon $isCompleted>
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-labelledby="checkmarkTitle"
            role="img"
          >
            <title id="checkmarkTitle">Step completed</title>
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </StepIcon>
      );
    }

    // 활성화된 단계는 특별한 스타일
    if (isActive) {
      return <StepIcon $isActive>{icon || index + 1}</StepIcon>;
    }

    // 기본 아이콘: 단계 번호 또는 사용자 정의 아이콘
    return <StepIcon $isDisabled={isDisabled}>{icon || index + 1}</StepIcon>;
  };

  // 클릭 핸들러
  const handleStepClick = (index: number, disabled?: boolean) => {
    if (disabled) return;
    onStepClick?.(index);
  };

  return (
    <StepperContainer
      $orientation={orientation}
      $alternativeLabel={alternativeLabel}
      $variant={variant}
      className={className}
    >
      {steps.map((step, index) => {
        if (!React.isValidElement<StepProps>(step)) return null;

        const {
          title,
          description,
          disabled,
          completed,
          clickable,
          onClick,
          className: stepClassName = "",
        } = step.props;

        // 단계 상태 결정
        const isActive = index === activeStep;
        const isCompleted =
          completed || (allStepsCompleted && index < activeStep);
        const isDisabled =
          disabled || (!isActive && !isCompleted && !clickable);

        // 클릭 가능 여부 및 핸들러 설정
        const isClickable = clickable && !disabled;
        const stepClickHandler = isClickable
          ? () => {
              handleStepClick(index, disabled);
              onClick?.(index);
            }
          : undefined;

        return (
          <StepContainer
            key={`step-${index}-${title?.toString()}`}
            $isActive={isActive}
            $isCompleted={isCompleted}
            $isDisabled={isDisabled}
            $isClickable={isClickable}
            $orientation={orientation}
            $spacing={spacing}
            $isLastStep={index === steps.length - 1}
            className={stepClassName}
            onClick={stepClickHandler}
            onKeyDown={(e) => {
              if (isClickable && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                stepClickHandler?.();
              }
            }}
            tabIndex={isClickable ? 0 : -1}
            role={isClickable ? "button" : undefined}
          >
            {/* 스텝 아이콘 */}
            <StepIconContainer>
              {getStepIcon(index, step as React.ReactElement<StepProps>)}

              {/* 연결선 */}
              {showConnector && index < steps.length - 1 && (
                <StepConnector
                  $orientation={orientation}
                  $isCompleted={isCompleted}
                />
              )}
            </StepIconContainer>

            {/* 제목 및 설명 */}
            <StepContent
              $orientation={orientation}
              $alternativeLabel={alternativeLabel}
            >
              <StepTitle className="step__title">{title}</StepTitle>
              {description && <StepDescription>{description}</StepDescription>}
            </StepContent>
          </StepContainer>
        );
      })}
    </StepperContainer>
  );
};
