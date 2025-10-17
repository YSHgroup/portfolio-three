import { room } from "../../three/objects/room";
import gsap from "gsap";
import { sceneWeightsInOut } from "../scenes";

let tl: gsap.core.Timeline | null = null;

const setup = (hero: HTMLElement) => {
  tl = gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  tl.fromTo(sceneWeightsInOut.hero, { out: 0 }, { out: 1, ease: "none", duration: 1 }, 0);

  tl.fromTo(room.group.position, { x: 2, y: 0, z: 0 }, { x: 2, y: 6, z: 0, duration: 1, ease: "none" }, 0);
  tl.fromTo(room.group.rotation, { x: 0, y: -2.3, z: 0 }, { x: 0, y: -2.3, z: 0, duration: 1, ease: "none" }, 0);
};

const destroy = () => {
  if (tl) {
    tl.kill();
  }
};

export const hero = { setup, destroy };
