import React, { useState, useEffect, useRef, useId } from 'react';
import { useTheme } from '@design-system/core';
import './Tabs.css';

export interface TabItemProps {
  /** 탭 레이블 */
  label: React.ReactNode;
  /** 탭 내용 */
  children: React.ReactNode;
  /** 탭의 고유 식별자 */
  id?: string;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 아이콘 (선택사항) */
  icon?: React.ReactNode;
}

export interface TabsProps {
  /** 탭 항목 배열 */
  children: React.ReactNode;
  /** 기본 선택 탭 (id 또는 인덱스) */
  defaultValue?: string | number;
  /** 제어 모드를 위한 현재 값 */
  value?: string | number;
  /** 값이 변경될 때 호출되는 함수 */
  onChange?: (value: string) => void;
  /** 변형 스타일 */
  variant?: 'default' | 'pills' | 'enclosed' | 'underline';
  /** 탭 위치 */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** 크기 */
  size?: 'sm' | 'md' | 'lg';
  /** 탭 너비를 균등하게 배분 */
  fullWidth?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 애니메이션 여부 */
  animated?: boolean;
}

export const TabItem: React.FC<TabItemProps> = ({
  label,
  children,
  id,
  disabled,
  icon
}) => {
  // 컴포넌트 내부에서만 사용됨
  return (
    <>{label}{children}</>
  );
};

export const Tabs: React.FC<TabsProps> = ({
  children,
  defaultValue,
  value: controlledValue,
  onChange,
  variant = 'default',
  placement = 'top',
  size = 'md',
  fullWidth = false,
  className = '',
  animated = true,
}) => {
  const theme = useTheme();
  const baseId = useId();
  const tablistRef = useRef<HTMLDivElement>(null);
  const tabIndicatorRef = useRef<HTMLDivElement>(null);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const [tabRefs, setTabRefs] = useState<Record<string, HTMLButtonElement | null>>({});

  // 유효한 탭 목록 구성
  const items = React.Children.toArray(children)
    .filter(child => React.isValidElement(child) && child.type === TabItem)
    .map((child, index) => {
      if (!React.isValidElement(child)) return null;
      
      const { label, children: itemChildren, id: itemId, disabled = false, icon } = child.props as TabItemProps;
      const id = itemId || `${baseId}-tab-${index}`;
      
      return { id, label, children: itemChildren, disabled, icon };
    });

  // 초기 활성 탭 설정
  useEffect(() => {
    if (controlledValue !== undefined) {
      const id = typeof controlledValue === 'number' 
        ? items[controlledValue]?.id
        : String(controlledValue);
      
      if (id) setActiveTabId(id);
      return;
    }
    
    if (defaultValue !== undefined) {
      const id = typeof defaultValue === 'number' 
        ? items[defaultValue]?.id
        : String(defaultValue);
      
      if (id) {
        setActiveTabId(id);
        return;
      }
    }
    
    // 첫 번째 활성화된 탭 선택
    const firstEnabledTab = items.find(item => !item?.disabled);
    if (firstEnabledTab) {
      setActiveTabId(firstEnabledTab.id);
    }
  }, [defaultValue, controlledValue, items]);

  // 활성 탭이 변경될 때 인디케이터 위치 업데이트
  useEffect(() => {
    if (activeTabId && tabRefs[activeTabId] && variant !== 'pills' && placement === 'top') {
      const activeTab = tabRefs[activeTabId];
      if (!activeTab) return;

      const tabRect = activeTab.getBoundingClientRect();
      const tabListRect = tablistRef.current?.getBoundingClientRect();
      
      if (!tabListRect) return;

      if (placement === 'top' || placement === 'bottom') {
        setIndicatorStyle({
          width: `${tabRect.width}px`,
          transform: `translateX(${tabRect.left - tabListRect.left}px)`,
        });
      } else {
        setIndicatorStyle({
          height: `${tabRect.height}px`,
          transform: `translateY(${tabRect.top - tabListRect.top}px)`,
        });
      }
    }
  }, [activeTabId, tabRefs, variant, placement]);

  // 탭 클릭 핸들러
  const handleTabClick = (id: string) => {
    if (controlledValue === undefined) {
      setActiveTabId(id);
    }
    onChange?.(id);
  };

  // 키보드 네비게이션
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!activeTabId) return;
    
    const activeIndex = items.findIndex(item => item?.id === activeTabId);
    if (activeIndex === -1) return;
    
    let newIndex: number | null = null;
    
    switch(event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        newIndex = activeIndex;
        do {
          newIndex = (newIndex + 1) % items.length;
        } while (items[newIndex]?.disabled && newIndex !== activeIndex);
        break;
      
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        newIndex = activeIndex;
        do {
          newIndex = (newIndex - 1 + items.length) % items.length;
        } while (items[newIndex]?.disabled && newIndex !== activeIndex);
        break;
      
      case 'Home':
        event.preventDefault();
        newIndex = items.findIndex(item => !item?.disabled);
        break;
      
      case 'End':
        event.preventDefault();
        for (let i = items.length - 1; i >= 0; i--) {
          if (!items[i]?.disabled) {
            newIndex = i;
            break;
          }
        }
        break;
    }
    
    if (newIndex !== null && items[newIndex] && !items[newIndex]?.disabled) {
      const id = items[newIndex]?.id;
      if (id) {
        handleTabClick(id);
        tabRefs[id]?.focus();
      }
    }
  };

  // 색상 및 스타일 변수
  const accentColor = theme.colors.primary[500];
  const textColor = theme.colors.text.primary;
  const disabledColor = theme.colors.neutral[400];
  const borderColor = theme.colors.neutral[200];
  const hoverColor = theme.colors.neutral[100];

  const isVertical = placement === 'left' || placement === 'right';
  const tabsClasses = [
    'tabs',
    `tabs--${variant}`,
    `tabs--${size}`,
    `tabs--${placement}`,
    fullWidth ? 'tabs--full-width' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={tabsClasses}>
      <div 
        ref={tablistRef}
        role="tablist"
        aria-orientation={isVertical ? 'vertical' : 'horizontal'}
        className="tabs__list"
        onKeyDown={handleKeyDown}
      >
        {items.map(item => {
          if (!item) return null;
          const { id, label, disabled, icon } = item;
          const isActive = id === activeTabId;
          
          const tabStyles: React.CSSProperties = {
            color: disabled 
              ? disabledColor 
              : isActive 
                ? variant === 'pills' ? 'white' : accentColor 
                : textColor,
            backgroundColor: isActive && variant === 'pills' ? accentColor : 'transparent',
            borderColor: isActive && variant === 'enclosed' ? borderColor : 'transparent',
            cursor: disabled ? 'not-allowed' : 'pointer',
            pointerEvents: disabled ? 'none' : 'auto',
          };

          return (
            <button
              key={id}
              id={id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`${id}-panel`}
              disabled={disabled}
              className={`tabs__tab ${isActive ? 'tabs__tab--active' : ''}`}
              style={tabStyles}
              onClick={() => handleTabClick(id)}
              ref={el => setTabRefs(prev => ({ ...prev, [id]: el }))}
            >
              {icon && <span className="tabs__tab-icon">{icon}</span>}
              {label}
            </button>
          );
        })}
        <div
          ref={tabIndicatorRef}
          className="tabs__indicator"
          style={indicatorStyle}
        />
      </div>
      {items.map(item => {
        if (!item) return null;
        const { id, children: itemChildren } = item;
        const isActive = id === activeTabId;

        return (
          <div
            key={id}
            id={`${id}-panel`}
            role="tabpanel"
            aria-labelledby={id}
            hidden={!isActive}
            className="tabs__panel"
          >
            {itemChildren}
          </div>
        );
      })}
    </div>
  );
};