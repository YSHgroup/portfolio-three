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
    "Gamedo ist eine Plattform für schnelle, rundenbasierte Multiplayer-Spiele. Sie verbindet Matchmaking, anpassbare 3D-Avatare und Account-Integration mit einem Rangsystem auf ELO-Basis.<br/><br/>Das Projekt begann als technisches Experiment und entwickelte sich zu einem skalierbaren System, um neue Spielideen auszuprobieren.",
  components: [
    {
      type: "media",
      props: {
        type: "video",
        src: videoGamedo,
        caption: "Benutzeroberfläche",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: gamedo0,
        alt: "Avatar Ersteller",
        caption: "Avatar Ersteller",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: gamedo1,
        alt: "Mehrspieler Tic-Tac-Toe",
        caption: "Mehrspieler Tic-Tac-Toe",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: gamedo2,
        alt: "Verschiedene Minispiele",
        caption: "Verschiedene Minispiele",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: gamedo3,
        alt: "Avatar Variationen",
        caption: "Avatar Variationen",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: gamedo4,
        alt: "Responsives Design",
        caption: "Responsives Design",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: gamedo5,
        alt: "Dunkles Design",
        caption: "Dunkles Design",
      },
    },
  ],
} as const satisfies ProjectContent;
