import type { Meta, StoryObj } from '@storybook/vue3';
import Skeleton from 'library-components/Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    shape: {
      control: 'select',
      options: ['rectangle', 'circle'],
    },
    animation: {
      control: 'select',
      options: ['wave', 'pulse', 'none'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Skeleton>;

const commonArgs: Partial<Story['args']> = {
  animation: 'wave',
};

export const Default: Story = {};

export const Rectangle: Story = {
  args: {
    ...commonArgs,
    width: '10rem',
    height: '4rem',
    shape: 'rectangle',
  },
};
export const Circle: Story = {
  args: {
    ...commonArgs,
    width: '4rem',
    height: '4rem',
    shape: 'circle',
  },
};
