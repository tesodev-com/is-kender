import { Heading } from '@/components';
import { type Meta, type StoryObj } from '@storybook/vue3';

const meta: Meta<typeof Heading> = {
  title: 'Components/Heading',
  component: Heading,
  argTypes: {
    size: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    fontSize: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    fontWeight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
    },
    fontColor: {
      control: 'select',
      options: ['black', 'white', 'gray', 'brand', 'success', 'info', 'warning', 'danger'],
    },
    customClass: {
      control: 'text',
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