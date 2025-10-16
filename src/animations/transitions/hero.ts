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

  tl.fromTo(avatar.tIdleIntensity, { value: 0 }, { value: 1, duration: 1 }, 0);

  //const hologramMesh = avatarHologram.getMesh();
  const { waypointsPosition, waypointsRotation } = avatar;

  tl.fromTo(waypointsPosition, { x: 0, y: 0, z: 0 }, { x: 1, z: 5, y: 1, duration: 1 }, 0);
  tl.fromTo(waypointsRotation, { x: 0, y: 0, z: 0 }, { y: -Math.PI * 0.6, duration: 1 }, 0);

  //tl.to(hologramMesh.position, { x: 1, z: 5, y: 1, duration: 1 }, 0);
  //tl.to(hologramMesh.rotation, { z: Math.PI * 0.6, duration: 1 }, 0);

  tl.fromTo(room.group.position, { y: 0 }, { y: 5, duration: 1 }, 0);
};

const destroy = () => {
  if (tl) {
    tl.kill();
  }
};

export const hero = { setup, destroy };
