import type { CustomFile } from '../../types';

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
}

export interface UploadEmits {
  (event: 'onUpload', file: CustomFile[]): void;
  (event: 'onError', error: FileErrorMessage[]): void;
}
