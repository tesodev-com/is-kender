import Dialog from '@/components/Dialog';
import type { DialogAction } from '@/components/Dialog/types';
import type { Meta, StoryObj } from '@storybook/vue3';
import Drawer from 'library-components/Drawer';
import { ref } from 'vue';

const meta: Meta<typeof Drawer> = {
  title: 'Layout/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['left', 'right', 'up', 'down'],
      description: 'The position where the drawer appears from',
    },
    size: {
      control: 'select',
      options: ['25%', '50%', '75%', '100%'],
      description: 'The size of the drawer',
    },
    title: {
      control: 'text',
      description: 'The title displayed in the drawer header',
    },
    hasHeader: {
      control: 'boolean',
      description: 'Whether the drawer has a header',
    },
    hasCloseButton: {
      control: 'boolean',
      description: 'Whether the drawer has a close button',
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: 'Whether the drawer should close when the overlay is clicked',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Whether the drawer should close when the Escape key is pressed',
    },
    hasOverlay: {
      control: 'boolean',
      description: 'Whether to show the overlay',
    },
    disableBodyScroll: {
      control: 'boolean',
      description: 'Disables body scrolling when the drawer is open',
    },
    beforeClose: {
      control: false,
      description: 'Function to be called before closing the drawer',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Primary: Story = {
  render: args => ({
    components: { Drawer },
    setup() {
      const isOpen = ref(false);
      return { args, isOpen };
    },
    template: `
      <div>
        <button @click="isOpen = true">Open Drawer</button>
        <Drawer v-if="isOpen" v-bind="args" @close="isOpen = false" />
      </div>
    `,
  }),
  args: {
    position: 'left',
    size: '50%',
    title: 'My Drawer',
    hasHeader: true,
    hasCloseButton: true,
    closeOnOverlayClick: true,
    closeOnEscape: true,
    hasOverlay: true,
    disableBodyScroll: true,
  },
};

export const RightDrawerWithAnother: Story = {
  render: args => ({
    components: { Drawer, Dialog },
    setup() {
      const isFirstDrawerOpen = ref(false);
      const isSecondDrawerOpen = ref(false);
      const isDialogOpen = ref(false);
      const hasChanges = ref(false);

      let promiseResolve: (value: boolean) => void;

      const beforeClose = () => {
        if (!hasChanges.value) return true;

        isDialogOpen.value = true;
        return new Promise<boolean>(resolve => {
          promiseResolve = resolve;
        });
      };

      const dialogActions: DialogAction[] = [
        {
          label: 'Cancel',
          variant: 'text',
          key: 'cancel',
          onClick: () => {
            isDialogOpen.value = false;
            promiseResolve(false);
          },
        },
        {
          label: 'Confirm',
          key: 'confirm',
          variant: 'primary',
          onClick: () => {
            isDialogOpen.value = false;
            hasChanges.value = false;
            promiseResolve(true);
          },
        },
      ];
      return { args, isFirstDrawerOpen, isSecondDrawerOpen, isDialogOpen, hasChanges, beforeClose, dialogActions };
    },
    template: `
      <div>
        <button @click="isFirstDrawerOpen = true">Open Drawer</button>
        <Drawer v-if="isFirstDrawerOpen" v-bind="args" @close="isFirstDrawerOpen = false">
          <template #body>
            <p>This is the first drawer.</p>
            <button @click="isSecondDrawerOpen = true">Open another drawer</button>
          </template>
        </Drawer>
        <Drawer v-if="isSecondDrawerOpen" position="left" size="25%" title="Second Drawer" @close="isSecondDrawerOpen = false" :before-close="beforeClose">
          <template #body>
           <p>This drawer will ask for confirmation before closing if you make a "change".</p>
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
              <input type="checkbox" v-model="hasChanges" />
              I have unsaved changes
            </label>
          </template>
        </Drawer>
        <Dialog
          v-if="isDialogOpen"
          title="Unsaved Changes"
          message="Are you sure you want to discard your changes?"
          :actions="dialogActions"
          persistent
          @close="dialogActions[0].onClick"
        />
      </div>
    `,
  }),
  args: {
    position: 'left',
    size: '50%',
    title: 'First Drawer',
    hasHeader: true,
    hasCloseButton: true,
    closeOnOverlayClick: true,
    closeOnEscape: true,
    hasOverlay: true,
    disableBodyScroll: true,
  },
};

export const WithoutOverlay: Story = {
  name: 'Without Overlay',
  render: args => ({
    components: { Drawer },
    setup() {
      const isOpen = ref(false);
      return { args, isOpen };
    },
    template: `
      <div>
        <button @click="isOpen = true">Open Drawer (No Overlay)</button>
        <Drawer v-if="isOpen" v-bind="args" @close="isOpen = false">
          <template #body>
            <p>Bu drawer overlay olmadan açılır.</p>
            <p>Arka plandaki içerikle etkileşime geçebilirsiniz.</p>
          </template>
        </Drawer>
      </div>
    `,
  }),
  args: {
    position: 'right',
    size: '30%',
    title: 'No Overlay Drawer',
    hasHeader: true,
    hasCloseButton: true,
    closeOnOverlayClick: false,
    closeOnEscape: true,
    hasOverlay: false,
    disableBodyScroll: false,
  },
};

export const WithConfirmation: Story = {
  name: 'Close with Confirmation Dialog',
  render: args => ({
    components: { Drawer, Dialog },
    setup() {
      const isDrawerOpen = ref(false);
      const isDialogOpen = ref(false);
      const hasChanges = ref(false);

      let promiseResolve: (value: boolean) => void;

      const beforeClose = () => {
        if (!hasChanges.value) return true;

        isDialogOpen.value = true;
        return new Promise<boolean>(resolve => {
          promiseResolve = resolve;
        });
      };

      const dialogActions: DialogAction[] = [
        {
          label: 'Cancel',
          variant: 'text',
          key: 'cancel',
          onClick: () => {
            isDialogOpen.value = false;
            promiseResolve(false);
          },
        },
        {
          label: 'Confirm',
          key: 'confirm',
          variant: 'primary',
          onClick: () => {
            isDialogOpen.value = false;
            hasChanges.value = false;
            promiseResolve(true);
          },
        },
      ];

      return {
        args,
        isDrawerOpen,
        isDialogOpen,
        hasChanges,
        beforeClose,
        dialogActions,
      };
    },
    template: `
      <div>
        <button @click="isDrawerOpen = true">Open Drawer</button>
        <p v-if="!isDrawerOpen" style="margin-top: 1rem; color: #666;">
          Make a "change" inside the drawer, then try to close it by clicking the overlay, the close button, or pressing ESC.
        </p>

        <Drawer
          v-if="isDrawerOpen"
          v-bind="args"
          :before-close="beforeClose"
          @close="isDrawerOpen = false"
        >
          <template #body>
            <p>This drawer will ask for confirmation before closing if you make a "change".</p>
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
              <input type="checkbox" v-model="hasChanges" />
              I have unsaved changes
            </label>
          </template>
        </Drawer>

        <Dialog
          v-if="isDialogOpen"
          title="Unsaved Changes"
          message="Are you sure you want to discard your changes?"
          :actions="dialogActions"
          persistent
          @close="dialogActions[0].onClick"
        />
      </div>
    `,
  }),
  args: {
    position: 'left',
    size: '50%',
    title: 'Drawer With Confirmation',
    hasHeader: true,
    hasCloseButton: true,
    closeOnOverlayClick: true,
    closeOnEscape: true,
    hasOverlay: true,
    disableBodyScroll: true,
  },
};
