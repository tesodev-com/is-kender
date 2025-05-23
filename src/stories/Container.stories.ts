import type { Meta, StoryObj } from '@storybook/vue3';
import Container from 'library-components/Container';

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  tags: ['autodocs'],
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
