export interface CustomFile {
  name: string;
  size: number;
  type: string;
  isImage: boolean;
  preview: string | null;
  raw: File;
}
export interface FileErrorMessage {
  file?: CustomFile;
  message: string;
}
export interface FileUploadProps {
  disabled?: boolean;
  multiple?: boolean;
  accept?: string;
  maxSize?: number;
  texts?: {
    empty?: string;
    choose?: string;
    upload?: string;
    cancel?: string;
  };
  sizeErrorMessage?: string;
  acceptErrorMessage?: string;
  uploadErrorMessage?: string;
  uploader?: (file: File[]) => Promise<boolean>;
}
export interface FileUploadSlots {
  file: {
    file: CustomFile;
    index: number;
  };
  empty: string;
}
export interface FileUploadEvents {
  (e: 'upload', file: File[]): void;
}
