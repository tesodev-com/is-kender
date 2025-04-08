import type { Meta, StoryObj } from '@storybook/vue3';
import DatePicker from 'library-components/DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Forms&Inputs/DatePicker',
  component: DatePicker,
};

export default meta;

type Story = StoryObj<typeof DatePicker>;
export const Default: Story = {
  args: {},
};
