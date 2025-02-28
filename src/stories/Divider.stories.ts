import type { Meta, StoryObj } from '@storybook/vue3';
import Divider from 'library/Divider';

const meta: Meta<typeof Divider> = {
  component: Divider,
  title: 'Layout&Structures/Divider',
  argTypes: {
    is: {
      control: 'text',
      description: 'Defines the tag type for the divider, such as "div", "hr", etc.',
    },
    layout: {
      options: ['horizontal', 'vertical'],
      control: 'select',
      description: 'Sets the orientation of the divider.',
    },
    roundedFull: {
      control: 'boolean',
      description: 'If true, applies rounded styles to the divider.',
    },
    customClass: {
      control: 'text',
      description: 'Additional custom class to apply to the divider.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Divider>;

const commonArgs: Partial<Story['args']> = {
  is: 'div',
  layout: 'horizontal',
  roundedFull: false,
  customClass: '',
};

export const HorizontalDivider: Story = {
  args: {
    ...commonArgs,
    layout: 'horizontal',
  },
};

export const HorizontalRoundedDivider: Story = {
  args: {
    ...commonArgs,
    layout: 'horizontal',
    roundedFull: true,
  },
};

export const VerticalDivider: Story = {
  args: {
    ...commonArgs,
    layout: 'vertical',
  },
  render: args => ({
    components: { Divider },
    setup() {
      return { args };
    },
    template: `
      <div style="height: 100px;">
        <Divider v-bind="args" />
      </div>
    `,
  }),
};

export const VerticalRoundedDivider: Story = {
  args: {
    ...commonArgs,
    layout: 'vertical',
    roundedFull: true,
  },
  render: args => ({
    components: { Divider },
    setup() {
      return { args };
    },
    template: `
      <div style="height: 100px;">
        <Divider v-bind="args" />
      </div>
    `,
  }),
};
