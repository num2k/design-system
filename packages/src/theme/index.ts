// ThemeProvider에서 필요한 항목만 import
import {
  ThemeProvider,
  ThemeContext,
  useTheme,
  ThemeContextInterface,
  ThemeProviderProps,
} from "./ThemeProvider";

// theme.ts에서 테마 관련 항목들 import
import { lightTheme, darkTheme, defaultTheme, Theme } from "./theme";

// core/tokens에서 ThemeMode 직접 import
import { ThemeMode } from "../core/tokens";

// 컴포넌트와 객체 내보내기
export {
  ThemeProvider,
  ThemeContext,
  useTheme,
  lightTheme,
  darkTheme,
  defaultTheme,
};

// 타입 내보내기
export type {
  ThemeMode, // core/tokens에서 가져온 ThemeMode를 그대로 내보냄
  ThemeContextInterface,
  ThemeProviderProps,
  Theme,
};
