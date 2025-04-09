# Alert

Alert 컴포넌트는 사용자에게 중요한 정보를 표시하기 위한 컴포넌트입니다.

## 특징

- 네 가지 상태: info, success, warning, error
- 세 가지 변형: subtle, solid, outline
- 제목 지원
- 사용자 정의 아이콘 지원
- 닫기 버튼 (선택적)
- 액션 버튼 지원
- 접근성 고려

## 사용 예시

```tsx
import { Alert } from '@design-system/components';

// 기본 알림
<Alert>
  이것은 기본 정보 알림입니다.
</Alert>

// 성공 알림
<Alert 
  status="success"
  title="성공!"
>
  작업이 성공적으로 완료되었습니다.
</Alert>

// 닫을 수 있는 경고 알림
<Alert
  status="warning"
  closable
  onClose={() => console.log('알림이 닫혔습니다.')}
>
  이 작업은 되돌릴 수 없습니다.
</Alert>

// 액션이 있는 오류 알림
<Alert
  status="error"
  title="오류 발생"
  actions={
    <>
      <Button variant="primary" size="sm">다시 시도</Button>
      <Button variant="secondary" size="sm">취소</Button>
    </>
  }
>
  요청 처리 중 오류가 발생했습니다.
</Alert>
```

## Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `status` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | 알림의 상태/유형 |
| `variant` | `'subtle' \| 'solid' \| 'outline'` | `'subtle'` | 시각적 스타일 변형 |
| `children` | `React.ReactNode` | **필수** | 알림의 주요 내용 |
| `title` | `React.ReactNode` | - | 알림의 제목 (선택적) |
| `icon` | `React.ReactNode` | `상태 기본 아이콘` | 사용자 정의 아이콘 |
| `closable` | `boolean` | `false` | 닫기 버튼 표시 여부 |
| `onClose` | `() => void` | - | 닫기 버튼 클릭 시 호출될 함수 |
| `actions` | `React.ReactNode` | - | 액션 버튼(들) |
| `className` | `string` | - | 추가 CSS 클래스 |
| `role` | `string` | `'alert'` | 접근성을 위한 ARIA 역할 |

## 접근성

- 기본적으로 `role="alert"`이 적용됩니다.
- 정적인 콘텐츠의 경우 `role="status"`를 사용할 수 있습니다.
- 색상 외에도 아이콘으로 상태를 구분하여 색맹 사용자를 지원합니다.

## 모범 사례

- 간결하고 명확한 메시지를 사용합니다.
- 적절한 상태를 선택하여 정보의 중요성을 전달합니다.
- 긴 알림은 피하고 핵심 정보만 포함합니다.
- 필요한 경우에만 닫기 버튼을 추가합니다.