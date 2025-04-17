import { checkIcon, circleIcon, cloudUploadOutlineIcon, flipIcon, refreshIcon, rotateLeftIcon, rotateRightIcon, squareIcon, zoomInIcon, zoomOutIcon } from '@/assets/icons';

export const actionList = [
  {
    id: 'rotateLeft',
    icon: rotateLeftIcon,
  },
  {
    id: 'rotateRight',
    icon: rotateRightIcon,
  },
  {
    id: 'flipHorizontal',
    icon: flipIcon,
  },
  {
    id: 'flipVertical',
    icon: flipIcon,
  },
  {
    id: 'zoomIn',
    icon: zoomInIcon,
  },
  {
    id: 'zoomOut',
    icon: zoomOutIcon,
  },
  {
    id: 'circle',
    icon: circleIcon,
  },
  {
    id: 'square',
    icon: squareIcon,
  },
  {
    id: 'reset',
    icon: refreshIcon,
  },
  {
    id: 'upload',
    icon: cloudUploadOutlineIcon,
  },
  {
    id: 'apply',
    icon: checkIcon,
  },
] as const;
