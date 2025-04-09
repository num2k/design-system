import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';
import { Button } from '../Button/Button';
import { ThemeProvider } from '@design-system/core';

// 임시 아이콘
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
);

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
);

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '10px' }}>
      <Badge>Default</Badge>
      <Badge color="primary">Primary</Badge>
      <Badge color="success">Success</Badge>
      <Badge color="warning">Warning</Badge>
      <Badge color="error">Error</Badge>
      <Badge color="info">Info</Badge>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Badge variant="solid" color="primary">Solid</Badge>
        <Badge variant="outline" color="primary">Outline</Badge>
        <Badge variant="subtle" color="primary">Subtle</Badge>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Badge variant="solid" color="success">Solid</Badge>
        <Badge variant="outline" color="success">Outline</Badge>
        <Badge variant="subtle" color="success">Subtle</Badge>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Badge variant="solid" color="error">Solid</Badge>
        <Badge variant="outline" color="error">Outline</Badge>
        <Badge variant="subtle" color="error">Subtle</Badge>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};

export const Rounded: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '10px' }}>
      <Badge rounded>1</Badge>
      <Badge rounded color="primary">2</Badge>
      <Badge rounded color="success">3</Badge>
      <Badge rounded color="error">99+</Badge>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Badge leftIcon={<CheckIcon />}>완료</Badge>
        <Badge leftIcon={<CheckIcon />} color="success">확인됨</Badge>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Badge rightIcon={<ArrowIcon />}>세부 정보</Badge>
        <Badge rightIcon={<ArrowIcon />} color="primary">더 보기</Badge>
      </div>
    </div>
  ),
};

export const NumericBadges: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '10px' }}>
      <Badge>5</Badge>
      <Badge color="primary">10</Badge>
      <Badge color="error" max={99}>120</Badge>
      <Badge color="warning" max={999}>1000</Badge>
    </div>
  ),
};

export const FloatingBadge: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px' }}>
      <div style={{ position: 'relative' }}>
        <Button>알림</Button>
        <Badge floating color="error" rounded>5</Badge>
      </div>
      <div style={{ position: 'relative' }}>
        <Button>메시지</Button>
        <Badge floating color="primary" rounded>3</Badge>
      </div>
      <div style={{ position: 'relative' }}>
        <Button>새 기능</Button>
        <Badge floating color="success" rounded>
          <CheckIcon />
        </Badge>
      </div>
    </div>
  ),
};

export const CombinedVariants: Story = {
  render: () => {
    // 모든 색상과 변형의 조합 생성
    const colors: Array<'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'> = [
      'default', 'primary', 'success', 'warning', 'error', 'info'
    ];
    const variants: Array<'solid' | 'outline' | 'subtle'> = ['solid', 'outline', 'subtle'];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {variants.map((variant) => (
          <div key={variant}>
            <h4 style={{ margin: '0 0 8px 0' }}>{variant.charAt(0).toUpperCase() + variant.slice(1)}</h4>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {colors.map((color) => (
                <Badge key={`${variant}-${color}`} variant={variant} color={color}>
                  {color}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

export const CustomStyledBadge: Story = {
  args: {
    children: 'Custom',
    style: { 
      backgroundColor: 'purple', 
      color: 'white',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
    }
  },
};