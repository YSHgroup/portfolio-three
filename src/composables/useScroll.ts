import gsap from "gsap";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ref } from "vue";
import { onMounted, onUnmounted } from "vue";
import { path } from "./useRouteObserver";

export const lenis = ref<Lenis | null>(null);
export const velocity = ref(0);
export const hasScrolled = ref(false);
export const homeScrollPosition = ref(0);

export const createNewLenis = (path: string) => {
  const isHome = path === "/";

  const handleScroll = () => {
    hasScrolled.value = true;
    ScrollTrigger.update();

    if (path === "/" && typeof lenis.value?.animatedScroll === "number" && lenis.value?.isScrolling === "smooth") {
      homeScrollPosition.value = lenis.value.animatedScroll;
    }
  };

  if (lenis.value instanceof Lenis) {
    lenis.value.off("scroll", handleScroll);
    lenis.value.destroy();
    lenis.value = null;
  }

  lenis.value = new Lenis({
    anchors: { lerp: 0.08 },
  });

  lenis.value.scrollTo(isHome ? homeScrollPosition.value : 0, { immediate: true, force: true });
  lenis.value.on("scroll", handleScroll);
};

export const useScroll = () => {
  const tick = (time: number) => {
    if (lenis.value?.isScrolling === "smooth" && Math.abs(lenis.value?.velocity) > 0) {
      velocity.value = Math.min(Math.abs(lenis.value?.velocity * 0.75) || 0, 1);
    }

    if (lenis.value) {
      lenis.value.raf(time * 1000);
    }
  };

  onMounted(() => {
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    console.log(path.value);
    if (path.value) {
      createNewLenis(path.value);
    }
  });

  onUnmounted(() => {
    gsap.ticker.remove(tick);
  });
};
