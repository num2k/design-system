import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';
import { ThemeProvider } from '@design-system/core';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
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
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default checkbox',
  },
};

export const Small: Story = {
  args: {
    label: 'Small checkbox',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    label: 'Medium checkbox',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    label: 'Large checkbox',
    size: 'lg',
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked checkbox',
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Indeterminate checkbox',
    isIndeterminate: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Error checkbox',
    isError: true,
    errorMessage: 'This field is required',
  },
};

export const WithSuccess: Story = {
  args: {
    label: 'Success checkbox',
    isSuccess: true,
    helperText: 'Great choice!',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Helper text checkbox',
    helperText: 'Additional information about the checkbox',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    disabled: true,
  },
}; 