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
    "Sharkie ist ein 2D-Unterwasser-Abenteuerspiel, entwickelt mit Vanilla JavaScript und HTML5 Canvas.<br/><br/>Das Projekt basiert auf objektorientierten Programmierprinzipien und nutzt eigene Klassen für Spielfiguren, Gegner und Spielsysteme, ergänzt durch flüssige Animationen, Kampfsysteme und mehrschichtige Parallax-Hintergründe.",
  components: [],
} as const satisfies ProjectContent;
