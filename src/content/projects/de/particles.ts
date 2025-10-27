import videoParticles from "../../../assets/videos/particles.mp4";

import particles0 from "../../../assets/images/projects/particles/particles-0.png";
import particles1 from "../../../assets/images/projects/particles/particles-1.png";
import particles2 from "../../../assets/images/projects/particles/particles-2.png";

import type { ProjectContent } from "../../types";

export default {
  title: "WebGL Particles",
  tags: ["ogl", "javascript", "glsl"],
  live: "https://particles.david-hckh.com/",
  video: videoParticles,
  videoBorder: false,
  description:
    "Ein experimentelles WebGL-Projekt mit OGL.js, das Partikel mithilfe mathematischer Formeln und Noise-Funktionen animiert.<br/><br/>Die Partikel bewegen sich fließend zwischen verschiedenen 3D-Formen, die ineinander übergehen.",
  components: [
    {
      type: "media",
      props: {
        type: "video",
        src: videoParticles,
        caption: "Animiertes Partikelsystem",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: particles0,
        alt: "Knoten Form",
        caption: "Knoten Form",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: particles1,
        alt: "Donut Form",
        caption: "Donut Form",
      },
    },
    {
      type: "media",
      props: {
        type: "image",
        src: particles2,
        alt: "Kugel Form",
        caption: "Kugel Form",
      },
    },
  ],
} as const satisfies ProjectContent;
