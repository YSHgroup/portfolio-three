import { avatar } from "../../three/objects/avatar";
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
  tl.fromTo(sceneWeightsInOut.about, { in: 0 }, { in: 1, ease: "none", duration: 1 }, 0);

  tl.fromTo(avatar.tIdleIntensity, { value: 0 }, { value: 1, duration: 1, ease: "power1.out" }, 0);

  const { waypointsPosition, waypointsRotation } = avatar;

  tl.fromTo(waypointsPosition, { x: 2, y: 0, z: 0 }, { x: 0, y: 1, z: 6, duration: 1, ease: "power1.out" }, 0);
  tl.fromTo(
    waypointsRotation,
    { x: 0, y: -2.3 + Math.PI / 2, z: 0 },
    { x: 0, y: -Math.PI * 0.85, z: 0, duration: 1, ease: "power1.out" },
    0,
  );

  tl.fromTo(room.group.position, { x: 2, y: 0, z: 0 }, { x: 2, y: 6, z: 0, duration: 1, ease: "none" }, 0);
  tl.fromTo(room.group.rotation, { x: 0, y: -2.3, z: 0 }, { x: 0, y: -2.3, z: 0, duration: 1, ease: "none" }, 0);
};

const destroy = () => {
  if (tl) {
    tl.kill();
  }
};

export const hero = { setup, destroy };
