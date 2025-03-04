import Drawer from '@/components/Drawer/Drawer.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
    },
    size: {
      control: 'select',
      options: ['25%', '50%', '100%'],
    },
    title: {
      control: 'text',
    },
    isOpen: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Primary: Story = {
  render: args => ({
    components: { Drawer },
    setup() {
      const isOpen = ref(args.isOpen);

      const toggleDrawer = () => {
        isOpen.value = !isOpen.value;
      };

      return { args, isOpen, toggleDrawer };
    },
    template: `
      <div>
        <button @click="toggleDrawer">
          {{ isOpen ? 'Close' : 'Open' }} Drawer
        </button>
        <Drawer v-bind="args" v-model:isOpen="isOpen" />
      </div>
    `,
  }),
  args: {
    position: 'left',
    size: '50%',
    title: 'My Drawer',
    isOpen: false,
  },
};

export const RightDrawer: Story = {
  render: args => ({
    components: { Drawer },
    setup() {
      const isOpen = ref(args.isOpen);

      const toggleDrawer = () => {
        isOpen.value = !isOpen.value;
      };

      return { args, isOpen, toggleDrawer };
    },
    template: `
      <div>
        <button @click="toggleDrawer">
          {{ isOpen ? 'Close' : 'Open' }} Drawer
        </button>
        <Drawer v-bind="args" v-model:isOpen="isOpen" />
      </div>
    `,
  }),
  args: {
    position: 'right',
    size: '50%',
    title: 'Right Drawer',
    isOpen: false,
  },
};

export const SmallDrawer: Story = {
  render: args => ({
    components: { Drawer },
    setup() {
      const isOpen = ref(args.isOpen);
      const name = ref('');
      const email = ref('');

      const toggleDrawer = () => {
        isOpen.value = !isOpen.value;
      };

      return { args, isOpen, name, email, toggleDrawer };
    },
    template: `
          <div>
            <button @click="toggleDrawer">
              {{ isOpen ? 'Close' : 'Open' }} Drawer
            </button>
            <Drawer v-bind="args" v-model:isOpen="isOpen">
              <template #default>
                <form @submit.prevent>
                  <label>
                    Name:
                    <input v-model="name" type="text" placeholder="Enter your name" />
                  </label>
                  <br/>
                  <label>
                  Email:
                  <input v-model="email" type="email" placeholder="Enter your email" />
                  </label>
                  <button type="submit">Submit</button>
                </form>
              </template>
            </Drawer>
          </div>
        `,
  }),
  args: {
    position: 'left',
    size: '25%',
    title: 'drawer',
    isOpen: false,
    hasHeader: false,
    hasCloseButton: false,
  },
};
