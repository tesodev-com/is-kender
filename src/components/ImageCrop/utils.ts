import type { CropState, ImageState } from './types';

export function createCroppedImage(imageElement: HTMLImageElement, cropState: CropState, imageState: ImageState): Promise<string> {
  return new Promise(resolve => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const previewElement = imageElement.parentElement;
    if (!previewElement) return;

    const previewRect = previewElement.getBoundingClientRect();
    const imageRect = imageElement.getBoundingClientRect();

    const cropWidth = parseInt(String(cropState.width));
    const cropHeight = parseInt(String(cropState.height));
    const cropLeft = parseInt(String(cropState.left));
    const cropTop = parseInt(String(cropState.top));

    canvas.width = cropWidth;
    canvas.height = cropHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const baseScale = imageElement.naturalWidth / imageRect.width;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const imageX = imageRect.left - previewRect.left;
    const imageY = imageRect.top - previewRect.top;

    const sourceX = (cropLeft - imageX) * baseScale;
    const sourceY = (cropTop - imageY) * baseScale;
    const sourceWidth = cropWidth * baseScale;
    const sourceHeight = cropHeight * baseScale;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((imageState.rotate * Math.PI) / 180);
    ctx.scale(Math.sign(imageState.scaleX), Math.sign(imageState.scaleY));
    ctx.translate(-centerX, -centerY);

    ctx.drawImage(imageElement, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, cropWidth, cropHeight);

    ctx.restore();

    if (cropState.shape === 'circle') {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = cropWidth;
      tempCanvas.height = cropHeight;
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return;

      tempCtx.drawImage(canvas, 0, 0);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.ellipse(centerX, centerY, cropWidth / 2, cropHeight / 2, 0, 0, 2 * Math.PI);
      ctx.closePath();

      ctx.clip();

      ctx.drawImage(tempCanvas, 0, 0);
    }

    resolve(canvas.toDataURL('image/png'));
  });
}
