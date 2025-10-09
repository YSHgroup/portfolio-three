import { avatar } from "./avatar";
import { room } from "./room";

const init = () => {
  avatar.init();
  room.init();
};

const destroy = () => {};

export const objects = { init, destroy };
