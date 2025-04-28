import type { CustomFile } from '../types';
import FileReaderManager from './FileReaderManager';

export interface QueueStatus {
  total: number;
  waiting: number;
  completed: number;
  failed: number;
}

class UploadQueue {
  private queue: CustomFile[] = [];
  private activeUploads: Set<string> = new Set();
  private completedUploads: Set<string> = new Set();
  private failedUploads: Set<string> = new Set();
  private maxConcurrentUploads: number;
  private fileReader: FileReaderManager;
  private emit: () => void;
  private onProgress: (status: QueueStatus) => void;

  constructor({ maxConcurrentUploads = 5, emit, onProgress }: { maxConcurrentUploads?: number; emit: () => void; onProgress: (status: QueueStatus) => void }) {
    this.maxConcurrentUploads = maxConcurrentUploads;
    this.fileReader = new FileReaderManager();
    this.emit = emit;
    this.onProgress = onProgress;
  }

  addToQueue(item: CustomFile): void {
    this.queue.push(item);
    this.processQueue();
  }

  removeFromQueue(fileId: string): void {
    this.queue = this.queue.filter(file => file.id !== fileId);
    this.activeUploads.delete(fileId);
  }

  private async processQueue(): Promise<void> {
    while (this.queue.length > 0 && this.activeUploads.size <= this.maxConcurrentUploads) {
      const file = this.queue.shift();
      if (file && !this.activeUploads.has(file.id)) {
        this.activeUploads.add(file.id);
        this.processFile(file);
      }
    }
    if (this.queue.length === 0 && this.activeUploads.size === 0) {
      this.emit();
    }
  }

  private async processFile(file: CustomFile): Promise<void> {
    try {
      await this.fileReader.readFile(file);
    } catch {
      this.failedUploads.add(file.id);
      this.processQueue();
    } finally {
      this.completedUploads.add(file.id);
      this.activeUploads.delete(file.id);
      this.onProgress(this.getQueueStatus());
      this.processQueue();
    }
  }

  getQueueStatus() {
    return {
      total: this.queue.length + this.completedUploads.size,
      waiting: this.queue.length,
      completed: this.completedUploads.size,
      failed: this.failedUploads.size,
    };
  }

  abortAll(): void {
    this.queue = [];
    this.activeUploads.forEach(fileId => {
      this.fileReader.abort(fileId);
    });
    this.activeUploads.clear();
    this.completedUploads.clear();
    this.failedUploads.clear();
  }
}

export default UploadQueue;
