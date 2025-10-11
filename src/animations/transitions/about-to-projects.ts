import { darkPlane } from "../../three/objects/dark-plane";

import gsap from "gsap";

export const setup = () => {
  const about = document.querySelector(".about");

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: about,
      start: "bottom bottom",
      end: "bottom top",
      scrub: true,
    },
  });

  tl.to(darkPlane.progress, { out: 1, duration: 1, ease: "none" }, 0);
};
