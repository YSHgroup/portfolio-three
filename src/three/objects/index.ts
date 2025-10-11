import { avatar } from "./avatar";
import { darkPlane } from "./dark-plane";
import { room } from "./room";

const init = () => {
  avatar.init();
  darkPlane.init();
  room.init();
};

const destroy = () => {};

export const objects = { init, destroy };
