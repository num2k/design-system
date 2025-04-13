import styled, { css } from "styled-components";
import { BreadcrumbProps } from "./Breadcrumb";
import { defaultTheme } from "../theme/theme";

export const BreadcrumbNav = styled.nav`
  width: 100%;
`;

BreadcrumbNav.defaultProps = {
  theme: defaultTheme,
};

export const BreadcrumbList = styled.ol<{
  $size?: BreadcrumbProps["size"];
}>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0;
  margin: 0;
  list-style: none;

  /* Size styles */
  ${(props) =>
    props.$size === "sm" &&
    css`
      font-size: var(--font-size-xs);
      line-height: 1.5;
    `}

  ${(props) =>
    props.$size === "md" &&
    css`
      font-size: var(--font-size-sm);
      line-height: 1.5;
    `}
  
  ${(props) =>
    props.$size === "lg" &&
    css`
      font-size: var(--font-size-md);
      line-height: 1.5;
    `}
`;

BreadcrumbList.defaultProps = {
  theme: defaultTheme,
};

export const BreadcrumbListItem = styled.li`
  display: flex;
  align-items: center;
`;

BreadcrumbListItem.defaultProps = {
  theme: defaultTheme,
};

export const BreadcrumbSeparator = styled.span`
  display: inline-flex;
  align-items: center;
  margin: 0 var(--spacing-2);
  color: var(--color-neutral-400);
  user-select: none;

  /* 다크모드 */
  [data-theme="dark"] & {
    color: var(--color-neutral-500);
  }
`;

BreadcrumbSeparator.defaultProps = {
  theme: defaultTheme,
};

interface BreadcrumbItemBaseProps {
  $isCurrentPage?: boolean;
}

const breadcrumbItemBaseStyles = css<BreadcrumbItemBaseProps>`
  display: inline-flex;
  align-items: center;
  color: ${(props) =>
    props.$isCurrentPage
      ? "var(--color-neutral-900)"
      : "var(--color-primary-600)"};
  text-decoration: none;
  font-weight: ${(props) =>
    props.$isCurrentPage
      ? "var(--font-weight-semibold)"
      : "var(--font-weight-normal)"};

  /* 다크모드 색상 */
  [data-theme="dark"] & {
    color: ${(props) =>
      props.$isCurrentPage
        ? "var(--color-neutral-50)"
        : "var(--color-primary-400)"};
  }

  ${(props) =>
    !props.$isCurrentPage &&
    css`
      &:hover {
        color: var(--color-primary-700);
        text-decoration: underline;

        /* 다크모드 호버 색상 */
        [data-theme="dark"] & {
          color: var(--color-primary-300);
        }
      }
    `}
`;

export const BreadcrumbItemSpan = styled.span<BreadcrumbItemBaseProps>`
  ${breadcrumbItemBaseStyles}
  cursor: ${(props) => (props.$isCurrentPage ? "default" : "pointer")};
`;

BreadcrumbItemSpan.defaultProps = {
  theme: defaultTheme,
};

export const BreadcrumbItemLink = styled.a<BreadcrumbItemBaseProps>`
  ${breadcrumbItemBaseStyles}
`;

BreadcrumbItemLink.defaultProps = {
  theme: defaultTheme,
};

export const BreadcrumbItemIcon = styled.span`
  display: inline-flex;
  align-items: center;
  margin-right: var(--spacing-1);

  & > svg {
    width: 1em;
    height: 1em;
  }
`;

BreadcrumbItemIcon.defaultProps = {
  theme: defaultTheme,
};

export const BreadcrumbItemText = styled.span`
  display: inline-block;
`;

BreadcrumbItemText.defaultProps = {
  theme: defaultTheme,
};

export const BreadcrumbEllipsis = styled.span`
  color: var(--color-neutral-500);
  padding: 0 var(--spacing-1);

  /* 다크모드 */
  [data-theme="dark"] & {
    color: var(--color-neutral-400);
  }
`;

BreadcrumbEllipsis.defaultProps = {
  theme: defaultTheme,
};
