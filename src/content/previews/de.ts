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
    description: "Multiplayer-Strategiespiel",
    tags: ["three", "node", "websockets", "kubernetes", "redis"],
  },
  {
    title: "Gamedo",
    thumbnail: thumbnailGamedo,
    slug: "gamedo",
    description: "Multiplayer-Gaming-Plattform",
    tags: ["three", "node", "kubernetes", "redis", "postgresql"],
  },
  {
    title: "Particles",
    thumbnail: thumbnailParticles,
    slug: "particles",
    description: "Dynamische 3D Partikel",
    tags: ["ogl", "javascript", "glsl"],
  },
  {
    title: "Pokedex",
    thumbnail: thumbnailPokedex,
    slug: "pokedex",
    description: "Open-Source Lernprojekt",
    tags: ["javascript", "html", "css"],
  },
] as const satisfies ProjectPreview[];
