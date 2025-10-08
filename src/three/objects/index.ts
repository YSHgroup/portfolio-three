import { room } from "./room";

const init = () => {
  room.init();
};

const destroy = () => {};

export const objects = { init, destroy };
