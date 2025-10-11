import { onMounted } from "vue";

import { setup as heroToAbout } from "./transitions/hero-to-about";
import { setup as aboutToProjects } from "./transitions/about-to-projects";

export const useScrollAnimations = () => {
  onMounted(() => {
    heroToAbout();
    aboutToProjects();
  });
};
