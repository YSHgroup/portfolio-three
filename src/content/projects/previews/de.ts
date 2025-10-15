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
    description: "Multiplayer-Strategiespiel",
    tags: ["three", "node", "websockets", "kubernetes", "redis"],
  },
  {
    title: "Gamedo",
    slug: "gamedo",
    thumbnail: thumbnailGamedo,
    description: "Multiplayer-Gaming-Plattform",
    tags: ["three", "node", "kubernetes", "redis", "postgresql"],
  },
  {
    title: "Particles",
    slug: "particles",
    thumbnail: thumbnailParticles,
    description: "Dynamische 3D Partikel",
    tags: ["ogl", "javascript", "glsl"],
  },
  {
    title: "Pokedex",
    slug: "pokedex",
    thumbnail: thumbnailPokedex,
    description: "Open-Source Lernprojekt",
    tags: ["javascript", "html", "css"],
  },
] as const satisfies ProjectPreview[];
