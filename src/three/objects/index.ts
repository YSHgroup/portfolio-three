import { avatar } from "./avatar";
import { avatarHologram } from "./avatar/hologram";
import { contact } from "./contact";
import { darkPlane } from "./dark-plane";
import { gridFloor } from "./grid-floor";
import { lab } from "./lab";
import { room } from "./room";

const init = () => {
  avatarHologram.init();
  avatar.init();
  contact.init();
  darkPlane.init();
  gridFloor.init();
  lab.init();
  room.init();
};

const destroy = () => {
  avatarHologram.destroy();
  avatar.destroy();
  contact.destroy();
  darkPlane.destroy();
  gridFloor.destroy();
  lab.destroy();
  room.destroy();
};

export const objects = { init, destroy };
