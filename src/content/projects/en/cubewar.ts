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
    "CubeWar is a browser-based multiplayer game where players control cube avatars in fast-paced strategic battles.<br/><br/>I built the full stack myself, including the game engine, the client-side timeline system, and real-time networking with Redis-based matchmaking for smooth, high-concurrency gameplay.",
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
        alt: "Maps Themes",
        caption: "Map Themes",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: cubewar2,
        alt: "Authentication",
        caption: "Authentication",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: cubewar3,
        alt: "Responsive Design",
        caption: "Responsive Design",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: cubewar4,
        alt: "Multiple Gamemodes",
        caption: "Multiple Gamemodes",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: cubewar5,
        alt: "Party System",
        caption: "Party System",
      },
    },
  ],
} as const satisfies ProjectContent;
