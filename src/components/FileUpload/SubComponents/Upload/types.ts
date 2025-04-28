import type { CustomFile } from '../../types';
import type { QueueStatus } from '../../utils';

export interface FileErrorMessage {
  file?: File;
  message: string;
}

export interface UploadProps {
  disabled?: boolean;
  multiple?: boolean;
  accept?: string;
  maxSize?: number;
  maxFiles?: number;
  description?: string;
  loading?: boolean;
  uploadQueueStatus?: QueueStatus;
}

export interface UploadEmits {
  (event: 'onUpload', file: CustomFile[]): void;
  (event: 'onError', error: FileErrorMessage[]): void;
}
