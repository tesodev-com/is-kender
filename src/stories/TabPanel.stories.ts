import type { Meta, StoryObj } from '@storybook/vue3';
import TabPanel from 'library-components/TabPanel';

const meta: Meta<typeof TabPanel> = {
  component: TabPanel,
  title: 'Data-Display/TabPanel',
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof TabPanel>;

export const Default: Story = {};
