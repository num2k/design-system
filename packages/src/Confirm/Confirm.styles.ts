import styled from "styled-components";

export const ConfirmContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: var(--spacing-4);
  width: 100%;
  max-width: 400px;
  background-color: var(--color-background-primary, white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);

  /* 다크모드 */
  [data-theme="dark"] & {
    background-color: var(
      --color-background-secondary,
      var(--color-neutral-800)
    );
    box-shadow: var(--shadow-lg);
    border: 1px solid var(--color-neutral-700);
  }
`;

export const ConfirmMessage = styled.div`
  margin-bottom: var(--spacing-5);
  text-align: center;
  color: var(--color-text-primary, var(--color-neutral-800));
  font-size: var(--font-size-md);
  line-height: 1.5;

  /* 다크모드 */
  [data-theme="dark"] & {
    color: var(--color-text-primary, var(--color-neutral-100));
  }
`;

export const ConfirmButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: var(--spacing-3);

  /* 버튼이 모바일에서도 충분한 너비를 가지도록 설정 */
  & > button {
    flex: 1;
    min-width: 80px;
  }

  /* 다크모드에서 버튼 테두리 강조 */
  [data-theme="dark"] & > button[variant="outline"] {
    border-color: var(--color-neutral-600);

    &:hover {
      background-color: var(--color-neutral-700);
    }
  }
`;
