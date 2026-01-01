import { Howl } from "howler";

import type { SoundsData } from "../types";

import soundBird from "../../../assets/sounds/bird.mp3";

export const sounds = {
  bird: { howl: new Howl({ src: [soundBird], loop: false, volume: 0.75 }) },
  gasp: { spriteKey: "contact", name: "gasp" },
  snore: { spriteKey: "contact", name: "snore" },
} as const satisfies SoundsData;
