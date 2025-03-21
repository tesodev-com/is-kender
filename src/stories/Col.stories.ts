import type { Meta, StoryObj } from '@storybook/vue3';
import Col from 'library-components/Col';

const meta: Meta<typeof Col> = {
  title: 'Layout&Structures/Col',
  component: Col,
  args: {
    cols: 12,
  },
  argTypes: {
    cols: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
    sm: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
    md: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
    lg: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
    xl: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
    xxl: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Col>;
export const Default: Story = {
  render: args => {
    return {
      components: { Col },
      setup() {
        return { args };
      },
      template: `
      <Col style="outline:1px solid purple;background-color:rgba(128,0,128,0.5)" v-bind="args">
        <p>col-{{args.cols}}</p>
      </Col>
      `,
    };
  },
};
