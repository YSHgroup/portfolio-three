import { sounds } from "../definitions/sounds";

import type { SoundKey } from "../types";

export const playSound = (soundId: SoundKey) => {
  sounds[soundId].play();
};
