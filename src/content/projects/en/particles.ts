import videoParticles from "../../../assets/videos/particles.mp4";

//import shapes from "../../../assets/images/projects/particles/shapes.png";

import type { ProjectContent } from "../../types";

export default {
  title: "WebGL Particles",
  tags: ["ogl", "javascript", "glsl"],
  live: "https://particles.david-hckh.com/",
  video: videoParticles,
  description:
    "An experimental WebGL project built with OGL.js, animating particles through mathematical formulas and noise functions.<br/><br/>The particles transition smoothly between multiple 3D shapes that blend seamlessly into one another.",

  components: [],
  /**  components: [
    {
      type: "imageText",
      props: {
        imagePosition: "right",
        image: shapes,
        alt: "Particle shapes",
        component: {
          type: "list",
          props: {
            headline: "Features",
            items: [
              "Scroll-based interpolation between different shapes (Torus, Knot, Sphere)",
              "Shapes defined by mathematical formulas for seamless transitions",
              "Integration of noise for more dynamic movements",
              "Minimal implementation using OGL.js",
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
          "Experimental use of OGL.js instead of Three.js",
          "Mathematical interpolation between complex 3D shapes",
          "Fine-tuning noise functions for natural particle motion",
        ],
      },
    },
  ], */
} as const satisfies ProjectContent;
