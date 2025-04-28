import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Upload from './Upload.vue';

// Mock URL.createObjectURL
global.URL = {
  createObjectURL: vi.fn(() => 'mock-url'),
} as any;

// Mock DragEvent
class MockDragEvent extends Event {
  dataTransfer: DataTransfer | null = null;

  constructor(type: string, init?: any) {
    super(type);
    this.dataTransfer = init?.dataTransfer || null;
  }
}

// Mock DataTransfer
class MockDataTransfer {
  files: FileList;

  constructor(files: File[]) {
    this.files = Object.assign(files, {
      item: (index: number) => files[index],
      length: files.length,
    }) as unknown as FileList;
  }
}

// Replace global DragEvent with our mock
global.DragEvent = MockDragEvent as any;

describe('Upload', () => {
  let wrapper: ReturnType<typeof mount<typeof Upload>>;

  beforeEach(() => {
    wrapper = mount(Upload, {
      props: {
        disabled: false,
        multiple: true,
        accept: 'image/*',
        maxSize: 1024 * 1024,
        maxFiles: 5,
        description: 'Test description',
      },
    });
  });

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('shows correct description', () => {
    expect(wrapper.find('.upload__description').text()).toBe('Test description');
  });

  it('handles file upload through input change', async () => {
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });

    // Create a fake event with files
    const event = {
      target: {
        files: [file],
      },
    } as unknown as Event;

    await (wrapper.vm as any).handleUpload(event);
    expect(wrapper.emitted('onUpload')).toBeTruthy();
  });

  it('handles drag and drop events', async () => {
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const dataTransfer = new MockDataTransfer([file]);
    const dragEvent = new MockDragEvent('drop', {
      dataTransfer,
    });

    await (wrapper.vm as any).handleDrop(dragEvent);
    expect(wrapper.emitted('onUpload')).toBeTruthy();
  });

  it('validates file type', async () => {
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    const event = {
      target: {
        files: [file],
      },
    } as unknown as Event;

    await (wrapper.vm as any).handleUpload(event);
    expect(wrapper.emitted('onError')).toBeTruthy();
  });

  it('validates file size', async () => {
    const largeFile = new File(['x'.repeat(2 * 1024 * 1024)], 'large.jpg', { type: 'image/jpeg' });
    const event = {
      target: {
        files: [largeFile],
      },
    } as unknown as Event;

    await (wrapper.vm as any).handleUpload(event);
    expect(wrapper.emitted('onError')).toBeTruthy();
  });

  it('validates maximum number of files', async () => {
    const files = Array(6)
      .fill(null)
      .map((_, i) => new File(['test'], `test${i}.jpg`, { type: 'image/jpeg' }));
    const event = {
      target: {
        files,
      },
    } as unknown as Event;

    await (wrapper.vm as any).handleUpload(event);
    expect(wrapper.emitted('onError')).toBeTruthy();
  });

  it('clears error list when clearErrorList is called', async () => {
    await (wrapper.vm as any).clearErrorList();
    expect(wrapper.emitted('onError')?.[0][0]).toEqual([]);
  });
});
