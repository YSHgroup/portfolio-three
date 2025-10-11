import { avatar } from "../../three/objects/avatar";
import { darkPlane } from "../../three/objects/dark-plane";

import gsap from "gsap";

export const setup = () => {
  const hero = document.querySelector(".hero");

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  tl.to(
    avatar.tIdleIntensity,
    {
      value: 1,
      duration: 1,
    },
    0,
  );

  tl.to(
    darkPlane.offset,
    {
      value: 0,
      duration: 1,
    },
    0,
  );
};
