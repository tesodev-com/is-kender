import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { CustomFile } from '../../types';
import FileComponent from './File.vue';

// Mock File class
class MockFile {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  webkitRelativePath: string;

  constructor(bits: any[], name: string, options?: any) {
    this.name = name;
    this.size = bits.join('').length;
    this.type = options?.type || '';
    this.lastModified = Date.now();
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

describe('File', () => {
  let wrapper: ReturnType<typeof mount<typeof FileComponent>>;
  const mockFile = {
    id: '1',
    name: 'test.jpg',
    size: 1024,
    type: 'image/jpeg',
    raw: new File(['test'], 'test.jpg', { type: 'image/jpeg' }),
    isReady: false,
    isImage: true,
    preview: 'test-preview',
    uploadedDate: Date.now(),
    readFile: vi.fn().mockImplementation(callback => {
      callback({ percent: 0, loadedSize: 0, loadingState: 'uploading' });
      return Promise.resolve('data');
    }),
  } as unknown as CustomFile;

  beforeEach(() => {
    wrapper = mount(FileComponent, {
      props: {
        file: mockFile,
        template: 'row',
        preview: true,
      },
    });
  });

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('displays file name', () => {
    expect(wrapper.find('.file-name').text()).toBe('test.jpg');
  });

  it('displays file size', () => {
    expect(wrapper.find('.file-specs-size').text()).toContain('0.00 B of 4.00 B');
  });

  it('shows preview for image files', () => {
    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe('test-preview');
  });

  it('shows file icon for non-image files', async () => {
    const nonImageFile = {
      ...mockFile,
      isImage: false,
      preview: null,
      type: 'application/pdf',
    };
    await wrapper.setProps({ file: nonImageFile });
    expect(wrapper.find('img').exists()).toBe(false);
  });

  it('emits onDelete event when delete button is clicked', async () => {
    await wrapper.find('.file-delete-icon').trigger('click');
    expect(wrapper.emitted('onDelete')).toBeTruthy();
    expect(wrapper.emitted('onDelete')![0][0]).toEqual(mockFile);
  });

  it('shows try again button when upload fails', async () => {
    const failedFile = {
      ...mockFile,
      readFile: vi.fn().mockImplementation(callback => {
        callback({ percent: 0, loadedSize: 0, loadingState: 'failed' });
        return Promise.resolve('data');
      }),
    };

    // Önce bileşeni failedFile ile yeniden oluştur
    wrapper = mount(FileComponent, {
      props: {
        file: failedFile,
        template: 'row',
        preview: true,
      },
    });

    // Bileşenin yeniden render edilmesini bekle
    await wrapper.vm.$nextTick();

    // readFile fonksiyonunun çağrıldığını doğrula
    expect(failedFile.readFile).toHaveBeenCalled();

    // Try again butonunun görünür olduğunu kontrol et
    expect(wrapper.find('.try-again-button').exists()).toBe(true);
  });

  it('shows progress bar during upload', async () => {
    const uploadingFile = {
      ...mockFile,
      readFile: vi.fn().mockImplementation(callback => {
        callback({ percent: 50, loadedSize: 512, loadingState: 'uploading' });
        return Promise.resolve('data');
      }),
    };

    // Önce bileşeni uploadingFile ile yeniden oluştur
    wrapper = mount(FileComponent, {
      props: {
        file: uploadingFile,
        template: 'row',
        preview: true,
      },
    });

    // Bileşenin yeniden render edilmesini bekle
    await wrapper.vm.$nextTick();

    // readFile fonksiyonunun çağrıldığını doğrula
    expect(uploadingFile.readFile).toHaveBeenCalled();

    // Progress bar'ın görünür olduğunu kontrol et
    expect(wrapper.find('.progress-bar').exists()).toBe(true);
  });

  it('shows completed state when upload is done', async () => {
    const completedFile = {
      ...mockFile,
      readFile: vi.fn().mockImplementation(callback => {
        callback({ percent: 100, loadedSize: 1024, loadingState: 'completed' });
        return Promise.resolve('data');
      }),
    };

    // Önce bileşeni completedFile ile yeniden oluştur
    wrapper = mount(FileComponent, {
      props: {
        file: completedFile,
        template: 'row',
        preview: true,
      },
    });

    // Bileşenin yeniden render edilmesini bekle
    await wrapper.vm.$nextTick();

    // readFile fonksiyonunun çağrıldığını doğrula
    expect(completedFile.readFile).toHaveBeenCalled();

    // Durumun "Tamamlandı" olduğunu kontrol et
    expect(wrapper.find('.file-status-text').text()).toBe('Tamamlandı');
  });
});
