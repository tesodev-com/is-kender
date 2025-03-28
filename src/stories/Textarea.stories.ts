import Textarea from '@/components/Textarea/Textarea.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    resize: {
      control: 'select',
      options: ['none', 'both', 'horizontal', 'vertical'],
    },
    error: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    rows: {
      control: 'number',
    },
    cols: {
      control: 'number',
    },
    maxLength: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Primary: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter your description...',
    rows: 4,
    cols: 50,
    id: '10',
  },
  render: args => ({
    components: { Textarea },
    setup() {
      const value = ref('');
      return { args, value };
    },
    template: `
      <Textarea v-bind="args" v-model="value" />
    `,
  }),
};

export const ErrorState: Story = {
  args: {
    ...Primary.args,
    error: true,
    errorMessage: 'This field is required',
    required: true,
  },
  render: args => ({
    components: { Textarea },
    setup() {
      const value = ref('');
      return { args, value };
    },
    template: `
      <Textarea v-bind="args" v-model="value" />
    `,
  }),
};

export const WithCharacterCount: Story = {
  args: {
    ...Primary.args,
    maxLength: 200,
  },
  render: args => ({
    components: { Textarea },
    setup() {
      const value = ref('');
      return { args, value };
    },
    template: `
      <Textarea v-bind="args" v-model="value" />
    `,
  }),
};

export const DisabledState: Story = {
  args: {
    ...Primary.args,
    disabled: true,
  },
  render: args => ({
    components: { Textarea },
    setup() {
      const value = ref('');
      return { args, value };
    },
    template: `
      <Textarea v-bind="args" v-model="value" />
    `,
  }),
};
