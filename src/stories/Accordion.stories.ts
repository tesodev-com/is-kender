import type { Meta, StoryObj } from '@storybook/vue3';
import Accordion from 'library-components/Accordion';
import type { AccordionProps } from 'library-components/Accordion/types';
import { ref } from 'vue';

const meta: Meta<typeof Accordion> = {
  title: 'Data-Display/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    accordionIconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the accordion icon (left or right).',
    },
    headerClass: {
      control: 'text',
      description: 'Custom class for the header of the accordion.',
    },
    contentClass: {
      control: 'text',
      description: 'Custom class for the content of the accordion.',
    },
    header: {
      control: 'text',
      description: 'Header text content.',
    },
    content: {
      control: 'text',
      description: 'Content text or HTML content.',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the accordion cannot be toggled.',
    },
    hideIcons: {
      control: 'boolean',
      description: 'If true, hides the toggle icons.',
    },
    openIcon: {
      control: 'text',
      description: 'Custom icon for the open state.',
    },
    closeIcon: {
      control: 'text',
      description: 'Custom icon for the close state.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

const commonArgs: Partial<AccordionProps> = {
  accordionIconPosition: 'right',
};

export const Default: Story = {
  args: {
    ...commonArgs,
    header: 'Default Accordion Header',
    content: 'This is the default content of the accordion.',
  },
};

export const WithHTMLContent: Story = {
  args: {
    ...commonArgs,
    header: 'Accordion with HTML Content',
    content: '<strong>This is HTML content</strong> with <em>some formatting</em>.',
  },
};

export const IconOnLeft: Story = {
  args: {
    ...commonArgs,
    accordionIconPosition: 'left',
    header: 'Icon on Left',
    content: 'This accordion has its icon on the left side.',
  },
};

export const WithSlots: Story = {
  args: {
    ...commonArgs,
    hideIcons: true,
  },
  render: args => ({
    components: { Accordion },
    setup() {
      const isOpen = ref(true);
      return { args, isOpen };
    },
    template: `
      <Accordion v-bind="args" v-model:isOpen="isOpen">
        <template #header="{ isOpen, accordionIconPosition }">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span>{{ accordionIconPosition === 'left' ? '⬅️' : '➡️' }}</span>
            <span>Custom Header</span>
            <span>{{ isOpen ? '🔼' : '🔽' }}</span>
          </div>
        </template>
        <template #content="{ isOpen }">
          <div>
            <h3>Content Title</h3>
            <p>This content is rendered using slots.</p>
            <p>Current state: {{ isOpen ? 'Open' : 'Closed' }}</p>
          </div>
        </template>
      </Accordion>
    `,
  }),
};

export const EmitsEvent: Story = {
  args: {
    ...commonArgs,
    header: 'Event Emitting Accordion',
    content: 'This accordion will emit events when opened/closed.',
  },
  render: args => ({
    components: { Accordion },
    setup() {
      const isOpen = ref(false);
      const handleOpen = () => {
        console.log('Event: open');
      };
      const handleClose = () => {
        console.log('Event: close');
      };
      return { args, isOpen, handleOpen, handleClose };
    },
    template: `
      <Accordion 
        v-bind="args"
        v-model:isOpen="isOpen"
        @open="handleOpen"
        @close="handleClose"
      />
    `,
  }),
};

export const Disabled: Story = {
  args: {
    ...commonArgs,
    disabled: true,
    header: 'Disabled Accordion',
    content: 'This accordion is disabled and cannot be toggled.',
  },
};

export const WithCustomIcons: Story = {
  args: {
    ...commonArgs,
    header: 'Accordion with Custom Icons',
    content: 'This accordion uses custom icons for open/close states.',
    openIcon: 'custom-open-icon',
    closeIcon: 'custom-close-icon',
  },
};

export const MultipleAccordions: Story = {
  args: {
    ...commonArgs,
  },
  render: args => ({
    components: { Accordion },
    setup() {
      const isOpen = ref(true);
      return { args, isOpen };
    },
    template: `
      <div class="space-y-4">
        <Accordion v-bind="args" v-model:isOpen="isOpen" header="First Accordion" content="First Accordion Content" />
        <Accordion v-bind="args" header="Second Accordion" content="Second Accordion Content" />
        <Accordion v-bind="args" header="Third Accordion" content="Third Accordion Content" />
      </div>
    `,
  }),
};
