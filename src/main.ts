import { createApp } from "vue";
import "./assets/styles/index.scss";
import App from "./App.vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { createWebHistory, createRouter } from "vue-router";
import { routes } from "./routes";
import { lenis } from "./utils/scroll";

gsap.registerPlugin(ScrollTrigger);

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (to.path.startsWith("/project")) {
      lenis.value?.scrollTo(0, { immediate: true, force: true });
      return { top: 0, scrollBehavior: "auto" };
    }
    if (savedPosition) {
      return { ...savedPosition, scrollBehavior: "auto" };
    }

    if (to.hash) {
      return { el: to.hash, scrollBehavior: "auto" };
    }

    return { top: 0, scrollBehavior: "auto" };
  },
});

createApp(App).use(router).mount("#app");
