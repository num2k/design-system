import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '../Button/Button';
import { useState } from 'react';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const ModalExample = ({ size, ...props }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Modal Title"
        size={size}
        {...props}
      >
        <p>This is the modal content. You can put anything here.</p>
        <div style={{ marginTop: '1rem' }}>
          <Button variant="primary" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: () => <ModalExample />,
};

export const Small: Story = {
  render: () => <ModalExample size="sm" />,
};

export const Large: Story = {
  render: () => <ModalExample size="lg" />,
};

export const ExtraLarge: Story = {
  render: () => <ModalExample size="xl" />,
};

export const WithoutTitle: Story = {
  render: () => <ModalExample title={undefined} />,
};

export const WithoutCloseButton: Story = {
  render: () => <ModalExample showCloseButton={false} />,
};

export const NoOverlayClose: Story = {
  render: () => <ModalExample closeOnOverlayClick={false} />,
};

export const NoEscapeClose: Story = {
  render: () => <ModalExample closeOnEscape={false} />,
}; 