import { sceneWeightsInOut } from "../scenes";

import gsap from "gsap";

export const setup = (about: HTMLElement) => {
  const tl = gsap.timeline({
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
