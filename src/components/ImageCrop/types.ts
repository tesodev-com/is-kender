export interface ImageState {
  rotate: number;
  scaleX: number;
  scaleY: number;
}

export interface CropState {
  shape: 'circle' | 'square';
  top: number | string;
  left: number | string;
  width: number | string;
  height: number | string;
  isResizing: boolean;
  resizeDirection: string;
  startX: number;
  startY: number;
  isDragging: boolean;
  dragOffset: {
    x: number;
    y: number;
  };
}
export interface ImageCropperProps {
  image: string | File;
}

export interface ImageCropperEvents {
  (e: 'crop', croppedImage: string): void;
}
