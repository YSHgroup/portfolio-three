import { avatar } from "../../three/objects/avatar";
import { sceneWeightsInOut } from "../scenes";
import { gridFloor } from "../../three/objects/grid-floor";
import { createMatchMedia } from "../utils/matchMedia";
import { room } from "../../three/objects/room";

import gsap from "gsap";

let inMM: gsap.MatchMedia | null = null;
let outTl: gsap.core.Timeline | null = null;
let sectionsMm: gsap.MatchMedia | null = null;
let sectionsContentMm: gsap.MatchMedia | null = null;

export const aboutProgress = { value: 0 };

const setup = (about: HTMLElement) => {
  setupInAnimation(about);
  setupSectionsAnimation(about);
  setupSectionsContent(about);
  setupOutAnimation(about);
};

const setupInAnimation = (about: HTMLElement) => {
  inMM = createMatchMedia((_context, { mobile, desktop }) => {
    const tl = gsap.timeline({
      duration: 1,
      scrollTrigger: {
        trigger: about,
        start: "-=200px bottom",
        end: "top top",
        scrub: true,
      },
    });

    tl.fromTo(sceneWeightsInOut.hero, { out: 0 }, { out: 1, ease: "none", duration: 1 }, 0);

    tl.fromTo(room.chairRotation, { x: 0, y: 0, z: 0 }, { y: -1.1, duration: 0.6, ease: "power4.out" }, 0);
    tl.fromTo(room.chairRotation, { x: 0, y: 0, z: 0 }, { x: -0.9, z: -1.3, duration: 0.6 }, 0);

    tl.fromTo(avatar.tIdleIntensity, { value: 0 }, { value: 1, duration: 0.75, ease: "power1.out" }, 0);

    tl.fromTo(sceneWeightsInOut.about, { in: 0 }, { in: 1, ease: "none", duration: 1 }, 0);

    const gridFloorMesh = gridFloor.getMesh();
    if (gridFloorMesh) tl.fromTo(gridFloorMesh.rotation, { z: 0.1 }, { z: 0, duration: 1, ease: "none" }, 0);

    tl.fromTo(room.group.scale, { x: 1, y: 1, z: 1 }, { x: 0.85, y: 0.85, z: 0.85, duration: 1, ease: "none" }, 0);

    if (mobile) {
      tl.fromTo(room.group.position, { x: 0, y: 0, z: 0 }, { x: 0, y: 6, z: 0, duration: 1, ease: "none" }, 0);
      tl.fromTo(room.group.rotation, { x: 0, y: -2.1, z: 0 }, { x: 0, y: -2.1, z: 0, duration: 1, ease: "none" }, 0);
    } else if (desktop) {
      tl.fromTo(room.group.position, { x: 2, y: 0, z: 0 }, { x: 3, y: 4.5, z: 0, duration: 1, ease: "none" }, 0);
      tl.fromTo(
        room.group.rotation,
        { x: 0, y: -2.3, z: 0 },
        { x: 0.1, y: -2.4, z: 0.15, duration: 1, ease: "none" },
        0,
      );
    }

    const { waypointsPosition, waypointsRotation } = avatar;

    if (desktop) {
      tl.fromTo(waypointsPosition, { x: 2, y: 0, z: 0 }, { x: 0, y: 0, z: 6, duration: 1, ease: "power1.out" }, 0);
      tl.fromTo(
        waypointsRotation,
        { x: 0, y: -2.3 + Math.PI / 2, z: 0 },
        { x: 0, y: -Math.PI, z: 0, duration: 1, ease: "power1.out" },
        0,
      );

      tl.to("#hero-content-inner", { x: "27vw", rotate: 4, duration: 1, ease: "none" }, 0);
    } else if (mobile) {
      tl.to("#hero-content-inner", { y: "40vh", scale: 0.7, duration: 1, ease: "none" }, 0);

      tl.fromTo(waypointsPosition, { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 6, duration: 1, ease: "power1.out" }, 0);
      tl.fromTo(
        waypointsRotation,
        { x: 0, y: -2.1 + Math.PI / 2, z: 0 },
        { x: 0, y: -Math.PI, z: 0, duration: 1, ease: "power1.out" },
        0,
      );
    }
  });
};

const setupOutAnimation = (about: HTMLElement) => {
  outTl = gsap.timeline({
    scrollTrigger: {
      trigger: about,
      start: "bottom bottom",
      end: "bottom top",
      scrub: true,
    },
  });

  outTl.fromTo(sceneWeightsInOut.about, { out: 0 }, { out: 1, ease: "none", duration: 1 }, 0);
};

const setupSectionsContent = (about: HTMLElement) => {
  sectionsContentMm = createMatchMedia((_context) => {
    const tl = gsap.timeline({
      duration: 1,
      scrollTrigger: {
        trigger: about,
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
    });

    tl.fromTo("#section-one-content", { opacity: 0 }, { opacity: 1, duration: 0.1, ease: "none" }, 0);
    //tl.to("#section-one-content", { opacity: 0, duration: 0.1, ease: "none" }, 0.4);
    //tl.fromTo("#section-two-content", { opacity: 0 }, { opacity: 1, duration: 0.1, ease: "none" }, 0.5);

    const completed = { value: false };
    tl.to(completed, { value: true, duration: 0 }, 1);
  });
};

const setupSectionsAnimation = (about: HTMLElement) => {
  sectionsMm = createMatchMedia((_context) => {
    const tl = gsap.timeline({
      duration: 1,
      scrollTrigger: {
        trigger: about,
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
      },
    });

    tl.to(aboutProgress, { value: 1, duration: 0.9, ease: "none" }, 0);

    const completed = { value: false };
    tl.to(completed, { value: true, duration: 0 }, 1);

    //const { waypointsPosition, waypointsRotation } = avatar;
    //tl.to(waypointsPosition, { x: 0, y: 0, z: 6, duration: 0.8, ease: "power1.out" }, 0.1);
    //tl.to(waypointsRotation, { x: 0, y: -Math.PI, z: 0, duration: 0.8, ease: "power1.out" }, 0.1);
  });
};

const destroy = () => {
  if (inMM) inMM.revert();
  if (sectionsMm) sectionsMm.revert();
  if (outTl) outTl.revert();
  if (sectionsContentMm) sectionsContentMm.revert();
};

export const about = { setup, destroy };
