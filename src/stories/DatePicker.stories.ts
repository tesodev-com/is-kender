import type { Meta, StoryObj } from '@storybook/vue3';
import DatePicker from 'library-components/DatePicker';
import { ref } from 'vue';

const meta: Meta<typeof DatePicker> = {
  title: 'Forms&Inputs/DatePicker',
  component: DatePicker,
  argTypes: {
    firstDayOfWeek: {
      control: 'select',
      options: ['monday', 'sunday'],
    },
    selectMode: {
      control: 'select',
      options: ['single', 'range'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof DatePicker>;
export const Default: Story = {
  args: {
    firstDayOfWeek: 'monday',
    selectMode: 'range',
  },
  render: args => ({
    components: { DatePicker },
    setup() {
      const modelValue = ref({
        startDate: new Date('2023-01-01'),
        endDate: new Date('2023-01-10'),
      });
      return { args, modelValue };
    },
    template: `
    <DatePicker v-bind="args" v-model="modelValue" />
    <div>Selected Date: {{ modelValue }}</div>`,
  }),
};
