import type { CustomFile, FileUploadProps } from '../../types';

export interface FileProps {
  file: CustomFile;
  preview: boolean;
  template?: FileUploadProps['template'];
}

export interface FileEmits {
  (event: 'onDelete', file: CustomFile): void;
}
