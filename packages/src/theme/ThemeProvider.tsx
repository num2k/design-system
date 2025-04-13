import React, { useState, useEffect, createContext, useContext } from "react";
import {
  ThemeProvider as StyledThemeProvider,
  createGlobalStyle,
} from "styled-components";
import { colors, shadows, ThemeMode } from "../core/tokens";
import { GlobalTokens } from "../core/tokens/GlobalTokens"; // GlobalTokens 임포트 추가
import { Theme, lightTheme, darkTheme } from "./theme";

// 확장된 테마 컨텍스트 정의
export interface ThemeContextInterface {
  mode: ThemeMode;
  theme: Theme;
  toggleTheme: () => void;
  setMode: (mode: ThemeMode) => void;
}

// 기본 컨텍스트 값 생성
const getInitialMode = (): ThemeMode => {
  if (typeof document === "undefined") return "light";

  const savedMode = localStorage.getItem(
    "theme-preference"
  ) as ThemeMode | null;
  const dataTheme = document.documentElement.getAttribute(
    "data-theme"
  ) as ThemeMode | null;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // 우선 순위: 1. 로컬 스토리지, 2. data-theme 속성, 3. 시스템 설정
  return savedMode || dataTheme || (prefersDark ? "dark" : "light");
};

// 기본 테마 컨텍스트 생성
export const ThemeContext = createContext<ThemeContextInterface>({
  mode: "light",
  theme: lightTheme,
  toggleTheme: () => {},
  setMode: () => {},
});

// useTheme 훅 - 컨텍스트 값 사용, ThemeProvider가 없어도 기본값 제공
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    const prefersDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const systemTheme = prefersDarkMode ? "dark" : "light";
    const defaultContext = {
      theme: systemTheme === "light" ? lightTheme : darkTheme,
      mode: systemTheme as ThemeMode,
      toggleTheme: () => {
        console.warn("ThemeProvider가 없어 테마를 전환할 수 없습니다.");
      },
      setMode: () => {
        console.warn("ThemeProvider가 없어 테마를 설정할 수 없습니다.");
      },
    };
    return defaultContext;
  }

  return context;
};

// CSS 변수 정의
const GlobalStyles = createGlobalStyle`
  /* 기본 스타일은 tokens.css와 GlobalTokens에서 제공되므로 여기서는 추가 스타일만 정의 */
  /* 테마 변경에 영향받는 추가 스타일이 필요한 경우 여기에 추가 */
`;

// 테마 생성 함수
const getThemeByMode = (mode: ThemeMode): Theme => {
  if (mode === "system") {
    const prefersDark =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? darkTheme : lightTheme;
  }
  return mode === "dark" ? darkTheme : lightTheme;
};

export interface ThemeProviderProps {
  children: React.ReactNode;
  /** 초기 테마 모드 (light, dark, system) */
  defaultMode?: ThemeMode;
  /** 로컬 스토리지 사용 여부 */
  enableLocalStorage?: boolean;
  /** 로컬 스토리지 키 */
  storageKey?: string;
  /** 시스템 테마 사용 여부 */
  useSystemTheme?: boolean;
  /** 테마 모드가 변경될 때 호출되는 함수 */
  onThemeChange?: (mode: ThemeMode) => void;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultMode = "system",
  enableLocalStorage = true,
  storageKey = "theme-preference",
  useSystemTheme = true,
  onThemeChange,
}) => {
  // 초기 모드 설정
  const [mode, setMode] = useState<ThemeMode>(() => {
    // 브라우저 환경에서만 실행
    if (typeof window !== "undefined") {
      // prop에서 받은 초기값 우선
      if (defaultMode !== "system") return defaultMode;

      // 로컬 스토리지 사용 시 저장된 테마 확인
      if (enableLocalStorage) {
        const savedTheme = localStorage.getItem(storageKey) as ThemeMode | null;
        if (savedTheme) return savedTheme;
      }

      // HTML 요소의 data-theme 속성 확인
      const dataTheme = document.documentElement.getAttribute(
        "data-theme"
      ) as ThemeMode | null;
      if (dataTheme && dataTheme !== "system") return dataTheme;

      // 시스템 설정 확인
      if (useSystemTheme) {
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        return prefersDark ? "dark" : "light";
      }
    }

    return defaultMode === "system" ? "light" : defaultMode; // 기본값
  });

  // 실제 표시되는 테마 (system인 경우 현재 시스템 설정에 따름)
  const [currentTheme, setCurrentTheme] = useState<Theme>(() =>
    getThemeByMode(mode)
  );

  // 테마 전환 함수
  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
  };

  // 테마 설정 함수
  const setThemeMode = (newMode: ThemeMode) => {
    setMode(newMode);
  };

  // 시스템 테마 변경 감지 및 mode 변경 시 효과
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 현재 모드에 맞는 테마 설정
    const applyTheme = (newMode: ThemeMode) => {
      // HTML의 data-theme 속성 설정
      document.documentElement.setAttribute(
        "data-theme",
        newMode === "system"
          ? window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
          : newMode
      );

      // 로컬 스토리지에 저장
      if (enableLocalStorage) {
        localStorage.setItem(storageKey, newMode);
      }

      // 콜백 호출
      onThemeChange?.(newMode);

      // 테마 객체 업데이트
      setCurrentTheme(getThemeByMode(newMode));
    };

    // 테마 적용
    applyTheme(mode);

    // 시스템 테마 변경 감지
    if (useSystemTheme) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const handleChange = (e: MediaQueryListEvent) => {
        // 시스템 모드일 때만 자동으로 테마 변경
        if (mode === "system") {
          const systemMode = e.matches ? "dark" : "light";
          document.documentElement.setAttribute("data-theme", systemMode);
          setCurrentTheme(getThemeByMode(mode));
          onThemeChange?.(mode);
        }
      };

      // 이벤트 리스너 추가
      mediaQuery.addEventListener("change", handleChange);

      // 클린업
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [mode, enableLocalStorage, storageKey, useSystemTheme, onThemeChange]);

  return (
    <ThemeContext.Provider
      value={{
        mode,
        theme: currentTheme,
        toggleTheme,
        setMode: setThemeMode,
      }}
    >
      <StyledThemeProvider theme={currentTheme}>
        <GlobalTokens /> {/* GlobalTokens 컴포넌트 추가 */}
        <GlobalStyles />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

// ThemeProvider가 없어도 기본 스타일이 적용되도록 하는 로직
if (
  typeof document !== "undefined" &&
  !document.documentElement.hasAttribute("data-theme")
) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.setAttribute(
    "data-theme",
    prefersDark ? "dark" : "light"
  );
}
