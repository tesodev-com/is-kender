import type { Meta, StoryObj } from '@storybook/vue3';
import FileUpload from 'library-components/FileUpload';

const meta: Meta<typeof FileUpload> = {
  title: 'Form/FileUpload',
  component: FileUpload,
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    multiple: {
      control: 'boolean',
    },
    accept: {
      control: 'text',
    },
    maxSize: {
      control: 'number',
    },
    maxFiles: {
      control: 'number',
    },
    preview: {
      control: 'boolean',
    },
    template: {
      control: 'select',
      options: ['col', 'row'],
    },
    showActions: {
      control: 'boolean',
    },
    description: {
      control: 'text',
    },
    uploader: {
      control: 'object',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  args: {
    multiple: true,
  },
};
