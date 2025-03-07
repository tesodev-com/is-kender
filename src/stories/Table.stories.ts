import type { Meta, StoryObj } from '@storybook/vue3';
import Table, { type TableProps } from 'library/Table';
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
      description: 'Array of column definitions, each with `key` and `label` properties.',
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
      description: 'Enables striped rows when set to `true`.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Table>;

const commonArgs: Partial<TableProps> = {
  columns: [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'age', label: 'Age' },
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
};

export const Default: Story = {
  args: {
    ...commonArgs,
    title: 'User List',
    description: 'A list of registered users.',
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
      const handleSelectionChange = (rows: any[], row?: any) => {
        console.log('Selected items:', rows, row);
      };
      const clickRemoveButton = () => {
        console.log('remove button clicked');
      };
      const clickEditButton = () => {
        console.log('edit button clicked');
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

      return { args, checkIcon, handleSelectionChange, clickRemoveButton, clickEditButton, getStatusColor };
    },
    template: `
      <div>
        <Table v-bind="args" @selectionChange="handleSelectionChange" @removeButtonClick="clickRemoveButton" @editButtonClick="clickEditButton">
          <template #row-name="{ value }">
            <div>
              <p style="font-weight: 700">
                {{ value }}
              </p>
              <p>@Tesodev</p>
           </div>
          </template>
          <template #row-status="{ value }">
            <Badge style="text-wrap: nowrap;" :color="getStatusColor(value)">{{ value }}</Badge>
          </template>
          <template #header-right>
            <Button size="sm">Download All</Button>
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
