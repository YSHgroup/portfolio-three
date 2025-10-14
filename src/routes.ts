export const routes = [
  { path: "/", component: () => import("./pages/Home.vue"), name: "home" },
  { path: "/de", component: () => import("./pages/Home.vue"), name: "home-de" },
];
