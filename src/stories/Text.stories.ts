import { Text } from '@/components';
import { type Meta, type StoryObj } from '@storybook/vue3';

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  argTypes: {
    size: {
      control: 'select',
      options: ['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'Defines the HTML text level (e.g., h1, h2, p, span etc.).',
    },
    fontSize: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Sets the font size of the text.',
    },
    fontWeight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
      description: 'Defines the font weight of the text.',
    },
    fontColor: {
      control: 'select',
      options: ['black', 'white', 'gray', 'brand', 'success', 'info', 'warning', 'danger'],
      description: 'Sets the text color of the text.',
    },
    customClass: {
      control: 'text',
      description: 'Additional custom CSS class to apply to the text for further customization.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    size: 'h1',
    fontSize: 'lg',
    fontWeight: 'bold',
    fontColor: 'black',
  },
  render: (args) => ({
    components: { Text },
    setup() {
      return { args };
    },
    template: '<Text v-bind="args">This is a Default Text</Text>',
  }),
};

export const CustomText: Story = {
  args: {
    size: 'h2',
    fontSize: 'xl',
    fontWeight: 'medium',
    fontColor: 'brand',
  },
  render: (args) => ({
    components: { Text },
    setup() {
      return { args };
    },
    template: '<Text v-bind="args">This is a Custom Text</Text>',
  }),
};