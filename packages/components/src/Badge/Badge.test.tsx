import React from 'react';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';
import { ThemeProvider } from '@design-system/core';

// 테스트를 위한 ThemeProvider Wrapper
const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('Badge Component', () => {
  it('renders with default props', () => {
    renderWithTheme(<Badge>Badge</Badge>);
    
    const badge = screen.getByText('Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('badge');
    expect(badge).toHaveClass('badge--solid');
    expect(badge).toHaveClass('badge--default');
    expect(badge).toHaveClass('badge--md');
  });

  it('renders with different variants', () => {
    const { rerender } = renderWithTheme(<Badge variant="outline">Outline</Badge>);
    expect(screen.getByText('Outline')).toHaveClass('badge--outline');

    rerender(<ThemeProvider><Badge variant="subtle">Subtle</Badge></ThemeProvider>);
    expect(screen.getByText('Subtle')).toHaveClass('badge--subtle');
  });

  it('renders with different colors', () => {
    const { rerender } = renderWithTheme(<Badge color="primary">Primary</Badge>);
    expect(screen.getByText('Primary')).toHaveClass('badge--primary');

    rerender(<ThemeProvider><Badge color="success">Success</Badge></ThemeProvider>);
    expect(screen.getByText('Success')).toHaveClass('badge--success');

    rerender(<ThemeProvider><Badge color="warning">Warning</Badge></ThemeProvider>);
    expect(screen.getByText('Warning')).toHaveClass('badge--warning');

    rerender(<ThemeProvider><Badge color="error">Error</Badge></ThemeProvider>);
    expect(screen.getByText('Error')).toHaveClass('badge--error');
  });

  it('renders with different sizes', () => {
    const { rerender } = renderWithTheme(<Badge size="sm">Small</Badge>);
    expect(screen.getByText('Small')).toHaveClass('badge--sm');

    rerender(<ThemeProvider><Badge size="lg">Large</Badge></ThemeProvider>);
    expect(screen.getByText('Large')).toHaveClass('badge--lg');
  });

  it('renders rounded badge', () => {
    renderWithTheme(<Badge rounded>Rounded</Badge>);
    expect(screen.getByText('Rounded')).toHaveClass('badge--rounded');
  });

  it('renders floating badge', () => {
    renderWithTheme(<Badge floating>Floating</Badge>);
    expect(screen.getByText('Floating')).toHaveClass('badge--floating');
  });

  it('renders with left icon', () => {
    renderWithTheme(
      <Badge leftIcon={<span data-testid="left-icon">✓</span>}>
        With Left Icon
      </Badge>
    );
    
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByText('With Left Icon')).toHaveClass('badge--with-left-icon');
  });

  it('renders with right icon', () => {
    renderWithTheme(
      <Badge rightIcon={<span data-testid="right-icon">→</span>}>
        With Right Icon
      </Badge>
    );
    
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    expect(screen.getByText('With Right Icon')).toHaveClass('badge--with-right-icon');
  });

  it('applies max limit to numeric children', () => {
    renderWithTheme(<Badge max={99}>100</Badge>);
    expect(screen.getByText('99+')).toBeInTheDocument();
    
    renderWithTheme(<Badge max={99}>50</Badge>);
    expect(screen.getByText('50')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    renderWithTheme(<Badge className="custom-class">Custom Class</Badge>);
    expect(screen.getByText('Custom Class')).toHaveClass('custom-class');
  });

  it('applies custom style', () => {
    renderWithTheme(<Badge style={{ marginTop: '10px' }}>Custom Style</Badge>);
    expect(screen.getByText('Custom Style')).toHaveStyle('margin-top: 10px');
  });

  it('does not render when isVisible is false', () => {
    renderWithTheme(<Badge isVisible={false}>Hidden Badge</Badge>);
    expect(screen.queryByText('Hidden Badge')).not.toBeInTheDocument();
  });
});