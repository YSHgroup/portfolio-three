import gsap from "gsap";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ref, watch } from "vue";
import { onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { ROUTE_TRANSITION_DURATION } from "../animations/route";

export const lenis = ref<Lenis | null>(null);
export const velocity = ref(0);
export const hasScrolled = ref(false);

export const useScroll = () => {
  const route = useRoute();

  const tick = (time: number) => {
    if (lenis.value?.isScrolling === "smooth" && Math.abs(lenis.value?.velocity) > 0) {
      velocity.value = Math.min(Math.abs(lenis.value?.velocity * 0.75) || 0, 1);
    }

    if (lenis.value) {
      lenis.value.raf(time * 1000);
    }
  };

  const handleScroll = () => {
    hasScrolled.value = true;
    ScrollTrigger.update();
  };

  const createNewLenis = () => {
    if (lenis.value instanceof Lenis) {
      lenis.value.off("scroll", handleScroll);
      lenis.value.destroy();
      lenis.value = null;
    }

    velocity.value = 0;

    lenis.value = new Lenis({
      anchors: { lerp: 0.08 },
    });
    lenis.value.on("scroll", handleScroll);
  };

  onMounted(() => {
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    createNewLenis();
  });

  watch(
    () => route.path,
    (_newVal, _oldVal, onInvalidate) => {
      const timeout = setTimeout(() => {
        createNewLenis();
      }, ROUTE_TRANSITION_DURATION * 1000);

      onInvalidate(() => {
        clearTimeout(timeout);
      });
    },
  );

  onUnmounted(() => {
    gsap.ticker.remove(tick);
  });
};
