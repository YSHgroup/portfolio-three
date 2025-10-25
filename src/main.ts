import { createApp } from "vue";
import "./assets/styles/index.scss";
import App from "./App.vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { createWebHistory, createRouter } from "vue-router";
import { routes } from "./routes";

gsap.registerPlugin(ScrollTrigger);

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
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
