import React, { useState, useRef, useEffect } from "react";
import {
  StyledMenu,
  StyledMenuItem,
  MenuItemIcon,
  MenuItemText,
  MenuItemRight,
  MenuItemShortcut,
  StyledMenuDivider,
  MenuDividerLabel,
  StyledMenuGroup,
  MenuGroupTitle,
  StyledSubMenu,
  SubMenuTrigger,
  SubMenuIcon,
  SubMenuTitle,
  SubMenuArrow,
  SubMenuContent,
  StyledDropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "./Menu.styles";

export interface MenuItemProps {
  /** 메뉴 아이템 내용 */
  children: React.ReactNode;
  /** 아이콘 (선택적) */
  icon?: React.ReactNode;
  /** 클릭 핸들러 */
  onClick?: (e: React.MouseEvent) => void;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 활성화 여부 */
  active?: boolean;
  /** 키보드 단축키 레이블 */
  shortcut?: string;
  /** 우측에 표시할 추가 요소 */
  rightElement?: React.ReactNode;
  /** 메뉴 아이템 값 */
  value?: string;
  /** 추가 CSS 클래스 */
  className?: string;
}

export interface MenuDividerProps {
  /** 라벨 (선택적) */
  label?: React.ReactNode;
  /** 추가 CSS 클래스 */
  className?: string;
}

export interface MenuGroupProps {
  /** 메뉴 그룹 내용 */
  children: React.ReactNode;
  /** 그룹 제목 */
  title?: React.ReactNode;
  /** 추가 CSS 클래스 */
  className?: string;
}

export interface SubMenuProps {
  /** 서브메뉴 내용 */
  children: React.ReactNode;
  /** 서브메뉴 제목 */
  title: React.ReactNode;
  /** 아이콘 (선택적) */
  icon?: React.ReactNode;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 기본 열린 상태 */
  defaultOpen?: boolean;
  /** 추가 CSS 클래스 */
  className?: string;
}

export interface MenuProps {
  /** 메뉴 내용 */
  children: React.ReactNode;
  /** 최소 너비 */
  minWidth?: string | number;
  /** 최대 너비 */
  maxWidth?: string | number;
  /** 추가 CSS 클래스 */
  className?: string;
  /** 추가 스타일 */
  style?: React.CSSProperties;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  children,
  icon,
  onClick,
  disabled = false,
  active = false,
  shortcut,
  rightElement,
  className = "",
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  return (
    <StyledMenuItem
      $disabled={disabled}
      $active={active}
      onClick={handleClick}
      disabled={disabled}
      role="menuitem"
      aria-disabled={disabled}
      className={className}
    >
      {icon && <MenuItemIcon>{icon}</MenuItemIcon>}
      <MenuItemText>{children}</MenuItemText>
      {rightElement && <MenuItemRight>{rightElement}</MenuItemRight>}
      {shortcut && <MenuItemShortcut>{shortcut}</MenuItemShortcut>}
    </StyledMenuItem>
  );
};

export const MenuDivider: React.FC<MenuDividerProps> = ({
  label,
  className = "",
}) => {
  return (
    <StyledMenuDivider role="separator" className={className}>
      {label && <MenuDividerLabel>{label}</MenuDividerLabel>}
    </StyledMenuDivider>
  );
};

export const MenuGroup: React.FC<MenuGroupProps> = ({
  children,
  title,
  className = "",
}) => {
  return (
    <StyledMenuGroup role="group" className={className}>
      {title && <MenuGroupTitle>{title}</MenuGroupTitle>}
      {children}
    </StyledMenuGroup>
  );
};

export const SubMenu: React.FC<SubMenuProps> = ({
  children,
  title,
  icon,
  disabled = false,
  defaultOpen = false,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const subMenuRef = useRef<HTMLDivElement>(null);

  const toggleSubMenu = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        toggleSubMenu();
        break;
      case "Escape":
        if (isOpen) {
          e.preventDefault();
          setIsOpen(false);
        }
        break;
      case "ArrowRight":
        e.preventDefault();
        setIsOpen(true);
        break;
      case "ArrowLeft":
        e.preventDefault();
        setIsOpen(false);
        break;
    }
  };

  return (
    <StyledSubMenu
      ref={subMenuRef}
      $isOpen={isOpen}
      $disabled={disabled}
      className={className}
    >
      <SubMenuTrigger
        onClick={toggleSubMenu}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-disabled={disabled}
        disabled={disabled}
        $disabled={disabled}
        role="menuitem"
      >
        {icon && <SubMenuIcon>{icon}</SubMenuIcon>}
        <SubMenuTitle>{title}</SubMenuTitle>
        <SubMenuArrow style={{ transform: isOpen ? "rotate(90deg)" : "none" }}>
          ▶
        </SubMenuArrow>
      </SubMenuTrigger>
      <SubMenuContent $isOpen={isOpen}>{children}</SubMenuContent>
    </StyledSubMenu>
  );
};

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(
  (
    {
      children,
      minWidth = "180px",
      maxWidth = "320px",
      className = "",
      style = {},
    },
    ref
  ) => {
    return (
      <StyledMenu
        ref={ref}
        $minWidth={minWidth}
        $maxWidth={maxWidth}
        className={className}
        style={style}
        role="menu"
        tabIndex={-1}
      >
        {children}
      </StyledMenu>
    );
  }
);

Menu.displayName = "Menu";

// Dropdown Menu 컴포넌트
export interface DropdownMenuProps {
  /** 드롭다운 트리거 요소 */
  trigger: React.ReactNode;
  /** 메뉴 내용 */
  children: React.ReactNode;
  /** 기본 열림 상태 */
  defaultOpen?: boolean;
  /** 제어 모드에서 열림 상태 */
  isOpen?: boolean;
  /** 열림 상태 변경 핸들러 */
  onOpenChange?: (open: boolean) => void;
  /** 메뉴 배치 위치 */
  placement?:
    | "bottom-start"
    | "bottom"
    | "bottom-end"
    | "top-start"
    | "top"
    | "top-end"
    | "right-start"
    | "right"
    | "right-end"
    | "left-start"
    | "left"
    | "left-end";
  /** 최소 너비 */
  minWidth?: string | number;
  /** 최대 너비 */
  maxWidth?: string | number;
  /** 트리거에서 메뉴까지 간격 */
  offset?: number;
  /** 추가 CSS 클래스 */
  className?: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  children,
  defaultOpen = false,
  isOpen: controlledIsOpen,
  onOpenChange,
  placement = "bottom-start",
  minWidth = "180px",
  maxWidth = "320px",
  offset = 4,
  className = "",
}) => {
  const [isOpenState, setIsOpenState] = useState(defaultOpen);
  const isOpen =
    controlledIsOpen !== undefined ? controlledIsOpen : isOpenState;

  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    const newState = !isOpen;
    if (controlledIsOpen === undefined) {
      setIsOpenState(newState);
    }
    onOpenChange?.(newState);
  };

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        if (controlledIsOpen === undefined) {
          setIsOpenState(false);
        }
        onOpenChange?.(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onOpenChange, controlledIsOpen]);

  // ESC 키 처리
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (isOpen && event.key === "Escape") {
        if (controlledIsOpen === undefined) {
          setIsOpenState(false);
        }
        onOpenChange?.(false);
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onOpenChange, controlledIsOpen]);

  return (
    <StyledDropdownMenu className={className}>
      <DropdownMenuTrigger
        ref={triggerRef}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        {trigger}
      </DropdownMenuTrigger>

      {isOpen && (
        <DropdownMenuContent
          ref={dropdownRef}
          $placement={placement}
          $minWidth={minWidth}
          $maxWidth={maxWidth}
          $offset={offset}
          role="menu"
        >
          {children}
        </DropdownMenuContent>
      )}
    </StyledDropdownMenu>
  );
};
