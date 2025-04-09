import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { Toast, toast } from './Toast';
import { ThemeProvider } from '@design-system/core';

// 테스트를 위한 ThemeProvider Wrapper
const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('Toast Component', () => {
  beforeEach(() => {
    // 각 테스트 후 생성된 토스트 컨테이너를 정리
    document.body.innerHTML = '';
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    toast.removeAll();
  });

  it('renders correctly with default props', () => {
    renderWithTheme(
      <Toast>
        This is a toast message
      </Toast>
    );

    expect(screen.getByText('This is a toast message')).toBeInTheDocument();
    expect(document.querySelector('.toast-container--bottom-right')).toBeInTheDocument();
  });

  it('renders at different positions', () => {
    const { rerender } = renderWithTheme(
      <Toast position="top-left">
        Top left toast
      </Toast>
    );

    expect(document.querySelector('.toast-container--top-left')).toBeInTheDocument();

    rerender(
      <ThemeProvider>
        <Toast position="top">
          Top toast
        </Toast>
      </ThemeProvider>
    );

    expect(document.querySelector('.toast-container--top')).toBeInTheDocument();
  });

  it('closes automatically after duration', async () => {
    const onCloseMock = jest.fn();
    
    renderWithTheme(
      <Toast duration={1000} onClose={onCloseMock}>
        Auto close toast
      </Toast>
    );

    expect(screen.getByText('Auto close toast')).toBeInTheDocument();
    
    // 시간 진행
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    // 애니메이션 시간까지 고려
    act(() => {
      jest.advanceTimersByTime(300);
    });
    
    await waitFor(() => {
      expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
  });

  it('stays visible when duration is set to 0', () => {
    const onCloseMock = jest.fn();
    
    renderWithTheme(
      <Toast duration={0} onClose={onCloseMock}>
        Persistent toast
      </Toast>
    );

    expect(screen.getByText('Persistent toast')).toBeInTheDocument();
    
    // 충분한 시간 진행
    act(() => {
      jest.advanceTimersByTime(10000);
    });
    
    // onClose가 호출되지 않아야 함
    expect(onCloseMock).not.toHaveBeenCalled();
  });

  it('passes alert props to the underlying Alert component', () => {
    renderWithTheme(
      <Toast status="error" title="Error Title">
        Error toast message
      </Toast>
    );

    expect(screen.getByText('Error Title')).toBeInTheDocument();
    expect(document.querySelector('.alert--error')).toBeInTheDocument();
  });

  it('has correct accessibility attributes', () => {
    renderWithTheme(
      <Toast>
        Accessible toast
      </Toast>
    );

    const toastElement = document.querySelector('.toast');
    expect(toastElement).toHaveAttribute('role', 'status');
    expect(toastElement).toHaveAttribute('aria-live', 'polite');
  });

  describe('toast utility', () => {
    it('creates info toast programmatically', () => {
      act(() => {
        toast.info('Info message');
      });

      expect(screen.getByText('Info message')).toBeInTheDocument();
      expect(document.querySelector('.alert--info')).toBeInTheDocument();
    });

    it('creates success toast programmatically', () => {
      act(() => {
        toast.success('Success message');
      });

      expect(screen.getByText('Success message')).toBeInTheDocument();
      expect(document.querySelector('.alert--success')).toBeInTheDocument();
    });

    it('creates warning toast programmatically', () => {
      act(() => {
        toast.warning('Warning message');
      });

      expect(screen.getByText('Warning message')).toBeInTheDocument();
      expect(document.querySelector('.alert--warning')).toBeInTheDocument();
    });

    it('creates error toast programmatically', () => {
      act(() => {
        toast.error('Error message');
      });

      expect(screen.getByText('Error message')).toBeInTheDocument();
      expect(document.querySelector('.alert--error')).toBeInTheDocument();
    });

    it('removes specific toast by id', () => {
      let toastId: string;

      act(() => {
        toastId = toast.info('Removable toast');
      });

      expect(screen.getByText('Removable toast')).toBeInTheDocument();

      act(() => {
        toast.remove(toastId);
      });

      expect(screen.queryByText('Removable toast')).not.toBeInTheDocument();
    });

    it('removes all toasts', () => {
      act(() => {
        toast.info('First toast');
        toast.success('Second toast');
        toast.warning('Third toast');
      });

      expect(screen.getByText('First toast')).toBeInTheDocument();
      expect(screen.getByText('Second toast')).toBeInTheDocument();
      expect(screen.getByText('Third toast')).toBeInTheDocument();

      act(() => {
        toast.removeAll();
      });

      expect(screen.queryByText('First toast')).not.toBeInTheDocument();
      expect(screen.queryByText('Second toast')).not.toBeInTheDocument();
      expect(screen.queryByText('Third toast')).not.toBeInTheDocument();
    });
  });
});