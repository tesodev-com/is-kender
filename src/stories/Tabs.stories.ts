import type { Meta, StoryObj } from '@storybook/vue3';
import Tabs from 'library/Tabs';

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  title: 'Utility-Component/Tabs',
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {};
