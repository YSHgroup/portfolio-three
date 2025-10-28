import videoCubeWar from "../../../assets/videos/cubewar.mp4";

import cubewar0 from "../../../assets/images/projects/cubewar/cubewar-0.png";
import cubewar1 from "../../../assets/images/projects/cubewar/cubewar-1.png";
import cubewar2 from "../../../assets/images/projects/cubewar/cubewar-2.png";
import cubewar3 from "../../../assets/images/projects/cubewar/cubewar-3.png";
import cubewar4 from "../../../assets/images/projects/cubewar/cubewar-4.png";
import cubewar5 from "../../../assets/images/projects/cubewar/cubewar-5.png";

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
        caption: "Gameplay",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: cubewar0,
        alt: "Tutorial",
        caption: "Tutorial",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: cubewar1,
        alt: "Karten Themen",
        caption: "Karten Themen",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: cubewar2,
        alt: "Authentifizierung",
        caption: "Authentifizierung",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: cubewar3,
        alt: "Responsives Design",
        caption: "Responsives Design",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: cubewar4,
        alt: "Mehrere Spielmodi",
        caption: "Mehrere Spielmodi",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: cubewar5,
        alt: "Party-System",
        caption: "Party-System",
      },
    },
  ],
} as const satisfies ProjectContent;
