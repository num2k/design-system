import React, {
  useState,
  useEffect,
  useRef,
  useId,
  useCallback,
  useMemo,
} from "react";
import {
  TabsContainer,
  TabsList,
  TabButton,
  TabIcon,
  TabIndicator,
  TabPanel,
} from "./Tabs.styles";

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
  variant?: "default" | "pills" | "enclosed" | "underline";
  /** 탭 위치 */
  placement?: "top" | "bottom" | "left" | "right";
  /** 크기 */
  size?: "sm" | "md" | "lg";
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
  icon,
}) => {
  // 컴포넌트 내부에서만 사용됨
  return (
    <>
      {label}
      {children}
    </>
  );
};

export const Tabs: React.FC<TabsProps> = ({
  children,
  defaultValue,
  value: controlledValue,
  onChange,
  variant = "default",
  placement = "top",
  size = "md",
  fullWidth = false,
  className = "",
  animated = true,
}) => {
  const baseId = useId();
  const tablistRef = useRef<HTMLDivElement>(null);
  const tabIndicatorRef = useRef<HTMLDivElement>(null);
  const tabRefsMap = useRef<Record<string, HTMLButtonElement | null>>({});
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const isFirstRender = useRef(true);

  // useMemo를 사용하여 items 배열이 불필요하게 재생성되는 것을 방지
  const items = useMemo(() => {
    return React.Children.toArray(children)
      .filter((child) => React.isValidElement(child) && child.type === TabItem)
      .map((child, index) => {
        if (!React.isValidElement(child)) return null;

        const {
          label,
          children: itemChildren,
          id: itemId,
          disabled = false,
          icon,
        } = child.props as TabItemProps;
        const id = itemId || `${baseId}-tab-${index}`;

        return { id, label, children: itemChildren, disabled, icon };
      });
  }, [children, baseId]);

  // 참조를 설정하는 함수 - useRef를 사용하여 상태 업데이트 없이 참조 저장
  const setTabRef = useCallback(
    (id: string) => (el: HTMLButtonElement | null) => {
      tabRefsMap.current[id] = el;
    },
    []
  );

  // 초기 활성 탭 설정 - 컴포넌트 마운트 시 한 번만 실행
  useEffect(() => {
    if (!isFirstRender.current) return;
    isFirstRender.current = false;

    // 제어 모드 처리
    if (controlledValue !== undefined) {
      const id =
        typeof controlledValue === "number"
          ? items[controlledValue]?.id
          : String(controlledValue);

      if (id) {
        setActiveTabId(id);
        return;
      }
    }

    // 기본값 처리
    if (defaultValue !== undefined) {
      const id =
        typeof defaultValue === "number"
          ? items[defaultValue]?.id
          : String(defaultValue);

      if (id) {
        setActiveTabId(id);
        return;
      }
    }

    // 첫 번째 활성화된 탭 선택
    const firstEnabledTab = items.find((item) => !item?.disabled);
    if (firstEnabledTab) {
      setActiveTabId(firstEnabledTab.id);
    }
  }, []); // 의존성 배열 비움 - 마운트 시 한 번만 실행

  // 외부에서 값이 변경될 때만 activeTabId 업데이트
  useEffect(() => {
    if (controlledValue === undefined) return;

    const id =
      typeof controlledValue === "number"
        ? items[controlledValue]?.id
        : String(controlledValue);

    if (id && id !== activeTabId) {
      setActiveTabId(id);
    }
  }, [controlledValue, items]);

  // 활성 탭이 변경될 때 인디케이터 위치 업데이트
  useEffect(() => {
    if (!activeTabId || variant === "pills" || placement !== "top") return;

    // 레이아웃 측정은 requestAnimationFrame으로 다음 프레임에 지연
    const updateIndicator = () => {
      const activeTab = tabRefsMap.current[activeTabId];
      const tabListElement = tablistRef.current;

      if (!activeTab || !tabListElement) return;

      const tabRect = activeTab.getBoundingClientRect();
      const tabListRect = tabListElement.getBoundingClientRect();

      const newStyle =
        placement === "top" || placement === "bottom"
          ? {
              width: `${tabRect.width}px`,
              transform: `translateX(${tabRect.left - tabListRect.left}px)`,
            }
          : {
              height: `${tabRect.height}px`,
              transform: `translateY(${tabRect.top - tabListRect.top}px)`,
            };

      // 인디케이터 스타일 업데이트
      setIndicatorStyle(newStyle);
    };

    // 다음 프레임에서 인디케이터 업데이트 실행
    const frameId = requestAnimationFrame(updateIndicator);
    return () => cancelAnimationFrame(frameId);
  }, [activeTabId, variant, placement]);

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

    const activeIndex = items.findIndex((item) => item?.id === activeTabId);
    if (activeIndex === -1) return;

    let newIndex: number | null = null;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        newIndex = activeIndex;
        do {
          newIndex = (newIndex + 1) % items.length;
        } while (items[newIndex]?.disabled && newIndex !== activeIndex);
        break;

      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        newIndex = activeIndex;
        do {
          newIndex = (newIndex - 1 + items.length) % items.length;
        } while (items[newIndex]?.disabled && newIndex !== activeIndex);
        break;

      case "Home":
        event.preventDefault();
        newIndex = items.findIndex((item) => !item?.disabled);
        break;

      case "End":
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
        tabRefsMap.current[id]?.focus();
      }
    }
  };

  const isVertical = placement === "left" || placement === "right";

  return (
    <TabsContainer
      $variant={variant}
      $placement={placement}
      className={className}
    >
      <TabsList
        ref={tablistRef}
        role="tablist"
        aria-orientation={isVertical ? "vertical" : "horizontal"}
        onKeyDown={handleKeyDown}
        $variant={variant}
        $placement={placement}
        $size={size}
        $fullWidth={fullWidth}
      >
        {items.map((item) => {
          if (!item) return null;
          const { id, label, disabled, icon } = item;
          const isActive = id === activeTabId;

          return (
            <TabButton
              key={id}
              id={id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`${id}-panel`}
              disabled={disabled}
              onClick={() => handleTabClick(id)}
              ref={setTabRef(id)}
              $variant={variant}
              $placement={placement}
              $size={size}
              $fullWidth={fullWidth}
              $isActive={isActive}
            >
              {icon && <TabIcon>{icon}</TabIcon>}
              {label}
            </TabButton>
          );
        })}
        {(variant === "default" || variant === "underline") && (
          <TabIndicator
            ref={tabIndicatorRef}
            style={indicatorStyle}
            $placement={placement}
            $animated={animated}
          />
        )}
      </TabsList>
      {items.map((item) => {
        if (!item) return null;
        const { id, children: itemChildren } = item;
        const isActive = id === activeTabId;

        return (
          <TabPanel
            key={id}
            id={`${id}-panel`}
            role="tabpanel"
            aria-labelledby={id}
            hidden={!isActive}
            $animated={animated && isActive}
          >
            {isActive && itemChildren}
          </TabPanel>
        );
      })}
    </TabsContainer>
  );
};
