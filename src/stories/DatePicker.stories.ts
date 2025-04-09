import type { Meta, StoryObj } from '@storybook/vue3';
import DatePicker from 'library-components/DatePicker';
import { ref } from 'vue';

const meta: Meta<typeof DatePicker> = {
  title: 'Forms&Inputs/DatePicker',
  component: DatePicker,
};

export default meta;

type Story = StoryObj<typeof DatePicker>;
export const Default: Story = {
  args: {
    selectionMode: 'range',
  },
  render: args => ({
    components: { DatePicker },
    setup() {
      const modelValue = ref();
      return { args, modelValue };
    },
    template: `
    <DatePicker v-bind="args" v-model="modelValue" />
    <br />
    <div>Selected Date: {{ modelValue }}</div>`,
  }),
};
