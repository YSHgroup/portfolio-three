import videoGamedo from "../../../assets/videos/gamedo.mp4";

import gamedo0 from "../../../assets/images/projects/gamedo/gamedo-0.png";
import gamedo1 from "../../../assets/images/projects/gamedo/gamedo-1.png";
import gamedo2 from "../../../assets/images/projects/gamedo/gamedo-2.png";
import gamedo3 from "../../../assets/images/projects/gamedo/gamedo-3.png";
import gamedo4 from "../../../assets/images/projects/gamedo/gamedo-4.png";
import gamedo5 from "../../../assets/images/projects/gamedo/gamedo-5.png";

import type { ProjectContent } from "../../types";

export default {
  title: "Gamedo",
  tags: ["three", "node", "kubernetes", "redis", "postgresql"],
  video: videoGamedo,
  videoBorder: true,
  description:
    "Gamedo is a platform for fast, round-based multiplayer games. It brings together matchmaking, customizable 3D avatars, and account integration with ranked rewards.<br/><br/>The project started as a technical experiment and grew into a scalable system for testing new game ideas.",
  components: [
    {
      type: "media",
      props: {
        type: "video",
        src: videoGamedo,
        caption: "User Experience",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: gamedo0,
        alt: "Avatar Creator",
        caption: "Avatar Creator",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: gamedo1,
        alt: "Multiplayer Tic-Tac-Toe",
        caption: "Multiplayer Tic-Tac-Toe",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: gamedo2,
        alt: "Multiple Mini-Games",
        caption: "Multiple Mini-Games",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: gamedo3,
        alt: "Avatar Variations",
        caption: "Avatar Variations",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: gamedo4,
        alt: "Responsive Design",
        caption: "Responsive Design",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: gamedo5,
        alt: "Dark Mode",
        caption: "Dark Mode",
      },
    },
  ],
} as const satisfies ProjectContent;
