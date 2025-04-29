import type { Meta, StoryObj } from '@storybook/vue3';
import Toggle, { type ToggleSize } from 'library-components/Toggle';
import { ref } from 'vue';

const meta: Meta<typeof Toggle> = {
  title: 'Form/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl'] as ToggleSize[],
      description: 'Size of the toggle button',
    },
    thumbShape: {
      control: 'inline-radio',
      options: ['circle', 'square'],
      defaultValue: 'circle',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the toggle is disabled',
    },
    label: {
      control: 'text',
      description: 'Label text for the toggle',
    },
    description: {
      control: 'text',
      description: 'Description text below the label',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'md',
    thumbShape: 'circle',
    label: 'Toggle Label',
    description: 'This is a description for the toggle',
  },
  render: args => ({
    components: { Toggle },
    setup() {
      const modelValue = ref(false);
      return { args, modelValue };
    },
    template: `<Toggle v-model="modelValue" v-bind="args" />`,
  }),
};
