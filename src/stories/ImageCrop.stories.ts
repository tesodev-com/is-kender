import { type Meta, type StoryObj } from '@storybook/vue3';
import ImageCrop from 'library-components/ImageCrop';

const meta: Meta<typeof ImageCrop> = {
  title: 'Form/ImageCrop',
  component: ImageCrop,
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
  render: () => ({
    components: { ImageCrop },
    setup() {
      function handleCrop(croppedImage: string) {
        console.log(croppedImage);
      }
      return { handleCrop };
    },
    template: '<ImageCrop @crop="handleCrop" />',
  }),
};
