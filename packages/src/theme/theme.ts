import { colors, shadows, ThemeMode } from "../core/tokens/colors";
import { typography } from "../core/tokens/typography";
import {
  spacing,
  radii,
  focus,
  transitions,
  zIndices,
} from "../core/tokens/spacing";

// 테마 인터페이스 정의
export interface Theme {
  mode: ThemeMode;
  colors: {
    background: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    text: {
      primary: string;
      secondary: string;
      disabled: string;
    };
    border: {
      default: string;
      focus: string;
      disabled: string;
    };
    [key: string]: any;
  };
  typography: typeof typography;
  spacing: typeof spacing;
  radii: typeof radii;
  shadows: typeof shadows.light | typeof shadows.dark;
  zIndices: typeof zIndices;
  transitions: typeof transitions;
  focus: typeof focus;
}

// 라이트 테마 생성
export const lightTheme: Theme = {
  mode: "light",
  colors: {
    ...colors.light,
    background: colors.light.background,
    text: colors.light.text,
    border: colors.light.border,
  },
  typography,
  spacing,
  radii,
  shadows: shadows.light,
  zIndices,
  transitions,
  focus,
};

// 다크 테마 생성
export const darkTheme: Theme = {
  ...lightTheme,
  mode: "dark",
  colors: {
    ...colors.dark,
    background: colors.dark.background,
    text: colors.dark.text,
    border: colors.dark.border,
  },
  shadows: shadows.dark,
  focus: {
    ...focus,
  },
};

// 기본 테마를 라이트 테마로 설정
export const defaultTheme = lightTheme;
