import { createApp } from "vue";
import "./assets/styles/index.scss";
import App from "./App.vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { createWebHistory, createRouter } from "vue-router";
import { routes } from "./routes";
import LenisVue from "lenis/vue";
import { lenis } from "./utils/scroll";

gsap.registerPlugin(ScrollTrigger);

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    const { top } = savedPosition ?? {};
    if (typeof top === "number") {
      lenis.scrollTo(top, { immediate: true, force: true });
    }
  },
});

createApp(App).use(router).use(LenisVue).mount("#app");
