import FileUpload from '@/components/FileUpload';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof FileUpload> = {
  title: 'Form/FileUpload',
  component: FileUpload,
  argTypes: {
    maxSize: {
      description: 'The maximum file size in bytes',
    },
    accept: {
      description: 'The file types that the input should accept',
    },
    uploader: {
      description: 'The function that will be called when the user uploads a file and gets the File[] as a parameter',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {};
