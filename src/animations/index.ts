import { setup as heroToAbout } from "./transitions/hero-to-about";
import { setup as aboutToProjects } from "./transitions/about-to-projects";
import { setup as contact } from "./transitions/contact";
import { waypoints } from "./waypoints";
import { scenes } from "./scenes";

const init = () => {
  heroToAbout();
  aboutToProjects();
  contact();

  scenes.init();
  waypoints.init();
};

export const animations = { init };
