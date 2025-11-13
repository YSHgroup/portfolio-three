import { animations as avatarAnimations } from "../three/objects/avatar/animations";
import { isFeatureEnabled } from "../utils/features";

const play = () => {
  if (!isFeatureEnabled("introWave")) return;
  avatarAnimations.wave();
};

export const intro = { play };
