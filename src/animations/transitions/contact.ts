import gsap from "gsap";
import { sceneWeightsInOut } from "../scenes";

let inTl: gsap.core.Timeline | null = null;
let outTl: gsap.core.Timeline | null = null;

const setup = (contact: HTMLElement) => {
  inTl = gsap.timeline({
    scrollTrigger: {
      trigger: contact,
      start: "top bottom",
      end: "bottom bottom",
      scrub: true,
    },
  });

  inTl.fromTo(sceneWeightsInOut.contact, { in: 0 }, { in: 1, duration: 1, ease: "none" }, 0);

  outTl = gsap.timeline({
    scrollTrigger: {
      trigger: contact,
      start: "bottom bottom",
      end: "bottom top",
      scrub: true,
    },
  });
  outTl.fromTo(sceneWeightsInOut.contact, { out: 0 }, { out: 1, duration: 1, ease: "none" }, 0);
};

const destroy = () => {
  if (inTl) {
    inTl.kill();
    inTl = null;
  }
  if (outTl) {
    outTl.kill();
    outTl = null;
  }
};

export const contact = { setup, destroy };
