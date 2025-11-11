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

  handleScroll() {
    ScrollTrigger.update();
  }

  createNewLenis() {
    if (lenis.value instanceof Lenis) {
      lenis.value.off("scroll", this.handleScroll.bind(this));
      lenis.value.destroy();
      lenis.value = null;
    }

    lenis.value = new Lenis({
      anchors: { lerp: 0.08 },
    });
    lenis.value.on("scroll", this.handleScroll.bind(this));
  }
}

export const scroll = new Scroll();
