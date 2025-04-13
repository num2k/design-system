import React, { useState, forwardRef } from "react";
import {
  AvatarContainer,
  AvatarImage,
  AvatarInitials,
  AvatarIcon,
  AvatarStatus,
} from "./Avatar.styles";

export interface AvatarProps {
  /** 이미지 URL */
  src?: string;
  /** 이미지가 없을 때 표시할 이름 (이니셜 생성용) */
  name?: string;
  /** 아바타 크기 */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  /** 이미지가 없을 때의 배경색 */
  bgColor?: string;
  /** 모양 (둥근 정도) */
  shape?: "circle" | "square" | "rounded";
  /** 경계선 여부 */
  bordered?: boolean;
  /** 아바타 위에 표시할 상태 배지 */
  status?: "online" | "busy" | "away" | "offline" | "none";
  /** 아바타에 마우스 호버 시 표시할 툴팁 */
  tooltip?: string;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 클릭 이벤트 핸들러 */
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      name,
      size = "md",
      bgColor,
      shape = "circle",
      bordered = false,
      status = "none",
      tooltip,
      className = "",
      onClick,
    },
    ref
  ) => {
    const [imageError, setImageError] = useState(false);

    // 이름에서 이니셜을 생성하는 함수
    const getInitials = (name: string) => {
      if (!name) return "";

      // 이름을 공백으로 나누기
      const nameParts = name.split(" ");

      // 이름이 한 단어인 경우
      if (nameParts.length === 1) {
        return nameParts[0].charAt(0).toUpperCase();
      }

      // 이름이 두 단어 이상인 경우 첫 단어와 마지막 단어의 첫 글자
      const firstInitial = nameParts[0].charAt(0);
      const lastInitial = nameParts[nameParts.length - 1].charAt(0);

      return `${firstInitial}${lastInitial}`.toUpperCase();
    };

    // 표시할 내용 결정
    const renderContent = () => {
      // 이미지가 있고 에러가 없는 경우
      if (src && !imageError) {
        return (
          <AvatarImage
            src={src}
            alt={name || "avatar"}
            onError={() => setImageError(true)}
          />
        );
      }

      // 이미지가 없거나 로딩 에러가 있는 경우
      if (name) {
        return <AvatarInitials>{getInitials(name)}</AvatarInitials>;
      }

      // 기본 아이콘
      return (
        <AvatarIcon
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
        </AvatarIcon>
      );
    };

    return (
      <AvatarContainer
        ref={ref}
        $size={size}
        $shape={shape}
        $bgColor={bgColor}
        $bordered={bordered}
        $status={status}
        $isClickable={!!onClick}
        className={className}
        onClick={onClick}
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
        title={tooltip}
      >
        {renderContent()}
        {status !== "none" && <AvatarStatus $status={status} $size={size} />}
      </AvatarContainer>
    );
  }
);

Avatar.displayName = "Avatar";
