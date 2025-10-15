import thumbnailCubeWar from "../../../assets/thumbnails/cubewar.webp";
import thumbnailGamedo from "../../../assets/thumbnails/gamedo.webp";
import thumbnailParticles from "../../../assets/thumbnails/particles.webp";
import thumbnailPokedex from "../../../assets/thumbnails/pokedex.webp";

import type { ProjectPreview } from "../../types";

export default [
  {
    title: "CubeWar",
    slug: "cubewar",
    thumbnail: thumbnailCubeWar,
    description: "Multiplayer strategy game",
    tags: ["three", "node", "websockets", "kubernetes", "redis"],
  },
  {
    title: "Gamedo",
    slug: "gamedo",
    thumbnail: thumbnailGamedo,
    description: "Multiplayer Gaming Platform",
    tags: ["three", "node", "kubernetes", "redis", "postgresql"],
  },
  {
    title: "Particles",
    slug: "particles",
    thumbnail: thumbnailParticles,
    description: "Dynamic 3D particles",
    tags: ["ogl", "javascript", "glsl"],
  },
  {
    title: "Pokedex",
    slug: "pokedex",
    thumbnail: thumbnailPokedex,
    description: "Open-source learning project",
    tags: ["javascript", "html", "css"],
  },
] as const satisfies ProjectPreview[];
