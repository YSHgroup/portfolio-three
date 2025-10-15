import thumbnailCubeWar from "../../assets/thumbnails/cubewar.webp";
import thumbnailGamedo from "../../assets/thumbnails/gamedo.webp";
import thumbnailParticles from "../../assets/thumbnails/particles.webp";
import thumbnailPokedex from "../../assets/thumbnails/pokedex.webp";

import type { ProjectPreview } from "../types";

export default [
  {
    title: "CubeWar",
    thumbnail: thumbnailCubeWar,
    slug: "cubewar",
    description: "Multiplayer strategy game",
    tags: ["three", "node", "websockets", "kubernetes", "redis"],
  },
  {
    title: "Gamedo",
    thumbnail: thumbnailGamedo,
    slug: "gamedo",
    description: "Multiplayer Gaming Platform",
    tags: ["three", "node", "kubernetes", "redis", "postgresql"],
  },
  {
    title: "Particles",
    thumbnail: thumbnailParticles,
    slug: "particles",
    description: "Dynamic 3D particles",
    tags: ["ogl", "javascript", "glsl"],
  },
  {
    title: "Pokedex",
    thumbnail: thumbnailPokedex,
    slug: "pokedex",
    description: "Open-source learning project",
    tags: ["javascript", "html", "css"],
  },
] as const satisfies ProjectPreview[];
