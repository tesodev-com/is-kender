import type { CustomFile, FileUploadProps } from '../../types';

/**
 * Props for the File component.
 */
export interface FileProps {
  /**
   * The file to display.
   */
  file: CustomFile;

  /**
   * Whether to show a file preview.
   */
  preview: boolean;

  /**
   * The layout template used for displaying the file.
   */
  template?: FileUploadProps['template'];
}

/**
 * Event callbacks for the File component.
 */
export interface FileEmits {
  /**
   * Triggered when a file is deleted.
   * @param file The deleted file.
   */
  (event: 'onDelete', file: CustomFile): void;
  /**
   * Triggered when a file is edited.
   * @param file The edited file.
   */
  (event: 'onEdit', file: CustomFile): void;
}
