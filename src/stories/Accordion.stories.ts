import type { Meta, StoryObj } from '@storybook/vue3';
import Accordion, { type IAccordionItem } from '@/components/Accordion/Accordion.vue';

const meta: Meta<typeof Accordion> = {
  component: Accordion,
  title: 'Components/Accordion',
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of accordion items with title, content, and optional slotKey.',
    },
    allowMultiple: {
      control: 'boolean',
      description: 'If true, allows multiple accordion items to be open at the same time.',
    },
    accordionIconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the accordion icon (left or right).',
    },
    separator: {
      control: 'boolean',
      description: 'If true, adds a separator between accordion items.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

const commonArgs: Partial<Story['args']> = {
  items: [
    { title: 'Item 1', content: 'This is plain text content for item 1.' },
    { title: 'Item 2', content: '<strong>This is HTML content for item 2.</strong>' },
    { title: 'Item 3', slotKey: 'customSlot' },
    { title: 'Item 4', content: 'This is plain text content for item 1.', disabled: true },
  ],
  allowMultiple: false,
  accordionIconPosition: 'right',
  separator: false,
};

export const Default: Story = {
  args: {
    ...commonArgs,
  },
  render: args => ({
    components: { Accordion },
    setup() {
      return { args };
    },
    template: `
      <Accordion v-bind="args">
        <template #customSlot="{ title }">
          <div>
            <h3>{{ title }}</h3>
            <p>This content is rendered using a slot.</p>
          </div>
        </template>
      </Accordion>
    `,
  }),
};

export const MultipleOpen: Story = {
  args: {
    ...commonArgs,
    allowMultiple: true,
  },
  render: args => ({
    components: { Accordion },
    setup() {
      return { args };
    },
    template: `
      <Accordion v-bind="args">
        <template #customSlot="{ title }">
          <div>
            <h3>{{ title }}</h3>
            <p>This content is rendered using a slot.</p>
          </div>
        </template>
      </Accordion>
    `,
  }),
};

export const IconOnLeft: Story = {
  args: {
    ...commonArgs,
    accordionIconPosition: 'left',
  },
  render: args => ({
    components: { Accordion },
    setup() {
      return { args };
    },
    template: `
      <Accordion v-bind="args">
        <template #customSlot="{ title }">
          <div>
            <h3>{{ title }}</h3>
            <p>This content is rendered using a slot.</p>
          </div>
        </template>
      </Accordion>
    `,
  }),
};

export const WithSeparator: Story = {
  args: {
    ...commonArgs,
    separator: true,
  },
  render: args => ({
    components: { Accordion },
    setup() {
      return { args };
    },
    template: `
      <Accordion v-bind="args">
        <template #customSlot="{ title }">
          <div>
            <h3>{{ title }}</h3>
            <p>This content is rendered using a slot.</p>
          </div>
        </template>
      </Accordion>
    `,
  }),
};

export const CustomTitleSlot: Story = {
  args: {
    ...commonArgs,
  },
  render: args => ({
    components: { Accordion },
    setup() {
      return { args };
    },
    template: `
      <Accordion v-bind="args">
        <template #title="{ title }">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span>⭐</span>
            <span>{{ title }}</span>
          </div>
        </template>
        <template #customSlot="{ title }">
          <div>
            <h3>{{ title }}</h3>
            <p>This content is rendered using a slot.</p>
          </div>
        </template>
      </Accordion>
    `,
  }),
};

export const NoContentWithSlotKey: Story = {
  args: {
    items: [
      { title: 'Item 1', slotKey: 'customSlot1' },
      { title: 'Item 2', slotKey: 'customSlot2' },
    ],
    allowMultiple: false,
    accordionIconPosition: 'right',
    separator: false,
  },
  render: args => ({
    components: { Accordion },
    setup() {
      return { args };
    },
    template: `
      <Accordion v-bind="args">
        <template #customSlot1="{ title }">
          <div>
            <h3>{{ title }}</h3>
            <p>This content is rendered using a slot.</p>
          </div>
        </template>
        <template #customSlot2="{ title }">
          <div>
            <h3>{{ title }}</h3>
            <p>This content is rendered using a slot.</p>
            <p>This content is rendered using a slot.</p>
          </div>
        </template>
      </Accordion>
    `,
  }),
};

export const EmitsEvent: Story = {
  args: {
    items: [
      { title: 'Item 1', slotKey: 'customSlot1' },
      { title: 'Item 2', slotKey: 'customSlot2' },
    ],
    allowMultiple: false,
    accordionIconPosition: 'right',
    separator: false,
  },
  render: args => ({
    components: { Accordion },
    setup() {
      const handleOpenedAccordion = (item: IAccordionItem, index: number) => {
        console.log('Event: openedAccordion', { item, index });
      };
      const handleClosedAccordion = (item: IAccordionItem, index: number) => {
        console.log('Event: closedAccordion', { item, index });
      };
      return { args, handleOpenedAccordion, handleClosedAccordion };
    },
    template: `
      <Accordion 
         v-bind="args"
         @openedAccordion="handleOpenedAccordion"
         @closedAccordion="handleClosedAccordion"
      >
        <template #customSlot1="{ title }">
          <div>
            <h3>{{ title }}</h3>
            <p>This content is rendered using a slot.</p>
          </div>
        </template>
        <template #customSlot2="{ title }">
          <div>
            <h3>{{ title }}</h3>
            <p>This content is rendered using a slot.</p>
            <p>This content is rendered using a slot.</p>
          </div>
        </template>
      </Accordion>
    `,
  }),
};
