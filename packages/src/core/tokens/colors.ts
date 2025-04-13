export const colors = {
  light: {
    primary: {
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
      800: "#1e40af",
      900: "#1e3a8a",
    },
    neutral: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
    },
    error: {
      50: "#fef2f2",
      100: "#fee2e2",
      200: "#fecaca",
      300: "#fca5a5",
      400: "#f87171",
      500: "#ef4444",
      600: "#dc2626",
      700: "#b91c1c",
      800: "#991b1b",
      900: "#7f1d1d",
    },
    success: {
      50: "#f0fff4",
      100: "#d1fae5",
      200: "#a7f3d0",
      300: "#6ee7b7",
      400: "#34d399",
      500: "#48bb78",
      600: "#059669",
      700: "#2f855a",
      800: "#065f46",
      900: "#064e3b",
    },
    warning: {
      50: "#fffbeb",
      100: "#fef3c7",
      200: "#fde68a",
      300: "#fcd34d",
      400: "#fbbf24",
      500: "#f59e0b",
      600: "#d97706",
      700: "#b45309",
      800: "#92400e",
      900: "#78350f",
    },
    info: {
      50: "#ecfeff",
      100: "#cffafe",
      200: "#a5f3fc",
      300: "#67e8f9",
      400: "#22d3ee",
      500: "#06b6d4",
      600: "#0891b2",
      700: "#0e7490",
      800: "#155e75",
      900: "#164e63",
    },
    background: {
      primary: "#FFFFFF",
      secondary: "#F9FAFB",
      tertiary: "#F3F4F6",
    },
    text: {
      primary: "#111827",
      secondary: "#4B5563",
      disabled: "#9CA3AF",
    },
    border: {
      default: "#E5E7EB",
      focus: "#3366FF",
      disabled: "#D1D5DB",
    },
  },
  dark: {
    primary: {
      50: "#1e3a8a",
      100: "#1e40af",
      200: "#1d4ed8",
      300: "#2563eb",
      400: "#3b82f6",
      500: "#60a5fa", // 다크 모드에서는 더 밝은 색상 사용
      600: "#93c5fd",
      700: "#bfdbfe",
      800: "#dbeafe",
      900: "#eff6ff",
    },
    neutral: {
      50: "#18181b", // 가장 어두운 배경
      100: "#27272a", // 어두운 배경
      200: "#3f3f46", // 약간 밝은 배경
      300: "#52525b", // 중간 어두운 요소
      400: "#71717a", // 중간 색상
      500: "#a1a1aa", // 중간 밝은 색상
      600: "#d4d4d8", // 밝은 텍스트/테두리
      700: "#e4e4e7", // 더 밝은 텍스트
      800: "#f4f4f5", // 매우 밝은 텍스트
      900: "#fafafa", // 가장 밝은 텍스트
    },
    error: {
      50: "#7f1d1d",
      100: "#991b1b",
      200: "#b91c1c",
      300: "#dc2626",
      400: "#ef4444",
      500: "#f87171", // 다크 모드에서는 더 밝은 색상 사용
      600: "#fca5a5",
      700: "#fecaca",
      800: "#fee2e2",
      900: "#fef2f2",
    },
    success: {
      50: "#064e3b",
      100: "#065f46",
      200: "#047857",
      300: "#059669",
      400: "#10b981",
      500: "#4ade80", // 다크 모드에서는 더 밝은 색상 사용
      600: "#6ee7b7",
      700: "#a7f3d0",
      800: "#d1fae5",
      900: "#f0fff4",
    },
    warning: {
      50: "#78350f",
      100: "#92400e",
      200: "#b45309",
      300: "#d97706",
      400: "#f59e0b",
      500: "#fbbf24", // 다크 모드에서는 더 밝은 색상 사용
      600: "#fcd34d",
      700: "#fde68a",
      800: "#fef3c7",
      900: "#fffbeb",
    },
    info: {
      50: "#164e63",
      100: "#155e75",
      200: "#0e7490",
      300: "#0891b2",
      400: "#06b6d4",
      500: "#22d3ee", // 다크 모드에서는 더 밝은 색상 사용
      600: "#67e8f9",
      700: "#a5f3fc",
      800: "#cffafe",
      900: "#ecfeff",
    },
    background: {
      primary: "#18181b",
      secondary: "#27272a",
      tertiary: "#3f3f46",
    },
    text: {
      primary: "#f4f4f5",
      secondary: "#d4d4d8",
      disabled: "#71717a",
    },
    border: {
      default: "#3f3f46",
      focus: "#60a5fa",
      disabled: "#52525b",
    },
  },
} as const;

// 그림자 정의
export const shadows = {
  light: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
  dark: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.4)",
    md: "0 4px 6px rgba(0, 0, 0, 0.5)",
    lg: "0 10px 15px rgba(0, 0, 0, 0.6)",
    xl: "0 20px 25px rgba(0, 0, 0, 0.7)",
  },
} as const;

export type ColorToken =
  | "primary"
  | "neutral"
  | "error"
  | "success"
  | "warning"
  | "info";

export type ColorScale =
  | 50
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900;

export type BackgroundToken = "primary" | "secondary" | "tertiary";
export type TextToken = "primary" | "secondary" | "disabled";
export type BorderToken = "default" | "focus" | "disabled";
export type ShadowToken = "sm" | "md" | "lg" | "xl";
export type ThemeMode = "light" | "dark" | "system";
