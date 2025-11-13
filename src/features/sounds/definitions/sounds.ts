import { Howl } from "howler";

import soundBird from "../../../assets/sounds/bird.mp3";
import soundGasp from "../../../assets/sounds/gasp.mp3";

export const sounds = {
  bird: new Howl({ src: [soundBird], loop: false, volume: 0.75 }),
  gasp: new Howl({ src: [soundGasp], loop: false, volume: 0.5 }),
} as const;
