import { avatar } from "../../three/objects/avatar";
import { darkPlane } from "../../three/objects/dark-plane";
import { camera } from "../../three/core/camera";

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

  tl.to(avatar.tIdleIntensity, { value: 1, duration: 1 }, 0);
  tl.to(darkPlane.progress, { in: 1, duration: 1, ease: "none" }, 0);

  tl.to(camera.instance.position, { x: 5.8, y: 2.7, z: 8.3, duration: 1 }, 0);
  tl.to(camera.lookAtPoint, { x: -2.7, y: -1, z: 0, duration: 1 }, 0);
};
