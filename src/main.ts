import { createApp } from "vue";
import "./assets/styles/index.scss";
import "lenis/dist/lenis.css";
import App from "./App.vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { createWebHistory, createRouter } from "vue-router";
import { routes } from "./routes";

gsap.registerPlugin(ScrollTrigger);

gsap.ticker.lagSmoothing(0);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
