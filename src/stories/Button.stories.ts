import type { Meta, StoryObj } from '@storybook/vue3';
import Button from '../components/Button/Button.vue';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Components/Button',
  argTypes: {
    default: {
      control: {
        type: 'text',
      },
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: 'select',
    },
    variant: {
      options: ['primary', 'secondary', 'ghost'],
      control: 'select',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

const commonArgs: Partial<Story['args']> = {
  text: 'Button',
  size: 'small',
  shadow: false,
  rounded: false,
  isLoading: false,
  isDisabled: false,
};

export const Primary: Story = {
  args: {
    variant: 'primary',
  }
};

export const Secondary: Story = {
  args: {
    ...commonArgs,
    default: 'Button',
    variant: 'secondary',
  }
};

export const Ghost: Story = {
  args: {
    ...commonArgs,
    default: 'Button',
    variant: 'ghost',
  }
};