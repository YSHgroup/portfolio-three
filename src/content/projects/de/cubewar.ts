import videoCubeWar from "../../../assets/videos/cubewar.mp4";

import engine from "../../../assets/images/projects/cubewar/engine.png";
import maps from "../../../assets/images/projects/cubewar/maps.png";
import party from "../../../assets/images/projects/cubewar/party.png";

import type { ProjectContent } from "../../types";

export default {
  title: "CubeWar",
  tags: ["three", "node", "websockets", "kubernetes", "redis"],
  video: videoCubeWar,
  videoBorder: false,
  live: "https://cubewar.io",
  description:
    "CubeWar ist ein browserbasiertes Multiplayer-Spiel, in dem Spieler in schnellen, strategischen Kämpfen gegeneinander antreten.<br/><br/>Ich habe den gesamten Stack selbst entwickelt, inklusive der Spiel-Engine, des Client-Timeline-Systems und des Echtzeit-Netzwerks mit Redis-basiertem Matchmaking für flüssiges Gameplay.",
  components: [
    {
      type: "media",
      props: {
        type: "video",
        src: videoCubeWar,
        border: false,
        caption: "Gameplay",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: engine,
        alt: "Core & Client Engine",
        caption: "Gameplay",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: maps,
        alt: "Maps & Themes",
        caption: "Spielkarten & Themen",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: party,
        alt: "Party System",
        caption: "Partysystem",
      },
    },
  ],
} as const satisfies ProjectContent;
