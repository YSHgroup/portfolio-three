import { projectIds } from "./content/projects";

export const routes = [
  ...projectIds.map((id) => ({
    path: `/project/${id}`,
    component: () => import(`./pages/project/[slug].vue`),
    name: `${id}-en`,
    meta: { project: id },
  })),
  ...projectIds.map((id) => ({
    path: `/de/project/${id}`,
    component: () => import(`./pages/project/[slug].vue`),
    name: `${id}-de`,
    meta: { project: id },
  })),
  { path: "/", component: () => import("./pages/Home.vue"), name: "home-en", meta: { isThreeActive: true } },
  { path: "/de", component: () => import("./pages/Home.vue"), name: "home-de", meta: { isThreeActive: true } },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: () => import("./pages/NotFound.vue") },
];
