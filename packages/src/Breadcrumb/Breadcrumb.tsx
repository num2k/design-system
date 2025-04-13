import React from "react";
import {
  BreadcrumbNav,
  BreadcrumbList,
  BreadcrumbListItem,
  BreadcrumbSeparator,
  BreadcrumbItemSpan,
  BreadcrumbItemLink,
  BreadcrumbItemIcon,
  BreadcrumbItemText,
  BreadcrumbEllipsis,
} from "./Breadcrumb.styles";

export interface BreadcrumbItemProps {
  /** 항목 내용 */
  children: React.ReactNode;
  /** 링크 URL */
  href?: string;
  /** 현재 페이지 여부 */
  isCurrentPage?: boolean;
  /** 아이콘 */
  icon?: React.ReactNode;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 클릭 핸들러 */
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLSpanElement>) => void;
}

export interface BreadcrumbProps {
  /** Breadcrumb 항목 */
  children: React.ReactNode;
  /** 구분자 */
  separator?: React.ReactNode;
  /** 최대 표시 개수 (그 이상은 '...'으로 축약) */
  maxItems?: number;
  /** 크기 */
  size?: "sm" | "md" | "lg";
  /** 추가 CSS 클래스 */
  className?: string;
  /** 계층이 많을 때 처음과 마지막 항목만 표시 */
  collapsed?: boolean;
}

export const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  children,
  href,
  isCurrentPage = false,
  icon,
  className = "",
  onClick,
}) => {
  const content = (
    <>
      {icon && <BreadcrumbItemIcon>{icon}</BreadcrumbItemIcon>}
      <BreadcrumbItemText>{children}</BreadcrumbItemText>
    </>
  );

  if (isCurrentPage) {
    return (
      <BreadcrumbItemSpan
        $isCurrentPage={true}
        aria-current="page"
        className={className}
      >
        {content}
      </BreadcrumbItemSpan>
    );
  }

  if (href) {
    return (
      <BreadcrumbItemLink
        href={href}
        $isCurrentPage={false}
        onClick={onClick}
        className={className}
      >
        {content}
      </BreadcrumbItemLink>
    );
  }

  return (
    <BreadcrumbItemSpan
      $isCurrentPage={false}
      onClick={onClick}
      className={className}
    >
      {content}
    </BreadcrumbItemSpan>
  );
};

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  children,
  separator = "/",
  maxItems = 0,
  size = "md",
  className = "",
  collapsed = false,
}) => {
  const items = React.Children.toArray(children);
  const totalItems = items.length;
  let displayItems = items;

  // 최대 표시 개수가 지정되었고 실제 항목 수가 그보다 많은 경우
  if (maxItems > 0 && totalItems > maxItems) {
    // 처음 항목과 마지막 항목은 무조건 표시
    const firstItem = items[0];
    const lastItem = items[totalItems - 1];

    // 중간 항목 계산
    const middleItems = items.slice(1, totalItems - 1);
    const middleCount = maxItems - 2; // 처음과 마지막을 제외한 표시 개수

    if (middleCount <= 0) {
      // 처음과 마지막만 표시하고 중간에 생략 표시
      displayItems = [
        firstItem,
        <BreadcrumbItem key="ellipsis">
          <BreadcrumbEllipsis>...</BreadcrumbEllipsis>
        </BreadcrumbItem>,
        lastItem,
      ];
    } else {
      // 중간 항목 중에서 표시할 개수만큼만 선택
      const visibleMiddleItems = middleItems.slice(0, middleCount);

      displayItems = [
        firstItem,
        ...visibleMiddleItems,
        <BreadcrumbItem key="ellipsis">
          <BreadcrumbEllipsis>...</BreadcrumbEllipsis>
        </BreadcrumbItem>,
        lastItem,
      ];
    }
  } else if (collapsed && totalItems > 3) {
    // 처음과 마지막 항목만 표시하고 중간은 생략
    displayItems = [
      items[0],
      <BreadcrumbItem key="ellipsis">
        <BreadcrumbEllipsis>...</BreadcrumbEllipsis>
      </BreadcrumbItem>,
      items[totalItems - 1],
    ];
  }

  return (
    <BreadcrumbNav aria-label="Breadcrumb" className={className}>
      <BreadcrumbList $size={size}>
        {displayItems.map((item, index) => {
          // 구분자를 추가 (마지막 항목 제외)
          const isLast = index === displayItems.length - 1;

          return (
            <BreadcrumbListItem key={index}>
              {item}
              {!isLast && (
                <BreadcrumbSeparator aria-hidden="true">
                  {separator}
                </BreadcrumbSeparator>
              )}
            </BreadcrumbListItem>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbNav>
  );
};

BreadcrumbItem.displayName = "BreadcrumbItem";
Breadcrumb.displayName = "Breadcrumb";
