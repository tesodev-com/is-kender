export interface ReadProgress {
  percent: number;
  loadedSize: number;
  loadingState: 'uploading' | 'completed' | 'failed';
}

export interface CustomFile extends File {
  id: string;
  isImage: boolean;
  preview: string | null;
  uploadedDate: number;
  raw: File;
  status: ReadProgress;
}

export interface FileUploadProps {
  disabled?: boolean;
  multiple?: boolean;
  accept?: string;
  maxSize?: number;
  maxFiles?: number;
  showUploadedFiles?: boolean;
  showErrorMessages?: boolean;
  preview?: boolean;
  loading?: boolean;
  template?: 'col' | 'row';
  showActions?: boolean;
  description?: string;
  maxConcurrentUploads?: number;
  uploader?: (file: File[]) => Promise<boolean>;
}
export interface FileUploadEvents {
  (e: 'onUpload', file: CustomFile[]): void;
}
