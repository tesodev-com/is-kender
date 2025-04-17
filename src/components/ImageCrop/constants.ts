import { circleIcon, flipIcon, refreshIcon, rotateLeftIcon, rotateRightIcon, squareIcon, zoomInIcon, zoomOutIcon } from '@/assets/icons';

export const actionList = [
  {
    label: 'Rotation',
    controls: [
      {
        id: 'rotateLeft',
        icon: rotateLeftIcon,
      },
      {
        id: 'rotateRight',
        icon: rotateRightIcon,
      },
    ],
  },
  {
    label: 'Flip',
    controls: [
      {
        id: 'flipHorizontal',
        icon: flipIcon,
      },
      {
        id: 'flipVertical',
        icon: flipIcon,
      },
    ],
  },
  {
    label: 'Zoom',
    controls: [
      {
        id: 'zoomIn',
        icon: zoomInIcon,
      },
      {
        id: 'zoomOut',
        icon: zoomOutIcon,
      },
    ],
  },
  {
    label: 'Şablon',
    controls: [
      {
        id: 'circle',
        icon: circleIcon,
      },
      {
        id: 'square',
        icon: squareIcon,
      },
    ],
  },
  {
    label: 'İşlemler',
    controls: [
      {
        id: 'reset',
        icon: refreshIcon,
      },
    ],
  },
] as const;
