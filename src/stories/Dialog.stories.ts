import Dialog from '@/components/Dialog';
import type { DialogAction } from '@/components/Dialog/types';
import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';

const meta: Meta<typeof Dialog> = {
  title: 'Layout/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    message: { control: 'text' },
    persistent: { control: 'boolean' },
    width: { control: 'text' },
    actions: { control: 'object' },
  },
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  args: {
    title: 'Default Dialog',
    message: 'This is a simple dialog message.',
    persistent: false,
    width: '400px',
    actions: [],
  },
  render: args => ({
    components: { Dialog },
    setup() {
      const isOpen = ref(false);

      const toggleDialog = () => {
        isOpen.value = !isOpen.value;
      };

      return { args, isOpen, toggleDialog };
    },
    template: `
      <div>
        <button @click="toggleDialog">
          {{ isOpen ? 'Close' : 'Open' }} Dialog
        </button>
        <Dialog
          v-if="isOpen"
          v-bind="args"
          @close="toggleDialog"
        />
      </div>
    `,
  }),
};

export const WithActions: Story = {
  args: {
    title: 'Confirm Delete',
    message: 'Are you sure you want to delete this item?',
    persistent: false,
    width: '400px',
  },
  render: args => ({
    components: { Dialog },
    setup() {
      const isOpen = ref(false);

      const toggleDialog = () => {
        isOpen.value = !isOpen.value;
      };

      const actions: DialogAction[] = [
        {
          label: 'Cancel',
          key: 'cancel',
          variant: 'text',
          onClick: () => {
            toggleDialog();
          },
        },
        {
          label: 'Confirm',
          key: 'confirm',
          variant: 'primary',
          onClick: () => {
            toggleDialog();
          },
        },
      ];

      return { args, isOpen, toggleDialog, actions };
    },
    template: `
      <div>
        <button @click="toggleDialog">
          {{ isOpen ? 'Close' : 'Open' }} Dialog
        </button>
        <Dialog
          v-if="isOpen"
          v-bind="args"
          :actions="actions"
          @close="toggleDialog"
        />
      </div>
    `,
  }),
};

export const Persistent: Story = {
  args: {
    title: 'Persistent Dialog',
    message: 'You must interact with the dialog to close it.',
    persistent: true,
    width: '400px',
    actions: [],
  },
  render: args => ({
    components: { Dialog },
    setup() {
      const isOpen = ref(false);

      const toggleDialog = () => {
        isOpen.value = !isOpen.value;
      };

      return { args, isOpen, toggleDialog };
    },
    template: `
      <div>
        <button @click="toggleDialog">
          {{ isOpen ? 'Close' : 'Open' }} Dialog
        </button>
        <Dialog
          v-if="isOpen"
          v-bind="args"
          @close="toggleDialog"
        />
      </div>
    `,
  }),
};

export const CustomWidth: Story = {
  args: {
    title: 'Wide Dialog',
    message: 'This dialog is wider than default.',
    persistent: false,
    width: '800px',
    actions: [],
  },
  render: args => ({
    components: { Dialog },
    setup() {
      const isOpen = ref(false);

      const toggleDialog = () => {
        isOpen.value = !isOpen.value;
      };

      return { args, isOpen, toggleDialog };
    },
    template: `
      <div>
        <button @click="toggleDialog">
          {{ isOpen ? 'Close' : 'Open' }} Dialog
        </button>
        <Dialog
          v-if="isOpen"
          v-bind="args"
          @close="toggleDialog"
        />
      </div>
    `,
  }),
};
