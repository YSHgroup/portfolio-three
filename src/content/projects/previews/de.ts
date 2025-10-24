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
  },
  {
    title: "Gamedo",
    slug: "gamedo",
    thumbnail: thumbnailGamedo,
    description: "Multiplayer-Gaming-Plattform",
  },
  {
    title: "Particles",
    slug: "particles",
    thumbnail: thumbnailParticles,
    description: "Dynamische 3D Partikel",
  },
  {
    title: "Pokedex",
    slug: "pokedex",
    thumbnail: thumbnailPokedex,
    description: "Open-Source Lernprojekt",
  },
] as const satisfies ProjectPreview[];
