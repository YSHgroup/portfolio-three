import gsap from "gsap";
import { sceneWeightsInOut } from "../scenes";

let tl: gsap.core.Timeline | null = null;

const setup = (contact: HTMLElement) => {
  tl = gsap.timeline({
    scrollTrigger: {
      trigger: contact,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });

  tl.fromTo(sceneWeightsInOut.contact, { in: 0 }, { in: 1, duration: 1 }, 0);
};

const destroy = () => {
  if (tl) {
    tl.kill();
  }
};

export const contact = { setup, destroy };
