import { room } from "../../three/objects/room";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sceneWeightsInOut } from "../scenes";
import { createMatchMedia } from "../utils/matchMedia";

gsap.registerPlugin(ScrollTrigger);

let mm: gsap.MatchMedia | null = null;

/**  objects.chair.rotation.x = -0.6;
  objects.chair.rotation.y = -0.8;
  objects.chair.rotation.z = -1.2; */

const setup = (hero: HTMLElement) => {
  mm = createMatchMedia((_context, { mobile, desktop }) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  });
};

const destroy = () => {
  if (mm) mm.revert();
};

export const hero = { setup, destroy };
