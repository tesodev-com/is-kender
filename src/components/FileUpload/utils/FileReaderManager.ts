import type { CustomFile } from '../types';

class FileReaderManager {
  private activeReaders: Map<string, FileReader> = new Map();

  readFile(file: CustomFile): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      this.activeReaders.set(file.id, reader);

      reader.onprogress = e => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          file.status = {
            percent,
            loadedSize: e.loaded,
            loadingState: 'uploading',
          };
        }
      };

      reader.onload = () => {
        this.activeReaders.delete(file.id);
        file.status = {
          percent: 100,
          loadedSize: file.size,
          loadingState: 'completed',
        };
        resolve(reader.result as string);
      };

      reader.onerror = e => {
        this.activeReaders.delete(file.id);
        file.status = {
          percent: 0,
          loadedSize: 0,
          loadingState: 'failed',
        };
        reject(e);
      };

      reader.readAsDataURL(file.raw);
    });
  }

  abort(fileId: string) {
    const reader = this.activeReaders.get(fileId);
    if (reader) {
      reader.abort();
      this.activeReaders.delete(fileId);
    }
  }

  abortAll() {
    this.activeReaders.forEach((reader, fileId) => {
      reader.abort();
      this.activeReaders.delete(fileId);
    });
  }
}

export default FileReaderManager;
