import { setup as heroToAbout } from "./transitions/hero-to-about";
import { setup as aboutToProjects } from "./transitions/about-to-projects";

const init = () => {
  heroToAbout();
  aboutToProjects();
};

export const animations = { init };
