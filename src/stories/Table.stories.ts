import type { Meta, StoryObj } from '@storybook/vue3';
import Table, { type Row, type TableProps } from 'library/Table';
import Svg from 'library/Svg';
import Badge from 'library/Badge';
import Button from 'library/Button';
import { checkIcon } from '@/assets/icons';

const meta: Meta<typeof Table> = {
  component: Table,
  title: 'DataDisplay/Table',
  argTypes: {
    title: {
      control: 'text',
      description: 'The title displayed in the table header.',
    },
    description: {
      control: 'text',
      description: 'The description displayed below the title in the table header.',
    },
    columns: {
      control: 'object',
      description: 'Array of column definitions, each with `key`, `label`, and optional `sortable` properties.',
    },
    rows: {
      control: 'object',
      description: 'Array of row data objects, where keys match column keys.',
    },
    selectable: {
      control: 'boolean',
      description: 'Enables row selection with checkboxes when set to `true`.',
    },
    searchable: {
      control: 'boolean',
      description: 'Enables search functionality when set to `true`.',
    },
    stripedRows: {
      control: 'boolean',
      description: 'Applies a striped effect to rows when set to `true`.',
    },
    stickyHeader: {
      control: 'boolean',
      description: 'Makes the table header sticky when set to `true`.',
    },
    stickyFirstColumn: {
      control: 'boolean',
      description: 'Makes the first column sticky when set to `true`.',
    },
    stickyLastColumn: {
      control: 'boolean',
      description: 'Makes the last column sticky when set to `true`.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Table>;

const commonArgs: Partial<TableProps> = {
  columns: [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'age', label: 'Age', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: '' },
  ],
  rows: [
    { name: 'John Doe', age: 28, email: 'john.doe@example.com', status: 'Active' },
    { name: 'Jane Smith', age: 34, email: 'jane.smith@example.com', status: 'In Review' },
    { name: 'Bob Johnson', age: 45, email: 'bob.johnson@example.com', status: 'Admin' },
    { name: 'Alice Brown', age: 29, email: 'alice.brown@example.com', status: 'Active' },
    { name: 'Michael Lee', age: 52, email: 'michael.lee@example.com', status: 'Inactive' },
    { name: 'Sarah Davis', age: 31, email: 'sarah.davis@example.com', status: 'Pending' },
    { name: 'David Wilson', age: 39, email: 'david.wilson@example.com', status: 'Active' },
    { name: 'Emily Clark', age: 27, email: 'emily.clark@example.com', status: 'In Review' },
    { name: 'Thomas Moore', age: 48, email: 'thomas.moore@example.com', status: 'Admin' },
    { name: 'Laura Taylor', age: 33, email: 'laura.taylor@example.com', status: 'Pending' },
  ],
  selectable: false,
  searchable: false,
  stripedRows: false,
  stickyHeader: false,
  stickyFirstColumn: false,
  stickyLastColumn: false,
};

export const Default: Story = {
  args: {
    ...commonArgs,
    title: 'User List',
    description: 'A comprehensive list of registered users with advanced features.',
    selectable: true,
    searchable: true,
    stripedRows: true,
    stickyHeader: true,
    stickyFirstColumn: true,
    stickyLastColumn: true,
  },
  render: args => ({
    components: { Table, Svg, Badge, Button },
    setup() {
      const handleSelect = (row?: Row) => {
        console.log('Selected item:', row);
      };
      const handleSelectAll = (rows: any[]) => {
        console.log('Selected items:', rows);
      };
      const clickRemoveButton = (row: Row) => {
        console.log('Remove button clicked:', row);
      };
      const clickEditButton = (row: Row) => {
        console.log('Edit button clicked:', row);
      };
      const clickSort = ({ key, order }: { key: string; order: string }) => {
        console.log(`Sorted by ${key} in ${order} order`);
      };

      const getStatusColor = (status: string) => {
        switch (status) {
          case 'Active':
            return 'success';
          case 'In Review':
            return 'warning';
          case 'Admin':
            return 'primary';
          case 'Inactive':
            return 'gray';
          case 'Pending':
            return 'orange';
          default:
            return 'gray';
        }
      };

      return { args, checkIcon, handleSelect, handleSelectAll, clickRemoveButton, clickEditButton, clickSort, getStatusColor };
    },
    template: `
      <div>
        <Table v-bind="args" @select="handleSelect" @selectAll="handleSelectAll" @removeButtonClick="clickRemoveButton" @editButtonClick="clickEditButton" @sort="clickSort">
          <template #row-name="{ value }">
            <div style="display: flex; flex-direction: column;">
              <p style="font-weight: 700">{{ value }}</p>
              <p style="color: #666; font-size: 0.9em">@{{ value.split(' ')[0].toLowerCase() }}</p>
            </div>
          </template>
          <template #row-status="{ value }">
            <Badge style="text-wrap: nowrap;" :color="getStatusColor(value)">{{ value }}</Badge>
          </template>
          <template #header-right>
            <div style="display:flex;align-items:center;gap:0.5rem;text-wrap:nowrap;">
              <Button size="sm" color="primary">Download All</Button>
              <Button size="sm" color="secondary">Export CSV</Button>
            </div>
          </template>
        </Table>
      </div>
    `,
  }),
};

export const SortableTable: Story = {
  args: {
    ...commonArgs,
    title: 'Sortable User List',
    searchable: true,
    stripedRows: true,
  },
  render: args => ({
    components: { Table, Svg, Badge },
    setup() {
      const clickSort = ({ key, order }: { key: string; order: string }) => {
        console.log(`Sorted by ${key} in ${order} order`);
      };
      const getStatusColor = (status: string) => {
        switch (status) {
          case 'Active':
            return 'success';
          case 'In Review':
            return 'warning';
          case 'Admin':
            return 'primary';
          case 'Inactive':
            return 'gray';
          case 'Pending':
            return 'orange';
          default:
            return 'gray';
        }
      };
      return { args, checkIcon, clickSort, getStatusColor };
    },
    template: `
      <div>
        <Table v-bind="args" @sort="clickSort">
          <template #row-status="{ value }">
            <Badge :color="getStatusColor(value)">{{ value }}</Badge>
          </template>
        </Table>
      </div>
    `,
  }),
};

export const CustomEmptyState: Story = {
  args: {
    ...commonArgs,
    title: 'Empty Table with Custom State',
    rows: [],
    searchable: true,
  },
  render: args => ({
    components: { Table, Svg, Button },
    setup() {
      return { args, checkIcon };
    },
    template: `
      <div>
        <Table v-bind="args">
          <template #row-empty-state>
            <div style="text-align: center; padding: 40px;">
              <Svg size="40" :src="checkIcon" style="margin-bottom: 16px;" />
              <h3>No Users Found</h3>
              <p style="color: #666;">It looks like there are no users to display at the moment.<br />Try adjusting your search or adding new users.</p>
              <Button color="primary" style="margin-top: 16px;">Add User</Button>
            </div>
          </template>
        </Table>
      </div>
    `,
  }),
};

export const PaginatedTable: Story = {
  args: {
    ...commonArgs,
    title: 'Paginated User List',
    rows: commonArgs.rows!.slice(0, 5),
    selectable: true,
    searchable: true,
    stickyHeader: true,
  },
  render: args => ({
    components: { Table, Svg, Button },
    setup() {
      const handleSelect = (row?: Row) => {
        console.log('Selected item:', row);
      };
      return { args, checkIcon, handleSelect };
    },
    template: `
      <div>
        <Table v-bind="args" @select="handleSelect">
          <template #header-right>
            <Button size="sm" color="secondary">Previous</Button>
            <Button size="sm" color="primary" style="margin-left: 8px;">Next</Button>
          </template>
        </Table>
      </div>
    `,
  }),
};

export const AdvancedFiltering: Story = {
  args: {
    ...commonArgs,
    title: 'Advanced Filtering Table',
    searchable: true,
    stripedRows: true,
  },
  render: args => ({
    components: { Table, Svg, Badge, Button },
    setup() {
      const getStatusColor = (status: string) => {
        switch (status) {
          case 'Active':
            return 'success';
          case 'In Review':
            return 'warning';
          case 'Admin':
            return 'primary';
          case 'Inactive':
            return 'gray';
          case 'Pending':
            return 'orange';
          default:
            return 'gray';
        }
      };
      return { args, checkIcon, getStatusColor };
    },
    template: `
      <div>
        <Table v-bind="args">
          <template #header-right>
            <Button size="sm" color="secondary">Filter by Active</Button>
            <Button size="sm" color="secondary" style="margin-left: 8px;">Filter by Admin</Button>
          </template>
          <template #row-status="{ value }">
            <Badge :color="getStatusColor(value)">{{ value }}</Badge>
          </template>
        </Table>
      </div>
    `,
  }),
};

export const WithSelection: Story = {
  args: {
    ...commonArgs,
    title: 'Selectable User List',
    selectable: true,
    stripedRows: true,
  },
  render: args => ({
    components: { Table, Svg },
    setup() {
      return { args, checkIcon };
    },
    template: `
      <div>
        <Table v-bind="args" />
      </div>
    `,
  }),
};

export const CustomColumnSlot: Story = {
  args: {
    ...commonArgs,
    title: 'Custom Column Table',
    stickyFirstColumn: true,
    stickyLastColumn: true,
  },
  render: args => ({
    components: { Table, Svg },
    setup() {
      return { args, checkIcon };
    },
    template: `
      <div>
        <Table v-bind="args">
          <template #column-name="{ column }">
            👤 {{ column.label }}
          </template>
          <template #row-name="{ value }">
            <strong>{{ value }}</strong>
          </template>
        </Table>
      </div>
    `,
  }),
};

export const EmptyTable: Story = {
  args: {
    ...commonArgs,
    title: 'Empty Table',
    rows: [],
    searchable: true,
  },
  render: args => ({
    components: { Table, Svg },
    setup() {
      return { args, checkIcon };
    },
    template: `
      <div>
        <Table v-bind="args" />
      </div>
    `,
  }),
};

export const NoHeader: Story = {
  args: {
    ...commonArgs,
  },
  render: args => ({
    components: { Table, Svg },
    setup() {
      return { args, checkIcon };
    },
    template: `
      <div>
        <Table v-bind="args" />
      </div>
    `,
  }),
};
