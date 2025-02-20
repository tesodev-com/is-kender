import type { Meta, StoryObj } from '@storybook/vue3';
import { Badge } from '@/components';

const meta: Meta<typeof Badge> = {
  component: Badge,
  title: 'Components/Badge',
  argTypes: {
    color: {
      control: 'select',
      options: ['gray', 'primary', 'error', 'warning', 'success', 'blue-gray', 'blue-light', 'blue', 'indigo', 'purple', 'pink', 'orange'],
      description: 'Sets the color of the badge.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Sets the size of the badge.',
    },
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'modern'],
      description: 'Sets the variant of the badge.',
    },
    pill: {
      control: 'boolean',
      description: 'If true, applies rounded pill styles to the badge.',
    },
    dot: {
      control: 'boolean',
      description: 'If true, displays the badge with a dot circle.',
    },
    onlyIcon: {
      control: 'boolean',
      description: 'If true, only displays the icon (if provided) in the badge.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

const commonArgs: Partial<Story['args']> = {
  color: 'gray',
  size: 'sm',
  variant: 'solid',
  pill: true,
  dot: false,
  onlyIcon: false,
};

export const Default: Story = {
  args: {
    ...commonArgs,
  },
  render: args => ({
    components: { Badge },
    setup() {
      return { args };
    },
    template: `
      <Badge v-bind="args">
        Default Badge
      </Badge>
    `,
  }),
};

export const Dotted: Story = {
  args: {
    ...commonArgs,
    dot: true,
  },
  render: args => ({
    components: { Badge },
    setup() {
      return { args };
    },
    template: `
       <Badge v-bind="args">
          Dotted Badge
       </Badge>
    `,
  }),
};

export const PillFalse: Story = {
  args: {
    ...commonArgs,
    pill: false,
  },
  render: args => ({
    components: { Badge },
    setup() {
      return { args };
    },
    template: `
      <Badge v-bind="args">
        Pill Badge
      </Badge>
    `,
  }),
};

export const Outline: Story = {
  args: {
    ...commonArgs,
    variant: 'outline',
  },
  render: args => ({
    components: { Badge },
    setup() {
      return { args };
    },
    template: `
      <Badge v-bind="args">
        Outline Badge
      </Badge>
    `,
  }),
};

export const Modern: Story = {
  args: {
    ...commonArgs,
    variant: 'modern',
  },
  render: args => ({
    components: { Badge },
    setup() {
      return { args };
    },
    template: `
      <Badge v-bind="args">
        Modern Badge
      </Badge>
    `,
  }),
};

export const OnlyIcon: Story = {
  args: {
    ...commonArgs,
    onlyIcon: true,
  },
  render: args => ({
    components: { Badge },
    setup() {
      return { args };
    },
    template: `
      <Badge v-bind="args">
        🎉
      </Badge>
    `,
  }),
};
