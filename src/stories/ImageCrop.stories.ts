import { type Meta, type StoryObj } from '@storybook/vue3';
import ImageCrop from 'library-components/ImageCrop';

const meta: Meta<typeof ImageCrop> = {
  title: 'Media/ImageCrop',
  component: ImageCrop,
  tags: ['autodocs'],
  argTypes: {
    image: {
      control: {
        type: 'file',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ImageCrop>;
export const Default: Story = {
  render: args => ({
    components: { ImageCrop },
    setup() {
      function handleCrop(croppedImage: string) {
        console.log(croppedImage);
      }
      return { args, handleCrop };
    },
    template: '<ImageCrop v-bind="args" @crop="handleCrop" />',
  }),
};
