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
    description:
      "CubeWar is a browser-based multiplayer game where players control cube characters in fast, strategic combat.",
  },
  {
    title: "Gamedo",
    thumbnail: thumbnailGamedo,
    slug: "gamedo",
    description: "Gamedo is a platform for creating and sharing games.",
  },
  {
    title: "Particles",
    thumbnail: thumbnailParticles,
    slug: "particles",
    description: "Particles is a project that animates particles.",
  },
  {
    title: "Pokedex",
    thumbnail: thumbnailPokedex,
    slug: "pokedex",
    description: "Pokedex is a project that displays Pokémon.",
  },
] as const satisfies ProjectPreview[];
