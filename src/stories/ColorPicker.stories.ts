import type { Meta, StoryObj } from '@storybook/vue3';
import ColorPicker from 'library-components/ColorPicker';
import { ref } from 'vue';

const meta: Meta<typeof ColorPicker> = {
  component: ColorPicker,
  title: 'Forms&Inputs/ColorPicker',
  argTypes: {
    pickerPosition: { control: 'select', options: ['top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right', 'right', 'right-top', 'right-bottom', 'left', 'left-top', 'left-bottom'] },
    isDraggable: { control: 'boolean' },
    autoPosition: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof ColorPicker>;

export const Default: Story = {
  args: {
    pickerPosition: 'bottom',
    isDraggable: true,
    autoPosition: true,
  },
  render: args => ({
    components: { ColorPicker },
    setup() {
      const modelValue = ref('#000000');
      return { args, modelValue };
    },
    template: `
    <ColorPicker v-model="modelValue" :picker-position="args.pickerPosition" :is-draggable="args.isDraggable" :auto-position="args.autoPosition" />
    `,
  }),
};
