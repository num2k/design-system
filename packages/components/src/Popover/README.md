# Popover

Popover는 특정 요소를 기준으로 위치가 지정되는 작은 오버레이 컴포넌트입니다. 툴팁, 메뉴, 드롭다운 등 다양한 용도로 사용할 수 있습니다.

## Features

- 다양한 위치 옵션 (상단, 하단, 좌측, 우측)
- 클릭 또는 호버로 트리거
- 외부 클릭으로 닫기
- ESC 키로 닫기
- 커스텀 크기 지정
- 애니메이션 효과
- 접근성 지원

## Usage

```tsx
import { Popover } from '@your-design-system/popover';

function Example() {
  return (
    <Popover
      content={<div>Popover Content</div>}
      placement="bottom"
    >
      <button>Trigger</button>
    </Popover>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `React.ReactNode` | **required** | Popover의 내용입니다. |
| `children` | `React.ReactElement` | **required** | Popover를 트리거하는 요소입니다. |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Popover의 위치를 지정합니다. |
| `width` | `number \| string` | `'auto'` | Popover의 너비를 지정합니다. |
| `height` | `number \| string` | `'auto'` | Popover의 높이를 지정합니다. |
| `isOpen` | `boolean` | `false` | Popover의 열림/닫힘 상태를 제어합니다. |
| `onClose` | `() => void` | `undefined` | Popover가 닫힐 때 호출되는 콜백 함수입니다. |
| `closeOnClick` | `boolean` | `true` | 클릭 시 Popover를 닫을지 여부를 지정합니다. |
| `closeOnHover` | `boolean` | `false` | 호버 시 Popover를 닫을지 여부를 지정합니다. |
| `className` | `string` | `''` | 추가 CSS 클래스를 지정합니다. |

## Accessibility

- Popover는 `role="tooltip"` 속성을 가집니다.
- 키보드 네비게이션을 지원합니다 (ESC 키로 닫기).
- 스크린 리더 호환성을 위해 적절한 ARIA 속성이 적용됩니다.

## Best Practices

1. **위치 선택**
   - 화면 공간과 컨텍스트에 따라 적절한 위치를 선택하세요.
   - Popover가 화면 밖으로 나가지 않도록 주의하세요.

2. **트리거 요소**
   - 명확한 트리거 요소를 사용하세요.
   - 버튼이나 링크와 같은 상호작용 가능한 요소를 사용하세요.

3. **콘텐츠**
   - 간결하고 명확한 콘텐츠를 제공하세요.
   - 긴 텍스트나 복잡한 UI는 피하세요.

4. **상호작용**
   - 사용자가 Popover를 쉽게 닫을 수 있는 방법을 제공하세요.
   - 불필요한 중첩을 피하세요.

## Examples

### 기본 사용법
```tsx
<Popover
  content={<div>This is a basic popover</div>}
>
  <button>Click me</button>
</Popover>
```

### 위치 지정
```tsx
<Popover
  content={<div>Top positioned popover</div>}
  placement="top"
>
  <button>Top</button>
</Popover>
```

### 커스텀 크기
```tsx
<Popover
  content={<div>Custom sized popover</div>}
  width={200}
  height={100}
>
  <button>Custom Size</button>
</Popover>
```

### 호버 트리거
```tsx
<Popover
  content={<div>Hover to show</div>}
  closeOnHover={true}
>
  <button>Hover me</button>
</Popover>
```

## Related Components

- [Tooltip](../Tooltip) - 간단한 텍스트 힌트를 표시하는 컴포넌트
- [Menu](../Menu) - 드롭다운 메뉴를 구현하는 컴포넌트 