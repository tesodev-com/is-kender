import type { Meta, StoryObj } from '@storybook/vue3';
import Toggle from 'library-components/Toggle';

const meta: Meta<typeof Toggle> = {
  component: Toggle,
  title: 'Form/Toggle',
};

export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default: Story = {};
