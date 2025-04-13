import React, { forwardRef } from "react";
import { AvatarGroupContainer, AvatarCounter } from "./AvatarGroup.styles";
import { Avatar, AvatarProps } from "./Avatar";

export interface AvatarGroupProps {
  /** 자식 요소 (Avatar 컴포넌트들) */
  children: React.ReactNode;
  /** 표시할 최대 아바타 수 */
  max?: number;
  /** 아바타 간 간격 */
  spacing?: string;
  /** 아바타 배열 방향 */
  direction?: "horizontal" | "vertical";
  /** 아바타 크기 (모든 자식에 적용) */
  size?: AvatarProps["size"];
  /** 아바타 모양 (모든 자식에 적용) */
  shape?: AvatarProps["shape"];
  /** 아바타 테두리 (모든 자식에 적용) */
  bordered?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    {
      children,
      max,
      spacing = "8px",
      direction = "horizontal",
      size = "md",
      shape = "circle",
      bordered = true,
      className = "",
    },
    ref
  ) => {
    // 유효한 Avatar 컴포넌트만 필터링
    const avatarArray = React.Children.toArray(children).filter(
      (child) => React.isValidElement(child) && child.type === Avatar
    );

    // 표시할 아바타 수 계산
    const visibleAvatars = max ? avatarArray.slice(0, max) : avatarArray;
    const remainingCount = max ? Math.max(0, avatarArray.length - max) : 0;

    return (
      <AvatarGroupContainer
        ref={ref}
        $spacing={spacing}
        $direction={direction}
        $max={max}
        className={className}
      >
        {visibleAvatars.map((avatar, index) => {
          if (!React.isValidElement(avatar)) return null;

          // Avatar 컴포넌트로 타입 단언
          const avatarElement = avatar as React.ReactElement<AvatarProps>;

          // 기존 props를 유지하면서 그룹 props 적용
          return React.cloneElement(avatarElement, {
            key: index,
            size: avatarElement.props.size || size,
            shape: avatarElement.props.shape || shape,
            bordered:
              typeof avatarElement.props.bordered !== "undefined"
                ? avatarElement.props.bordered
                : bordered,
          });
        })}

        {remainingCount > 0 && (
          <AvatarCounter $size={size} $shape={shape}>
            +{remainingCount}
          </AvatarCounter>
        )}
      </AvatarGroupContainer>
    );
  }
);

AvatarGroup.displayName = "AvatarGroup";
