import type { Meta, StoryObj } from '@storybook/vue3';
import Tab from 'library/Tab';

const meta: Meta<typeof Tab> = {
  component: Tab,
  title: 'Data-Display/Tab',
  args: {
    name: 'Tab',
  },
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Tab>;

export const Default: Story = {};
