import type { Meta, StoryObj } from '@storybook/vue3';
import FileUpload from 'library-components/FileUpload';

const meta: Meta<typeof FileUpload> = {
  title: 'Form/FileUpload',
  component: FileUpload,
  argTypes: {
    disabled: {
      description: 'If true, the input will be disabled',
    },
    multiple: {
      description: 'If true, the input will accept multiple files',
    },
    accept: {
      description: 'The file types that the input should accept',
    },
    maxSize: {
      description: 'The maximum file size in bytes',
    },
    maxFiles: {
      description: 'The maximum number of files that can be uploaded',
    },
    preview: {
      description: 'If true, the input will show a preview of the uploaded files',
    },
    template: {
      description: 'The template to use for the input. Can be "col" or "row"',
      options: ['col', 'row'],
    },
    showActions: {
      description: 'If true, the input will show the actions buttons',
    },
    description: {
      description: 'The description of the input',
    },
    uploader: {
      description: 'The function that will be called when the user uploads a file and gets the File[] as a parameter',
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
