import type { Meta, StoryObj } from '@storybook/vue3';
import Toast from 'library-components/Toast';
import { useToast } from 'library-composables/useToast';

const meta: Meta<typeof Toast> = {
  title: 'Messaging/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
    },
    animation: {
      control: 'select',
      options: ['slide-left', 'slide-right', 'slide-up', 'slide-down'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {
    position: 'top-right',
    animation: 'slide-right',
  },
  render: args => ({
    components: { Toast },
    setup() {
      const { add } = useToast();
      function sendToastMessage(color: any) {
        add({
          title: 'Hello, World!',
          message: 'This is a toast message',
          color,
          life: 3000,
        });
      }

      return { sendToastMessage, args };
    },
    template: `
      <Toast v-bind="args" />
      <div style="display: flex; gap: 0.5rem;">
        <button @click="sendToastMessage('primary')">Primary</button>
        <button @click="sendToastMessage('secondary')">Secondary</button>
        <button @click="sendToastMessage('success')">Success</button>
        <button @click="sendToastMessage('info')">Info</button>
        <button @click="sendToastMessage('warning')">Warning</button>
        <button @click="sendToastMessage('danger')">Danger</button>
        <button @click="sendToastMessage('dark')">Dark</button>
      </div>
    `,
  }),
};
