import type { Meta, StoryObj } from '@storybook/vue3';
import Button from 'library-components/Button';
import Toast from 'library-components/Toast';
import { useToast } from 'library-composables/useToast';

const meta: Meta<typeof Toast> = {
  title: 'Feedback/Toast',
  component: Toast,
  argTypes: {
    position: {
      control: 'select',
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
    },
    animation: {
      control: 'select',
      options: ['slide-left', 'slide-right', 'slide-up', 'slide-down'],
    },
    listReverse: {
      control: 'boolean',
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
    components: { Toast, Button },
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
        <Button color="primary" @click="sendToastMessage('primary')">Primary</Button>
        <Button color="secondary" @click="sendToastMessage('secondary')">Secondary</Button>
        <Button color="success" @click="sendToastMessage('success')">Success</Button>
        <Button color="info" @click="sendToastMessage('info')">Info</Button>
        <Button color="warning" @click="sendToastMessage('warning')">Warning</Button>
        <Button color="danger" @click="sendToastMessage('danger')">Danger</Button>
        <Button color="dark" @click="sendToastMessage('dark')">Dark</Button>
      </div>
    `,
  }),
};
