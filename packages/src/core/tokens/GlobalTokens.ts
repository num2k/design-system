import { createGlobalStyle } from "styled-components";
import { Theme } from "../../theme/theme";

// 디자인 시스템 전역 스타일 정의
export const GlobalTokens = createGlobalStyle<{ theme?: Theme }>`
  /* 이 컴포넌트는 ThemeProvider 없이도 기본 CSS 변수들이 적용되도록 합니다 */
  body {
    margin: 0;
    padding: 0;
    font-family: var(--font-family-sans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", 
      Roboto, "Helvetica Neue", Arial, sans-serif);
    background-color: var(--color-background-primary, #f9fafb);
    color: var(--color-text-primary, #111827);
    line-height: var(--line-height-normal, 1.5);
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  /* 접근성 및 포커스 스타일 */
  :focus-visible {
    outline: var(--focus-ring-width, 3px) solid var(--focus-ring-color, rgba(59, 130, 246, 0.5));
    outline-offset: var(--focus-ring-offset, 2px);
  }

  /* Button, Input 등 폼 요소 기본 스타일 초기화 */
  button, input, select, textarea {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  /* 기본 링크 스타일 */
  a {
    color: var(--color-primary-600, #2563eb);
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  /* 테마 객체 값을 CSS 변수로 변환 */
  :root {
    /* 배경 색상 */
    --color-background-primary: ${(props) =>
      props.theme?.colors?.background?.primary || "#f9fafb"};
    --color-background-secondary: ${(props) =>
      props.theme?.colors?.background?.secondary || "#f3f4f6"};
    --color-background-tertiary: ${(props) =>
      props.theme?.colors?.background?.tertiary || "#e5e7eb"};
    
    /* 텍스트 색상 */
    --color-text-primary: ${(props) =>
      props.theme?.colors?.text?.primary || "#111827"};
    --color-text-secondary: ${(props) =>
      props.theme?.colors?.text?.secondary || "#374151"};
    --color-text-disabled: ${(props) =>
      props.theme?.colors?.text?.disabled || "#9ca3af"};
    
    /* 테두리 색상 */
    --color-border-default: ${(props) =>
      props.theme?.colors?.border?.default || "#d1d5db"};
    --color-border-focus: ${(props) =>
      props.theme?.colors?.border?.focus || "#3b82f6"};
    --color-border-disabled: ${(props) =>
      props.theme?.colors?.border?.disabled || "#e5e7eb"};

    /* 중성 색상 (neutral) */
    --color-neutral-50: ${(props) =>
      props.theme?.colors?.neutral?.[50] || "#f9fafb"};
    --color-neutral-100: ${(props) =>
      props.theme?.colors?.neutral?.[100] || "#f3f4f6"};
    --color-neutral-200: ${(props) =>
      props.theme?.colors?.neutral?.[200] || "#e5e7eb"};
    --color-neutral-300: ${(props) =>
      props.theme?.colors?.neutral?.[300] || "#d1d5db"};
    --color-neutral-400: ${(props) =>
      props.theme?.colors?.neutral?.[400] || "#9ca3af"};
    --color-neutral-500: ${(props) =>
      props.theme?.colors?.neutral?.[500] || "#6b7280"};
    --color-neutral-600: ${(props) =>
      props.theme?.colors?.neutral?.[600] || "#4b5563"};
    --color-neutral-700: ${(props) =>
      props.theme?.colors?.neutral?.[700] || "#374151"};
    --color-neutral-800: ${(props) =>
      props.theme?.colors?.neutral?.[800] || "#1f2937"};
    --color-neutral-900: ${(props) =>
      props.theme?.colors?.neutral?.[900] || "#111827"};

    /* 주요 색상 (primary) */
    --color-primary-50: ${(props) =>
      props.theme?.colors?.primary?.[50] || "#eff6ff"};
    --color-primary-100: ${(props) =>
      props.theme?.colors?.primary?.[100] || "#dbeafe"};
    --color-primary-200: ${(props) =>
      props.theme?.colors?.primary?.[200] || "#bfdbfe"};
    --color-primary-300: ${(props) =>
      props.theme?.colors?.primary?.[300] || "#93c5fd"};
    --color-primary-400: ${(props) =>
      props.theme?.colors?.primary?.[400] || "#60a5fa"};
    --color-primary-500: ${(props) =>
      props.theme?.colors?.primary?.[500] || "#3b82f6"};
    --color-primary-600: ${(props) =>
      props.theme?.colors?.primary?.[600] || "#2563eb"};
    --color-primary-700: ${(props) =>
      props.theme?.colors?.primary?.[700] || "#1d4ed8"};
    --color-primary-800: ${(props) =>
      props.theme?.colors?.primary?.[800] || "#1e40af"};
    --color-primary-900: ${(props) =>
      props.theme?.colors?.primary?.[900] || "#1e3a8a"};

    /* 오류 색상 (error) */
    --color-error-50: ${(props) =>
      props.theme?.colors?.error?.[50] || "#fef2f2"};
    --color-error-100: ${(props) =>
      props.theme?.colors?.error?.[100] || "#fee2e2"};
    --color-error-500: ${(props) =>
      props.theme?.colors?.error?.[500] || "#ef4444"};
    --color-error-600: ${(props) =>
      props.theme?.colors?.error?.[600] || "#dc2626"};
    --color-error-700: ${(props) =>
      props.theme?.colors?.error?.[700] || "#b91c1c"};

    /* 성공 색상 (success) */
    --color-success-100: ${(props) =>
      props.theme?.colors?.success?.[100] || "#dcfce7"};
    --color-success-500: ${(props) =>
      props.theme?.colors?.success?.[500] || "#22c55e"};

    /* 폰트 */
    --font-family-sans: ${(props) =>
      props.theme?.typography?.fontFamily?.sans ||
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"};
    --font-family-mono: ${(props) =>
      props.theme?.typography?.fontFamily?.mono ||
      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace"};

    /* 폰트 크기 */
    --font-size-xs: ${(props) =>
      props.theme?.typography?.fontSize?.xs || "0.75rem"};
    --font-size-sm: ${(props) =>
      props.theme?.typography?.fontSize?.sm || "0.875rem"};
    --font-size-md: ${(props) =>
      props.theme?.typography?.fontSize?.md || "1rem"};
    --font-size-lg: ${(props) =>
      props.theme?.typography?.fontSize?.lg || "1.125rem"};
    --font-size-xl: ${(props) =>
      props.theme?.typography?.fontSize?.xl || "1.25rem"};
    --font-size-2xl: ${(props) =>
      props.theme?.typography?.fontSize?.["2xl"] || "1.5rem"};
    
    /* 폰트 굵기 */
    --font-weight-normal: ${(props) =>
      props.theme?.typography?.fontWeight?.normal || "400"};
    --font-weight-medium: ${(props) =>
      props.theme?.typography?.fontWeight?.medium || "500"};
    --font-weight-semibold: ${(props) =>
      props.theme?.typography?.fontWeight?.semibold || "600"};
    --font-weight-bold: ${(props) =>
      props.theme?.typography?.fontWeight?.bold || "700"};

    /* 라인 높이 */
    --line-height-none: ${(props) =>
      props.theme?.typography?.lineHeight?.none || "1"};
    --line-height-tight: ${(props) =>
      props.theme?.typography?.lineHeight?.tight || "1.25"};
    --line-height-snug: ${(props) =>
      props.theme?.typography?.lineHeight?.snug || "1.375"};
    --line-height-normal: ${(props) =>
      props.theme?.typography?.lineHeight?.normal || "1.5"};
    --line-height-relaxed: ${(props) =>
      props.theme?.typography?.lineHeight?.relaxed || "1.625"};
    --line-height-loose: ${(props) =>
      props.theme?.typography?.lineHeight?.loose || "2"};

    /* 간격 */
    --spacing-0: ${(props) => props.theme?.spacing?.[0] || "0"};
    --spacing-px: ${(props) => props.theme?.spacing?.px || "1px"};
    --spacing-0-5: ${(props) => props.theme?.spacing?.[0.5] || "0.125rem"};
    --spacing-1: ${(props) => props.theme?.spacing?.[1] || "0.25rem"};
    --spacing-1-5: ${(props) => props.theme?.spacing?.[1.5] || "0.375rem"};
    --spacing-2: ${(props) => props.theme?.spacing?.[2] || "0.5rem"};
    --spacing-2-5: ${(props) => props.theme?.spacing?.[2.5] || "0.625rem"};
    --spacing-3: ${(props) => props.theme?.spacing?.[3] || "0.75rem"};
    --spacing-3-5: ${(props) => props.theme?.spacing?.[3.5] || "0.875rem"};
    --spacing-4: ${(props) => props.theme?.spacing?.[4] || "1rem"};
    --spacing-5: ${(props) => props.theme?.spacing?.[5] || "1.25rem"};
    --spacing-6: ${(props) => props.theme?.spacing?.[6] || "1.5rem"};
    --spacing-7: ${(props) => props.theme?.spacing?.[7] || "1.75rem"};
    --spacing-8: ${(props) => props.theme?.spacing?.[8] || "2rem"};
    --spacing-9: ${(props) => props.theme?.spacing?.[9] || "2.25rem"};
    --spacing-10: ${(props) => props.theme?.spacing?.[10] || "2.5rem"};

    /* 테두리 반경 */
    --radius-none: ${(props) => props.theme?.radii?.none || "0"};
    --radius-sm: ${(props) => props.theme?.radii?.sm || "0.125rem"};
    --radius-md: ${(props) => props.theme?.radii?.md || "0.25rem"};
    --radius-lg: ${(props) => props.theme?.radii?.lg || "0.5rem"};
    --radius-xl: ${(props) => props.theme?.radii?.xl || "0.75rem"};
    --radius-2xl: ${(props) => props.theme?.radii?.["2xl"] || "1rem"};
    --radius-full: ${(props) => props.theme?.radii?.full || "9999px"};

    /* 그림자 */
    --shadow-sm: ${(props) =>
      props.theme?.shadows?.sm || "0 1px 2px 0 rgba(0, 0, 0, 0.05)"};
    --shadow-md: ${(props) =>
      props.theme?.shadows?.md ||
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"};
    --shadow-lg: ${(props) =>
      props.theme?.shadows?.lg ||
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"};
    --shadow-xl: ${(props) =>
      props.theme?.shadows?.xl ||
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"};

    /* 트랜지션 */
    --transition-duration-fast: ${(props) =>
      props.theme?.transitions?.duration?.fast || "150ms"};
    --transition-duration-normal: ${(props) =>
      props.theme?.transitions?.duration?.normal || "300ms"};
    --transition-duration-slow: ${(props) =>
      props.theme?.transitions?.duration?.slow || "500ms"};
    --transition-timing-function: ${(props) =>
      props.theme?.transitions?.timing?.default ||
      "cubic-bezier(0.4, 0, 0.2, 1)"};

    /* 포커스 */
    --focus-ring-color: ${(props) =>
      props.theme?.focus?.ringColor || "rgba(59, 130, 246, 0.5)"};
    --focus-ring-width: ${(props) => props.theme?.focus?.ringWidth || "3px"};
    --focus-ring-offset: ${(props) => props.theme?.focus?.ringOffset || "2px"};
  }
`;

// 자동으로 스타일을 생성하는 기능 (ThemeProvider 없이 사용할 때 필요)
export const injectGlobalStyles = () => {
  // SSR 환경에서는 실행하지 않음
  if (typeof document === "undefined") return;

  // 이미 스타일이 주입되었는지 확인
  if (document.getElementById("num2k-design-system-global-styles")) return;

  // 스타일 요소 생성
  const styleElement = document.createElement("style");
  styleElement.id = "num2k-design-system-global-styles";

  // 기본 스타일 주입 - 직접 색상값 지정으로 변경
  styleElement.textContent = `
    body {
      margin: 0;
      padding: 0;
      font-family: var(--font-family-sans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", 
        Roboto, "Helvetica Neue", Arial, sans-serif);
      background-color: var(--color-background-primary, #f9fafb);
      color: var(--color-text-primary, #111827);
      line-height: var(--line-height-normal, 1.5);
      transition: background-color 0.3s ease, color 0.3s ease;
    }

    :focus-visible {
      outline: var(--focus-ring-width, 3px) solid var(--focus-ring-color, rgba(59, 130, 246, 0.5));
      outline-offset: var(--focus-ring-offset, 2px);
    }

    button, input, select, textarea {
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
    }

    a {
      color: var(--color-primary-600, #2563eb);
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    /* 추가 배경 및 텍스트 색상 변수 정의 - 기본값 직접 지정 */
    :root {
      /* 배경 색상 */
      --color-background-primary: #f9fafb;
      --color-background-secondary: #f3f4f6;
      --color-background-tertiary: #e5e7eb;
      
      /* 텍스트 색상 */
      --color-text-primary: #111827;
      --color-text-secondary: #374151;
      --color-text-disabled: #9ca3af;
      
      /* 테두리 색상 */
      --color-border-default: #d1d5db;
      --color-border-focus: #3b82f6;
      --color-border-disabled: #e5e7eb;

      /* Focus 관련 변수 추가 */
      --focus-ring-width: 3px;
      --focus-ring-color: rgba(59, 130, 246, 0.5);
      --focus-ring-offset: 2px;

      /* 트랜지션 */
      --transition-duration-fast: 150ms;
      --transition-duration-normal: 300ms;
      --transition-duration-slow: 500ms;
      --transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      
      /* 폰트 크기 */
      --font-size-xs: 0.75rem;
      --font-size-sm: 0.875rem;
      --font-size-md: 1rem;
      --font-size-lg: 1.125rem;
      --font-size-xl: 1.25rem;
      --font-size-2xl: 1.5rem;
      
      /* 반경 */
      --radius-none: 0;
      --radius-sm: 0.125rem;
      --radius-md: 0.25rem;
      --radius-lg: 0.5rem;
      --radius-xl: 0.75rem;
      --radius-2xl: 1rem;
      --radius-full: 9999px;
      
      /* 간격 */
      --spacing-1: 0.25rem;
      --spacing-2: 0.5rem;
      --spacing-3: 0.75rem;
      --spacing-4: 1rem;
      --spacing-5: 1.25rem;
      
      /* 중성 색상 */
      --color-neutral-300: #d1d5db;
      --color-neutral-400: #9ca3af;
    }

    /* 다크모드에서 추가 변수 재정의 */
    [data-theme="dark"] {
      /* 배경 색상 */
      --color-background-primary: #18181b;
      --color-background-secondary: #27272a;
      --color-background-tertiary: #3f3f46;
      
      /* 텍스트 색상 */
      --color-text-primary: #fafafa;
      --color-text-secondary: #e4e4e7;
      --color-text-disabled: #a1a1aa;
      
      /* 테두리 색상 */
      --color-border-default: #52525b;
      --color-border-focus: #60a5fa;
      --color-border-disabled: #3f3f46;
    }
  `;

  // body에 스타일 요소 추가
  document.head.appendChild(styleElement);
};

// 자동으로 스타일 주입 (페이지가 로드될 때)
if (typeof document !== "undefined") {
  if (document.readyState === "complete") {
    injectGlobalStyles();
  } else {
    window.addEventListener("DOMContentLoaded", injectGlobalStyles);
  }
}

// 기존 스크립트에서 자동 주입을 지원하는 함수 export
export const setupDesignSystem = () => {
  injectGlobalStyles();
};
