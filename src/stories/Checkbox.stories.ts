import type { Meta, StoryObj } from '@storybook/vue3';
import Checkbox from 'library/Checkbox';
import { ref } from 'vue';

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: 'Forms&Inputs/Checkbox',
  argTypes: {
    value: { control: 'text' },
    modelValue: { control: 'object' },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'Checkbox',
    size: 'md',
    value: 'checkbox',
    modelValue: ['checkbox'],
  },
};
export const Disabled: Story = {
  args: {
    label: 'Checkbox',
    size: 'md',
    value: 'checkbox',
    modelValue: [],
    disabled: true,
  },
};
export const DisabledChecked: Story = {
  args: {
    label: 'Checkbox',
    size: 'md',
    value: 'checkbox',
    modelValue: ['checkbox'],
    disabled: true,
  },
};

export const MultipleCheckboxes: Story = {
  render: args => ({
    components: { Checkbox },
    setup() {
      const selectedList = ref(['checkbox1', 'checkbox3']);
      return { selectedList, args };
    },
    template: `
    <div >
      <Checkbox v-model="selectedList" value="checkbox1"  label="Checkbox 1" />
      <Checkbox v-model="selectedList" value="checkbox2"  label="Checkbox 2" />
      <Checkbox v-model="selectedList" value="checkbox3" label="Checkbox 3" disabled/>
    </div>
    `,
  }),
};
