import { room } from "../../three/objects/room";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sceneWeightsInOut } from "../scenes";
import { createMatchMedia } from "../utils/matchMedia";

gsap.registerPlugin(ScrollTrigger);

let mm: gsap.MatchMedia | null = null;

/**  objects.chair.rotation.x = -0.6;
  objects.chair.rotation.y = -0.8;
  objects.chair.rotation.z = -1.2; */

const setup = (hero: HTMLElement) => {
  mm = createMatchMedia((_context, { mobile, desktop }) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    tl.fromTo(room.chairRotation, { x: 0, y: 0, z: 0 }, { y: -1.1, duration: 0.6, ease: "power4.out" }, 0);
    tl.fromTo(room.chairRotation, { x: 0, y: 0, z: 0 }, { x: -0.9, z: -1.3, duration: 0.6 }, 0);

    tl.fromTo(sceneWeightsInOut.hero, { out: 0 }, { out: 1, ease: "none", duration: 1 }, 0);
    tl.fromTo(room.group.scale, { x: 1, y: 1, z: 1 }, { x: 0.8, y: 0.8, z: 0.8, duration: 1, ease: "none" }, 0);

    if (mobile) {
      tl.fromTo(room.group.position, { x: 0, y: 0, z: 0 }, { x: 3, y: 6, z: 0, duration: 1, ease: "none" }, 0);
      tl.fromTo(room.group.rotation, { x: 0, y: -2.1, z: 0 }, { x: 0, y: -2.2, z: 0, duration: 1, ease: "none" }, 0);
    } else if (desktop) {
      tl.fromTo(room.group.position, { x: 2, y: 0, z: 0 }, { x: 3, y: 6, z: 0, duration: 1, ease: "none" }, 0);
      tl.fromTo(room.group.rotation, { x: 0, y: -2.3, z: 0 }, { x: 0, y: -2.4, z: 0, duration: 1, ease: "none" }, 0);
    }
  });
};

const destroy = () => {
  if (mm) mm.revert();
};

export const hero = { setup, destroy };
