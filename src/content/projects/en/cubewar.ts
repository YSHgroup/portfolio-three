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
    "CubeWar is a browser-based multiplayer game where players control cube avatars in fast-paced strategic battles.<br/>I built the full stack myself, including the game engine, the client-side timeline system, and real-time networking with Redis-based matchmaking for smooth, high-concurrency gameplay.",
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
        caption: "Map Themes",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: party,
        alt: "Party System",
        caption: "Party System",
      },
    },
  ],
} as const satisfies ProjectContent;
