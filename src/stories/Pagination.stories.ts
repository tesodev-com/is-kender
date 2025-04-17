import type { Meta, StoryObj } from '@storybook/vue3';
import Pagination from 'library-components/Pagination';
import { ref } from 'vue';

const meta: Meta<typeof Pagination> = {
  title: 'Navigation/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'minimal', 'button-group'],
      description: 'Visual style of the pagination component',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Alignment of pagination controls',
    },
    totalItems: {
      control: 'number',
      description: 'Total number of items to paginate',
    },
    itemsPerPage: {
      control: 'number',
      description: 'Number of items per page',
    },
    showTopBorder: {
      control: 'boolean',
      description: 'Show a top border above pagination',
    },
    outlineButtons: {
      control: 'boolean',
      description: 'Use outline style for Previous/Next buttons instead of ghost',
    },
    roundedNumbers: {
      control: 'boolean',
      description: 'Use rounded style for page numbers',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    totalItems: 5000,
    itemsPerPage: 10,
    showTopBorder: true,
    outlineButtons: false,
  },
  render: args => ({
    components: { Pagination },
    setup() {
      const currentPage = ref(1);
      return { args, currentPage };
    },
    template: `
      <Pagination
        v-bind="args"
        v-model:currentPage="currentPage"
      />
    `,
  }),
};

export const ManyItems: Story = {
  args: {
    totalItems: 100,
    itemsPerPage: 10,
    showTopBorder: true,
    outlineButtons: true,
  },
  render: args => ({
    components: { Pagination },
    setup() {
      const currentPage = ref(1);
      return { args, currentPage };
    },
    template: `
      <Pagination
        v-bind="args"
        v-model:currentPage="currentPage"
      />
    `,
  }),
};

export const NoItems: Story = {
  args: {
    totalItems: 0,
    itemsPerPage: 10,
    showTopBorder: false,
    outlineButtons: false,
  },
  render: args => ({
    components: { Pagination },
    setup() {
      const currentPage = ref(1);
      return { args, currentPage };
    },
    template: `
      <Pagination
        v-bind="args"
        v-model:currentPage="currentPage"
      />
    `,
  }),
};

export const FewItems: Story = {
  args: {
    totalItems: 30,
    itemsPerPage: 10,
    showTopBorder: false,
    outlineButtons: true,
    roundedNumbers: true,
  },
  render: args => ({
    components: { Pagination },
    setup() {
      const currentPage = ref(1);
      return { args, currentPage };
    },
    template: `
      <Pagination
        v-bind="args"
        v-model:currentPage="currentPage"
      />
    `,
  }),
};
