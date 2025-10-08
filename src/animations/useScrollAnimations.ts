import { onMounted } from "vue";

import { setup as heroToAbout } from "./transitions/hero-to-about";

export const useScrollAnimations = () => {
  onMounted(() => {
    heroToAbout();
  });
};
