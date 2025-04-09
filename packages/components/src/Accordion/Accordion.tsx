import React, { useState, useId } from 'react';
import { useTheme } from '@design-system/core';
import './Accordion.css';

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
  variant?: 'default' | 'bordered' | 'separated';
  /** 크기 */
  size?: 'sm' | 'md' | 'lg';
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
    <>{title}{children}</>
  );
};

export const Accordion: React.FC<AccordionProps> = ({
  children,
  allowMultiple = false,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const theme = useTheme();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const baseId = useId();

  // React.Children을 사용하여 AccordionItem 속성에 접근
  const items = React.Children.toArray(children)
    .filter(child => React.isValidElement(child) && child.type === AccordionItem)
    .map((child, index) => {
      if (!React.isValidElement(child)) return null;

      const {
        title,
        children: itemChildren,
        defaultOpen = false,
        id: itemId,
        disabled = false,
        icon
      } = child.props as AccordionItemProps;

      const id = itemId || `${baseId}-item-${index}`;
      const isOpen = openItems[id] !== undefined ? openItems[id] : defaultOpen;

      const toggleItem = () => {
        if (disabled) return;

        if (allowMultiple) {
          setOpenItems(prev => ({ ...prev, [id]: !isOpen }));
        } else {
          const newOpenItems: Record<string, boolean> = {};
          if (!isOpen) newOpenItems[id] = true;
          setOpenItems(newOpenItems);
        }
      };

      // 헤더와 패널 ID 생성
      const headerId = `${id}-header`;
      const panelId = `${id}-panel`;

      const accentColor = theme.colors.primary[500];
      const borderColor = theme.colors.neutral[200];
      const textColor = disabled ? theme.colors.neutral[400] : theme.colors.text.primary;
      const bgColor = disabled ? theme.colors.neutral[100] : theme.colors.background.surface;

      return (
        <div 
          key={id} 
          className={`accordion-item ${variant === 'separated' ? 'accordion-item--separated' : ''} ${disabled ? 'accordion-item--disabled' : ''}`}
          style={{ 
            borderColor: variant === 'bordered' || variant === 'separated' ? borderColor : 'transparent'
          }}
        >
          <h3>
            <button
              id={headerId}
              className={`accordion-header accordion-header--${size}`}
              onClick={toggleItem}
              aria-expanded={isOpen}
              aria-controls={panelId}
              disabled={disabled}
              style={{ color: textColor, backgroundColor: bgColor }}
            >
              <span className="accordion-title">{title}</span>
              <span className="accordion-icon" style={{ color: disabled ? theme.colors.neutral[400] : accentColor }}>
                {icon || (
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 20 20" 
                    fill="none" 
                    style={{ 
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease' 
                    }}
                  >
                    <path 
                      d="M5 7.5L10 12.5L15 7.5" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
            </button>
          </h3>
          <div
            id={panelId}
            role="region"
            aria-labelledby={headerId}
            className="accordion-panel"
            style={{ 
              maxHeight: isOpen ? '1000px' : '0', 
              opacity: isOpen ? 1 : 0,
              padding: isOpen ? `${size === 'sm' ? '12px' : size === 'md' ? '16px' : '20px'} 16px` : '0 16px',
            }}
          >
            <div className="accordion-content">
              {itemChildren}
            </div>
          </div>
        </div>
      );
    });

  const accordionClasses = [
    'accordion',
    `accordion--${variant}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={accordionClasses}>
      {items}
    </div>
  );
};