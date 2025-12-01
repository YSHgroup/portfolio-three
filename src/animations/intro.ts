//import { animations as avatarAnimations } from "../three/objects/avatar/animations";
import { isFeatureEnabled } from "../utils/features";
import gsap from "gsap";
import { mouse } from "../three/objects/room/mouse";

const play = () => {
  console.log("wave enabled", isFeatureEnabled("introWave"));
  if (!isFeatureEnabled("introWave")) return;
  console.log("wave start");
  //avatarAnimations.wave();

  const tl = gsap.timeline();
  tl.set(mouse.enabled, { value: true }, 0.3);
};

export const intro = { play };
