import { mount, type VueWrapper } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ImageCrop from './ImageCrop.vue';
import { createCroppedImage } from './utils';

vi.mock('./utils', () => ({
  createCroppedImage: vi.fn().mockResolvedValue('mocked-cropped-image'),
}));

describe('ImageCrop Component', () => {
  let wrapper: VueWrapper<InstanceType<typeof ImageCrop>>;
  const mockImage = 'test-image.jpg';

  beforeEach(() => {
    vi.clearAllMocks();

    wrapper = mount(ImageCrop, {
      props: {
        image: mockImage,
      },
      attachTo: document.body,
    });

    const img = document.createElement('img');
    img.className = 'image-cropper__image';
    wrapper.element.appendChild(img);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should mount successfully', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should render with correct initial state', () => {
    expect(wrapper.vm.cropState.shape).toBe('circle');
    expect(wrapper.vm.imageState.rotate).toBe(0);
    expect(wrapper.vm.imageState.scaleX).toBe(1);
    expect(wrapper.vm.imageState.scaleY).toBe(1);
  });

  it('should render image with provided prop', () => {
    const img = wrapper.find('.image-cropper__image');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe(mockImage);
  });

  it('should update shape when circle/square button clicked', async () => {
    await wrapper.vm.updateCropShape('square');
    expect(wrapper.vm.cropState.shape).toBe('square');

    await wrapper.vm.updateCropShape('circle');
    expect(wrapper.vm.cropState.shape).toBe('circle');
  });

  it('should rotate image correctly', async () => {
    await wrapper.vm.rotateImageLeft();
    expect(wrapper.vm.imageState.rotate).toBe(-90);

    await wrapper.vm.rotateImageRight();
    expect(wrapper.vm.imageState.rotate).toBe(0);
  });

  it('should flip image correctly', async () => {
    await wrapper.vm.flipImageHorizontal();
    expect(wrapper.vm.imageState.scaleX).toBe(-1);

    await wrapper.vm.flipImageVertical();
    expect(wrapper.vm.imageState.scaleY).toBe(-1);
  });

  it('should zoom image correctly', async () => {
    await wrapper.vm.zoomImageIn();
    expect(wrapper.vm.imageState.scaleX).toBe(1.1);
    expect(wrapper.vm.imageState.scaleY).toBe(1.1);

    await wrapper.vm.zoomImageOut();
    expect(wrapper.vm.imageState.scaleX).toBe(1);
    expect(wrapper.vm.imageState.scaleY).toBe(1);
  });

  it('should reset state correctly', async () => {
    await wrapper.vm.rotateImageLeft();
    await wrapper.vm.flipImageHorizontal();
    await wrapper.vm.zoomImageIn();

    await wrapper.vm.resetImageState();
    expect(wrapper.vm.imageState.rotate).toBe(0);
    expect(wrapper.vm.imageState.scaleX).toBe(1);
    expect(wrapper.vm.imageState.scaleY).toBe(1);
  });

  it('should emit crop event when applying image', async () => {
    await wrapper.vm.applyImage();

    expect(createCroppedImage).toHaveBeenCalledTimes(1);

    const emitted = wrapper.emitted('crop');
    expect(emitted).toBeTruthy();
    expect(emitted?.[0]).toEqual(['mocked-cropped-image']);
  });

  it('should handle frame drag events', async () => {
    const frame = wrapper.find('.image-cropper__crop-frame');
    expect(frame.exists()).toBe(true);

    await frame.trigger('mousedown', {
      clientX: 100,
      clientY: 100,
    });
    expect(wrapper.vm.cropState.isDragging).toBe(true);

    await wrapper.trigger('mouseup');
    expect(wrapper.vm.cropState.isDragging).toBe(false);
  });

  it('should handle frame resize events', async () => {
    const resizeHandle = wrapper.find('.resize-handle--br');
    expect(resizeHandle.exists()).toBe(true);

    await resizeHandle.trigger('mousedown', {
      clientX: 100,
      clientY: 100,
    });
    expect(wrapper.vm.cropState.isResizing).toBe(true);

    await wrapper.trigger('mouseup');
    expect(wrapper.vm.cropState.isResizing).toBe(false);
  });
});
