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

  tl.to(sceneWeightsInOut.hero, { out: 1, ease: "none", duration: 1 }, 0);
  tl.to(sceneWeightsInOut.about, { in: 1, ease: "none", duration: 1 }, 0);

  tl.to(avatar.tIdleIntensity, { value: 1, duration: 1 }, 0);

  //const hologramMesh = avatarHologram.getMesh();
  const { waypointsPosition, waypointsRotation } = avatar;

  tl.to(waypointsPosition, { x: 1, z: 5, y: 1, duration: 1 }, 0);
  tl.to(waypointsRotation, { y: -Math.PI * 0.6, duration: 1 }, 0);

  //tl.to(hologramMesh.position, { x: 1, z: 5, y: 1, duration: 1 }, 0);
  //tl.to(hologramMesh.rotation, { z: Math.PI * 0.6, duration: 1 }, 0);

  tl.to(room.group.position, { y: 5, duration: 1 }, 0);
};

const destroy = () => {
  if (tl) {
    tl.kill();
  }
};

export const hero = { setup, destroy };
