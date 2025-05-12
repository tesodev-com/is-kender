import type { Meta, StoryObj } from '@storybook/vue3';
import Col from 'library-components/Col';
import Container from 'library-components/Container';
import Row from 'library-components/Row';

const meta: Meta<typeof Container> = {
  title: 'Layout/ContainerExample',
  component: Container,
  subcomponents: { Row, Col },
  tags: ['autodocs'],
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
    components: { Container, Row, Col },
    setup() {
      return { args };
    },
    template: `
    <Container :fluid="false">
      <Row>
        <Col style="outline:1px solid purple;background-color:rgba(128,0,128,0.5)" cols="12">
          <p>12</p>
        </Col>
      </Row>
      <Row >
        <Col style="outline:1px solid purple;background-color:rgba(128,0,128,0.5)" cols="6">
          <p>6</p>
        </Col>
        <Col style="outline:1px solid purple;background-color:rgba(128,0,128,0.5)" cols="6">
          <p>6</p>
        </Col>
      </Row>
      <Row >
        <Col style="outline:1px solid purple;background-color:rgba(128,0,128,0.5)" cols="4">
          <p>4</p>
        </Col>
        <Col style="outline:1px solid purple;background-color:rgba(128,0,128,0.5)" cols="4">
          <p>4</p>
        </Col>
        <Col style="outline:1px solid purple;background-color:rgba(128,0,128,0.5)" cols="4">
          <p>4</p>
        </Col>  
      </Row>
    </Container>
    `,
  }),
};
