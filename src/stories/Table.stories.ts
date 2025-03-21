import { checkIcon } from '@/assets/icons';
import type { Meta, StoryObj } from '@storybook/vue3';
import Badge from 'library-components/Badge';
import Button from 'library-components/Button';
import Svg from 'library-components/Svg';
import Table, { type Row, type TableProps } from 'library-components/Table';

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
    pagination: {
      control: 'boolean',
      description: 'Enables pagination for the table when set to `true`.',
    },
    itemsPerPage: {
      control: 'number',
      description: 'Number of items to display per page when pagination is enabled. Default is 10.',
    },
    currentPage: {
      control: 'number',
      description: 'The current page number for pagination. Controlled externally via v-model.',
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
    rowsBorder: {
      control: 'boolean',
      description: 'Adds a border-bottom to row cells (except the last row) when set to `true`.',
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
    { key: '1', name: 'John Doe', age: 28, email: 'john.doe@example.com', status: 'Active' },
    { key: '2', name: 'Jane Smith', age: 34, email: 'jane.smith@example.com', status: 'In Review' },
    { key: '3', name: 'Bob Johnson', age: 45, email: 'bob.johnson@example.com', status: 'Admin' },
    { key: '4', name: 'Alice Brown', age: 29, email: 'alice.brown@example.com', status: 'Active' },
    { key: '5', name: 'Michael Lee', age: 52, email: 'michael.lee@example.com', status: 'Inactive' },
    { key: '6', name: 'Sarah Davis', age: 31, email: 'sarah.davis@example.com', status: 'Pending' },
    { key: '7', name: 'David Wilson', age: 39, email: 'david.wilson@example.com', status: 'Active' },
    { key: '8', name: 'Emily Clark', age: 27, email: 'emily.clark@example.com', status: 'In Review' },
    { key: '9', name: 'Thomas Moore', age: 48, email: 'thomas.moore@example.com', status: 'Admin' },
    { key: '10', name: 'Laura Taylor', age: 33, email: 'laura.taylor@example.com', status: 'Pending' },
    { key: '11', name: 'Chris Evans', age: 36, email: 'chris.evans@example.com', status: 'Active' },
    { key: '12', name: 'Anna White', age: 42, email: 'anna.white@example.com', status: 'Inactive' },
    { key: '13', name: 'Mark Harris', age: 30, email: 'mark.harris@example.com', status: 'In Review' },
    { key: '14', name: 'Lisa Adams', age: 25, email: 'lisa.adams@example.com', status: 'Pending' },
    { key: '15', name: 'James Carter', age: 50, email: 'james.carter@example.com', status: 'Admin' },
    { key: '16', name: 'Megan Turner', age: 28, email: 'megan.turner@example.com', status: 'Active' },
    { key: '17', name: 'Paul Walker', age: 44, email: 'paul.walker@example.com', status: 'Inactive' },
    { key: '18', name: 'Rachel Green', age: 32, email: 'rachel.green@example.com', status: 'Pending' },
    { key: '19', name: 'Steven King', age: 47, email: 'steven.king@example.com', status: 'Admin' },
    { key: '20', name: 'Olivia Scott', age: 29, email: 'olivia.scott@example.com', status: 'In Review' },
    { key: '21', name: 'Ethan Brown', age: 35, email: 'ethan.brown@example.com', status: 'Active' },
    { key: '22', name: 'Sophie Lewis', age: 26, email: 'sophie.lewis@example.com', status: 'Pending' },
    { key: '23', name: 'Henry Allen', age: 53, email: 'henry.allen@example.com', status: 'Inactive' },
    { key: '24', name: 'Mia Harris', age: 31, email: 'mia.harris@example.com', status: 'Active' },
    { key: '25', name: 'George Clark', age: 40, email: 'george.clark@example.com', status: 'Admin' },
    { key: '26', name: 'Ella Wright', age: 27, email: 'ella.wright@example.com', status: 'In Review' },
    { key: '27', name: 'Lucas Parker', age: 38, email: 'lucas.parker@example.com', status: 'Pending' },
    { key: '28', name: 'Ava Miller', age: 30, email: 'ava.miller@example.com', status: 'Active' },
    { key: '29', name: 'Nathan Hill', age: 49, email: 'nathan.hill@example.com', status: 'Inactive' },
    { key: '30', name: 'Grace Young', age: 33, email: 'grace.young@example.com', status: 'Admin' },
    { key: '31', name: 'Liam Carter', age: 41, email: 'liam.carter@example.com', status: 'Active' },
    { key: '32', name: 'Zoe King', age: 28, email: 'zoe.king@example.com', status: 'Pending' },
    { key: '33', name: 'Daniel Scott', age: 46, email: 'daniel.scott@example.com', status: 'In Review' },
    { key: '34', name: 'Chloe Turner', age: 29, email: 'chloe.turner@example.com', status: 'Active' },
    { key: '35', name: 'Jack Wilson', age: 37, email: 'jack.wilson@example.com', status: 'Inactive' },
    { key: '36', name: 'Lily Adams', age: 26, email: 'lily.adams@example.com', status: 'Pending' },
    { key: '37', name: 'Ryan Moore', age: 43, email: 'ryan.moore@example.com', status: 'Admin' },
    { key: '38', name: 'Emma Davis', age: 32, email: 'emma.davis@example.com', status: 'Active' },
    { key: '39', name: 'Noah Lewis', age: 50, email: 'noah.lewis@example.com', status: 'In Review' },
    { key: '40', name: 'Isabella Clark', age: 31, email: 'isabella.clark@example.com', status: 'Pending' },
    { key: '41', name: 'Mason Harris', age: 39, email: 'mason.harris@example.com', status: 'Active' },
    { key: '42', name: 'Sophia Turner', age: 27, email: 'sophia.turner@example.com', status: 'Inactive' },
    { key: '43', name: 'Logan Allen', age: 45, email: 'logan.allen@example.com', status: 'Admin' },
    { key: '44', name: 'Amelia Scott', age: 30, email: 'amelia.scott@example.com', status: 'Pending' },
    { key: '45', name: 'Oliver King', age: 48, email: 'oliver.king@example.com', status: 'Active' },
    { key: '46', name: 'Charlotte Hill', age: 29, email: 'charlotte.hill@example.com', status: 'In Review' },
    { key: '47', name: 'Elijah Young', age: 36, email: 'elijah.young@example.com', status: 'Inactive' },
    { key: '48', name: 'Harper Carter', age: 33, email: 'harper.carter@example.com', status: 'Pending' },
    { key: '49', name: 'William Moore', age: 42, email: 'william.moore@example.com', status: 'Admin' },
    { key: '50', name: 'Evelyn Davis', age: 28, email: 'evelyn.davis@example.com', status: 'Active' },
    { key: '51', name: 'Alexander Wilson', age: 47, email: 'alexander.wilson@example.com', status: 'Inactive' },
    { key: '52', name: 'Abigail Clark', age: 31, email: 'abigail.clark@example.com', status: 'Pending' },
    { key: '53', name: 'Benjamin Harris', age: 40, email: 'benjamin.harris@example.com', status: 'Active' },
    { key: '54', name: 'Sofia Turner', age: 26, email: 'sofia.turner@example.com', status: 'In Review' },
    { key: '55', name: 'Matthew Allen', age: 44, email: 'matthew.allen@example.com', status: 'Admin' },
    { key: '56', name: 'Avery Scott', age: 29, email: 'avery.scott@example.com', status: 'Pending' },
    { key: '57', name: 'Jackson King', age: 38, email: 'jackson.king@example.com', status: 'Active' },
    { key: '58', name: 'Scarlett Hill', age: 32, email: 'scarlett.hill@example.com', status: 'Inactive' },
    { key: '59', name: 'Aiden Young', age: 46, email: 'aiden.young@example.com', status: 'In Review' },
    { key: '60', name: 'Luna Carter', age: 30, email: 'luna.carter@example.com', status: 'Admin' },
    { key: '61', name: 'Gabriel Moore', age: 41, email: 'gabriel.moore@example.com', status: 'Active' },
    { key: '62', name: 'Hazel Davis', age: 27, email: 'hazel.davis@example.com', status: 'Pending' },
    { key: '63', name: 'Julian Wilson', age: 49, email: 'julian.wilson@example.com', status: 'Inactive' },
    { key: '64', name: 'Nora Clark', age: 33, email: 'nora.clark@example.com', status: 'Active' },
    { key: '65', name: 'Isaac Harris', age: 45, email: 'isaac.harris@example.com', status: 'Admin' },
    { key: '66', name: 'Violet Turner', age: 28, email: 'violet.turner@example.com', status: 'In Review' },
    { key: '67', name: 'Caleb Allen', age: 37, email: 'caleb.allen@example.com', status: 'Pending' },
    { key: '68', name: 'Aria Scott', age: 31, email: 'aria.scott@example.com', status: 'Active' },
    { key: '69', name: 'Levi King', age: 50, email: 'levi.king@example.com', status: 'Inactive' },
    { key: '70', name: 'Penelope Hill', age: 29, email: 'penelope.hill@example.com', status: 'Admin' },
    { key: '71', name: 'Owen Young', age: 42, email: 'owen.young@example.com', status: 'Active' },
    { key: '72', name: 'Mila Carter', age: 34, email: 'mila.carter@example.com', status: 'Pending' },
    { key: '73', name: 'Elias Moore', age: 48, email: 'elias.moore@example.com', status: 'In Review' },
    { key: '74', name: 'Lillian Davis', age: 30, email: 'lillian.davis@example.com', status: 'Active' },
    { key: '75', name: 'Wyatt Wilson', age: 46, email: 'wyatt.wilson@example.com', status: 'Inactive' },
    { key: '76', name: 'Ellie Clark', age: 27, email: 'ellie.clark@example.com', status: 'Admin' },
    { key: '77', name: 'Grayson Harris', age: 39, email: 'grayson.harris@example.com', status: 'Pending' },
    { key: '78', name: 'Aurora Turner', age: 32, email: 'aurora.turner@example.com', status: 'Active' },
    { key: '79', name: 'Ezra Allen', age: 43, email: 'ezra.allen@example.com', status: 'In Review' },
    { key: '80', name: 'Freya Scott', age: 28, email: 'freya.scott@example.com', status: 'Inactive' },
    { key: '81', name: 'Hudson King', age: 47, email: 'hudson.king@example.com', status: 'Admin' },
    { key: '82', name: 'Ivy Hill', age: 31, email: 'ivy.hill@example.com', status: 'Active' },
    { key: '83', name: 'Jasper Young', age: 40, email: 'jasper.young@example.com', status: 'Pending' },
    { key: '84', name: 'Ruby Carter', age: 29, email: 'ruby.carter@example.com', status: 'In Review' },
    { key: '85', name: 'Silas Moore', age: 44, email: 'silas.moore@example.com', status: 'Active' },
    { key: '86', name: 'Willow Davis', age: 33, email: 'willow.davis@example.com', status: 'Inactive' },
    { key: '87', name: 'Miles Wilson', age: 50, email: 'miles.wilson@example.com', status: 'Admin' },
    { key: '88', name: 'Esme Clark', age: 26, email: 'esme.clark@example.com', status: 'Pending' },
    { key: '89', name: 'Theo Harris', age: 38, email: 'theo.harris@example.com', status: 'Active' },
    { key: '90', name: 'Cora Turner', age: 30, email: 'cora.turner@example.com', status: 'In Review' },
    { key: '91', name: 'Finn Allen', age: 49, email: 'finn.allen@example.com', status: 'Inactive' },
    { key: '92', name: 'Lydia Scott', age: 27, email: 'lydia.scott@example.com', status: 'Admin' },
    { key: '93', name: 'Arlo King', age: 41, email: 'arlo.king@example.com', status: 'Active' },
    { key: '94', name: 'Sage Hill', age: 32, email: 'sage.hill@example.com', status: 'Pending' },
    { key: '95', name: 'Declan Young', age: 45, email: 'declan.young@example.com', status: 'In Review' },
    { key: '96', name: 'Poppy Carter', age: 28, email: 'poppy.carter@example.com', status: 'Active' },
    { key: '97', name: 'Jude Moore', age: 46, email: 'jude.moore@example.com', status: 'Inactive' },
    { key: '98', name: 'Opal Davis', age: 31, email: 'opal.davis@example.com', status: 'Admin' },
    { key: '99', name: 'Kai Wilson', age: 39, email: 'kai.wilson@example.com', status: 'Pending' },
    { key: '100', name: 'Iris Clark', age: 34, email: 'iris.clark@example.com', status: 'Active' },
  ],
  pagination: true,
  currentPage: 1,
  itemsPerPage: 10,
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
    rowsBorder: true,
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
