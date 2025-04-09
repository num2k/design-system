# Badge

Badge 컴포넌트는 상태, 카테고리, 카운트 등을 작은 시각적 요소로 표시합니다.

## 특징

- 세 가지 변형: solid, outline, subtle
- 여섯 가지 색상: default, primary, success, warning, error, info
- 세 가지 크기: sm, md, lg
- 아이콘 지원
- 둥근 모양 옵션
- 플로팅 위치 지원
- 최댓값 설정 가능 (숫자형 배지)

## 사용 예시

```tsx
import { Badge } from '@design-system/components';

// 기본 배지
<Badge>Default</Badge>

// 색상 배지
<Badge color="primary">Primary</Badge>
<Badge color="success">Success</Badge>
<Badge color="warning">Warning</Badge>
<Badge color="error">Error</Badge>
<Badge color="info">Info</Badge>

// 변형
<Badge variant="solid">Solid</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="subtle">Subtle</Badge>

// 크기
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>

// 원형 배지
<Badge rounded>8</Badge>

// 아이콘이 있는 배지
<Badge leftIcon={<CheckIcon />}>Completed</Badge>
<Badge rightIcon={<ArrowIcon />}>Details</Badge>

// 플로팅 배지 (상대 위치)
<div style={{ position: 'relative' }}>
  <Button>Notifications</Button>
  <Badge floating color="error" rounded>5</Badge>
</div>

// 최댓값이 있는 숫자형 배지
<Badge max={99}>120</Badge> // "99+" 표시
```

## Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `children` | `React.ReactNode` | - | 배지에 표시할 내용 |
| `variant` | `'solid' \| 'outline' \| 'subtle'` | `'solid'` | 배지 변형 |
| `color` | `'default' \| 'primary' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'default'` | 배지 색상 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 배지 크기 |
| `rounded` | `boolean` | `false` | 원형 배지 여부 |
| `floating` | `boolean` | `false` | 오른쪽 상단에 위치 (절대 위치) |
| `leftIcon` | `React.ReactNode` | - | 배지 앞에 표시할 아이콘 |
| `rightIcon` | `React.ReactNode` | - | 배지 뒤에 표시할 아이콘 |
| `max` | `number` | - | 최댓값 (숫자 배지에 사용) |
| `className` | `string` | - | 추가 CSS 클래스 |
| `style` | `React.CSSProperties` | - | 인라인 스타일 |
| `isVisible` | `boolean` | `true` | 토글 상태 (표시 여부) |

## 모범 사례

- 배지는 상태나 정보를 간결하게 표시하는 데 사용합니다.
- 너무 많은 배지를 사용하면 UI가 복잡해질 수 있으므로 필요한 경우에만 사용합니다.
- 배지의 내용은 간결하게 유지하고, 긴 텍스트에는 사용하지 않습니다.
- 알림이나 카운터로 사용할 때는 rounded 속성을 사용하는 것이 좋습니다.
- 배지의 색상은 의미를 전달할 수 있도록 일관되게 사용합니다.
  - success: 성공, 완료
  - warning: 주의, 경고
  - error: 오류, 중요한 알림
  - info: 정보
  - primary: 강조
  - default: 기본, 중립