import { waypoints } from "./waypoints";
import { scenes } from "./scenes";
import { about } from "./transitions/about";
import { contact } from "./transitions/contact";

export const transitions = {
  about,
  contact,
};

const init = () => {
  scenes.init();
  waypoints.init();
};

const destroy = () => {
  scenes.destroy();
  waypoints.destroy();
};

export const animations = { init, destroy };
