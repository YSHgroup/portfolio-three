import { sounds } from "../definitions/sounds";

// Snore repetition logic
let snoreTimeout: number | null = null;

const scheduleNextSnore = () => {
  if (snoreTimeout) {
    clearTimeout(snoreTimeout);
  }

  snoreTimeout = window.setTimeout(() => {
    sounds.snore.play();
  }, 1800);
};

// Set up event listener for when snore ends to schedule next play
sounds.snore.on("end", scheduleNextSnore);

export const stopSnoreRepetition = () => {
  if (snoreTimeout) {
    clearTimeout(snoreTimeout);
    snoreTimeout = null;
  }
};
