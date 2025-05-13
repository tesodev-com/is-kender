import { checkIcon, circleIcon, closeIcon, cloudUploadOutlineIcon, flipIcon, refreshIcon, rotateLeftIcon, rotateRightIcon, squareIcon, zoomInIcon, zoomOutIcon } from '@/assets/icons';

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
  {
    id: 'cancel',
    icon: closeIcon,
  },
] as const;

export const resizePoints = [
  {
    id: 'tl',
    class: 'resize-handle--tl',
  },
  {
    id: 'tr',
    class: 'resize-handle--tr',
  },
  {
    id: 'bl',
    class: 'resize-handle--bl',
  },
  {
    id: 'br',
    class: 'resize-handle--br',
  },
  {
    id: 't',
    class: 'resize-handle--t',
  },
  {
    id: 'l',
    class: 'resize-handle--l',
  },
  {
    id: 'r',
    class: 'resize-handle--r',
  },
  {
    id: 'b',
    class: 'resize-handle--b',
  },
];
