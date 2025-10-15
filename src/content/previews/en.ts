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
  },
  {
    title: "Gamedo",
    thumbnail: thumbnailGamedo,
    slug: "gamedo",
    description: "Multiplayer Gaming Platform",
  },
  {
    title: "Particles",
    thumbnail: thumbnailParticles,
    slug: "particles",
    description: "Dynamic 3D particles",
  },
  {
    title: "Pokedex",
    thumbnail: thumbnailPokedex,
    slug: "pokedex",
    description: "Open-source learning project",
  },
] as const satisfies ProjectPreview[];
