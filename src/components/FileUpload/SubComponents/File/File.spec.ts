import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { CustomFile } from '../../types';
import FileComponent from './File.vue';

// Mock File class
class MockFile {
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;

  constructor(bits: any[], name: string, options?: any) {
    this.name = name;
    this.size = bits.join('').length;
    this.type = options?.type || '';
    this.webkitRelativePath = '';
  }

  // Add required File interface methods
  arrayBuffer(): Promise<ArrayBuffer> {
    return Promise.resolve(new ArrayBuffer(0));
  }
  blob(): Promise<Blob> {
    return Promise.resolve(new Blob());
  }
  slice(): Blob {
    return new Blob();
  }
  stream(): ReadableStream {
    return new ReadableStream();
  }
  text(): Promise<string> {
    return Promise.resolve('');
  }
}

// Replace global File with our mock
global.File = MockFile as any;

// Mock URL.createObjectURL
global.URL = {
  createObjectURL: vi.fn(() => 'mock-url'),
} as any;

// Mock Utils.formatFileSize
vi.mock('../../utils', () => ({
  default: {
    formatFileSize: (size: number) => {
      if (size < 1024) return `${size.toFixed(2)} B`;
      return `${(size / 1024).toFixed(2)} KB`;
    },
  },
}));

// Mock icons
vi.mock('@/assets/icons', () => ({
  cancelIconRoundedOutline: 'cancel-icon',
  checkIconRoundedOutline: 'check-icon',
  cloudUploadOutlineIcon: 'upload-icon',
  deleteForeverOutlineIcon: 'delete-icon',
  cropIcon: 'crop-icon',
}));

describe('File', () => {
  let wrapper: ReturnType<typeof mount<typeof FileComponent>>;
  const mockFile = {
    id: '1',
    name: 'test.jpg',
    size: 1024,
    type: 'image/jpeg',
    raw: new File(['test'], 'test.jpg', { type: 'image/jpeg' }),
    preview: 'test-preview',
    uploadedDate: Date.now(),
    status: {
      percent: 0,
      loadedSize: 0,
      loadingState: 'uploading' as const,
    },
  } as CustomFile;

  beforeEach(() => {
    wrapper = mount(FileComponent, {
      props: {
        file: mockFile,
        template: 'row',
        preview: true,
      },
      global: {
        stubs: {
          Svg: {
            template: '<span class="svg-icon"></span>',
          },
          Divider: {
            template: '<span class="divider">|</span>',
          },
          ProgressBar: {
            template: '<div class="progress-bar"></div>',
          },
        },
      },
    });
  });

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('displays file name', () => {
    expect(wrapper.find('.file-item__name').text()).toBe('test.jpg');
  });

  it('displays file size', () => {
    expect(wrapper.find('.file-item__size').text()).toContain('0.00 B of 4.00 B');
  });

  it('shows preview for image files', () => {
    const img = wrapper.find('.file-item__preview-image');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe('test-preview');
  });

  it('shows file icon for non-image files', async () => {
    const nonImageFile = {
      ...mockFile,
      preview: null,
      type: 'application/pdf',
    };
    await wrapper.setProps({ file: nonImageFile });
    expect(wrapper.find('.file-item__preview-image').exists()).toBe(false);
    expect(wrapper.find('.file-item__preview-icon').exists()).toBe(true);
  });

  it('emits onDelete event when delete button is clicked', async () => {
    await wrapper.find('.file-item__action[src="delete-icon"]').trigger('click');
    expect(wrapper.emitted('onDelete')).toBeTruthy();
    expect(wrapper.emitted('onDelete')![0][0]).toEqual(mockFile);
  });

  it('shows try again button when upload fails', async () => {
    const failedFile = {
      ...mockFile,
      status: {
        percent: 0,
        loadedSize: 0,
        loadingState: 'failed' as const,
      },
    };

    await wrapper.setProps({ file: failedFile });
    expect(wrapper.find('.file-item__status-text').text()).toBe('Başarısız');
  });

  it('shows progress bar during upload', async () => {
    const uploadingFile = {
      ...mockFile,
      status: {
        percent: 50,
        loadedSize: 512,
        loadingState: 'uploading' as const,
      },
    };

    await wrapper.setProps({ file: uploadingFile });
    expect(wrapper.find('.file-item__progress').exists()).toBe(true);
    expect(wrapper.find('.file-item__status-text').text()).toBe('Yükleniyor');
  });

  it('shows completed state when upload is done', async () => {
    const completedFile = {
      ...mockFile,
      status: {
        percent: 100,
        loadedSize: 1024,
        loadingState: 'completed' as const,
      },
    };

    await wrapper.setProps({ file: completedFile });
    expect(wrapper.find('.file-item__status-text').text()).toBe('Tamamlandı');
  });
});
