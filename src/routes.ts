import { projectIds } from "./content/projects";

export const routes = [
  ...projectIds.map((id) => ({
    path: `/project/${id}`,
    component: () => import(`./pages/project/[slug].vue`),
    name: id,
    meta: { project: id },
  })),
  { path: "/", component: () => import("./pages/Home.vue"), name: "home", meta: { isThreeActive: true } },
  { path: "/:pathMatch(.*)*", name: "not-found", component: () => import("./pages/NotFound.vue") },
];
