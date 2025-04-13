import styled, { css } from "styled-components";
import { MenuProps, DropdownMenuProps } from "./Menu";
import { defaultTheme } from "../theme/theme";

// Menu
export const StyledMenu = styled.div<{
  $minWidth?: string | number;
  $maxWidth?: string | number;
}>`
  display: flex;
  flex-direction: column;
  min-width: ${(props) => props.$minWidth || "180px"};
  max-width: ${(props) => props.$maxWidth || "320px"};
  background-color: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  padding: var(--spacing-1) 0;
  overflow: hidden;
  z-index: 1000;
`;

StyledMenu.defaultProps = {
  theme: defaultTheme,
};

// MenuItem
export const StyledMenuItem = styled.button<{
  $disabled?: boolean;
  $active?: boolean;
}>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: var(--spacing-2) var(--spacing-3);
  border: none;
  background: none;
  text-align: left;
  font-size: var(--font-size-sm);
  color: var(--color-neutral-900);
  cursor: pointer;
  transition: background-color 0.2s ease;
  position: relative;

  &:hover {
    background-color: var(--color-neutral-100);
  }

  &:focus-visible {
    outline: none;
    background-color: var(--color-neutral-100);
  }

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-primary-50);
      color: var(--color-primary-700);
      font-weight: var(--font-weight-medium);

      &:hover {
        background-color: var(--color-primary-100);
      }
    `}

  ${(props) =>
    props.$disabled &&
    css`
      color: var(--color-neutral-400);
      cursor: not-allowed;
      pointer-events: none;

      &:hover {
        background-color: transparent;
      }
    `}
`;

StyledMenuItem.defaultProps = {
  theme: defaultTheme,
};

export const MenuItemIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  margin-right: var(--spacing-2);
  color: var(--color-neutral-600);
  flex-shrink: 0;

  & > svg {
    width: 16px;
    height: 16px;
  }
`;

MenuItemIcon.defaultProps = {
  theme: defaultTheme,
};

export const MenuItemText = styled.span`
  flex: 1;
`;

MenuItemText.defaultProps = {
  theme: defaultTheme,
};

export const MenuItemRight = styled.span`
  margin-left: var(--spacing-2);
  color: var(--color-neutral-600);
`;

MenuItemRight.defaultProps = {
  theme: defaultTheme,
};

export const MenuItemShortcut = styled.span`
  margin-left: var(--spacing-3);
  color: var(--color-neutral-500);
  font-size: var(--font-size-xs);
`;

MenuItemShortcut.defaultProps = {
  theme: defaultTheme,
};

// MenuDivider
export const StyledMenuDivider = styled.div`
  margin: var(--spacing-1) 0;
  height: 1px;
  background-color: var(--color-neutral-200);
  position: relative;
`;

StyledMenuDivider.defaultProps = {
  theme: defaultTheme,
};

export const MenuDividerLabel = styled.span`
  position: relative;
  top: -0.5em;
  padding: 0 var(--spacing-2);
  font-size: var(--font-size-xs);
  color: var(--color-neutral-500);
  background-color: white;
  margin-left: var(--spacing-3);
`;

MenuDividerLabel.defaultProps = {
  theme: defaultTheme,
};

// MenuGroup
export const StyledMenuGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

StyledMenuGroup.defaultProps = {
  theme: defaultTheme,
};

export const MenuGroupTitle = styled.div`
  padding: var(--spacing-1) var(--spacing-3);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-neutral-500);
  text-transform: uppercase;
`;

MenuGroupTitle.defaultProps = {
  theme: defaultTheme,
};

// SubMenu
export const StyledSubMenu = styled.div<{
  $disabled?: boolean;
  $isOpen?: boolean;
}>`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;

  ${(props) =>
    props.$disabled &&
    css`
      pointer-events: none;
    `}
`;

StyledSubMenu.defaultProps = {
  theme: defaultTheme,
};

export const SubMenuTrigger = styled.button<{
  $disabled?: boolean;
}>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: var(--spacing-2) var(--spacing-3);
  border: none;
  background: none;
  text-align: left;
  font-size: var(--font-size-sm);
  color: var(--color-neutral-900);
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--color-neutral-100);
  }

  &:focus-visible {
    outline: none;
    background-color: var(--color-neutral-100);
  }

  ${(props) =>
    props.$disabled &&
    css`
      color: var(--color-neutral-400);
      cursor: not-allowed;

      &:hover {
        background-color: transparent;
      }
    `}
`;

SubMenuTrigger.defaultProps = {
  theme: defaultTheme,
};

export const SubMenuIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  margin-right: var(--spacing-2);
  color: var(--color-neutral-600);
  flex-shrink: 0;
`;

SubMenuIcon.defaultProps = {
  theme: defaultTheme,
};

export const SubMenuTitle = styled.span`
  flex: 1;
`;

SubMenuTitle.defaultProps = {
  theme: defaultTheme,
};

export const SubMenuArrow = styled.span`
  margin-left: var(--spacing-2);
  font-size: var(--font-size-xs);
  transition: transform 0.2s ease;
  color: var(--color-neutral-500);
`;

SubMenuArrow.defaultProps = {
  theme: defaultTheme,
};

export const SubMenuContent = styled.div<{
  $isOpen?: boolean;
}>`
  display: ${(props) => (props.$isOpen ? "flex" : "none")};
  flex-direction: column;
  padding-left: var(--spacing-4);
  overflow: hidden;
  max-height: ${(props) => (props.$isOpen ? "1000px" : "0")};
  transition: max-height 0.3s ease;
`;

SubMenuContent.defaultProps = {
  theme: defaultTheme,
};

// DropdownMenu
export const StyledDropdownMenu = styled.div`
  position: relative;
  display: inline-block;
`;

StyledDropdownMenu.defaultProps = {
  theme: defaultTheme,
};

export const DropdownMenuTrigger = styled.div`
  display: inline-flex;
  cursor: pointer;
`;

DropdownMenuTrigger.defaultProps = {
  theme: defaultTheme,
};

export const DropdownMenuContent = styled.div<{
  $placement?: DropdownMenuProps["placement"];
  $minWidth?: string | number;
  $maxWidth?: string | number;
  $offset?: number;
}>`
  position: absolute;
  min-width: ${(props) => props.$minWidth || "180px"};
  max-width: ${(props) => props.$maxWidth || "320px"};
  background-color: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  padding: var(--spacing-1) 0;
  z-index: 1000;

  ${(props) => {
    const offset = props.$offset || 4;

    switch (props.$placement) {
      case "top":
        return css`
          bottom: calc(100% + ${offset}px);
          left: 50%;
          transform: translateX(-50%);
        `;
      case "top-start":
        return css`
          bottom: calc(100% + ${offset}px);
          left: 0;
        `;
      case "top-end":
        return css`
          bottom: calc(100% + ${offset}px);
          right: 0;
        `;
      case "bottom":
        return css`
          top: calc(100% + ${offset}px);
          left: 50%;
          transform: translateX(-50%);
        `;
      case "bottom-end":
        return css`
          top: calc(100% + ${offset}px);
          right: 0;
        `;
      case "left":
        return css`
          right: calc(100% + ${offset}px);
          top: 50%;
          transform: translateY(-50%);
        `;
      case "left-start":
        return css`
          right: calc(100% + ${offset}px);
          top: 0;
        `;
      case "left-end":
        return css`
          right: calc(100% + ${offset}px);
          bottom: 0;
        `;
      case "right":
        return css`
          left: calc(100% + ${offset}px);
          top: 50%;
          transform: translateY(-50%);
        `;
      case "right-start":
        return css`
          left: calc(100% + ${offset}px);
          top: 0;
        `;
      case "right-end":
        return css`
          left: calc(100% + ${offset}px);
          bottom: 0;
        `;
      default: // bottom-start (default)
        return css`
          top: calc(100% + ${offset}px);
          left: 0;
        `;
    }
  }}
`;

DropdownMenuContent.defaultProps = {
  theme: defaultTheme,
};
