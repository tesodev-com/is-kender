import type { Meta, StoryObj } from '@storybook/vue3';
import Tab from 'library-components/Tab';
import TabPanel from 'library-components/TabPanel';
import Tabs from 'library-components/Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: args => ({
    components: { Tab, TabPanel, Tabs },
    setup() {
      return { args };
    },
    template: `
    <Tabs title="Tabsss">
      <TabPanel name="Tab 1">Tab Panel-1</TabPanel>
      <TabPanel name="Tab 2" disabled>Tab Panel-2</TabPanel>
      <TabPanel name="Tab 3"><TabPanel>asdfadsf</TabPanel></TabPanel>
      <TabPanel v-for="i in 5" :key="i" :name="'Tab ' + (i + 3)">Panel{{i}}</TabPanel>
      <div>test</div>
      <Tab></Tab>
    </Tabs>
    `,
  }),
};
export const CustomTabButton: Story = {
  render: args => ({
    components: { Tab, TabPanel, Tabs },
    setup() {
      return { args };
    },
    template: `
    <Tabs title="Tabsss">
      <template #tabList>
        <Tab name="Tab 1">Tab1 Long Content Slot</Tab>
        <Tab name="Tab 2">Tab2 Long Content Slot</Tab>
        <Tab v-for="i in 5" :key="i" :name="i">Tab {{i+2}}</Tab>
      </template>
      <TabPanel name="Tab1">Tab Panel-1</TabPanel>
      <TabPanel name="Tab1">Tab Panel-3</TabPanel>
      <TabPanel name="Tab1">Tab Panel-4</TabPanel>
      <TabPanel name="Tab1">Tab Panel-2</TabPanel>
      <TabPanel name="Tab1">Tab Panel-2</TabPanel>
      <TabPanel name="Tab1">Tab Panel-2</TabPanel>
    </Tabs>
    `,
  }),
};
