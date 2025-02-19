import { FileUpload } from '@/components';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof FileUpload> = {
  title: 'Form/FileUpload',
  component: FileUpload,
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {};