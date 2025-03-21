import { type Meta, type StoryObj } from '@storybook/vue3';
import Input from 'library-components/Input';

const meta: Meta<typeof Input> = {
  title: 'Forms&Inputs/Input',
  component: Input,
  args: {
    placeholder: 'Placeholder',
    type: 'text',
    modelValue: '',
    required: true,
  },
  argTypes: {
    placeholder: { control: 'text' },
    type: { control: 'select', options: ['text', 'password', 'email', 'number', 'url', 'tel', 'search'] },
    modelValue: { control: 'text' },
    size: { control: 'select', options: ['sm', 'lg'] },
    errorList: { control: 'object' },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    size: 'sm',
    hint: 'Example hint',
    label: 'Label',
  },
};

export const ErrorInput: Story = {
  args: {
    size: 'lg',
    required: true,
    hint: 'Example hint',
    errorList: ['Example error', 'Another example error', 'Test long error message to see how it wraps'],
    label: 'Label',
  },
};
export const TooltipInput: Story = {
  args: {
    size: 'lg',
    required: true,
    hint: 'Example hint',
    label: 'Label',
    tooltip: { title: 'Title', content: 'Lorem ipsum dolar sit amet', position: 'bottom' },
  },
};
