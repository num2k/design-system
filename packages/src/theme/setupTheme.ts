import { defaultTheme } from "./theme";

/**
 * styled-components가 기본 테마를 사용할 수 있도록 하는 유틸리티 파일
 *
 * ThemeProvider가 없는 경우에도 컴포넌트에 기본 테마가 적용됩니다.
 * 각 컴포넌트의 스타일드 컴포넌트에서는 이미 defaultTheme를 defaultProps로 설정하고 있습니다.
 *
 * @deprecated ThemeProvider.tsx로 기능 통합됨, 나중에 제거 예정
 */

// 테마 설정 초기화 확인용 로그
console.log("🎨 Design System: 기본 테마가 설정되었습니다.");

/**
 * 기본 테마 설정을 초기화합니다.
 * 애플리케이션 시작 시 한 번 호출하세요.
 *
 * @deprecated ThemeProvider.tsx로 기능이 통합되었습니다. 이 함수 대신 ThemeProvider를 사용하세요.
 */
export const setupDefaultTheme = () => {
  // 브라우저 환경에서만 실행
  if (typeof document === "undefined") return;

  // data-theme 속성이 설정되어 있지 않으면 시스템 기본 설정에 따라 설정
  if (!document.documentElement.hasAttribute("data-theme")) {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    document.documentElement.setAttribute(
      "data-theme",
      prefersDark ? "dark" : "light"
    );
  }
};
