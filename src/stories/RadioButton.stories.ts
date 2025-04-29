import type { Meta, StoryObj } from '@storybook/vue3';
import RadioButton from 'library-components/RadioButton';
import { ref } from 'vue';

const meta: Meta<typeof RadioButton> = {
  title: 'Form/RadioButton',
  component: RadioButton,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    modelValue: { control: 'text' },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;

type Story = StoryObj<typeof RadioButton>;

export const Default: Story = {
  args: {
    label: 'Radio Button',
    size: 'md',
  },
};
export const CheckedRadioButton: Story = {
  args: {
    label: 'Checked Radio Button',
    value: '1',
    modelValue: '1',
  },
};
export const DisabledRadioButton: Story = {
  args: {
    label: 'Disabled Radio Button',
    disabled: true,
  },
};
export const DisabledCheckedRadioButton: Story = {
  args: {
    label: 'Disabled Checked Radio Button',
    disabled: true,
    value: '1',
    modelValue: '1',
  },
};
export const RadioButtonGroup: Story = {
  render: args => ({
    components: { RadioButton },
    setup() {
      const selected = ref('1');
      return { args, selected };
    },
    template: `
    <RadioButton v-model="selected" value="1" label="Radio Button 1" name='selectTest'/>
    <RadioButton v-model="selected" value="2" label="Radio Button 2" name='selectTest' />
    <RadioButton v-model="selected" value="3" label="Radio Button 3" name='selectTest'/>
    <RadioButton v-model="selected" value="4" label="Radio Button 4" name='selectTest' disabled/>
    <p>Selected: {{ selected }}</p>
  `,
  }),
};
