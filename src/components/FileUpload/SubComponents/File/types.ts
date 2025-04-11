import type { CustomFile } from '../../types';

export interface FileProps {
  file: CustomFile;
}

export interface FileEmits {
  (event: 'onDelete', file: CustomFile): void;
}
