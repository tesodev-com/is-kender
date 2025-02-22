import { Col as ColComponent } from '@/components';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof ColComponent> = {
  title: 'Layout&Structures/Col',
  component: ColComponent,
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
type Story = StoryObj<typeof ColComponent>;
export const Default: Story = {
  render: args => {
    return {
      components: { ColComponent },
      setup() {
        return { args };
      },
      template: `
      <ColComponent style="outline:1px solid purple;background-color:rgba(128,0,128,0.5)" v-bind="args">
        <p>col-{{args.cols}}</p>
      </ColComponent>
      `,
    };
  },
};
