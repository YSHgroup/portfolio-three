import { avatar } from "./avatar";
import { avatarHologram } from "./avatar/hologram";
import { darkPlane } from "./dark-plane";
import { lab } from "./lab";
import { room } from "./room";

const init = () => {
  avatarHologram.init();
  avatar.init();
  lab.init();
  darkPlane.init();
  room.init();
};

const destroy = () => {};

export const objects = { init, destroy };
