import { type Meta, type StoryObj } from '@storybook/vue3';
import Breadcrumb, { type BreadcrumbItemProps } from 'library-components/Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  args: {
    items: [
      { text: 'Home', to: '/' },
      { text: 'Library', to: '/library' },
      { text: 'Data', to: '/library-components/data' },
    ],
  },
};

export default meta;

type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {};

export const SlotItem: Story = {
  render: () => ({
    components: { Breadcrumb },
    setup() {
      const items: BreadcrumbItemProps[] = [
        { text: 'Home', to: '/' },
        { text: 'Library', to: '/library' },
        { text: 'Data', to: '/library-components/data' },
      ];
      return { items };
    },
    template: `<Breadcrumb :items="items">
      <template #item="{item}">{{item.text}}</template>
    </Breadcrumb>`,
  }),
};

export const SlotItemIcon: Story = {
  render: () => ({
    components: { Breadcrumb },
    setup() {
      const items: BreadcrumbItemProps[] = [
        { text: 'Home', to: '/' },
        { text: 'Library', to: '/library', icon: 'at' },
        { text: 'Data', to: '/library-components/data' },
      ];
      return { items };
    },
    template: `<Breadcrumb :items="items">
      <template #at>@</template>
    </Breadcrumb>`,
  }),
};
