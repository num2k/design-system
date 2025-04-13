export const spacing = {
  0: "0", // 0px
  px: "1px", // 픽셀 단위 추가
  0.5: "0.125rem", // 2px
  1: "0.25rem", // 4px
  1.5: "0.375rem", // 6px
  2: "0.5rem", // 8px
  2.5: "0.625rem", // 10px
  3: "0.75rem", // 12px
  3.5: "0.875rem", // 14px
  4: "1rem", // 16px
  5: "1.25rem", // 20px
  6: "1.5rem", // 24px
  7: "1.75rem", // 28px
  8: "2rem", // 32px
  9: "2.25rem", // 36px
  10: "2.5rem", // 40px
  // 아래 값들은 tokens.css에 없지만 필요시 사용할 수 있도록 유지
  11: "2.75rem", // 44px
  12: "3rem", // 48px
  14: "3.5rem", // 56px
  16: "4rem", // 64px
  18: "4.5rem", // 72px
  20: "5rem", // 80px
  24: "6rem", // 96px
  28: "7rem", // 112px
  32: "8rem", // 128px
  36: "9rem", // 144px
  40: "10rem", // 160px
  44: "11rem", // 176px
  48: "12rem", // 192px
  52: "13rem", // 208px
  56: "14rem", // 224px
  60: "15rem", // 240px
  64: "16rem", // 256px
  72: "18rem", // 288px
  80: "20rem", // 320px
  96: "24rem", // 384px
} as const;

// tokens.css의 radius 값과 일치하도록 수정
export const radii = {
  none: "0",
  sm: "0.125rem", // 2px
  md: "0.25rem", // 4px
  lg: "0.5rem", // 8px
  xl: "0.75rem", // 12px
  "2xl": "1rem", // 16px
  full: "9999px",
} as const;

// tokens.css의 focus 값과 일치하도록 수정
export const focus = {
  ringColor: "rgba(59, 130, 246, 0.5)",
  ringWidth: "3px",
  ringOffset: "2px",
} as const;

// tokens.css의 transitions 값과 일치하도록 수정
export const transitions = {
  duration: {
    fast: "150ms",
    normal: "300ms",
    slow: "500ms",
  },
  timing: {
    default: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
} as const;

// z-index 값 추가
export const zIndices = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const;

export type SpacingToken = keyof typeof spacing;
export type RadiiToken = keyof typeof radii; // radius -> radii 로 이름 변경
export type FocusToken = keyof typeof focus;
export type TransitionDurationToken = keyof typeof transitions.duration;
export type TransitionTimingToken = keyof typeof transitions.timing;
export type ZIndexToken = keyof typeof zIndices;
