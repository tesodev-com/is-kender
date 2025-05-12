import { documentIcon, editIcon, emailIcon, homeIcon } from '@/assets/icons';
import type { Meta, StoryObj } from '@storybook/vue3';
import Svg from 'library-components/Svg';
import Tab from 'library-components/Tab';
import TabContent from 'library-components/TabContent';
import Tabs, { type TabsProps } from 'library-components/Tabs';
import TabsList, { type TabSize, type TabsListProps, type TabsTheme, type TabsThemeColor } from 'library-components/TabsList';
import { onMounted, ref } from 'vue';

interface CompositeProps extends TabsProps {
  tabsSize?: TabSize;
  indicatorMode?: TabsListProps['indicatorMode'];
  indicatorThickness?: TabsListProps['indicatorThickness'];
  indicatorColor?: TabsListProps['indicatorColor'];
  fluid?: TabsListProps['fluid'];
  theme?: TabsTheme;
  themeColor?: TabsThemeColor;
}

const meta: Meta<CompositeProps> = {
  title: 'Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  subcomponents: { TabsList, Tab, TabContent },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      defaultValue: 'horizontal',
      table: {
        defaultValue: { summary: 'horizontal' },
        category: 'Tabs props',
      },
    },
    defaultValue: {
      control: 'text',
      defaultValue: 'tab1',
      table: {
        defaultValue: { summary: 'undefined' },
        category: 'Tabs props',
      },
    },
    onValueChange: {
      table: {
        category: 'Tabs props',
      },
    },
    tabsDirection: {
      control: 'select',
      options: ['before', 'after'],
      defaultValue: 'after',
      table: {
        defaultValue: { summary: 'after' },
        category: 'TabsList props',
      },
    },
    indicatorMode: {
      control: 'select',
      options: ['static', 'sliding'],
      defaultValue: 'static',
      table: {
        defaultValue: { summary: 'static' },
        category: 'TabsList props',
      },
    },
    indicatorThickness: {
      control: 'number',
      defaultValue: 2,
      table: {
        defaultValue: { summary: '2' },
        category: 'TabsList props',
      },
    },
    indicatorColor: {
      control: 'color',
      table: {
        category: 'TabsList props',
      },
    },
    tabsSize: {
      control: 'select',
      options: ['sm', 'md'],
      defaultValue: 'sm',
      table: {
        defaultValue: { summary: 'sm' },
        category: 'TabsList props',
      },
    },
    fluid: {
      control: 'boolean',
      defaultValue: false,
      table: {
        defaultValue: { summary: 'false' },
        category: 'TabsList props',
      },
    },
    theme: {
      control: 'select',
      options: ['line', 'button', 'segmented', 'segmented-minimal'],
      defaultValue: 'line',
      table: {
        defaultValue: { summary: 'line' },
        category: 'TabsList props',
      },
    },
    themeColor: {
      control: 'select',
      options: ['primary', 'gray'],
      defaultValue: 'primary',
      table: {
        defaultValue: { summary: 'primary' },
        category: 'TabsList props',
      },
    },
  },
} satisfies Meta<CompositeProps>;

export default meta;
type Story = StoryObj<CompositeProps>;

export const Default: Story = {
  render: args => ({
    components: { Tabs, TabsList, Tab, TabContent },
    setup() {
      return { args };
    },
    template: `
    <div style="height: 400px; border: 1px dashed #ccc; padding: 10px;">
      <Tabs :defaultValue="args.defaultValue" :orientation="args.orientation" :tabsDirection="args.tabsDirection" >
        <TabsList :indicatorMode="args.indicatorMode" :indicatorThickness="args.indicatorThickness" :indicatorColor="args.indicatorColor" :tabsSize="args.tabsSize" :fluid="args.fluid" :theme="args.theme" :themeColor="args.themeColor">
          <Tab value="tab1">Hesap</Tab>
          <Tab value="tab2">Dökümanlar</Tab>
          <Tab value="tab3">Ayarlar</Tab>
        </TabsList>

        <TabContent value="tab1">
          Hesap ayarlarınızı değiştirin.
        </TabContent>

        <TabContent value="tab2">
          Dökümanlarınıza erişin ve güncelleyin.
        </TabContent>

        <TabContent value="tab3">
          Profilinizi düzenleyin veya iletişim bilgilerinizi güncelleyin.
        </TabContent>
      </Tabs>
    </div>
    `,
  }),
  args: {
    tabsSize: 'sm',
    tabsDirection: 'after',
    indicatorMode: 'static',
    indicatorThickness: 2,
    defaultValue: 'tab1',
  },
};

export const WithIconsOnly: Story = {
  render: args => ({
    components: { Tabs, TabsList, Tab, TabContent, Svg },
    setup() {
      return { args, homeIcon, documentIcon, editIcon };
    },
    template: `
    <div style="height: 400px; border: 1px dashed #ccc; padding: 10px;">
      <Tabs :defaultValue="args.defaultValue" :orientation="args.orientation" :tabsDirection="args.tabsDirection" >
        <TabsList :indicatorMode="args.indicatorMode" :indicatorThickness="args.indicatorThickness" :indicatorColor="args.indicatorColor" :tabsSize="args.tabsSize" :fluid="args.fluid" :theme="args.theme" :themeColor="args.themeColor">
          <Tab value="tab1">
            <Svg :src="homeIcon" size="20" />
          </Tab>
          <Tab value="tab2">
            <Svg :src="documentIcon" size="20" />
          </Tab>
          <Tab value="tab3">
            <Svg :src="editIcon" size="20" />
          </Tab>
        </TabsList>

        <TabContent value="tab1">
          <h3>Ana Sayfa</h3>
          <p>Ana sayfa içeriğine hoş geldiniz.</p>
        </TabContent>

        <TabContent value="tab2">
          <h3>Dökümanlar</h3>
          <p>Dökümanlarınıza buradan erişebilirsiniz.</p>
        </TabContent>

        <TabContent value="tab3">
          <h3>Ayarlar</h3>
          <p>Sistem ayarlarınızı buradan yönetebilirsiniz.</p>
        </TabContent>
      </Tabs>
    </div>
    `,
  }),
  args: {
    tabsSize: 'md',
    tabsDirection: 'after',
    indicatorMode: 'sliding',
    indicatorThickness: 2,
    defaultValue: 'tab1',
    theme: 'line',
    themeColor: 'primary',
  },
};

export const WithIconsAndText: Story = {
  render: args => ({
    components: { Tabs, TabsList, Tab, TabContent, Svg },
    setup() {
      return { args, homeIcon, documentIcon, editIcon };
    },
    template: `
    <div style="height: 400px; border: 1px dashed #ccc; padding: 10px;">
      <Tabs :defaultValue="args.defaultValue" :orientation="args.orientation" :tabsDirection="args.tabsDirection" >
        <TabsList :indicatorMode="args.indicatorMode" :indicatorThickness="args.indicatorThickness" :indicatorColor="args.indicatorColor" :tabsSize="args.tabsSize" :fluid="args.fluid" :theme="args.theme" :themeColor="args.themeColor">
          <Tab value="tab1">
            <Svg :src="homeIcon" size="20" style="margin-right: 8px;" />
            Ana Sayfa
          </Tab>
          <Tab value="tab2">
            <Svg :src="documentIcon" size="20" style="margin-right: 8px;" />
            Dökümanlar
          </Tab>
          <Tab value="tab3">
            <Svg :src="editIcon" size="20" style="margin-right: 8px;" />
            Ayarlar
          </Tab>
        </TabsList>

        <TabContent value="tab1">
          <h3>Ana Sayfa</h3>
          <p>Ana sayfa içeriğine hoş geldiniz.</p>
        </TabContent>

        <TabContent value="tab2">
          <h3>Dökümanlar</h3>
          <p>Dökümanlarınıza buradan erişebilirsiniz.</p>
        </TabContent>

        <TabContent value="tab3">
          <h3>Ayarlar</h3>
          <p>Sistem ayarlarınızı buradan yönetebilirsiniz.</p>
        </TabContent>
      </Tabs>
    </div>
    `,
  }),
  args: {
    tabsSize: 'md',
    tabsDirection: 'after',
    indicatorMode: 'static',
    indicatorThickness: 2,
    defaultValue: 'tab1',
  },
};

export const WithDisabledTab: Story = {
  render: args => ({
    components: { Tabs, TabsList, Tab, TabContent },
    setup() {
      return { args };
    },
    template: `
     <Tabs :defaultValue="args.defaultValue" :orientation="args.orientation" :tabsDirection="args.tabsDirection" >
        <TabsList :indicatorMode="args.indicatorMode" :indicatorThickness="args.indicatorThickness" :indicatorColor="args.indicatorColor" :tabsSize="args.tabsSize" :fluid="args.fluid" :theme="args.theme" :themeColor="args.themeColor">
          <Tab value="tab1">Aktif</Tab>
          <Tab value="tab2" disabled>Devre Dışı</Tab>
          <Tab value="tab3">Aktif</Tab>
        </TabsList>

        <TabContent value="tab1">
          Tab içeriği 1
        </TabContent>

        <TabContent value="tab2">
          Bu içerik devre dışı tab'a ait
        </TabContent>

        <TabContent value="tab3">
          Tab içeriği 3
        </TabContent>
      </Tabs>
    `,
  }),
  args: {
    tabsSize: 'sm',
    tabsDirection: 'after',
    indicatorMode: 'static',
    indicatorThickness: 2,
    fluid: false,
    theme: 'line',
    themeColor: 'primary',
    defaultValue: 'tab1',
  },
};

export const WithSlidingIndicator: Story = {
  render: args => ({
    components: { Tabs, TabsList, Tab, TabContent },
    setup() {
      return { args };
    },
    template: `
       <Tabs :defaultValue="args.defaultValue" :orientation="args.orientation" :tabsDirection="args.tabsDirection" >
        <TabsList :indicatorMode="args.indicatorMode" :indicatorThickness="args.indicatorThickness" :indicatorColor="args.indicatorColor" :tabsSize="args.tabsSize" :fluid="args.fluid" :theme="args.theme" :themeColor="args.themeColor">
          <Tab value="tab1">Tab 1</Tab>
          <Tab value="tab2">Uzun Tab İsmi</Tab>
          <Tab value="tab3">Tab 3</Tab>
        </TabsList>

        <TabContent value="tab1">Tab içeriği 1</TabContent>
        <TabContent value="tab2">Tab içeriği 2</TabContent>
        <TabContent value="tab3">Tab içeriği 3</TabContent>
      </Tabs>
    `,
  }),
  args: {
    tabsSize: 'sm',
    indicatorThickness: 2,
    indicatorMode: 'sliding',
    fluid: false,
    theme: 'line',
    themeColor: 'primary',
    defaultValue: 'tab1',
  },
};

export const FluidTabs: Story = {
  render: args => ({
    components: { Tabs, TabsList, Tab, TabContent },
    setup() {
      return { args };
    },
    template: `
        <Tabs :defaultValue="args.defaultValue" :orientation="args.orientation" :tabsDirection="args.tabsDirection" >
        <TabsList :indicatorMode="args.indicatorMode" :indicatorThickness="args.indicatorThickness" :indicatorColor="args.indicatorColor" :tabsSize="args.tabsSize" :fluid="args.fluid" :theme="args.theme" :themeColor="args.themeColor">
          <Tab value="tab1">Tab 1</Tab>
          <Tab value="tab2">Tab 2</Tab>
          <Tab value="tab3">Tab 3</Tab>
          <Tab value="tab4">Tab 4</Tab>
        </TabsList>

        <TabContent value="tab1">Fluid Tab içeriği 1</TabContent>
        <TabContent value="tab2">Fluid Tab içeriği 2</TabContent>
        <TabContent value="tab3">Fluid Tab içeriği 3</TabContent>
        <TabContent value="tab4">Fluid Tab içeriği 4</TabContent>
      </Tabs>
    `,
  }),
  args: {
    tabsSize: 'sm',
    tabsDirection: 'after',
    indicatorMode: 'static',
    indicatorThickness: 2,
    fluid: true,
    defaultValue: 'tab1',
  },
};

export const WithTopIndicator: Story = {
  render: args => ({
    components: { Tabs, TabsList, Tab, TabContent },
    setup() {
      return { args };
    },
    template: `
    <Tabs :defaultValue="args.defaultValue" :orientation="args.orientation" :tabsDirection="args.tabsDirection" >
        <TabsList :indicatorMode="args.indicatorMode" :indicatorThickness="args.indicatorThickness" :indicatorColor="args.indicatorColor" :tabsSize="args.tabsSize" :fluid="args.fluid" :theme="args.theme" :themeColor="args.themeColor">
          <Tab value="tab1">Tab 1</Tab>
          <Tab value="tab2">Tab 2</Tab>
          <Tab value="tab3">Tab 3</Tab>
        </TabsList>

        <TabContent value="tab1">Tab içeriği 1</TabContent>
        <TabContent value="tab2">Tab içeriği 2</TabContent>
        <TabContent value="tab3">Tab içeriği 3</TabContent>
      </Tabs>
    `,
  }),
  args: {
    tabsSize: 'sm',
    indicatorMode: 'static',
    indicatorThickness: 3,
    fluid: false,
    tabsDirection: 'before',
    defaultValue: 'tab1',
  },
};

export const MediumSizedTabs: Story = {
  render: args => ({
    components: { Tabs, TabsList, Tab, TabContent },
    setup() {
      return { args };
    },
    template: `
     <Tabs :defaultValue="args.defaultValue" :orientation="args.orientation" :tabsDirection="args.tabsDirection" >
        <TabsList :indicatorMode="args.indicatorMode" :indicatorThickness="args.indicatorThickness" :indicatorColor="args.indicatorColor" :tabsSize="args.tabsSize" :fluid="args.fluid" :theme="args.theme" :themeColor="args.themeColor">
          <Tab value="tab1">Tab 1</Tab>
          <Tab value="tab2">Tab 2</Tab>
          <Tab value="tab3">Tab 3</Tab>
        </TabsList>

        <TabContent value="tab1">Medium boyutlu tab içeriği 1</TabContent>
        <TabContent value="tab2">Medium boyutlu tab içeriği 2</TabContent>
        <TabContent value="tab3">Medium boyutlu tab içeriği 3</TabContent>
      </Tabs>
    `,
  }),
  args: {
    tabsDirection: 'after',
    indicatorMode: 'static',
    indicatorThickness: 2,
    fluid: false,
    tabsSize: 'md',
    defaultValue: 'tab1',
    theme: 'line',
    themeColor: 'primary',
  },
};

export const CustomColoredIndicator: Story = {
  render: args => ({
    components: { Tabs, TabsList, Tab, TabContent, Svg },
    setup() {
      return { args, homeIcon, documentIcon, editIcon };
    },
    template: `
     <Tabs :defaultValue="args.defaultValue" :orientation="args.orientation" :tabsDirection="args.tabsDirection" >
        <TabsList :indicatorMode="args.indicatorMode" :indicatorThickness="args.indicatorThickness" :indicatorColor="args.indicatorColor" :tabsSize="args.tabsSize" :fluid="args.fluid" :theme="args.theme" :themeColor="args.themeColor">
          <Tab value="tab1">
            <Svg :src="homeIcon" size="20" class="mr-2" />
            Tab 1
          </Tab>
          <Tab value="tab2">
            <Svg :src="documentIcon" size="20" class="mr-2" />
            Tab 2
          </Tab>
          <Tab value="tab3">
            <Svg :src="editIcon" size="20" class="mr-2" />
            Tab 3
          </Tab>
        </TabsList>

        <TabContent value="tab1">Özel renkli indicator tab içeriği 1</TabContent>
        <TabContent value="tab2">Özel renkli indicator tab içeriği 2</TabContent>
        <TabContent value="tab3">Özel renkli indicator tab içeriği 3</TabContent>
      </Tabs>
    `,
  }),
  args: {
    tabsSize: 'md',
    tabsDirection: 'after',
    indicatorMode: 'sliding',
    indicatorColor: '#EF4444',
    indicatorThickness: 4,
    fluid: false,
    theme: 'line',
    themeColor: 'primary',
    defaultValue: 'tab1',
  },
};

export const IconsWithNotification: Story = {
  render: args => ({
    components: { Tabs, TabsList, Tab, TabContent, Svg },
    setup() {
      return { args, homeIcon, documentIcon, editIcon, emailIcon };
    },
    template: `
     <Tabs :defaultValue="args.defaultValue" :orientation="args.orientation" :tabsDirection="args.tabsDirection" >
        <TabsList :indicatorMode="args.indicatorMode" :indicatorThickness="args.indicatorThickness" :indicatorColor="args.indicatorColor" :tabsSize="args.tabsSize" :fluid="args.fluid" :theme="args.theme" :themeColor="args.themeColor">
          <Tab value="tab1">
            <Svg :src="homeIcon" size="20" style="margin-right: 8px;" />
            Ana Sayfa
          </Tab>
          <Tab value="tab2">
            <Svg :src="documentIcon" size="20" style="margin-right: 8px;" />
            Dökümanlar
          </Tab>
          <Tab value="tab3">
            <div style="position: relative; margin-right: 8px;">
              <Svg :src="emailIcon" size="20" style="margin-right: 8px;" />
              <span style="position: absolute; top: -4px; right: -4px; background-color: #EF4444; color: white; font-size: 12px; width: 16px; height: 16px; display: flex; align-items: center; justify-content: center; border-radius: 9999px;">3</span>
            </div>
            Mesajlar
          </Tab>
          <Tab value="tab4">
            <Svg :src="editIcon" size="20" style="margin-right: 8px;" />
            Ayarlar
          </Tab>
        </TabsList>

        <TabContent value="tab1">Ana Sayfa içeriği</TabContent>
        <TabContent value="tab2">Dökümanlar içeriği</TabContent>
        <TabContent value="tab3">Mesajlar içeriği</TabContent>
        <TabContent value="tab4">Ayarlar içeriği</TabContent>
      </Tabs>
    `,
  }),
  args: {
    tabsSize: 'md',
    tabsDirection: 'after',
    indicatorMode: 'static',
    indicatorThickness: 2,
    fluid: true,
    defaultValue: 'tab1',
    theme: 'line',
    themeColor: 'primary',
  },
};

export const VerticalTabs: Story = {
  render: args => ({
    components: { Tabs, TabsList, Tab, TabContent, Svg },
    setup() {
      return { args, homeIcon, documentIcon, editIcon };
    },
    template: `
      <div style="height: 300px; border: 1px dashed #ccc; padding: 10px; display: flex;">
       <Tabs :defaultValue="args.defaultValue" :orientation="args.orientation" :tabsDirection="args.tabsDirection" >
        <TabsList :indicatorMode="args.indicatorMode" :indicatorThickness="args.indicatorThickness" :indicatorColor="args.indicatorColor" :tabsSize="args.tabsSize" :fluid="args.fluid" :theme="args.theme" :themeColor="args.themeColor">
            <Tab value="tab1">
              <Svg :src="homeIcon" size="20" style="margin-right: 8px;" />
              Ana Sayfa
            </Tab>
            <Tab value="tab2">
              <Svg :src="documentIcon" size="20" style="margin-right: 8px;" />
              Dökümanlar
            </Tab>
            <Tab value="tab3">
              <Svg :src="editIcon" size="20" style="margin-right: 8px;" />
              Ayarlar
            </Tab>
          </TabsList>

          <TabContent value="tab1" style="margin-left: 16px; flex: 1;">
            <h3>Ana Sayfa</h3>
            <p>Dikey yerleşimli Ana Sayfa içeriği</p>
          </TabContent>
          <TabContent value="tab2" style="margin-left: 16px; flex: 1;">
            <h3>Dökümanlar</h3>
            <p>Dikey yerleşimli Dökümanlar içeriği</p>
          </TabContent>
          <TabContent value="tab3" style="margin-left: 16px; flex: 1;">
            <h3>Ayarlar</h3>
            <p>Dikey yerleşimli Ayarlar içeriği</p>
          </TabContent>
        </Tabs>
      </div>
    `,
  }),
  args: {
    tabsSize: 'md',
    tabsDirection: 'after',
    indicatorMode: 'sliding',
    indicatorThickness: 2,
    fluid: false,
    orientation: 'vertical',
    defaultValue: 'tab1',
    theme: 'line',
    themeColor: 'primary',
  },
};

export const VerticalFluidTabs: Story = {
  render: args => ({
    components: { Tabs, TabsList, Tab, TabContent },
    setup() {
      return { args };
    },
    template: `
      <div style="height: 300px; border: 1px dashed #ccc; padding: 10px; display: flex;">
       <Tabs :defaultValue="args.defaultValue" :orientation="args.orientation" :tabsDirection="args.tabsDirection" >
        <TabsList :indicatorMode="args.indicatorMode" :indicatorThickness="args.indicatorThickness" :indicatorColor="args.indicatorColor" :tabsSize="args.tabsSize" :fluid="args.fluid" :theme="args.theme" :themeColor="args.themeColor">
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
            <Tab value="tab3">Tab 3</Tab>
            <Tab value="tab4">Tab 4</Tab>
          </TabsList>

          <TabContent value="tab1" class="ml-4 flex-1">Dikey fluid Tab içeriği 1</TabContent>
          <TabContent value="tab2" class="ml-4 flex-1">Dikey fluid Tab içeriği 2</TabContent>
          <TabContent value="tab3" class="ml-4 flex-1">Dikey fluid Tab içeriği 3</TabContent>
          <TabContent value="tab4" class="ml-4 flex-1">Dikey fluid Tab içeriği 4</TabContent>
        </Tabs>
      </div>
    `,
  }),
  args: {
    tabsSize: 'sm',
    tabsDirection: 'after',
    indicatorMode: 'static',
    indicatorThickness: 2,
    fluid: true,
    orientation: 'vertical',
    defaultValue: 'tab1',
    theme: 'line',
    themeColor: 'primary',
  },
};

export const ControlledWithVModel: Story = {
  render: args => ({
    components: { Tabs, TabsList, Tab, TabContent },
    setup() {
      const activeTab = ref('tab1');
      return { args, activeTab };
    },
    template: `
      <div>
        <p class="mb-4">Aktif Tab: {{ activeTab }}</p>
        <Tabs v-model="activeTab" :orientation="args.orientation" :tabsDirection="args.tabsDirection" >
          <TabsList :indicatorMode="args.indicatorMode" :indicatorThickness="args.indicatorThickness" :indicatorColor="args.indicatorColor" :tabsSize="args.tabsSize" :fluid="args.fluid" :theme="args.theme" :themeColor="args.themeColor">
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
            <Tab value="tab3">Tab 3</Tab>
          </TabsList>

          <TabContent value="tab1">v-model ile kontrol edilen Tab 1 içeriği</TabContent>
          <TabContent value="tab2">v-model ile kontrol edilen Tab 2 içeriği</TabContent>
          <TabContent value="tab3">v-model ile kontrol edilen Tab 3 içeriği</TabContent>
        </Tabs>
      </div>
    `,
  }),
  args: {
    tabsSize: 'sm',
    tabsDirection: 'after',
    indicatorMode: 'static',
    indicatorThickness: 2,
    fluid: false,
    theme: 'line',
    themeColor: 'primary',
  },
};

export const ControlledWithProps: Story = {
  render: args => ({
    components: { Tabs, TabsList, Tab, TabContent },
    setup() {
      const activeTab = ref('tab1');

      const handleTabChange = (value: string) => {
        console.log('Tab changed to:', value);
        activeTab.value = value;
      };

      return { args, activeTab, handleTabChange };
    },
    template: `
      <div>
        <p class="mb-4">Aktif Tab: {{ activeTab }}</p>
        <Tabs :modelValue="activeTab" :onValueChange="handleTabChange" :orientation="args.orientation" :tabsDirection="args.tabsDirection" >
          <TabsList :indicatorMode="args.indicatorMode" :indicatorThickness="args.indicatorThickness" :indicatorColor="args.indicatorColor" :tabsSize="args.tabsSize" :fluid="args.fluid" :theme="args.theme" :themeColor="args.themeColor">
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
            <Tab value="tab3">Tab 3</Tab>
          </TabsList>

          <TabContent value="tab1">Props ile kontrol edilen Tab 1 içeriği</TabContent>
          <TabContent value="tab2">Props ile kontrol edilen Tab 2 içeriği</TabContent>
          <TabContent value="tab3">Props ile kontrol edilen Tab 3 içeriği</TabContent>
        </Tabs>
      </div>
    `,
  }),
  args: {
    tabsSize: 'sm',
    tabsDirection: 'after',
    indicatorMode: 'static',
    indicatorThickness: 2,
    fluid: false,
    theme: 'line',
    themeColor: 'primary',
  },
};

export const UncontrolledWithDefaultValue: Story = {
  render: args => ({
    components: { Tabs, TabsList, Tab, TabContent },
    setup() {
      const handleTabChange = (value: string) => {
        console.log('Tab changed to:', value);
      };

      return { args, handleTabChange };
    },
    template: `
      <Tabs defaultValue="tab2" :onValueChange="handleTabChange" :orientation="args.orientation" :tabsDirection="args.tabsDirection" >
        <TabsList :indicatorMode="args.indicatorMode" :indicatorThickness="args.indicatorThickness" :indicatorColor="args.indicatorColor" :tabsSize="args.tabsSize" :fluid="args.fluid" :theme="args.theme" :themeColor="args.themeColor">
          <Tab value="tab1">Tab 1</Tab>
          <Tab value="tab2">Tab 2 (Varsayılan)</Tab>
          <Tab value="tab3">Tab 3</Tab>
        </TabsList>

        <TabContent value="tab1">Uncontrolled Tab 1 içeriği</TabContent>
        <TabContent value="tab2">Uncontrolled Tab 2 içeriği (Varsayılan)</TabContent>
        <TabContent value="tab3">Uncontrolled Tab 3 içeriği</TabContent>
      </Tabs>
    `,
  }),
  args: {
    tabsSize: 'sm',
    tabsDirection: 'after',
    indicatorMode: 'static',
    indicatorThickness: 2,
    fluid: false,
    theme: 'line',
    themeColor: 'primary',
  },
};

export const ResponsiveTabs: Story = {
  render: args => ({
    components: { Tabs, TabsList, Tab, TabContent, Svg },
    setup() {
      const isDesktop = ref(window.innerWidth > 640);

      onMounted(() => {
        const handleResize = () => {
          isDesktop.value = window.innerWidth > 640;
        };
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      });

      return { args, homeIcon, documentIcon, editIcon, emailIcon, isDesktop };
    },
    template: `
      <div style="width: 100%; border: 1px dashed #ccc; padding: 10px; max-width: 800px;">
        <p style="margin-bottom: 8px;">Boyutu değiştirerek responsive davranışı görebilirsiniz:</p>
        <Tabs :defaultValue="args.defaultValue" :orientation="args.orientation" :tabsDirection="args.tabsDirection" >
          <TabsList :indicatorMode="args.indicatorMode" :indicatorThickness="args.indicatorThickness" :indicatorColor="args.indicatorColor" :tabsSize="args.tabsSize" :fluid="args.fluid" :theme="args.theme" :themeColor="args.themeColor">
            <Tab value="tab1">
              <template v-if="isDesktop">
                <Svg :src="homeIcon" size="20" style="margin-right: 8px" />
                <span>Ana Sayfa</span>
              </template>
              <template v-else>
                <Svg :src="homeIcon" size="20" />
              </template>
            </Tab>
            <Tab value="tab2">
              <template v-if="isDesktop">
                <Svg :src="documentIcon" size="20" style="margin-right: 8px" />
                <span>Dökümanlar</span>
              </template>
              <template v-else>
                <Svg :src="documentIcon" size="20" />
              </template>
            </Tab>
            <Tab value="tab3">
              <template v-if="isDesktop">
                <Svg :src="emailIcon" size="20" style="margin-right: 8px" />
                <span>Mesajlar</span>
              </template>
              <template v-else>
                <Svg :src="emailIcon" size="20" />
              </template>
            </Tab>
            <Tab value="tab4">
              <template v-if="isDesktop">
                <Svg :src="editIcon" size="20" style="margin-right: 8px" />
                <span>Ayarlar</span>
              </template>
              <template v-else>
                <Svg :src="editIcon" size="20" />
              </template>
            </Tab>
          </TabsList>

          <TabContent value="tab1" style="margin-top: 16px;">Ana Sayfa içeriği</TabContent>
          <TabContent value="tab2" style="margin-top: 16px;">Dökümanlar içeriği</TabContent>
          <TabContent value="tab3" style="margin-top: 16px;">Mesajlar içeriği</TabContent>
          <TabContent value="tab4" style="margin-top: 16px;">Ayarlar içeriği</TabContent>
        </Tabs>
      </div>
    `,
  }),
  args: {
    tabsSize: 'md',
    tabsDirection: 'after',
    indicatorMode: 'sliding',
    indicatorThickness: 2,
    indicatorColor: '#6366F1',
    fluid: true,
    defaultValue: 'tab1',
    theme: 'line',
    themeColor: 'primary',
  },
};

export const AllThemeVariations: Story = {
  render: args => ({
    components: { Tabs, TabsList, Tab, TabContent },
    setup() {
      return { args };
    },
    template: `
      <div style="margin-top: 3rem; margin-bottom: 3rem;">
        <!-- Primary Temalar -->
        <section style="margin-bottom: 3rem;">
          <h2 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem; padding: 0.5rem; background-color: #f3f4f6; border-radius: 0.25rem;">Primary Renk Temaları</h2>
          
          <!-- Line Theme - Primary -->
          <div style="margin-bottom: 2rem; border: 1px solid #e5e7eb; border-radius: 0.25rem; padding: 1rem;">
            <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.75rem; padding-bottom: 0.5rem; border-bottom: 1px solid #e5e7eb;">Line Teması</h3>
            <Tabs defaultValue="tab1">
              <TabsList :tabsSize="args.tabsSize"  theme="line" themeColor="primary">
                <Tab value="tab1">Tab 1</Tab>
                <Tab value="tab2">Tab 2</Tab>
                <Tab value="tab3">Tab 3</Tab>
              </TabsList>
              <TabContent value="tab1" style="padding: 1rem; margin-top: 0.5rem;">Line tema içeriği - Primary renk ile</TabContent>
              <TabContent value="tab2" style="padding: 1rem; margin-top: 0.5rem;">Line tema içeriği - Primary renk ile</TabContent>
              <TabContent value="tab3" style="padding: 1rem; margin-top: 0.5rem;">Line tema içeriği - Primary renk ile</TabContent>
            </Tabs>
          </div>

          <!-- Button Theme - Primary -->
          <div style="margin-bottom: 2rem; border: 1px solid #e5e7eb; border-radius: 0.25rem; padding: 1rem;">
            <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.75rem; padding-bottom: 0.5rem; border-bottom: 1px solid #e5e7eb;">Button Teması</h3>
            <Tabs defaultValue="tab1">
              <TabsList :tabsSize="args.tabsSize"  theme="button" themeColor="primary">
                <Tab value="tab1">Tab 1</Tab>
                <Tab value="tab2">Tab 2</Tab>
                <Tab value="tab3">Tab 3</Tab>
              </TabsList>
              <TabContent value="tab1" style="padding: 1rem; margin-top: 0.5rem;">Button tema içeriği - Primary renk ile</TabContent>
              <TabContent value="tab2" style="padding: 1rem; margin-top: 0.5rem;">Button tema içeriği - Primary renk ile</TabContent>
              <TabContent value="tab3" style="padding: 1rem; margin-top: 0.5rem;">Button tema içeriği - Primary renk ile</TabContent>
            </Tabs>
          </div>
        </section>

        <!-- Gray Temalar -->
        <section>
          <h2 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem; padding: 0.5rem; background-color: #f3f4f6; border-radius: 0.25rem;">Gray Renk Temaları</h2>
          
          <!-- Line Theme - Gray -->
          <div style="margin-bottom: 2rem; border: 1px solid #e5e7eb; border-radius: 0.25rem; padding: 1rem;">
            <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.75rem; padding-bottom: 0.5rem; border-bottom: 1px solid #e5e7eb;">Line Teması</h3>
            <Tabs defaultValue="tab1">
              <TabsList :tabsSize="args.tabsSize"  theme="line" themeColor="gray">
                <Tab value="tab1">Tab 1</Tab>
                <Tab value="tab2">Tab 2</Tab>
                <Tab value="tab3">Tab 3</Tab>
              </TabsList>
              <TabContent value="tab1" style="padding: 1rem; margin-top: 0.5rem;">Line tema içeriği - Gray renk ile</TabContent>
              <TabContent value="tab2" style="padding: 1rem; margin-top: 0.5rem;">Line tema içeriği - Gray renk ile</TabContent>
              <TabContent value="tab3" style="padding: 1rem; margin-top: 0.5rem;">Line tema içeriği - Gray renk ile</TabContent>
            </Tabs>
          </div>

          <!-- Button Theme - Gray -->
          <div style="margin-bottom: 2rem; border: 1px solid #e5e7eb; border-radius: 0.25rem; padding: 1rem;">
            <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.75rem; padding-bottom: 0.5rem; border-bottom: 1px solid #e5e7eb;">Button Teması</h3>
            <Tabs defaultValue="tab1">
              <TabsList :tabsSize="args.tabsSize"  theme="button" themeColor="gray">
                <Tab value="tab1">Tab 1</Tab>
                <Tab value="tab2">Tab 2</Tab>
                <Tab value="tab3">Tab 3</Tab>
              </TabsList>
              <TabContent value="tab1" style="padding: 1rem; margin-top: 0.5rem;">Button tema içeriği - Gray renk ile</TabContent>
              <TabContent value="tab2" style="padding: 1rem; margin-top: 0.5rem;">Button tema içeriği - Gray renk ile</TabContent>
              <TabContent value="tab3" style="padding: 1rem; margin-top: 0.5rem;">Button tema içeriği - Gray renk ile</TabContent>
            </Tabs>
          </div>
        </section>

        <!-- Segmented Temalar -->
        <section>
          <h2 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem; padding: 0.5rem; background-color: #f3f4f6; border-radius: 0.25rem;">Segmented Temalar</h2>
          
          <!-- Segmented Theme -->
          <div style="margin-bottom: 2rem; border: 1px solid #e5e7eb; border-radius: 0.25rem; padding: 1rem;">
            <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.75rem; padding-bottom: 0.5rem; border-bottom: 1px solid #e5e7eb;">Segmented Teması</h3>
            <Tabs defaultValue="tab1">
              <TabsList :tabsSize="args.tabsSize"  theme="segmented">
                <Tab value="tab1">Tab 1</Tab>
                <Tab value="tab2">Tab 2</Tab>
                <Tab value="tab3">Tab 3</Tab>
              </TabsList>
              <TabContent value="tab1" style="padding: 1rem; margin-top: 0.5rem;">Segmented tema içeriği</TabContent>
              <TabContent value="tab2" style="padding: 1rem; margin-top: 0.5rem;">Segmented tema içeriği</TabContent>
              <TabContent value="tab3" style="padding: 1rem; margin-top: 0.5rem;">Segmented tema içeriği</TabContent>
            </Tabs>
          </div>

          <!-- Segmented Minimal Theme -->
          <div style="margin-bottom: 2rem; border: 1px solid #e5e7eb; border-radius: 0.25rem; padding: 1rem;">
            <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.75rem; padding-bottom: 0.5rem; border-bottom: 1px solid #e5e7eb;">Segmented Minimal Teması</h3>
            <Tabs defaultValue="tab1">
              <TabsList :tabsSize="args.tabsSize"  theme="segmented-minimal">
                <Tab value="tab1">Tab 1</Tab>
                <Tab value="tab2">Tab 2</Tab>
                <Tab value="tab3">Tab 3</Tab>
              </TabsList>
              <TabContent value="tab1" style="padding: 1rem; margin-top: 0.5rem;">Segmented Minimal tema içeriği</TabContent>
              <TabContent value="tab2" style="padding: 1rem; margin-top: 0.5rem;">Segmented Minimal tema içeriği</TabContent>
              <TabContent value="tab3" style="padding: 1rem; margin-top: 0.5rem;">Segmented Minimal tema içeriği</TabContent>
            </Tabs>
          </div>
        </section>
      </div>
    `,
  }),
  args: {
    tabsSize: 'md',
  },
};

export const CustomContentRender: Story = {
  render: args => ({
    components: { Tabs, TabsList, Tab },
    setup() {
      const activeTab = ref('tab1');

      // Tab içerikleri için örnek veri
      const tabContents = {
        tab1: {
          title: 'Tab 1 İçeriği',
          description: 'Bu içerik Tab 1 seçildiğinde gösterilir. TabContent bileşeni kullanılmadan, doğrudan v-model ile içerik kontrol edilebilir.',
          color: '#3b82f6',
        },
        tab2: {
          title: 'Tab 2 İçeriği',
          description: 'Bu içerik Tab 2 seçildiğinde gösterilir. Herhangi bir özel bileşen veya yapı kullanabilirsiniz.',
          color: '#10b981',
        },
        tab3: {
          title: 'Tab 3 İçeriği',
          description: 'Bu içerik Tab 3 seçildiğinde gösterilir. Bu yaklaşım, özellikle karmaşık içerikler veya özel yapılar için kullanışlıdır.',
          color: '#f59e0b',
        },
      };

      return { args, activeTab, tabContents };
    },
    template: `
      <div style="border: 1px solid #e5e7eb; border-radius: 0.25rem; padding: 1.5rem;">
        <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 1rem;">TabContent Kullanmadan Dinamik İçerik</h3>
        
        <!-- Tabs bileşeni v-model ile bağlanır -->
        <Tabs v-model="activeTab">
          <TabsList :tabsSize="args.tabsSize" :fluid="args.fluid" :theme="args.theme" :themeColor="args.themeColor">
            <Tab value="tab1">Birinci Tab</Tab>
            <Tab value="tab2">İkinci Tab</Tab>
            <Tab value="tab3">Üçüncü Tab</Tab>
          </TabsList>
        </Tabs>
        
        <!-- Özel içerik alanı - TabContent kullanmadan -->
        <div style="margin-top: 1.5rem; padding: 1.5rem; border: 1px solid #e5e7eb; border-radius: 0.25rem; min-height: 150px;">
          <div v-if="activeTab && tabContents[activeTab]" style="animation: fadeIn 0.3s ease-in-out;">
            <h4 style="font-size: 1.25rem; font-weight: 600; margin-bottom: 0.5rem; color: black; border-left: 4px solid; padding-left: 0.75rem;" :style="{ borderColor: tabContents[activeTab].color }">
              {{ tabContents[activeTab].title }}
            </h4>
            <p style="margin-top: 1rem; color: #4b5563;">
              {{ tabContents[activeTab].description }}
            </p>
            <div style="margin-top: 1.5rem; padding: 1rem; background-color: #f9fafb; border-radius: 0.25rem;">
              <p style="font-style: italic; color: #6b7280;">
                Aktif Tab: <strong>{{ activeTab }}</strong> - Bu içerik v-model bağlantısı sayesinde dinamik olarak değişiyor.
              </p>
            </div>
          </div>
          <div v-else style="display: flex; justify-content: center; align-items: center; height: 100px; color: #6b7280;">
            Lütfen bir tab seçin
          </div>
        </div>
      </div>
    `,
  }),
  args: {
    tabsSize: 'md',
    fluid: false,
    theme: 'line',
    themeColor: 'primary',
  },
};
