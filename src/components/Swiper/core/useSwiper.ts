import type { SwiperProps, SwiperState } from 'library/Swiper';
import { Helpers } from 'library/Swiper/core';
import { computed, onMounted, onUnmounted, ref, type Ref, type SetupContext, type VNode } from 'vue';

interface UseSwiper {
  props: SwiperProps;
  slots: SetupContext['slots'];
  wrapperRef: Ref<HTMLElement | null>;
}

export const initialProps: SwiperProps = {
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 0,
  initialSlide: 0,
  speed: 0.5,
  autoplay: false,
  autoplayDelay: 3000,
  loop: false,
  rewind: false,
  allowTouchMove: true,
  effect: 'slide',
};

export const state = ref<SwiperState>({
  swiperId: `swiper-${Helpers.generateUUID()}`,
  translateX: 0,
  deltaX: 0,
  duration: 0,
  activeIndex: 0,
  previousIndex: 0,
  isBeginning: false,
  isEnd: false,
  totalSlidesWidth: 0,
  containerWidth: 0,
  lastTranslateX: 0,
  lastSlideIndex: 0,
});

export function useSwiper({ props, slots, wrapperRef }: UseSwiper) {
  // constants
  // states (refs and reactives)
  const slidesNode = ref<VNode[]>([]);
  // computed
  const renderToSlides = computed(() => {
    const from = 0;
    const to = slidesNode.value.length;
    const data = [];
    for (let i = from; i < to; i++) {
      const slide = slidesNode.value[Helpers.getModulo(i, slidesNode.value.length)];
      if (slide.props && props.effect === 'fade') {
        slide.props.class = 'swiper-slide-fade';
      }
      data.push(slide);
    }
    return data;
  });
  const renderedSlideElements = computed(() => {
    return Array.from(wrapperRef.value?.children || []) as HTMLElement[];
  });
  // watchers
  // lifecycles
  setSlidesNode();
  onMounted(() => {
    updateSlideClasses();
    calculationGeneral();
    window.addEventListener('resize', calculationGeneral);
  });
  onUnmounted(() => {
    window.removeEventListener('resize', calculationGeneral);
  });
  // methods
  function updateSlideClasses(activeIndex = state.value.activeIndex) {
    if (!renderedSlideElements.value.length) return;
    renderedSlideElements.value.forEach((el, index) => {
      el.classList.remove('swiper-slide-prev', 'swiper-slide-next', 'swiper-slide-active');
      if (index === activeIndex - 1) {
        el.classList.add('swiper-slide-prev');
      } else if (index === activeIndex) {
        el.classList.add('swiper-slide-active');
      } else if (index === activeIndex + 1) {
        el.classList.add('swiper-slide-next');
      }
    });
  }
  function calculationGeneral() {
    if (!wrapperRef.value) return;
    const containerWidth = wrapperRef.value.offsetWidth;
    state.value.containerWidth = containerWidth;
  }
  function setSlidesNode() {
    const defaultNodes = slots?.default?.() as VNode[];
    if (!defaultNodes || defaultNodes.length === 0) throw new Error('Swiper component must have at least one SwiperSlide child');
    const slides: VNode[] = [];
    getSlidesFromSlot(defaultNodes, slides);
    slidesNode.value = slides;
  }
  function getSlidesFromSlot(nodes: VNode[], slides: VNode[] = []): VNode[] {
    nodes.forEach((vnode, index) => {
      if (typeof vnode.type === 'symbol' && vnode.children) {
        getSlidesFromSlot(vnode.children as VNode[], slides);
      } else if (typeof vnode.type === 'object' && 'name' in vnode.type && vnode.type?.name === 'SwiperSlide') {
        if (vnode.props) Object.assign(vnode.props, { slideIndex: index });
        slides.push(vnode);
      }
    });
    return slides;
  }

  return {
    slidesNode,
    renderToSlides,
    renderedSlideElements,
    updateSlideClasses,
  };
}
