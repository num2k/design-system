# Toast

Toast 컴포넌트는 사용자에게 중요한 정보를 일시적으로 표시하기 위한 컴포넌트입니다. Alert 컴포넌트를 기반으로 하며, 화면의 여러 위치에 표시될 수 있고 자동으로 사라질 수 있습니다.

## 특징

- 프로그래밍 방식 사용 가능한 API 제공
- 네 가지 상태: info, success, warning, error
- 자동으로 사라지는 타이머 옵션
- 여섯 가지 위치 옵션
- 접근성 고려
- 반응형 디자인

## 사용 예시

### 컴포넌트 방식 사용

```tsx
import { Toast } from '@design-system/components';

<Toast
  status="success"
  title="성공!"
  duration={3000}
  position="top-right"
>
  작업이 성공적으로 완료되었습니다.
</Toast>
```

### 프로그래밍 방식 사용 (권장)

```tsx
import { toast } from '@design-system/components';

// 기본 사용법
toast.info('정보 메시지');

// 제목과 함께 표시
toast.success('작업이 완료되었습니다.', { title: '성공!' });

// 위치 지정
toast.warning('주의가 필요합니다.', { position: 'top' });

// 지속 시간 설정 (0으로 설정하면 자동으로 닫히지 않음)
toast.error('오류가 발생했습니다.', { duration: 10000 });

// 특정 Toast 제거
const toastId = toast.info('곧 사라질 메시지...');
setTimeout(() => toast.remove(toastId), 2000);

// 모든 Toast 제거
toast.removeAll();
```

## Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `duration` | `number` | `5000` | Toast가 자동으로 닫힐 시간(ms). 0이면 자동으로 닫히지 않음 |
| `position` | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left' \| 'top' \| 'bottom'` | `'bottom-right'` | Toast가 나타날 위치 |
| `onClose` | `() => void` | - | Toast가 닫힌 후 호출될 콜백 |
| + Alert의 모든 props | | | Alert 컴포넌트로 전달되는 props |

## 프로그래밍 방식 API

### `toast` 객체 메서드

| 메서드 | 설명 |
|-------|------|
| `toast.info(message, options?)` | 정보 Toast를 표시하고 Toast ID를 반환 |
| `toast.success(message, options?)` | 성공 Toast를 표시하고 Toast ID를 반환 |
| `toast.warning(message, options?)` | 경고 Toast를 표시하고 Toast ID를 반환 |
| `toast.error(message, options?)` | 오류 Toast를 표시하고 Toast ID를 반환 |
| `toast.remove(id)` | 특정 ID의 Toast 제거 |
| `toast.removeAll()` | 모든 활성 Toast 제거 |

## 접근성

- Toast는 `role="status"`와 `aria-live="polite"`를 사용하여 스크린 리더 사용자에게 알립니다.
- 모든 Toast에는 닫기 버튼이 있어 사용자가 제어할 수 있습니다.
- 자동 닫힘은 사용자에게 충분한 시간을 제공합니다.

## 모범 사례

- Toast는 중요하지만 응용 프로그램 흐름을 방해하지 않는 정보에 사용합니다.
- 짧고 명확한 메시지를 사용합니다.
- 화면에 동시에 너무 많은 Toast를 표시하지 않습니다.
- 중요한 오류 메시지의 경우 더 오랜 기간 동안 표시하거나 자동으로 닫히지 않도록 설정합니다.
- 사용자 동작이 필요한 중요한 알림의 경우 Toast 대신 Modal을 고려하세요.