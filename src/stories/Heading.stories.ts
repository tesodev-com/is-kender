import { Heading } from '@/components';
import { type Meta, type StoryObj } from '@storybook/vue3';

const meta: Meta<typeof Heading> = {
  title: 'Components/Heading',
  component: Heading,
  argTypes: {
    size: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'Defines the HTML heading level (e.g., h1, h2, etc.).',
    },
    fontSize: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Sets the font size of the heading.',
    },
    fontWeight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
      description: 'Defines the font weight of the heading.',
    },
    fontColor: {
      control: 'select',
      options: ['black', 'white', 'gray', 'brand', 'success', 'info', 'warning', 'danger'],
      description: 'Sets the text color of the heading.',
    },
    customClass: {
      control: 'text',
      description: 'Additional custom CSS class to apply to the heading for further customization.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  args: {
    size: 'h1',
    fontSize: 'lg',
    fontWeight: 'bold',
    fontColor: 'black',
  },
  render: (args) => ({
    components: { Heading },
    setup() {
      return { args };
    },
    template: '<Heading v-bind="args">This is a Default Heading</Heading>',
  }),
};

export const CustomHeading: Story = {
  args: {
    size: 'h2',
    fontSize: 'xl',
    fontWeight: 'medium',
    fontColor: 'brand',
  },
  render: (args) => ({
    components: { Heading },
    setup() {
      return { args };
    },
    template: '<Heading v-bind="args">This is a Custom Heading</Heading>',
  }),
};