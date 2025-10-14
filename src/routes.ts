export const routes = [
  { path: "/", component: () => import("./pages/Home.vue"), name: "home", meta: { locale: "en" } },
  { path: "/de", component: () => import("./pages/Home.vue"), name: "home-de", meta: { locale: "de" } },
];
