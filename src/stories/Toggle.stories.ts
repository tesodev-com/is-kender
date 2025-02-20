import { Toggle } from '@/components';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof Toggle> = {
  component: Toggle,
  title: 'Form/Toggle',
  argTypes: {
    modelValue: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {};
