import type { Meta, StoryObj } from '@storybook/vue3';
import { Col as ColComponent, Container, Row } from '@/components';

const meta: Meta<typeof Container> = {
  component: Container,
  subcomponents: { Row, ColComponent },
  title: 'Layout&Structures/ContainerExample',
  argTypes: {
    fluid: {
      control: {
        type: 'boolean',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Container>;
export const Default: Story = {
  render: args => ({
    components: { Container, Row, ColComponent },
    setup() {
      return { args };
    },
    template: `
    <Container :fluid="false">
      <Row>
        <ColComponent style="outline:1px solid purple;background-color:rgba(128,0,128,0.5)" cols="12">
          <p>12</p>
        </ColComponent>
      </Row>
      <Row >
        <ColComponent style="outline:1px solid purple;background-color:rgba(128,0,128,0.5)" cols="6">
          <p>6</p>
        </ColComponent>
        <ColComponent style="outline:1px solid purple;background-color:rgba(128,0,128,0.5)" cols="6">
          <p>6</p>
        </ColComponent>
      </Row>
      <Row >
        <ColComponent style="outline:1px solid purple;background-color:rgba(128,0,128,0.5)" cols="4">
          <p>4</p>
        </ColComponent>
        <ColComponent style="outline:1px solid purple;background-color:rgba(128,0,128,0.5)" cols="4">
          <p>4</p>
        </ColComponent>
        <ColComponent style="outline:1px solid purple;background-color:rgba(128,0,128,0.5)" cols="4">
          <p>4</p>
        </ColComponent>  
      </Row>
    </Container>
    `,
  }),
};
