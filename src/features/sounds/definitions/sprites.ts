import { Howl } from "howler";
import contactSprite from "../../../assets/sounds/sprites/contact.ogg";

import type { SpritesData } from "../types";

export const sprites = {
  contact: {
    howl: new Howl({
      src: [contactSprite],
      sprite: {
        gasp: [0, 485.32879818594105, false],
        snore: [1200, 2761.972789115646, false],
      },
      preload: false,
    }),
  },
} as const satisfies SpritesData;
