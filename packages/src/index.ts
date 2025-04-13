// 테마 설정 자동 로드
import "./theme/setupTheme";

// 통합된 스타일 파일 임포트
import "./styles.css";

// core 토큰 선택적으로 내보내기
import * as CoreTokens from "./core/tokens";
export const { colors, typography, spacing, shadows } = CoreTokens;
// ThemeMode는 별도로 명시적 내보내기 (테마 모듈에서만 내보냄)

// 테마 관련 내보내기 (명시적으로 내보내기)
export {
  ThemeProvider,
  ThemeContext,
  useTheme,
  lightTheme,
  darkTheme,
  defaultTheme,
} from "./theme";
// Theme와 ThemeMode 타입 내보내기
export type {
  Theme,
  ThemeMode,
  ThemeContextInterface,
  ThemeProviderProps,
} from "./theme";

// 컴포넌트 내보내기
export * from "./Accordion";
export * from "./Alert";
export * from "./AspectRatio";
export * from "./AutoComplete";
export * from "./Avatar";
export * from "./Badge";
export * from "./Breadcrumb";
export * from "./Button";
export * from "./Card";
export * from "./Checkbox";
export * from "./Confirm";
export * from "./DatePicker";
export * from "./Divider";
export * from "./Grid";
export * from "./Input";
export * from "./Menu";
export * from "./Modal";
export * from "./Pagination";
export * from "./Popover";
export * from "./Progress";
export * from "./Radio";
export * from "./Select";
export * from "./Skeleton";
export * from "./Slider";
export * from "./Stack";
export * from "./Stepper";
export * from "./Switch";
export * from "./Table";
export * from "./Tabs";
export * from "./Tag";
export * from "./ThemeSwitcher";
export * from "./Toast";
export * from "./Tooltip";

// GlobalTokens 컴포넌트 export 추가
export { GlobalTokens } from "./core/tokens/GlobalTokens";
