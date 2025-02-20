import { Container } from '@/components';
import { type Meta, type StoryObj } from '@storybook/vue3';

const meta: Meta<typeof Container> = {
  title: 'Layout&Structures/Container',
  component: Container,
  args: {
    fluid: false,
    maxWidth: '75rem',
  },
  argTypes: {
    fluid: {
      control: {
        type: 'boolean',
      },
    },
    maxWidth: {
      control: {
        type: 'text',
      },
    },
    padding: {
      control: {
        type: 'text',
      },
    },
    tag: {
      control: {
        type: 'select',
        options: ['div', 'section', 'main', 'article'],
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Container>;

export const Default: Story = {
  render: args => {
    return {
      components: { Container },
      setup() {
        return { args };
      },
      template: `
      <Container v-bind="args" style="outline:1px solid purple;" >
        <p style="outline:1px solid purple;background-color:rgba(128,0,128,0.5)">Element </p>
      </Container>  
      `,
    };
  },
};
