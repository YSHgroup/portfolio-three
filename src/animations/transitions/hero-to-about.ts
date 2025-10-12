import { avatar } from "../../three/objects/avatar";
import { room } from "../../three/objects/room";
import { avatarHologram } from "../../three/objects/avatar/hologram";
import { uniforms as hologramUniforms } from "../../three/objects/avatar/hologram-material";
import gsap from "gsap";
import { sceneWeightsInOut } from "../scenes";

export const setup = () => {
  const hero = document.querySelector(".hero");
  const aboutOverlay = document.querySelector(".about-overlay");

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  //TBD: remove this
  //tl.to(darkPlane.progress, { in: 1, duration: 1, ease: "none" }, 0);

  tl.to(sceneWeightsInOut.hero, { out: 1, ease: "none", duration: 1 }, 0);
  tl.to(sceneWeightsInOut.about, { in: 1, ease: "none", duration: 1 }, 0);

  tl.to(avatar.tIdleIntensity, { value: 1, duration: 1 }, 0);

  const avatarMesh = avatar.getMesh();
  const hologramMesh = avatarHologram.getMesh();

  tl.to(avatarMesh.position, { x: 1, z: 5, y: 1, duration: 1 }, 0);
  tl.to(avatarMesh.rotation, { z: Math.PI * 0.6, duration: 1 }, 0);

  tl.to(hologramMesh.position, { x: 1, z: 5, y: 1, duration: 1 }, 0);
  tl.to(hologramMesh.rotation, { z: Math.PI * 0.6, duration: 1 }, 0);

  /**  tl.to(avatarMesh.position, { x: 2.5, z: 3, y: 1, duration: 1 }, 0);
  tl.to(avatarMesh.rotation, { z: Math.PI * 0.9, duration: 1 }, 0);

  tl.to(hologramMesh.position, { x: 2.5, z: 3, y: 1, duration: 1 }, 0);
  tl.to(hologramMesh.rotation, { z: Math.PI * 0.9, duration: 1 }, 0);
 */

  //tl.to(hologramUniforms.uOpacity, { value: 1, duration: 1 }, 0);

  tl.to(room.group.position, { y: 5, duration: 1 }, 0);

  tl.to(aboutOverlay, { opacity: 1, duration: 1 }, 0);
};
