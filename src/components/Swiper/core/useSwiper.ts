import type { SwiperProps, SwiperState } from 'library/Swiper';
import { computed, ref, type SetupContext, type VNode } from 'vue';
import Helpers from './helpers';

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
};

export function useSwiper(slots: SetupContext['slots']) {
  // constants

  // composable

  // states (refs and reactives)
  const slidesNode = ref<VNode[]>([]);
  const state = ref<SwiperState>({
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
  // computed
  const renderToSlides = computed(() => {
    const from = 0;
    const to = slidesNode.value.length;
    const data = [];
    for (let i = from; i < to; i++) {
      const slide = slidesNode.value[Helpers.getModulo(i, slidesNode.value.length)];
      data.push(slide);
    }
    return data;
  });
  // watchers

  // lifecycles
  setSlidesNode();

  // methods
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
    state,
    slidesNode,
    renderToSlides,
  };
}
