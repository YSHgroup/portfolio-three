import { avatar } from "../../three/objects/avatar";
import { room } from "../../three/objects/room";
import { avatarHologram } from "../../three/objects/avatar/hologram";
import gsap from "gsap";
import { sceneWeightsInOut } from "../scenes";

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

  tl.to(sceneWeightsInOut.hero, { out: 1, ease: "none", duration: 1 }, 0);
  tl.to(sceneWeightsInOut.about, { in: 1, ease: "none", duration: 1 }, 0);

  tl.to(avatar.tIdleIntensity, { value: 1, duration: 1 }, 0);

  const avatarMesh = avatar.getMesh();
  const hologramMesh = avatarHologram.getMesh();

  tl.to(avatarMesh.position, { x: 1, z: 5, y: 1, duration: 1 }, 0);
  tl.to(avatarMesh.rotation, { z: Math.PI * 0.6, duration: 1 }, 0);

  tl.to(hologramMesh.position, { x: 1, z: 5, y: 1, duration: 1 }, 0);
  tl.to(hologramMesh.rotation, { z: Math.PI * 0.6, duration: 1 }, 0);

  tl.to(room.group.position, { y: 5, duration: 1 }, 0);
};
