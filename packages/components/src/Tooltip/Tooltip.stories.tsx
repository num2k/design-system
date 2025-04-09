import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { ThemeProvider } from '@design-system/core';
import { Button } from '../Button/Button';
import { useState } from 'react';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
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
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: '이것은 기본 툴팁입니다.',
    children: <Button>마우스를 올려보세요</Button>,
  },
};

export const Placements: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
      <Tooltip content="위쪽 툴팁" placement="top">
        <Button>위쪽</Button>
      </Tooltip>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        <Tooltip content="왼쪽 툴팁" placement="left">
          <Button>왼쪽</Button>
        </Tooltip>
        
        <Tooltip content="오른쪽 툴팁" placement="right"></Tooltip>