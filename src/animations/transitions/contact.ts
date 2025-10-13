import gsap from "gsap";
import { sceneWeightsInOut } from "../scenes";

export const setup = () => {
  const contact = document.querySelector(".contact");

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: contact,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });

  tl.to(sceneWeightsInOut.contact, { in: 1, duration: 1 }, 0);
};
