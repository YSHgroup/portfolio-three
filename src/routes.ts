export const routes = [
  { path: "/", component: () => import("./pages/Home.vue"), name: "home", meta: { isThreeActive: true } },
  { path: "/de", component: () => import("./pages/Home.vue"), name: "home-de", meta: { isThreeActive: true } },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: () => import("./pages/NotFound.vue") },
];
