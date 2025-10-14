//import thumbnailWebGLParticles from "../../../assets/images/thumbnails/particles.png";
import videoParticles from "../../../assets/videos/particles.mp4";

//import shapes from "../../../assets/images/projects/particles/shapes.png";

import type { ProjectContent } from "../../types";

export const particles = {
  title: "WebGL Particles",
  slug: "webgl-particles",
  ["description-small"]: "Dynamische 3D Partikel",
  //thumbnail: thumbnailWebGLParticles,
  tags: ["ogl", "javascript", "glsl"],
  live: "https://particles.david-hckh.com/",
  video: videoParticles,
  description:
    "Ein experimentelles WebGL-Projekt mit <b>OGL.js</b>, das Partikel mithilfe mathematischer Formeln und Noise-Funktionen animiert.<br/><br/>Die Partikel bewegen sich fließend zwischen verschiedenen 3D-Formen, die nahtlos ineinander übergehen.",

  components: [],
  /**  components: [
    {
      type: "imageText",
      props: {
        imagePosition: "right",
        image: shapes,
        alt: "Partikel-Formen",
        component: {
          type: "list",
          props: {
            headline: "Features",
            items: [
              "Scroll-basierte Interpolation zwischen einzelnen Formen (Torus, Knot, Sphere)",
              "Formen definiert durch mathematische Formeln für nahtlose Übergänge",
              "Integration von Noise für dynamischere Bewegungen",
              "Minimalistisch umgesetzt mit OGL.js",
            ],
          },
        },
      },
    },
    {
      type: "list",
      props: {
        headline: "Learnings",
        width: "md",
        items: [
          "Experimenteller Einsatz von OGL.js statt Three.js",
          "Interpolation zwischen komplexen 3D-Formen rein mathematisch umgesetzt",
          "Feintuning von Noise-Funktionen für natürliche Partikelbewegungen",
        ],
      },
    },
  ], */
} as const satisfies ProjectContent;
