# Modal

Modal은 사용자의 주의를 집중시키고 중요한 정보나 작업을 표시하기 위한 오버레이 컴포넌트입니다.

## Features

- 다양한 크기 옵션 (sm, md, lg, xl)
- 오버레이 클릭으로 닫기 옵션
- 닫기 버튼 표시/숨김 옵션
- 제목 표시/숨김 옵션
- 모달이 열릴 때 body 스크롤 자동 제어
- 접근성 지원 (ARIA 속성, 키보드 네비게이션)

## Usage

```tsx
import { Modal } from '@your-design-system/modal';

function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Example Modal"
      >
        <p>Modal content goes here</p>
      </Modal>
    </>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | `false` | 모달의 열림/닫힘 상태를 제어합니다. |
| `onClose` | `() => void` | **required** | 모달을 닫을 때 호출되는 콜백 함수입니다. |
| `title` | `string` | `undefined` | 모달의 제목입니다. 제공하지 않으면 제목 영역이 표시되지 않습니다. |
| `children` | `ReactNode` | **required** | 모달의 내용입니다. |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 모달의 크기를 지정합니다. |
| `closeOnOverlayClick` | `boolean` | `true` | 오버레이 클릭 시 모달을 닫을지 여부를 지정합니다. |
| `showCloseButton` | `boolean` | `true` | 닫기 버튼을 표시할지 여부를 지정합니다. |

## Accessibility

- 모달이 열릴 때 포커스가 모달 내부로 이동합니다.
- ESC 키를 누르면 모달이 닫힙니다.
- 모달이 열릴 때 배경 컨텐츠는 스크린 리더에 의해 숨겨집니다.
- 적절한 ARIA 속성이 자동으로 적용됩니다.

## Best Practices

1. **제목 사용**
   - 모든 모달에는 명확한 제목을 제공하세요.
   - 제목은 모달의 목적을 명확하게 설명해야 합니다.

2. **크기 선택**
   - 내용의 양에 따라 적절한 크기를 선택하세요.
   - 작은 양의 내용에는 `sm` 또는 `md`를 사용하세요.
   - 많은 양의 내용이나 복잡한 인터랙션에는 `lg` 또는 `xl`을 사용하세요.

3. **닫기 옵션**
   - 사용자가 모달을 닫을 수 있는 명확한 방법을 제공하세요.
   - 닫기 버튼과 오버레이 클릭 중 하나 이상을 활성화하세요.

4. **포커스 관리**
   - 모달이 열릴 때 포커스가 모달 내부로 이동하도록 하세요.
   - 모달이 닫힐 때 포커스가 이전 위치로 돌아가도록 하세요.

## Examples

### 기본 사용법
```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Basic Modal"
>
  <p>This is a basic modal example.</p>
</Modal>
```

### 크기 변형
```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Large Modal"
  size="lg"
>
  <p>This is a large modal example.</p>
</Modal>
```

### 닫기 옵션 커스터마이징
```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Custom Close Options"
  closeOnOverlayClick={false}
  showCloseButton={false}
>
  <p>This modal can only be closed programmatically.</p>
</Modal>
```

## Related Components

- [Button](../Button) - 모달 내부의 액션 버튼에 사용
- [Form](../Form) - 모달 내부의 폼 구현에 사용 