import type { Meta, StoryObj } from '@storybook/vue3';
import Text from 'library-components/Text';

const meta: Meta<typeof Text> = {
  title: 'Data-Display/Text',
  component: Text,
  tags: ['autodocs'],
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
      options: ['black', 'white', 'gray', 'primary', 'success', 'info', 'warning', 'danger'],
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
    size: 'p',
    fontSize: 'sm',
    fontWeight: 'normal',
    fontColor: 'black',
  },
  render: args => ({
    components: { Text },
    setup() {
      return { args };
    },
    template: '<Text v-bind="args">This is a Default Text</Text>',
  }),
};

export const CustomText: Story = {
  args: {
    size: 'h1',
    fontSize: 'xl',
    fontWeight: 'bold',
    fontColor: 'primary',
  },
  render: args => ({
    components: { Text },
    setup() {
      return { args };
    },
    template: '<Text v-bind="args">This is a Custom Text</Text>',
  }),
};
