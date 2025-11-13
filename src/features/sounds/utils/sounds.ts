import { sounds } from "../definitions/sounds";
import { isFeatureEnabled } from "../../../utils/features";

import type { SoundKey } from "../types";

export const playSound = (soundId: SoundKey) => {
  if (!isFeatureEnabled("sounds")) return;
  sounds[soundId].play();
};
