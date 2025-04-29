import type { DefineComponent } from '@/@types/core';

/**
 * Represents the reading progress of a file upload.
 */
export interface ReadProgress {
  /**
   * The percentage of the file that has been uploaded.
   */
  percent: number;

  /**
   * The size of the file that has been uploaded so far, in bytes.
   */
  loadedSize: number;

  /**
   * The current state of the upload.
   */
  loadingState: 'uploading' | 'completed' | 'failed';
}

/**
 * A custom file object with additional metadata.
 */
export interface CustomFile extends File {
  /**
   * Unique identifier for the file.
   */
  id: string;

  /**
   * Whether the file is an image.
   */
  isImage: boolean;

  /**
   * A preview URL or null if not available.
   */
  preview: string | null;

  /**
   * Timestamp when the file was uploaded.
   */
  uploadedDate: number;

  /**
   * The original file object.
   */
  raw: File;

  /**
   * The upload progress and status of the file.
   */
  status: ReadProgress;
}

/**
 * Props for the FileUpload component.
 */
export interface FileUploadProps {
  /**
   * Whether file upload is disabled.
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
   * Whether to display uploaded files.
   */
  showUploadedFiles?: boolean;

  /**
   * Whether to display error messages.
   */
  showErrorMessages?: boolean;

  /**
   * Whether to show file previews.
   */
  preview?: boolean;

  /**
   * Whether files are currently loading.
   */
  loading?: boolean;

  /**
   * Layout template of the uploader.
   */
  template?: 'col' | 'row';

  /**
   * Whether to show upload action buttons.
   */
  showActions?: boolean;

  /**
   * Description text displayed in the uploader.
   */
  description?: string;

  /**
   * Maximum number of concurrent file uploads allowed.
   */
  maxConcurrentUploads?: number;

  /**
   * Custom uploader function that handles file uploads.
   */
  uploader?: (file: File[]) => Promise<boolean>;
}

/**
 * Event callbacks for the FileUpload component.
 */
export interface FileUploadEvents {
  /**
   * Triggered when files are uploaded.
   * @param file List of uploaded custom files.
   */
  (e: 'onUpload', file: CustomFile[]): void;
}

declare module 'vue' {
  export interface GlobalComponents {
    LibFileUpload: DefineComponent<FileUploadProps, object, FileUploadEvents>;
  }
}
