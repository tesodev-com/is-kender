import type { Meta, StoryObj } from '@storybook/vue3';
import Accordion from 'library-components/Accordion';
import type { AccordionItemProps, AccordionProps } from 'library-components/Accordion/types';

const meta: Meta<typeof Accordion> = {
  component: Accordion,
  title: 'Data-Display/Accordion',
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
    headerClass: {
      control: 'text',
      description: 'Custom class for the header of the accordion.',
    },
    contentClass: {
      control: 'text',
      description: 'Custom class for the content of the accordion.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

const commonArgs: Partial<AccordionProps> = {
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
  } as AccordionProps,
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
  } as AccordionProps,
  render: args => ({
    components: { Accordion },
    setup() {
      const handleOpenedAccordion = (item: AccordionItemProps, index: number) => {
        console.log('Event: openedAccordion', { item, index });
      };
      const handleClosedAccordion = (item: AccordionItemProps, index: number) => {
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

export const WithSlots: Story = {
  args: {
    allowMultiple: false,
    accordionIconPosition: 'right',
    separator: false,
    isOpen: true,
  } as AccordionProps,
  render: args => ({
    components: { Accordion },
    setup() {
      return { args };
    },
    template: `
      <Accordion v-bind="args">
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

export const MixedUsage: Story = {
  args: {
    allowMultiple: true,
    accordionIconPosition: 'right',
    separator: true,
  } as AccordionProps,
  render: args => ({
    components: { Accordion },
    setup() {
      const items: AccordionItemProps[] = [
        { title: 'Array Item 1', content: 'Content from array items' },
        { title: 'Array Item 2', content: 'Another content from array items' },
      ];
      return { args, items };
    },
    template: `
      <Accordion v-bind="args" :items="items">
        <template #header-0>
          Component Item 1
        </template>
        <template #content-0>
          <div>
            <h3>Component Item 1 Content</h3>
            <p>This content is rendered using slots.</p>
          </div>
        </template>

        <template #header-1>
          Component Item 2
        </template>
        <template #content-1>
          <div>
            <h3>Component Item 2 Content</h3>
            <p>This content is rendered using slots.</p>
          </div>
        </template>
      </Accordion>
    `,
  }),
};

export const MultipleAccordions: Story = {
  args: {
    allowMultiple: false,
    accordionIconPosition: 'right',
    separator: true,
  } as AccordionProps,
  render: args => ({
    components: { Accordion },
    setup() {
      return { args };
    },
    template: `
      <div class="space-y-4">
        <Accordion v-bind="args">
          <template #header="{ isOpen }">
            First Accordion Header {{ isOpen ? '🔼' : '🔽' }}
          </template>
          <template #content>First Accordion Content</template>
        </Accordion>

        <Accordion v-bind="args">
          <template #header="{ isOpen }">
            Second Accordion Header {{ isOpen ? '🔼' : '🔽' }}
          </template>
          <template #content>Second Accordion Content</template>
        </Accordion>

        <Accordion v-bind="args">
          <template #header="{ isOpen }">
            Third Accordion Header {{ isOpen ? '🔼' : '🔽' }}
          </template>
          <template #content>Third Accordion Content</template>
        </Accordion>
      </div>
    `,
  }),
};
