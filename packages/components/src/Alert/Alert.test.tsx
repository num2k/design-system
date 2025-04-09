import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Alert } from './Alert';
import { ThemeProvider } from '@design-system/core';

// 테스트를 위한 ThemeProvider Wrapper
const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('Alert Component', () => {
  it('renders with default props', () => {
    renderWithTheme(<Alert>Alert message</Alert>);
    const alert = screen.getByRole('alert');
    
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass('alert--info');
    expect(alert).toHaveClass('alert--subtle');
    expect(screen.getByText('Alert message')).toBeInTheDocument();
  });

  it('renders with different status variants', () => {
    const { rerender } = renderWithTheme(<Alert status="success">Success alert</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('alert--success');
    
    rerender(<ThemeProvider><Alert status="warning">Warning alert</Alert></ThemeProvider>);
    expect(screen.getByRole('alert')).toHaveClass('alert--warning');
    
    rerender(<ThemeProvider><Alert status="error">Error alert</Alert></ThemeProvider>);
    expect(screen.getByRole('alert')).toHaveClass('alert--error');
  });

  it('renders with different visual variants', () => {
    const { rerender } = renderWithTheme(<Alert variant="solid">Solid alert</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('alert--solid');
    
    rerender(<ThemeProvider><Alert variant="outline">Outline alert</Alert></ThemeProvider>);
    expect(screen.getByRole('alert')).toHaveClass('alert--outline');
  });

  it('renders with a title', () => {
    renderWithTheme(<Alert title="Alert Title">Alert message</Alert>);
    
    expect(screen.getByText('Alert Title')).toBeInTheDocument();
    expect(screen.getByText('Alert message')).toBeInTheDocument();
  });

  it('renders with custom icon', () => {
    const customIcon = <span data-testid="custom-icon">🔔</span>;
    renderWithTheme(<Alert icon={customIcon}>Alert with custom icon</Alert>);
    
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('handles close button click', () => {
    const onCloseMock = jest.fn();
    renderWithTheme(
      <Alert closable onClose={onCloseMock}>
        Closable alert
      </Alert>
    );
    
    // 닫기 버튼이 보이는지 확인
    const closeButton = screen.getByRole('button', { name: /close alert/i });
    expect(closeButton).toBeInTheDocument();
    
    // 닫기 버튼 클릭
    fireEvent.click(closeButton);
    
    // onClose 함수가 호출되었는지 확인
    expect(onCloseMock).toHaveBeenCalledTimes(1);
    
    // Alert이 더 이상 화면에 표시되지 않는지 확인
    expect(screen.queryByText('Closable alert')).not.toBeInTheDocument();
  });

  it('renders with action buttons', () => {
    const actionButtons = (
      <>
        <button>Action 1</button>
        <button>Action 2</button>
      </>
    );
    
    renderWithTheme(
      <Alert actions={actionButtons}>
        Alert with actions
      </Alert>
    );
    
    expect(screen.getByText('Action 1')).toBeInTheDocument();
    expect(screen.getByText('Action 2')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    renderWithTheme(<Alert className="custom-alert">Custom class alert</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('custom-alert');
  });
  
  it('uses custom ARIA role when provided', () => {
    renderWithTheme(<Alert role="status">Status alert</Alert>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});