import gsap from "gsap";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

class Scroll {
  constructor() {}

  init() {
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
  }
}

export const scroll = new Scroll();
