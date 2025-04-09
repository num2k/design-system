export * from './tokens';

// Theme types
export interface Theme {
  colors: typeof import('./tokens/colors').colors;
  typography: typeof import('./tokens/typography').typography;
  spacing: typeof import('./tokens/spacing').spacing;
}

// Theme context
import { createContext, useContext } from 'react';

export const ThemeContext = createContext<Theme | null>(null);

export const useTheme = () => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return theme;
};

// Theme provider component
import { ReactNode } from 'react';
import { colors } from './tokens/colors';
import { typography } from './tokens/typography';
import { spacing } from './tokens/spacing';

interface ThemeProviderProps {
  children: ReactNode;
  theme?: Partial<Theme>;
}

export const ThemeProvider = ({ children, theme }: ThemeProviderProps) => {
  const defaultTheme: Theme = {
    colors,
    typography,
    spacing,
  };

  const mergedTheme = {
    ...defaultTheme,
    ...theme,
  };

  return (
    <ThemeContext.Provider value={mergedTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

// 스타일 파일 가져오기
import './styles/tokens.css';
import './styles/reset.css';