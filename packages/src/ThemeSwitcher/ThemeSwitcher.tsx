import React, { useEffect, useState } from "react";
import { useTheme } from "../theme";
import { Switch } from "../Switch/Switch";
import "./ThemeSwitcher.css";

interface ThemeSwitcherProps {
  onChange?: () => void;
  isDarkMode?: boolean;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  onChange,
  isDarkMode: externalDarkMode,
  ...props
}) => {
  // 테마 프로바이더가 있는 경우 useTheme 사용
  const themeContext = useTheme();

  // 테마 프로바이더가 없거나 외부에서 isDarkMode를 제공하는 경우에 사용할 내부 상태
  const [internalDarkMode, setInternalDarkMode] = useState(() => {
    // 1. 외부 prop이 있으면 우선 사용
    if (externalDarkMode !== undefined) return externalDarkMode;

    // 2. 로컬 저장소에 저장된 값이 있으면 사용
    const savedTheme = localStorage.getItem("theme-preference");
    if (savedTheme) return savedTheme === "dark";

    // 3. 시스템 설정 사용
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  });

  // 실제 사용할 다크 모드 값 (프로바이더 값 > 외부 prop > 내부 상태)
  const isDark =
    externalDarkMode !== undefined
      ? externalDarkMode
      : themeContext.mode === "dark" || internalDarkMode;

  // 테마 변경 함수
  const toggleTheme = () => {
    if (themeContext.toggleTheme) {
      // ThemeProvider가 있으면 컨텍스트의 toggle 함수 사용
      themeContext.toggleTheme();
    } else {
      // ThemeProvider가 없으면 직접 테마 변경
      const newMode = !internalDarkMode;
      setInternalDarkMode(newMode);

      // HTML 요소에 data-theme 속성 설정
      document.documentElement.setAttribute(
        "data-theme",
        newMode ? "dark" : "light"
      );

      // 로컬 스토리지에 사용자 선호도 저장
      localStorage.setItem("theme-preference", newMode ? "dark" : "light");
    }

    // 외부 핸들러가 있다면 호출
    if (onChange) onChange();
  };

  // 초기화 및 시스템 테마 변경 감지
  useEffect(() => {
    // 테마 프로바이더가 없을 때만 직접 HTML 요소 속성 설정
    if (!themeContext.toggleTheme) {
      document.documentElement.setAttribute(
        "data-theme",
        internalDarkMode ? "dark" : "light"
      );

      // 시스템 설정이 변경될 때 테마 업데이트 (테마 프로바이더가 없는 경우)
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const handleSystemThemeChange = (e: MediaQueryListEvent) => {
        const systemDarkMode = e.matches;
        setInternalDarkMode(systemDarkMode);
        document.documentElement.setAttribute(
          "data-theme",
          systemDarkMode ? "dark" : "light"
        );
      };

      mediaQuery.addEventListener("change", handleSystemThemeChange);

      return () => {
        mediaQuery.removeEventListener("change", handleSystemThemeChange);
      };
    }
  }, [themeContext.toggleTheme]);

  return (
    <div className="theme-switcher">
      <Switch onChange={toggleTheme} checked={isDark} {...props} />
      <span className="theme-switcher__icon">{isDark ? "🌙" : "☀️"}</span>
    </div>
  );
};
