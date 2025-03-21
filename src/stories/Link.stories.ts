import type { Meta, StoryObj } from '@storybook/vue3';
import Link, { type LinkProps } from 'library-components/Link';

const meta: Meta<typeof Link> = {
  component: Link,
  title: 'Navigation/Link',
  argTypes: {
    to: {
      control: 'text',
      description: 'Destination URL or route path',
    },
    useRouter: {
      control: 'boolean',
      description: 'Use Vue Router for navigation',
    },
    isExternal: {
      control: 'boolean',
      description: 'Indicates if the link is external',
    },
    rel: {
      control: 'text',
      description: 'Relationship attribute for the link',
    },
    target: {
      control: 'select',
      options: ['_self', '_blank', '_parent', '_top'],
      description: 'Target attribute for the link',
    },
    title: {
      control: 'text',
      description: 'Title attribute for the link',
    },
    underline: {
      control: 'boolean',
      description: 'Show underline on the link',
    },
    fontSize: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Font size of the link text',
    },
    fontWeight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
      description: 'Font weight of the link text',
    },
    fontColor: {
      control: 'select',
      options: ['black', 'white', 'gray', 'primary', 'success', 'info', 'warning', 'danger'],
      description: 'Color of the link text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the link',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Link>;

const commonArgs: Partial<LinkProps> = {
  to: '/home',
  useRouter: false,
  isExternal: false,
  target: '_self',
  fontSize: 'sm',
  fontWeight: 'normal',
  fontColor: 'primary',
  underline: true,
};

export const Default: Story = {
  args: {
    ...commonArgs,
  },
  render: args => ({
    components: { Link },
    setup() {
      return { args };
    },
    template: `
      <Link v-bind="args">
        Default Link
      </Link>
    `,
  }),
};

export const RouterLink: Story = {
  args: {
    ...commonArgs,
    useRouter: true,
    to: '/about',
    fontSize: 'md',
    fontWeight: 'bold',
    fontColor: 'success',
  },
  render: args => ({
    components: { Link },
    setup() {
      return { args };
    },
    template: `
      <Link v-bind="args">
        Router Link to About
      </Link>
    `,
  }),
};

export const ExternalLink: Story = {
  args: {
    ...commonArgs,
    to: 'https://example.com',
    isExternal: true,
    target: '_blank',
    fontSize: 'lg',
    fontColor: 'danger',
    underline: false,
  },
  render: args => ({
    components: { Link },
    setup() {
      return { args };
    },
    template: `
      <Link v-bind="args">
        External Website
      </Link>
    `,
  }),
};

export const StyledLink: Story = {
  args: {
    ...commonArgs,
    to: '/contact',
    title: 'Contact Us',
    fontSize: 'xl',
    fontWeight: 'semibold',
    fontColor: 'info',
  },
  render: args => ({
    components: { Link },
    setup() {
      return { args };
    },
    template: `
      <Link v-bind="args">
        Styled Contact Link
      </Link>
    `,
  }),
};

export const NoUnderline: Story = {
  args: {
    ...commonArgs,
    to: '/profile',
    underline: false,
    fontSize: 'md',
    fontWeight: 'medium',
    fontColor: 'gray',
  },
  render: args => ({
    components: { Link },
    setup() {
      return { args };
    },
    template: `
      <Link v-bind="args">
        Link Without Underline
      </Link>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    ...commonArgs,
    disabled: true,
  },
  render: args => ({
    components: { Link },
    setup() {
      return { args };
    },
    template: `
      <Link v-bind="args">
        Disabled Link
      </Link>
    `,
  }),
};
