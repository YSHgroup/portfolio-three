import videoPokedex from "../../../assets/videos/pokedex.mp4";

import type { ProjectContent } from "../../types";

export default {
  title: "Sharkie",
  theme: "light",
  tags: ["javascript", "html", "css"],
  live: "https://sharkie.david-hckh.com/",
  source: "https://github.com/davidhckh/sharkie-game",
  video: videoPokedex,
  description:
    "Sharkie is a 2D underwater adventure game built with vanilla JavaScript and HTML5 Canvas.<br/><br/>The project is structured around object-oriented programming principles, featuring custom classes for entities, enemies, and game systems, alongside smooth animations, combat mechanics, and layered parallax backgrounds.",
  components: [],
} as const satisfies ProjectContent;
