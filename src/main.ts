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
  scrollBehavior(_to, _from, savedPosition) {
    lenis.scrollTo(savedPosition?.top || 0, { immediate: true, force: true });

    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});

createApp(App).use(router).mount("#app");
