import { createApp } from "vue";
import "./assets/styles/index.scss";
import App from "./App.vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { createMemoryHistory, createRouter } from "vue-router";
import Home from "./pages/Home.vue";

gsap.registerPlugin(ScrollTrigger);

gsap.ticker.lagSmoothing(0);

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: "/", component: Home }],
});

createApp(App).use(router).mount("#app");
