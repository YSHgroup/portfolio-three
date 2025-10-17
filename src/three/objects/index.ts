import { avatar } from "./avatar";
import { avatarHologram } from "./avatar/hologram";
import { darkPlane } from "./dark-plane";
import { gridFloor } from "./grid-floor";
import { lab } from "./lab";
import { room } from "./room";

const init = () => {
  avatarHologram.init();
  avatar.init();
  darkPlane.init();
  gridFloor.init();
  lab.init();
  room.init();
};

const destroy = () => {};

export const objects = { init, destroy };
