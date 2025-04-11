import type { CustomFile } from '../../types';

export interface UploadProps {
  disabled?: boolean;
  multiple?: boolean;
  accept?: string;
}

export interface UploadEmits {
  (event: 'onUpload', file: CustomFile[]): void;
}
