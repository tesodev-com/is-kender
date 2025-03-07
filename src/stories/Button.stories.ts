import type { Meta, StoryObj } from '@storybook/vue3';
import Button from 'library/Button';

const meta: Meta<typeof Button> = {
  title: 'Form/Button',
  component: Button,
  argTypes: {
    el: {
      control: 'text',
      options: ['button', 'a'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'dark'],
    },
    fluid: {
      control: 'boolean',
    },
    rounded: {
      control: 'select',
      options: ['half', 'full', 'none'],
    },
    loading: {
      control: 'boolean',
    },
    iconOnly: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    text: 'Button CTA',
    size: 'md',
    variant: 'solid',
    color: 'primary',
    el: 'button',
  },
};
