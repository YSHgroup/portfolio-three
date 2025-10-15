import { sceneWeightsInOut } from "../scenes";

import gsap from "gsap";

let tl: gsap.core.Timeline | null = null;

const setup = (about: HTMLElement) => {
  tl = gsap.timeline({
    scrollTrigger: {
      trigger: about,
      start: "bottom bottom",
      end: "bottom top",
      scrub: true,
    },
  });

  //tl.to(darkPlane.progress, { out: 1, duration: 1, ease: "none" }, 0);
  tl.to(sceneWeightsInOut.about, { out: 1, ease: "none", duration: 1 }, 0);
  //tl.to(sceneWeightsInOut.projects, { in: 1, ease: "none", duration: 1 }, 0);
};

const destroy = () => {
  if (tl) {
    tl.kill();
  }
};

export const about = { setup, destroy };
