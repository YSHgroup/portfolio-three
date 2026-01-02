import { Howl } from "howler";

import type { SoundsData, SoundKey } from "../types";

import soundBird from "../../../assets/sounds/bird.mp3";
import soundClick from "../../../assets/sounds/click.mp3";
import soundHover0 from "../../../assets/sounds/hover-0.mp3";
import soundHover1 from "../../../assets/sounds/hover-1.mp3";
import soundHover2 from "../../../assets/sounds/hover-2.mp3";
import soundHover3 from "../../../assets/sounds/hover-3.mp3";
import soundMouseWheel0 from "../../../assets/sounds/mouse-wheel-0.mp3";
import soundMouseWheel1 from "../../../assets/sounds/mouse-wheel-1.mp3";
import soundMouseWheel2 from "../../../assets/sounds/mouse-wheel-2.mp3";
import soundNotification from "../../../assets/sounds/notification.mp3";
import soundKeyboard from "../../../assets/sounds/keyboard.mp3";

export const sounds = {
  bird: { howl: new Howl({ src: [soundBird], loop: false, volume: 0.75 }) },
  click: { howl: new Howl({ src: [soundClick], loop: false, volume: 1 }) },
  gasp: { spriteKey: "contact", name: "gasp" },
  hover0: { howl: new Howl({ src: [soundHover0], loop: false, volume: 0.075 }) },
  hover1: { howl: new Howl({ src: [soundHover1], loop: false, volume: 0.075 }) },
  hover2: { howl: new Howl({ src: [soundHover2], loop: false, volume: 0.075 }) },
  hover3: { howl: new Howl({ src: [soundHover3], loop: false, volume: 0.075 }) },
  keyboard: { howl: new Howl({ src: [soundKeyboard], loop: false, volume: 1 }) },
  mouseWheel0: { howl: new Howl({ src: [soundMouseWheel0], loop: false, volume: 1 }) },
  mouseWheel1: { howl: new Howl({ src: [soundMouseWheel1], loop: false, volume: 1 }) },
  mouseWheel2: { howl: new Howl({ src: [soundMouseWheel2], loop: false, volume: 1 }) },
  notification: { howl: new Howl({ src: [soundNotification], loop: false, volume: 0.5 }) },
  snore: { spriteKey: "contact", name: "snore" },
} as const satisfies SoundsData;

export const pools = {
  hover: ["hover0", "hover1", "hover2", "hover3"],
  mouseWheel: ["mouseWheel0", "mouseWheel1", "mouseWheel2"],
} as const satisfies Record<string, SoundKey[]>;
