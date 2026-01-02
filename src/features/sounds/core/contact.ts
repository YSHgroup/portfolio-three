import { playSound } from "../utils/sounds";
import { sprites } from "../definitions/sprites";
import { sceneWeights } from "../../../animations/scenes";
import { clamp } from "../../../utils/math";
import { projectVisible } from "../../../composables/useRouteObserver";

const SNORE_INTERVAL = 2.0833332538604736 * 1000 * 2;

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
  const volume = projectVisible.value ? 0 : clamp(sceneWeights.contact * 1, 0, 1);
  sprites.contact.howl.volume(volume);
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
