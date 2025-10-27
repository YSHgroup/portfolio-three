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
  },
  {
    title: "Gamedo",
    slug: "gamedo",
    thumbnail: thumbnailGamedo,
    description: "Multiplayer gaming platform",
  },
  {
    title: "WebGL Particles",
    slug: "particles",
    thumbnail: thumbnailParticles,
    description: "Dynamic 3D particles",
  },
  {
    title: "Pokédex",
    slug: "pokedex",
    thumbnail: thumbnailPokedex,
    description: "Open-source learning project",
  },
] as const satisfies ProjectPreview[];
