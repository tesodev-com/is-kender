import { Input } from '@/components';
import { type Meta, type StoryObj } from '@storybook/vue3';
import { ref } from 'vue';

const meta: Meta<typeof Input> = {
  title: 'Forms&Inputs/Input',
  component: Input,
  args: {
    placeholder: 'Placeholder',
    type: 'text',
    modelValue: ''
  },
  argTypes: {
    placeholder: { control: 'text' },
    type: { control: 'text' },
    modelValue: { control: 'text' },
    size: { control: { type: 'select', options: ['sm', 'md', 'lg', 'xl', '2xl'] } },
  }
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: (args) =>{
    return {
      components: { Input },
      setup() {
        const value = ref('');
        return { args, value };

      },
      template: '<Input v-model="value"  v-bind="args" label="Test Input" />'
    };
  }
};