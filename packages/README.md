# @num2k/design-system

React 19 통합 디자인 시스템 - 컴포넌트와 디자인 토큰이 결합된 완전한 패키지입니다. 모던하고 접근성이 뛰어난 UI 컴포넌트 및 디자인 토큰 시스템을 제공하며, 라이트모드와 다크모드를 모두 지원합니다.

## 시스템 요구사항

- **React 19+**: 이 디자인 시스템은 React 19 버전에 최적화를 목표로 합니다.
- **React DOM 19+**: React DOM 최신 버전(v19.x)이 필요합니다.
- **styled-components 6+**: 스타일링에는 styled-components가 사용됩니다.

## 새로운 프로젝트 시작하기

### Vite + React 프로젝트 생성

Vite를 사용하여 빠르게 React 19 프로젝트를 설정할 수 있습니다:

```bash
# npm으로 Vite + React 프로젝트 생성
npm create vite@latest my-app -- --template react-ts

# 프로젝트 폴더로 이동
cd my-app

# 의존성 설치
npm install

# 개발 서버 시작
npm run dev
```

자세한 내용은 [Vite 공식 문서](https://vitejs.dev/guide/)를 참조하세요.

## 주요 기능

- 🌓 **다크모드 지원** - 모든 컴포넌트가 라이트모드와 다크모드를 완벽하게 지원합니다
- 🧩 **모듈식 구조** - 필요한 컴포넌트만 가져와 번들 크기를 최적화할 수 있습니다
- 📱 **반응형 디자인** - 모든 디바이스에서 일관된 사용자 경험을 제공합니다
- ♿ **접근성** - WCAG 지침을 준수하여 모든 사용자가 이용할 수 있습니다
- 🎨 **테마 커스터마이징** - CSS 변수를 통해 손쉽게 테마를 커스터마이징할 수 있습니다
- 🚀 **빠른 개발** - 미리 만들어진 컴포넌트로 개발 속도를 높일 수 있습니다

## 설치

```bash
# npm을 사용하는 경우
npm install @num2k/design-system styled-components

# yarn을 사용하는 경우
yarn add @num2k/design-system styled-components

# pnpm을 사용하는 경우
pnpm add @num2k/design-system styled-components
```

> **주의**: CSS-in-JS 방식(styled-components)을 사용합니다. 별도의 CSS 파일 import 없이 컴포넌트를 바로 사용할 수 있지만, `styled-components`를 함께 설치해야 합니다.

### 릴리스 노트

- **2.0.4**: 모든 컴포넌트에 다크모드 지원 추가
- **2.0.3**: CSS-in-JS 방식으로 전환 - 별도의 CSS 파일 불러오기 필요 없음 (styled-components 의존성 추가)
- **2.0.2**: CSS 가져오기 경로 버그 수정 - 스타일시트가 외부 프로젝트에서 올바르게 로드되도록 개선
- **2.0.1**: 패키지 구조 개선 및 내부 리팩토링
- **2.0.0**: 컴포넌트와 디자인 토큰을 하나의 통합 패키지로 결합

## 기본 사용법

```jsx
// 컴포넌트 가져오기
import { Button, Input, Select } from "@num2k/design-system";

function App() {
  return (
    <div>
      <h1>My App</h1>
      <Input placeholder="이메일 입력" />
      <Button variant="primary">로그인</Button>
      <Select
        options={[
          { value: "option1", label: "옵션 1" },
          { value: "option2", label: "옵션 2" },
        ]}
      />
    </div>
  );
}
```

## 다크모드 적용

다크모드는 두 가지 방식으로 적용할 수 있습니다: `ThemeProvider`를 사용하거나, 단순히 HTML 요소에 `data-theme` 속성을 추가하는 방식입니다.

### 1. data-theme 속성을 사용한 방법 (간단한 방식)

가장 간단한 방법은 애플리케이션의 루트 요소에 `data-theme` 속성을 추가하는 것입니다:

```jsx
import { useState } from "react";
import { Button, Input } from "@num2k/design-system";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div data-theme={isDarkMode ? "dark" : "light"}>
      <Button onClick={() => setIsDarkMode(!isDarkMode)} variant="outline">
        {isDarkMode ? "라이트 모드로 전환" : "다크 모드로 전환"}
      </Button>

      <Input placeholder="이메일 입력" />
      <Button variant="primary">로그인</Button>
    </div>
  );
}
```

이 방식은 `ThemeProvider` 없이도 모든 컴포넌트에 기본 스타일이 적용됩니다. 시스템 설정과 무관하게 수동으로 테마를 전환할 수 있습니다.

### 2. ThemeProvider 사용 방법 (고급 기능)

`ThemeProvider`를 사용하면 테마를 더 쉽게 관리하고 활용할 수 있습니다:

```jsx
import { useState } from "react";
import { ThemeProvider, Button, Input } from "@num2k/design-system";
import { useTheme } from "@num2k/design-system/theme";

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  // useTheme 훅으로 테마 상태와 함수에 접근
  const { mode, toggleTheme } = useTheme();

  return (
    <div>
      <Button onClick={toggleTheme}>
        {mode === "light" ? "다크 모드로 전환" : "라이트 모드로 전환"}
      </Button>

      <Input placeholder="이메일 입력" />
      <Button variant="primary">로그인</Button>
    </div>
  );
}
```

#### ThemeProvider의 추가 기능

- **테마 상태 관리**: `useTheme` 훅을 통해 모든 컴포넌트에서 테마 상태에 접근 가능
- **로컬 스토리지 저장**: 사용자가 선택한 테마를 자동으로 로컬 스토리지에 저장하여 페이지 새로고침 시에도 유지됨
- **시스템 설정 감지**: 사용자의 시스템 다크모드 설정을 자동으로 감지하여 적용
- **자동 HTML 속성 관리**: `data-theme` 속성이 자동으로 관리됨

### ThemeProvider Props

```jsx
<ThemeProvider
  defaultMode="dark" // 초기 테마 모드 (기본값: 'system')
  enableLocalStorage={true} // 로컬 스토리지 사용 여부 (기본값: true)
  storageKey="theme-preference" // 로컬 스토리지 키 (기본값: 'theme-preference')
  useSystemTheme={true} // 시스템 테마 감지 사용 여부 (기본값: true)
  onThemeChange={(mode) => console.log(`테마가 ${mode}로 변경되었습니다`)} // 테마 변경 시 호출되는 콜백
>
  {children}
</ThemeProvider>
```

### 테마 프로바이더 사용 vs 미사용 차이점

| 기능                  | ThemeProvider 사용                        | data-theme 속성만 사용         |
| --------------------- | ----------------------------------------- | ------------------------------ |
| 기본 스타일           | ✅ 모든 컴포넌트에 스타일 적용            | ✅ 모든 컴포넌트에 스타일 적용 |
| 시스템 테마 감지      | ✅ 자동 감지 (기본 활성화)                | ❌ 직접 미디어 쿼리 구현 필요  |
| 테마 상태 관리        | ✅ `useTheme` 훅 제공                     | ❌ 직접 상태 관리 필요         |
| 로컬 스토리지 저장    | ✅ 자동 저장 (기본 활성화)                | ❌ 직접 구현 필요              |
| 테마 전환 API         | ✅ `toggleTheme()`, `setMode()` 함수 제공 | ❌ 직접 구현 필요              |
| 컴포넌트 간 상태 공유 | ✅ React Context 활용                     | ❌ 직접 구현 필요              |

## 제공 컴포넌트

### 유틸리티

| 컴포넌트        | 설명                                       |
| --------------- | ------------------------------------------ |
| `ThemeSwitcher` | 라이트모드와 다크모드 전환을 위한 컴포넌트 |

### 폼 컴포넌트

| 컴포넌트       | 설명                                             |
| -------------- | ------------------------------------------------ |
| `Button`       | 다양한 크기, 변형, 색상을 지원하는 버튼 컴포넌트 |
| `Input`        | 텍스트 입력을 위한 컴포넌트                      |
| `Select`       | 드롭다운 선택을 위한 컴포넌트                    |
| `Checkbox`     | 체크박스 컴포넌트                                |
| `Radio`        | 라디오 버튼 컴포넌트                             |
| `Slider`       | 슬라이더 컴포넌트                                |
| `AutoComplete` | 자동 완성 기능을 갖춘 입력 컴포넌트              |
| `Switch`       | 토글 스위치 컴포넌트                             |
| `DatePicker`   | 날짜 선택 컴포넌트                               |

### 피드백 & 오버레이

| 컴포넌트   | 설명                                       |
| ---------- | ------------------------------------------ |
| `Modal`    | 모달 다이얼로그 컴포넌트                   |
| `Popover`  | 호버 또는 클릭 시 표시되는 팝오버 컴포넌트 |
| `Tooltip`  | 호버 시 추가 정보를 표시하는 툴팁 컴포넌트 |
| `Alert`    | 알림 및 경고 메시지 컴포넌트               |
| `Confirm`  | 사용자 확인을 요청하는 다이얼로그 컴포넌트 |
| `Toast`    | 임시 알림을 표시하는 토스트 컴포넌트       |
| `Progress` | 진행 상태를 표시하는 컴포넌트              |

### 데이터 표시

| 컴포넌트     | 설명                                      |
| ------------ | ----------------------------------------- |
| `Card`       | 정보를 카드 형태로 표시하는 컴포넌트      |
| `Table`      | 데이터를 표 형식으로 표시하는 컴포넌트    |
| `Pagination` | 페이지 탐색을 위한 컴포넌트               |
| `Skeleton`   | 콘텐츠 로딩 중 표시되는 스켈레톤 컴포넌트 |
| `Badge`      | 상태나 카운트를 표시하는 배지 컴포넌트    |
| `Avatar`     | 사용자 아바타를 표시하는 컴포넌트         |
| `Tabs`       | 탭 컨테이너 컴포넌트                      |
| `Accordion`  | 접을 수 있는 콘텐츠 컴포넌트              |
| `Tag`        | 태그 컴포넌트                             |

### 내비게이션

| 컴포넌트     | 설명                      |
| ------------ | ------------------------- |
| `Breadcrumb` | 경로 탐색을 위한 컴포넌트 |
| `Menu`       | 메뉴 컴포넌트             |
| `Stepper`    | 단계별 진행 표시 컴포넌트 |

### 레이아웃

| 컴포넌트      | 설명                                |
| ------------- | ----------------------------------- |
| `Grid`        | 그리드 레이아웃 컴포넌트            |
| `Stack`       | 요소들을 쌓아서 배치하는 컴포넌트   |
| `AspectRatio` | 종횡비를 유지하는 컨테이너 컴포넌트 |
| `Divider`     | 요소 간 구분선 컴포넌트             |

## 디자인 토큰 사용

```jsx
// 토큰 값 가져오기 (TypeScript)
import { colors, typography, spacing } from "@num2k/design-system";

function StyledComponent() {
  // 토큰 값을 JavaScript에서 사용하는 예시
  const primaryColor = colors.primary[500];

  return (
    <div
      style={{
        padding: spacing[4],
        backgroundColor: colors.neutral[100],
        fontFamily: typography.fontFamily.sans,
      }}
    >
      <h2>디자인 토큰 적용 예제</h2>
      <p>이 컴포넌트는 디자인 시스템 토큰을 활용합니다.</p>
    </div>
  );
}
```

## 통합 패키지의 주요 이점

1. **단순한 설치 및 사용**: 하나의 패키지만 설치하면 됩니다.
2. **토큰 참조 문제 해결**: CSS 변수 참조 문제가 해결되었습니다.
3. **일관된 의존성 관리**: 버전 충돌 없이 모든 것이 하나의 패키지에서 관리됩니다.
4. **더 작은 번들 크기**: 중복 코드가 제거되어 번들 크기가 최적화됩니다.
5. **TypeScript 지원 개선**: 모든 타입 정의가 함께 제공됩니다.

## Tree Shaking 지원

이 패키지는 Tree Shaking을 지원합니다. 실제로 사용하는 컴포넌트만 최종 번들에 포함됩니다.

## 브라우저 지원

- Chrome/Edge (최신 2개 버전)
- Firefox (최신 2개 버전)
- Safari (최신 2개 버전)
- IE는 지원하지 않습니다

## 라이선스

MIT
