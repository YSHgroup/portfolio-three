import { waypoints } from "./waypoints";
import { scenes } from "./scenes";
import { setup as hero } from "./transitions/hero";
import { setup as about } from "./transitions/about";
import { setup as contact } from "./transitions/contact";

export const transitions = {
  hero,
  about,
  contact,
};

const init = () => {
  scenes.init();
  waypoints.init();
};

export const animations = { init };
