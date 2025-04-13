import React, { useState, useId } from "react";
import {
  AccordionContainer,
  AccordionItemContainer,
  AccordionHeader,
  AccordionPanel,
  AccordionContent,
  AccordionIcon,
  AccordionTitle,
  AccordionHeading,
} from "./Accordion.styles";

// 기본 체브론 아이콘
const DefaultIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
    role="img"
  >
    <path
      d="M5 7.5L10 12.5L15 7.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export interface AccordionItemProps {
  /** 아코디언 항목의 제목 */
  title: React.ReactNode;
  /** 아코디언 항목의 내용 */
  children: React.ReactNode;
  /** 아코디언 항목이 초기에 열려있는지 여부 */
  defaultOpen?: boolean;
  /** 아코디언 항목의 고유 키 */
  id?: string;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 아이콘 컴포넌트 (열림/닫힘) */
  icon?: React.ReactNode;
}

export interface AccordionProps {
  /** 아코디언 항목 배열 */
  children: React.ReactNode;
  /** 여러 항목을 동시에 열 수 있는지 여부 */
  allowMultiple?: boolean;
  /** 변형 스타일 */
  variant?: "default" | "bordered" | "separated";
  /** 크기 */
  size?: "sm" | "md" | "lg";
  /** 추가 CSS 클래스 */
  className?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  defaultOpen = false,
  id,
  disabled = false,
  icon,
}) => {
  // 컴포넌트 내부에서만 사용됨
  return (
    <>
      {title}
      {children}
    </>
  );
};

export const Accordion: React.FC<AccordionProps> = ({
  children,
  allowMultiple = false,
  variant = "default",
  size = "md",
  className = "",
}) => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const baseId = useId();

  // React.Children을 사용하여 AccordionItem 속성에 접근
  const items = React.Children.toArray(children)
    .filter(
      (child) => React.isValidElement(child) && child.type === AccordionItem
    )
    .map((child, index) => {
      if (!React.isValidElement(child)) return null;

      const {
        title,
        children: itemChildren,
        defaultOpen = false,
        id: itemId,
        disabled = false,
        icon,
      } = child.props as AccordionItemProps;

      const id = itemId || `${baseId}-item-${index}`;
      const isOpen = openItems[id] !== undefined ? openItems[id] : defaultOpen;
      const isLast =
        index ===
        React.Children.toArray(children).filter(
          (child) => React.isValidElement(child) && child.type === AccordionItem
        ).length -
          1;

      const toggleItem = () => {
        if (disabled) return;

        if (allowMultiple) {
          setOpenItems((prev) => ({ ...prev, [id]: !isOpen }));
        } else {
          const newOpenItems: Record<string, boolean> = {};
          if (!isOpen) newOpenItems[id] = true;
          setOpenItems(newOpenItems);
        }
      };

      // 헤더와 패널 ID 생성
      const headerId = `${id}-header`;
      const panelId = `${id}-panel`;

      return (
        <AccordionItemContainer
          key={id}
          isLast={isLast}
          isOpen={isOpen}
          disabled={disabled}
          variant={variant}
        >
          <AccordionHeading>
            <AccordionHeader
              type="button"
              id={headerId}
              $isOpen={isOpen}
              disabled={disabled}
              size={size}
              onClick={toggleItem}
              aria-expanded={isOpen}
              aria-controls={panelId}
            >
              <AccordionTitle>{title}</AccordionTitle>
              <AccordionIcon $isOpen={isOpen}>
                {icon || <DefaultIcon />}
              </AccordionIcon>
            </AccordionHeader>
          </AccordionHeading>
          <AccordionPanel
            id={panelId}
            aria-labelledby={headerId}
            $isOpen={isOpen}
            size={size}
          >
            <AccordionContent size={size}>{itemChildren}</AccordionContent>
          </AccordionPanel>
        </AccordionItemContainer>
      );
    });

  return (
    <AccordionContainer variant={variant} className={className}>
      {items}
    </AccordionContainer>
  );
};

AccordionItem.displayName = "AccordionItem";
Accordion.displayName = "Accordion";
