# Tooltip

Tooltip은 사용자가 특정 요소에 마우스를 올렸을 때 추가 정보를 제공하는 작은 팝업 요소입니다.

## Features

- 다양한 위치 옵션 (상단, 하단, 좌측, 우측)
- 표시 지연 시간 조절
- 접근성 고려 설계
- 최대 너비 조절 가능
- 제어/비제어 모드 지원

## Usage

```tsx
import { Tooltip } from '@design-system/components';

function Example() {
  return (
    <Tooltip content="This is a tooltip">
      <button>Hover me</button>
    </Tooltip>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `React.ReactNode` | **required** | Tooltip에 표시될 내용입니다. |
| `children` | `React.ReactElement` | **required** | Tooltip을 트리거하는 요소입니다. |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Tooltip의 위치를 지정합니다. |
| `delay` | `number` | `300` | Tooltip이 표시되기까지의 지연 시간(ms)입니다. |
| `maxWidth` | `number \| string` | `'200px'` | Tooltip의 최대 너비를 지정합니다. |
| `className` | `string` | `''` | 추가 CSS 클래스를 지정합니다. |
| `isOpen` | `boolean` | `undefined` | Tooltip의 열림/닫힘 상태를 제어합니다. 제공되지 않으면 내부 상태를 사용합니다. |
| `onClose` | `() => void` | `undefined` | Tooltip이 닫힐 때 호출되는 콜백 함수입니다. |
| `onOpen` | `() => void` | `undefined` | Tooltip이 열릴 때 호출되는 콜백 함수입니다. |

## Accessibility

- `role="tooltip"` 속성이 적용됩니다.
- `aria-live="polite"` 속성을 통해 스크린 리더 사용자에게 툴팁 내용이 전달됩니다.

## Best Practices

1. **간결한 내용**
   - Tooltip에는 짧고 명확한 텍스트를 사용하세요.
   - 복잡한 정보나 상호작용이 필요한 내용에는 Popover나 Modal을 사용하세요.

2. **적절한 지연 시간**
   - 툴팁이 너무 빨리 나타나면 사용자 경험을 방해할 수 있습니다.
   - 기본값(300ms)은 대부분의 사용 사례에 적합합니다.

3. **위치 선택**
   - 컨텐츠가 잘리지 않도록 적절한 위치를 선택하세요.
   - 모바일 환경에서는 'top' 또는 'bottom' 위치가 더 적합할 수 있습니다.

4. **접근성**
   - 툴팁은 추가 정보를 제공하는 용도로만 사용하세요.
   - 중요한 정보는 항상 화면에 직접 표시해야 합니다.

## Examples

### 기본 사용법
```tsx
<Tooltip content="Basic tooltip">
  <button>Hover me</button>
</Tooltip>
```

### 위치 변경
```tsx
<Tooltip content="Bottom tooltip" placement="bottom">
  <button>Bottom tooltip</button>
</Tooltip>
```

### 지연 시간 조절
```tsx
<Tooltip content="Quick tooltip" delay={100}>
  <button>Fast tooltip</button>
</Tooltip>
```

### 제어 모드
```tsx
const [isOpen, setIsOpen] = useState(false);

<Tooltip 
  content="Controlled tooltip" 
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
>
  <button onClick={() => setIsOpen(!isOpen)}>
    Click to toggle tooltip
  </button>
</Tooltip>
```

## Related Components

- [Popover](../Popover) - 더 복잡한 내용이나 상호작용이 필요한 경우
- [Modal](../Modal) - 중요한 정보나 작업을 표시할 때