import type { Meta, StoryObj } from '@storybook/vue3';
import Spinner from 'library-components/Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Feedback/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};

export const Fluid: Story = {
  args: {
    fluid: true,
  },
};
export const ColoredSpinner: Story = {
  args: {
    color: 'red',
  },
};
