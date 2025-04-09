import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { ThemeProvider } from '@design-system/core';

const meta = {
  title: 'Components/Input',
  component: Input,
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
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const Filled: Story = {
  args: {
    placeholder: 'Enter text...',
    variant: 'filled',
  },
};

export const Flushed: Story = {
  args: {
    placeholder: 'Enter text...',
    variant: 'flushed',
  },
};

export const Small: Story = {
  args: {
    placeholder: 'Small input',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    placeholder: 'Medium input',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    placeholder: 'Large input',
    size: 'lg',
  },
};

export const WithError: Story = {
  args: {
    placeholder: 'Error input',
    isError: true,
    errorMessage: 'This field is required',
  },
};

export const WithSuccess: Story = {
  args: {
    placeholder: 'Success input',
    isSuccess: true,
    helperText: 'Looks good!',
  },
};

export const WithHelperText: Story = {
  args: {
    placeholder: 'Helper text input',
    helperText: 'Enter your username',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    placeholder: 'Full width input',
    fullWidth: true,
  },
}; 