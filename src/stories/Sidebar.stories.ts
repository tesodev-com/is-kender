import type { Meta, StoryObj } from '@storybook/vue3';
import Sidebar, { type SidebarProps } from 'library/Sidebar';
import { useSidebar } from '@/composables/useSidebar.ts';
import { homeIcon } from '@/assets/icons';

const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
  title: 'Components/Sidebar',
  argTypes: {
    title: {
      control: 'text',
      description: 'Title of the sidebar',
    },
    links: {
      control: 'object',
      description: 'Array of navigation links',
    },
    closeOnOutsideClick: {
      control: 'boolean',
      description: 'Determines if the sidebar should close when clicking outside',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Determines if the sidebar should close when pressing Escape',
    },
    useRouter: {
      control: 'boolean',
      description: 'Use Vue Router for navigation',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

const commonArgs: Partial<SidebarProps> = {
  title: 'Menu',
  links: [
    { text: 'Home', href: '/', iconSrc: homeIcon },
    { text: 'About', href: '/about', disabled: true },
    { text: 'Contact', href: '/contact', slotKey: 'contact' },
    {
      text: 'Multi Link Active Icon',
      isOpen: false,
      iconSrc: homeIcon,
      children: [
        { text: 'Link1', href: '/link-1' },
        { text: 'Link2', href: '/link-2', slotKey: 'link-2' },
      ],
    },
    {
      text: 'Multi Link Active',
      isOpen: false,
      children: [
        { text: 'Link3', href: '/link-3' },
        { text: 'Link4', href: '/link-4', slotKey: 'link-4' },
      ],
    },
    {
      text: 'Multi Link Disabled',
      isOpen: false,
      disabled: true,
      children: [
        { text: 'Link5', href: '/link-5' },
        { text: 'Link6', href: '/link-6' },
      ],
    },
  ],
  closeOnOutsideClick: true,
  closeOnEscape: true,
  useRouter: false,
};

export const Default: Story = {
  args: {
    ...commonArgs,
  },
  render: args => ({
    components: { Sidebar },
    setup() {
      return { args };
    },
    template: `
      <Sidebar v-bind="args">
        <template #contact="{ text }">
          This is a custom slot {{ text }}
        </template>
        <template #link-2="{ text }">
          This is custom slot {{text}}
        </template>
        <template #link-4="{ text }">
          This is custom slot {{text}}
        </template>
        <template #bottom>
          <div class="sidebar-footer">Footer content</div>
        </template>
      </Sidebar>
    `,
  }),
};

export const WithCustomTitleSlot: Story = {
  args: {
    ...commonArgs,
  },
  render: args => ({
    components: { Sidebar },
    setup() {
      return { args };
    },
    template: `
      <Sidebar v-bind="args">
        <template #title>
          <h3>📂 Custom Sidebar Title</h3>
        </template>
      </Sidebar>
    `,
  }),
};

export const WithoutLinks: Story = {
  args: {
    ...commonArgs,
    links: [],
  },
  render: args => ({
    components: { Sidebar },
    setup() {
      return { args };
    },
    template: `
      <Sidebar v-bind="args">
        <template #title>
          <h3>No Links</h3>
        </template>
      </Sidebar>
    `,
  }),
};

export const Mobile: Story = {
  args: {
    ...commonArgs,
    isMobile: true,
  },
  render: args => ({
    components: { Sidebar },
    setup() {
      const { open } = useSidebar();
      function mockCallback() {
        open(() => console.log('sidebar callback'));
      }
      return { mockCallback, args };
    },
    template: `
      <div style="width:500px;height: 960px;">
        <div>
          <button @click="mockCallback">Open</button>
        </div>
        <Sidebar v-bind="args" @close="console.log('close')">
          <template #bottom>
            <div class="sidebar-footer">Footer content</div>
          </template>
        </Sidebar>
      </div>
    `,
  }),
};
