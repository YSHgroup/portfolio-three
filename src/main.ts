import { createApp } from "vue";
import "./assets/styles/index.scss";
import App from "./App.vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { createWebHistory, createRouter } from "vue-router";
import { routes } from "./routes";
import { ROUTE_TRANSITION_DURATION } from "./animations/route";
import { lenis } from "./utils/scroll";

gsap.registerPlugin(ScrollTrigger);

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.path === from.path) {
      return { ...savedPosition };
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        if (to.path.startsWith("/project")) {
          lenis.value?.scrollTo(0, { immediate: true, force: true });
          resolve({ top: 0 });
        }
        if (savedPosition) {
          resolve({ ...savedPosition });
        }

        if (to.hash) {
          resolve({ el: to.hash });
        }

        resolve({ top: 0 });
      }, ROUTE_TRANSITION_DURATION * 1000);
    });
  },
});

createApp(App).use(router).mount("#app");
