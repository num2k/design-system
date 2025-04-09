import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Popover } from './Popover';

describe('Popover', () => {
  const defaultProps = {
    content: <div>Popover Content</div>,
    children: <button>Trigger</button>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders trigger element', () => {
    render(<Popover {...defaultProps} />);
    expect(screen.getByText('Trigger')).toBeInTheDocument();
  });

  it('shows popover content when trigger is clicked', () => {
    render(<Popover {...defaultProps} />);
    
    const trigger = screen.getByText('Trigger');
    fireEvent.click(trigger);
    
    expect(screen.getByText('Popover Content')).toBeInTheDocument();
  });

  it('hides popover content when clicking outside', () => {
    render(<Popover {...defaultProps} />);
    
    const trigger = screen.getByText('Trigger');
    fireEvent.click(trigger);
    fireEvent.mouseDown(document.body);
    
    expect(screen.queryByText('Popover Content')).not.toBeInTheDocument();
  });

  it('hides popover content when pressing Escape key', () => {
    render(<Popover {...defaultProps} />);
    
    const trigger = screen.getByText('Trigger');
    fireEvent.click(trigger);
    fireEvent.keyDown(document, { key: 'Escape' });
    
    expect(screen.queryByText('Popover Content')).not.toBeInTheDocument();
  });

  it('applies correct placement class', () => {
    const { rerender } = render(<Popover {...defaultProps} placement="top" />);
    expect(screen.getByText('Trigger').parentElement?.nextElementSibling).toHaveClass('popover--top');

    rerender(<Popover {...defaultProps} placement="bottom" />);
    expect(screen.getByText('Trigger').parentElement?.nextElementSibling).toHaveClass('popover--bottom');

    rerender(<Popover {...defaultProps} placement="left" />);
    expect(screen.getByText('Trigger').parentElement?.nextElementSibling).toHaveClass('popover--left');

    rerender(<Popover {...defaultProps} placement="right" />);
    expect(screen.getByText('Trigger').parentElement?.nextElementSibling).toHaveClass('popover--right');
  });

  it('applies custom width and height', () => {
    render(
      <Popover
        {...defaultProps}
        width={200}
        height={100}
      />
    );
    
    const trigger = screen.getByText('Trigger');
    fireEvent.click(trigger);
    
    const popover = screen.getByText('Popover Content').parentElement;
    expect(popover).toHaveStyle({ width: '200px', height: '100px' });
  });

  it('calls onClose callback when popover is closed', () => {
    const onClose = jest.fn();
    render(<Popover {...defaultProps} onClose={onClose} />);
    
    const trigger = screen.getByText('Trigger');
    fireEvent.click(trigger);
    fireEvent.mouseDown(document.body);
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('respects closeOnClick prop', () => {
    render(<Popover {...defaultProps} closeOnClick={false} />);
    
    const trigger = screen.getByText('Trigger');
    fireEvent.click(trigger);
    fireEvent.click(trigger);
    
    expect(screen.getByText('Popover Content')).toBeInTheDocument();
  });

  it('respects closeOnHover prop', () => {
    render(<Popover {...defaultProps} closeOnHover={true} />);
    
    const trigger = screen.getByText('Trigger');
    fireEvent.mouseEnter(trigger);
    fireEvent.mouseLeave(trigger);
    
    expect(screen.queryByText('Popover Content')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Popover {...defaultProps} className="custom-class" />);
    
    const trigger = screen.getByText('Trigger');
    fireEvent.click(trigger);
    
    expect(screen.getByText('Popover Content').parentElement).toHaveClass('custom-class');
  });
}); 