import { projectSlugs } from "./content/projects";

export const routes = [
  ...projectSlugs.map((slug) => ({
    path: `/project/${slug}`,
    component: () => import(`./pages/project/[slug].vue`),
    name: `${slug}-en`,
    meta: { project: slug },
  })),
  ...projectSlugs.map((slug) => ({
    path: `/de/project/${slug}`,
    component: () => import(`./pages/project/[slug].vue`),
    name: `${slug}-de`,
    meta: { project: slug },
  })),
  { path: "/", component: () => import("./pages/Home.vue"), name: "home-en", meta: { isThreeActive: true } },
  { path: "/de", component: () => import("./pages/Home.vue"), name: "home-de", meta: { isThreeActive: true } },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: () => import("./pages/NotFound.vue") },
];
