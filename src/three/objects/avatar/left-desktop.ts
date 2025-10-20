import gsap from "gsap";
import { animations as avatarAnimations } from "./animations";
import { desktops } from "../room/desktops";
import { sceneWeights } from "../../../animations/scenes";

let ctx: gsap.Context | null = null;
const isActive = { value: false };

const INTERVAL_DURATION = 8;

const init = () => {
  startInterval();
};

const startInterval = () => {
  const { actions } = avatarAnimations;
  const leftDesktop = actions.get("left-desktop");
  const idle = actions.get("desktop-idle");
  if (!leftDesktop || !idle) return;
  const clip = leftDesktop.getClip();

  if (ctx) ctx.kill();

  const calcDelay = () => {
    return 6;
    return Math.floor(INTERVAL_DURATION + Math.random() * 6 + clip.duration);
  };

  const playAnimation = () => {
    const delay = calcDelay();
    gsap.delayedCall(delay, playAnimation);

    if (sceneWeights.hero < 0.95) return;

    const tl = gsap.timeline({
      duration: clip.duration + 0.2,
      onComplete: () => {
        avatarAnimations.play("desktop-idle", 0.3);
        isActive.value = false;
      },
    });

    isActive.value = true;

    tl.add(() => {
      avatarAnimations.play("left-desktop", 0.3);
    }, 0.2);

    desktops.showMessage();
  };

  ctx = gsap.context(() => {
    const initialDelay = calcDelay();
    gsap.delayedCall(initialDelay, playAnimation);
  });
};

const destroy = () => {
  ctx?.kill();
  ctx = null;
};

export const leftDesktop = { init, destroy, getIsActive: () => isActive.value };
