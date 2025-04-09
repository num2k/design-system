import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Tooltip } from './Tooltip';
import { ThemeProvider } from '@design-system/core';

// 테스트용 모의 Theme Provider
const MockThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('Tooltip', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the trigger element correctly', () => {
    render(
      <MockThemeProvider>
        <Tooltip content="Tooltip content">
          <button>Hover me</button>
        </Tooltip>
      </MockThemeProvider>
    );
    
    expect(screen.getByText('Hover me')).toBeInTheDocument();
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
  });

  it('shows tooltip on hover after delay', () => {
    render(
      <MockThemeProvider>
        <Tooltip content="Tooltip content" delay={300}>
          <button>Hover me</button>
        </Tooltip>
      </MockThemeProvider>
    );
    
    fireEvent.mouseEnter(screen.getByText('Hover me').parentElement!);
    
    // 지연 시간 전에는 보이지 않아야 함
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
    
    // 지연 시간 후에는 보여야 함
    act(() => {
      jest.advanceTimersByTime(300);
    });
    
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();
  });

  it('hides tooltip on mouse leave', () => {
    render(
      <MockThemeProvider>
        <Tooltip content="Tooltip content" delay={0}>
          <button>Hover me</button>
        </Tooltip>
      </MockThemeProvider>
    );
    
    const container = screen.getByText('Hover me').parentElement!;
    
    // 툴팁 표시
    fireEvent.mouseEnter(container);
    act(() => {
      jest.advanceTimersByTime(0);
    });
    
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();
    
    // 툴팁 숨기기
    fireEvent.mouseLeave(container);
    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument();
  });

  it('applies correct placement class', () => {
    const { rerender } = render(
      <MockThemeProvider>
        <Tooltip content="Tooltip content" placement="top" isOpen={true}>
          <button>Hover me</button>
        </Tooltip>
      </MockThemeProvider>
    );
    
    expect(screen.getByRole('tooltip')).toHaveClass('tooltip--top');
    
    rerender(
      <MockThemeProvider>
        <Tooltip content="Tooltip content" placement="bottom" isOpen={true}>
          <button>Hover me</button>
        </Tooltip>
      </MockThemeProvider>
    );
    
    expect(screen.getByRole('tooltip')).toHaveClass('tooltip--bottom');
  });

  it('calls onOpen and onClose callbacks', () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();
    
    render(
      <MockThemeProvider>
        <Tooltip 
          content="Tooltip content" 
          delay={0}
          onOpen={onOpen}
          onClose={onClose}
        >
          <button>Hover me</button>
        </Tooltip>
      </MockThemeProvider>
    );
    
    const container = screen.getByText('Hover me').parentElement!;
    
    // 마우스 오버
    fireEvent.mouseEnter(container);
    act(() => {
      jest.advanceTimersByTime(0);
    });
    expect(onOpen).toHaveBeenCalledTimes(1);
    
    // 마우스 아웃
    fireEvent.mouseLeave(container);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('respects controlled mode', () => {
    render(
      <MockThemeProvider>
        <Tooltip content="Tooltip content" isOpen={true}>
          <button>Hover me</button>
        </Tooltip>
      </MockThemeProvider>
    );
    
    // isOpen이 true이므로 마우스 호버 없이도 툴팁이 보여야 함
    expect(screen.getByText('Tooltip content')).toBeInTheDocument();
  });

  it('applies custom className and styles', () => {
    render(
      <MockThemeProvider>
        <Tooltip 
          content="Tooltip content" 
          isOpen={true}
          className="custom-tooltip"
          maxWidth="300px"
        >
          <button>Hover me</button>
        </Tooltip>
      </MockThemeProvider>
    );
    
    const tooltip = screen.getByText('Tooltip content');
    expect(tooltip).toHaveClass('custom-tooltip');
    expect(tooltip).toHaveStyle('max-width: 300px');
  });
});