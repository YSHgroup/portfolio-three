import gsap from "gsap";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ref } from "vue";

export const lenis = ref<Lenis | null>(null);

class Scroll {
  constructor() {
    this.init();
  }

  init() {
    gsap.ticker.add((time) => {
      if (lenis.value) {
        lenis.value.raf(time * 1000);
      }
    });

    gsap.ticker.lagSmoothing(0);
  }

  createNewLenis() {
    if (lenis.value instanceof Lenis) {
      lenis.value.off("scroll", ScrollTrigger.update);
      lenis.value.destroy();
      lenis.value = null;
    }

    lenis.value = new Lenis();
    lenis.value.on("scroll", ScrollTrigger.update);
  }
}

export const scroll = new Scroll();
