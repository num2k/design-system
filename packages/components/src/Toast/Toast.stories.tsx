import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toast, toast } from './Toast';
import { Button } from '../Button/Button';
import { ThemeProvider } from '@design-system/core';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ width: '600px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 컴포넌트 방식 사용 예제
export const Default: Story = {
  args: {
    children: '이것은 기본 토스트 메시지입니다.',
    title: '알림',
  },
};

export const Success: Story = {
  args: {
    status: 'success',
    title: '성공!',
    children: '작업이 성공적으로 완료되었습니다.',
  },
};

export const Warning: Story = {
  args: {
    status: 'warning',
    title: '주의',
    children: '이 작업은 되돌릴 수 없습니다.',
    position: 'top-right',
  },
};

export const Error: Story = {
  args: {
    status: 'error',
    title: '오류 발생',
    children: '요청 처리 중 오류가 발생했습니다.',
    position: 'top',
  },
};

// 프로그래밍 방식 사용 예제
const ToastExamples = () => {
  const showInfoToast = () => {
    toast.info('기본 정보 메시지입니다.');
  };
  
  const showSuccessToast = () => {
    toast.success('작업이 완료되었습니다.', { 
      title: '성공!',
      position: 'top-right'
    });
  };
  
  const showWarningToast = () => {
    toast.warning('이 작업은 되돌릴 수 없습니다.', {
      title: '주의',
      position: 'bottom-left'
    });
  };
  
  const showErrorToast = () => {
    toast.error('요청 처리 중 오류가 발생했습니다.', {
      title: '오류 발생',
      position: 'top',
      duration: 0 // 자동으로 닫히지 않음
    });
  };
  
  const showPersistentToast = () => {
    const id = toast.info('이 토스트는 10초 동안 보여집니다.', {
      title: '지속 토스트',
      duration: 10000,
      position: 'bottom'
    });
    return id;
  };
  
  const removeAllToasts = () => {
    toast.removeAll();
  };
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <h3>프로그래밍 방식으로 Toast 사용하기</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        <Button onClick={showInfoToast}>정보 토스트</Button>
        <Button onClick={showSuccessToast}>성공 토스트</Button>
        <Button onClick={showWarningToast}>경고 토스트</Button>
        <Button onClick={showErrorToast}>오류 토스트 (영구적)</Button>
        <Button onClick={showPersistentToast}>10초 지속 토스트</Button>
        <Button onClick={removeAllToasts} variant="secondary">모든 토스트 제거</Button>
      </div>
      <p>
        다양한 위치에 토스트가 나타납니다. 자동으로 사라지는 토스트도 있고 수동으로 닫아야 하는 토스트도 있습니다.
      </p>
    </div>
  );
};

export const ProgrammaticAPI: Story = {
  render: () => <ToastExamples />
};

export const DifferentPositions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <h3>다양한 위치에 Toast 표시하기</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        <Button onClick={() => toast.info('상단-오른쪽 토스트', { position: 'top-right' })}>
          상단-오른쪽
        </Button>
        <Button onClick={() => toast.info('상단-왼쪽 토스트', { position: 'top-left' })}>
          상단-왼쪽
        </Button>
        <Button onClick={() => toast.info('하단-오른쪽 토스트', { position: 'bottom-right' })}>
          하단-오른쪽
        </Button>
        <Button onClick={() => toast.info('하단-왼쪽 토스트', { position: 'bottom-left' })}>
          하단-왼쪽
        </Button>
        <Button onClick={() => toast.info('상단-중앙 토스트', { position: 'top' })}>
          상단-중앙
        </Button>
        <Button onClick={() => toast.info('하단-중앙 토스트', { position: 'bottom' })}>
          하단-중앙
        </Button>
      </div>
    </div>
  )
};

export const WithActions: Story = {
  render: () => {
    const showToastWithActions = () => {
      toast.error('결제 처리 중 오류가 발생했습니다.', {
        title: '결제 실패',
        position: 'top',
        duration: 0,
        actions: (
          <>
            <Button variant="primary" size="sm" onClick={() => console.log('다시 시도')}>
              다시 시도
            </Button>
            <Button variant="secondary" size="sm" onClick={() => toast.removeAll()}>
              취소
            </Button>
          </>
        )
      });
    };
    
    return (
      <div>
        <h3>액션이 있는 Toast</h3>
        <Button onClick={showToastWithActions}>액션이 있는 토스트 표시</Button>
      </div>
    );
  }
};