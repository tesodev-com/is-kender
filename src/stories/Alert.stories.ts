import type { Meta, StoryObj } from '@storybook/vue3';
import Alert from 'library-components/Alert';

const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'dark'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    variant: 'solid',
    color: 'primary',
    title: 'Default Alert',
    text: 'This is a default alert',
  },
  render: args => ({
    components: { Alert },
    setup() {
      return { args };
    },
    template: `
    <Alert v-bind="args"></Alert>
    `,
  }),
};

export const Slots: Story = {
  args: {
    variant: 'solid',
    color: 'primary',
    title: 'Default Alert',
    text: 'This is a default alert',
  },
  render: args => ({
    components: { Alert },
    setup() {
      return { args };
    },
    template: `
    <Alert v-bind="args">
      <template #title>
        Default Alert
      </template>
      <template #text>
        This is a default alert
      </template>
    </Alert>
    `,
  }),
};
