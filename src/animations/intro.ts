import { animations as avatarAnimations } from "../three/objects/avatar/animations";
import { isFeatureEnabled } from "../utils/features";
import { room } from "../three/objects/room";
import gsap from "gsap";

const play = () => {
  if (!isFeatureEnabled("introWave")) return;
  avatarAnimations.wave();

  const tl = gsap.timeline();
  tl.fromTo(
    room.chairIntroRotation,
    { x: 0, y: 0, z: 0 },
    { x: 0.12, y: 0, z: -0.06, duration: 0.1, ease: "power4.out" },
    0.65,
  );
  tl.to(room.chairIntroRotation, { x: 0, y: 0, z: 0, duration: 0.2, ease: "power1.out" });
};

export const intro = { play };
