import { darkPlane } from "../../three/objects/dark-plane";

import gsap from "gsap";

export const setup = () => {
  const projects = document.querySelector(".projects");

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: projects,
      start: "top bottom",
      end: "top top",
      scrub: true,
    },
  });

  tl.to(darkPlane.progress, { out: 1, duration: 1 }, 0);
};
