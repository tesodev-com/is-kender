export interface ReadProgress {
  percent: number;
  loadedSize: number;
  loadingState: 'uploading' | 'completed' | 'failed';
}

export interface CustomFile extends File {
  id: string;
  raw: File;
  isReady: boolean;
  isImage: boolean;
  preview: string | null;
  uploadedDate: number;
  readFile: (onProgress: (state: ReadProgress) => void) => Promise<any>;
}
export interface FileUploadProps {
  disabled?: boolean;
  multiple?: boolean;
  accept?: string;
  maxSize?: number;
  maxFiles?: number;
  preview?: boolean;
  template?: 'col' | 'row';
  showActions?: boolean;
  description?: string;
  uploader?: (file: File[]) => Promise<boolean>;
}
export interface FileUploadEvents {
  (e: 'onUpload', file: CustomFile[]): void;
}
