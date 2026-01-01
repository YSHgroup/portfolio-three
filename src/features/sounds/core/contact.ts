import { playSound } from "../utils/sounds";
import { sprites } from "../definitions/sprites";
import { sceneWeights } from "../../../animations/scenes";
import { clamp } from "../../../utils/math";

const SNORE_INTERVAL = 3300;

let snoreTimeout: number | null = null;
let currentId: number | undefined;

const scheduleNextSnore = () => {
  if (snoreTimeout) {
    clearTimeout(snoreTimeout);
  }

  snoreTimeout = window.setTimeout(() => {
    currentId = playSound("snore");
    scheduleNextSnore();
  }, SNORE_INTERVAL);
};

scheduleNextSnore();
playSound("snore");

export const tick = () => {
  sprites.contact.howl.volume(clamp(sceneWeights.contact * 2, 0, 1));
};

export const stopSnoreRepetition = () => {
  if (snoreTimeout) {
    clearTimeout(snoreTimeout);
    snoreTimeout = null;
  }
  if (currentId) {
    sprites.contact.howl.stop(currentId);
    currentId = undefined;
  }
};
