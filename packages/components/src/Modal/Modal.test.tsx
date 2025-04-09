import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';

describe('Modal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    title: 'Test Modal',
    children: <div>Modal Content</div>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders modal with title and content when isOpen is true', () => {
    render(<Modal {...defaultProps} />);
    
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(<Modal {...defaultProps} isOpen={false} />);
    
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(<Modal {...defaultProps} />);
    
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when overlay is clicked', () => {
    render(<Modal {...defaultProps} closeOnOverlayClick={true} />);
    
    const overlay = screen.getByTestId('modal-overlay');
    fireEvent.click(overlay);
    
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('does not call onClose when overlay is clicked and closeOnOverlayClick is false', () => {
    render(<Modal {...defaultProps} closeOnOverlayClick={false} />);
    
    const overlay = screen.getByTestId('modal-overlay');
    fireEvent.click(overlay);
    
    expect(defaultProps.onClose).not.toHaveBeenCalled();
  });

  it('applies correct size class based on size prop', () => {
    const { rerender } = render(<Modal {...defaultProps} size="sm" />);
    expect(screen.getByTestId('modal-content')).toHaveClass('modal--sm');

    rerender(<Modal {...defaultProps} size="lg" />);
    expect(screen.getByTestId('modal-content')).toHaveClass('modal--lg');

    rerender(<Modal {...defaultProps} size="xl" />);
    expect(screen.getByTestId('modal-content')).toHaveClass('modal--xl');
  });

  it('hides close button when showCloseButton is false', () => {
    render(<Modal {...defaultProps} showCloseButton={false} />);
    
    expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
  });

  it('hides title when title prop is not provided', () => {
    render(<Modal {...defaultProps} title={undefined} />);
    
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
  });

  it('prevents body scroll when modal is open', () => {
    render(<Modal {...defaultProps} />);
    
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body scroll when modal is closed', () => {
    const { unmount } = render(<Modal {...defaultProps} />);
    unmount();
    
    expect(document.body.style.overflow).toBe('');
  });
}); 