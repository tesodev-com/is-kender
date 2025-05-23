export * from './FileReaderManager';
export { default as FileReaderManager } from './FileReaderManager';
export * from './UploadQueue';
export { default as UploadQueue } from './UploadQueue';

export default {
  formatFileSize(size: number): string {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let unitIndex = 0;

    while (size >= 1000 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    return `${size.toFixed(2)} ${units[unitIndex]}`;
  },
};
