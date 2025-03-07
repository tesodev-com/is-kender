import type { Meta, StoryObj } from '@storybook/vue3';
import Col from 'library/Col';
import Row from 'library/Row';

const meta: Meta<typeof Row> = {
  title: 'Layout&Structures/Row',
  component: Row,
  argTypes: {
    align: {
      control: 'select',
      options: ['top', 'center', 'bottom'],
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'around', 'between'],
    },
    direction: {
      control: 'select',
      options: ['row', 'row-reverse', 'column', 'column-reverse'],
    },
    gutter: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6],
    },
  },
};
export default meta;
type Story = StoryObj<typeof Row>;

export const Default: Story = {
  render: args => {
    return {
      components: { Row },
      setup() {
        return { args };
      },
      template: `
      <Row v-bind="args" style="outline:1px solid purple;background-color:rgba(128,0,128,0.5)">
        <p>Row align:{{args.align}} justify:{{args.justify}} direction:{{args.direction}} gutter:{{args.gutter}}</p>
      </Row>
      `,
    };
  },
};

export const WithCol: Story = {
  render: args => {
    return {
      components: { Row, Col },
      setup() {
        return { args };
      },
      template: `
      <Row v-bind="args" style="outline:1px solid purple;background-color:rgba(128,0,128,0.5)">
        <Col style="outline:1px solid purple;background-color:rgba(128,0,128,0.5)">Col-1st</Col>
         <Col style="outline:1px solid purple;background-color:rgba(128,0,128,0.5)">Col-2nd</Col>
          <Col style="outline:1px solid purple;background-color:rgba(128,0,128,0.5)">Col-3rd</Col>
      </Row>
      `,
    };
  },
};
