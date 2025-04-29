import type { CustomFile } from '../../types';
import type { QueueStatus } from '../../utils';

/**
 * Represents an error message related to a file upload.
 */
export interface FileErrorMessage {
  /**
   * The file that caused the error.
   */
  file?: File;

  /**
   * The error message.
   */
  message: string;
}

/**
 * Props for the Upload component.
 */
export interface UploadProps {
  /**
   * Whether file uploads are disabled.
   */
  disabled?: boolean;

  /**
   * Whether multiple file uploads are allowed.
   */
  multiple?: boolean;

  /**
   * Accepted file types.
   */
  accept?: string;

  /**
   * Maximum allowed file size in bytes.
   */
  maxSize?: number;

  /**
   * Maximum number of files allowed.
   */
  maxFiles?: number;

  /**
   * Description text displayed in the upload area.
   */
  description?: string;

  /**
   * Whether files are currently loading.
   */
  loading?: boolean;

  /**
   * Status of the upload queue.
   */
  uploadQueueStatus?: QueueStatus;
}

/**
 * Event callbacks for the Upload component.
 */
export interface UploadEmits {
  /**
   * Triggered when files are uploaded.
   * @param file List of uploaded custom files.
   */
  (event: 'onUpload', file: CustomFile[]): void;

  /**
   * Triggered when an error occurs during upload.
   * @param error List of file error messages.
   */
  (event: 'onError', error: FileErrorMessage[]): void;
}
