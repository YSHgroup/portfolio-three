import { sounds as items } from "../definitions/sounds";
import { sprites } from "../definitions/sprites";
import { isFeatureEnabled } from "../../../utils/features";

import type { SoundKey } from "../types";

export const getSoundsHowl = (sound: SoundKey) => {
  const data = items[sound];
  if ("spriteKey" in data) {
    return sprites[data.spriteKey].howl;
  }
  return data.howl;
};

export const playSound = (soundKey: SoundKey) => {
  if (!isFeatureEnabled("sounds")) return;
  const data = items[soundKey];

  const howl = getSoundsHowl(soundKey);

  let id: number | undefined;
  if ("spriteKey" in data) {
    // For sprites, play the specific sprite name
    id = howl.play(data.name);
  } else {
    id = howl.play();
  }

  return id;
};
