import { waypoints } from "./waypoints";
import { scenes } from "./scenes";
import { about } from "./transitions/about";
import { contact } from "./transitions/contact";
import { intro } from "./intro";

export const transitions = {
  about,
  contact,
};

const init = () => {
  scenes.init();
  waypoints.init();
  intro.play();
};

const destroy = () => {
  scenes.destroy();
  waypoints.destroy();
};

export const animations = { init, destroy };
