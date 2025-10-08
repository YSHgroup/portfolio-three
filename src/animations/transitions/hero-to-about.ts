import gsap from "gsap";

export const setup = () => {
  const darkBackground = document.querySelector(".dark-background");
  const hero = document.querySelector(".hero");

  gsap.to(darkBackground, {
    opacity: 1,
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
};
