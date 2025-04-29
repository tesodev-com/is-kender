import type { DefineComponent } from '@/@types/core';

/**
 * Represents the state of an image transformation.
 */
export interface ImageState {
  /**
   * The rotation angle of the image in degrees.
   */
  rotate: number;

  /**
   * The horizontal scale factor of the image.
   */
  scaleX: number;

  /**
   * The vertical scale factor of the image.
   */
  scaleY: number;
}

/**
 * Represents the state of the cropping area.
 */
export interface CropState {
  /**
   * The shape of the crop area.
   */
  shape: 'circle' | 'square';

  /**
   * The top position of the crop area.
   */
  top: number | string;

  /**
   * The left position of the crop area.
   */
  left: number | string;

  /**
   * The width of the crop area.
   */
  width: number | string;

  /**
   * The height of the crop area.
   */
  height: number | string;

  /**
   * Whether the crop area is currently being resized.
   */
  isResizing: boolean;

  /**
   * The direction in which the crop area is being resized.
   */
  resizeDirection: string;

  /**
   * The starting X coordinate for resizing or dragging.
   */
  startX: number;

  /**
   * The starting Y coordinate for resizing or dragging.
   */
  startY: number;

  /**
   * Whether the crop area is currently being dragged.
   */
  isDragging: boolean;

  /**
   * The offset when dragging the crop area.
   */
  dragOffset: {
    /**
     * Horizontal offset value.
     */
    x: number;

    /**
     * Vertical offset value.
     */
    y: number;
  };
}

/**
 * Props for the ImageCropper component.
 */
export interface ImageCropperProps {
  /**
   * The image to be cropped, either as a URL string or a File object.
   */
  image: string | File;
}

/**
 * Event callbacks for the ImageCropper component.
 */
export interface ImageCropperEvents {
  /**
   * Triggered when an image is cropped.
   * @param croppedImage The cropped image as a base64 string or URL.
   */
  (e: 'crop', croppedImage: string): void;
}

declare module 'vue' {
  export interface GlobalComponents {
    LibImageCrop: DefineComponent<ImageCropperProps, object, ImageCropperEvents>;
  }
}
