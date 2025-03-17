import { onMounted, onUnmounted } from 'vue';
import type { SwiperProps } from '../Swiper';

interface UseAutoplay {
  props: SwiperProps;
  cb: () => void;
}

export function useAutoplay({ props, cb }: UseAutoplay) {
  // constants
  let interval: NodeJS.Timeout | null = null;
  // states (refs and reactives)
  // computed
  // watchers
  // lifecycles
  onMounted(() => {
    autoPlay('start');
  });
  onUnmounted(() => {
    autoPlay('stop');
  });
  // methods
  function autoPlay(status: 'start' | 'stop') {
    if (props.autoplay && status === 'start') {
      interval = setInterval(() => {
        cb();
      }, props.autoplayDelay);
    } else if (interval && status === 'stop') {
      clearInterval(interval);
    }
  }

  return {
    autoPlay,
  };
}
