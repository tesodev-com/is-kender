import type { Meta, StoryObj } from '@storybook/vue3';
import DatePicker from 'library-components/DatePicker';
import { ref } from 'vue';

const meta: Meta<typeof DatePicker> = {
  title: 'Forms&Inputs/DatePicker',
  component: DatePicker,
  argTypes: {
    selectionItems: {
      control: 'multi-select',
      options: ['today', 'yesterday', 'thisWeek', 'lastWeek', 'thisMonth', 'lastMonth', 'thisYear', 'lastYear'],
    },
    selectionMode: {
      control: 'select',
      options: ['single', 'multiple', 'range'],
    },
    multipleMonth: {
      control: 'boolean',
    },
    actionBar: {
      control: 'boolean',
    },
    inline: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof DatePicker>;
export const Default: Story = {
  args: {},
  render: args => ({
    components: { DatePicker },
    setup() {
      const modelValue = ref();
      return { args, modelValue };
    },
    template: '<DatePicker v-bind="args" v-model="modelValue" />',
  }),
};
