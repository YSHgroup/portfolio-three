import { createApp } from "vue";
import "./assets/styles/index.scss";
import App from "./App.vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.path === from.path && to.path === "/") {
      return { top: 0 };
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        createNewLenis(to.path);

        if (to.path.startsWith("/project")) {
          lenis.value?.scrollTo(0, { immediate: true, force: true });
          return resolve({ top: 0 });
        }

        if (to.path === "/") {
          lenis.value?.scrollTo(homeScrollPosition.value, { immediate: true, force: true });
          return resolve({ top: homeScrollPosition.value });
        }

        if (typeof savedPosition?.top === "number" && savedPosition.top !== 0) {
          lenis.value?.scrollTo(savedPosition.top, { immediate: true, force: true });
          return resolve({ ...savedPosition });
        }

        if (to.hash) {
          return resolve({ el: to.hash });
        }

        return resolve({ top: 0 });
      }, ROUTE_TRANSITION_DURATION * 1000);
    });
  },
});
 */
createApp(App).mount("#app");
