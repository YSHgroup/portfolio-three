import { avatar } from "../../three/objects/avatar";
import { sceneWeightsInOut } from "../scenes";
import { gridFloor } from "../../three/objects/grid-floor";
import { createMatchMedia } from "../utils/matchMedia";
import { room } from "../../three/objects/room";

import gsap from "gsap";

let inMM: gsap.MatchMedia | null = null;
let outTl: gsap.core.Timeline | null = null;
let sectionOneMm: gsap.MatchMedia | null = null;
let sectionTwoMm: gsap.MatchMedia | null = null;

const setup = (about: HTMLElement, sectionOne: HTMLElement, sectionTwo: HTMLElement) => {
  setupInAnimation(about);
  setupSectionOneAnimation(sectionOne);
  setupSectionTwoAnimation(sectionTwo);
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
    tl.fromTo(room.group.scale, { x: 1, y: 1, z: 1 }, { x: 0.8, y: 0.8, z: 0.8, duration: 1, ease: "none" }, 0);

    tl.fromTo(room.chairRotation, { x: 0, y: 0, z: 0 }, { y: -1.1, duration: 0.6, ease: "power4.out" }, 0);
    tl.fromTo(room.chairRotation, { x: 0, y: 0, z: 0 }, { x: -0.9, z: -1.3, duration: 0.6 }, 0);

    tl.fromTo(avatar.tIdleIntensity, { value: 0 }, { value: 1, duration: 0.75, ease: "power1.out" }, 0);

    tl.fromTo(sceneWeightsInOut.about, { in: 0 }, { in: 1, ease: "none", duration: 1 }, 0);

    tl.fromTo(sceneWeightsInOut["about-one"], { in: 0 }, { in: 1, ease: "none", duration: 1 }, 0);

    const gridFloorMesh = gridFloor.getMesh();
    if (gridFloorMesh) tl.fromTo(gridFloorMesh.rotation, { z: 0.1 }, { z: 0, duration: 1, ease: "none" }, 0);

    if (mobile) {
      tl.fromTo(room.group.position, { x: 0, y: 0, z: 0 }, { x: 3, y: 6, z: 0, duration: 1, ease: "none" }, 0);
      tl.fromTo(room.group.rotation, { x: 0, y: -2.1, z: 0 }, { x: 0, y: -2.2, z: 0.1, duration: 1, ease: "none" }, 0);
    } else if (desktop) {
      tl.fromTo(room.group.position, { x: 2, y: 0, z: 0 }, { x: 3, y: 6, z: 0, duration: 1, ease: "none" }, 0);
      tl.fromTo(
        room.group.rotation,
        { x: 0, y: -2.3, z: 0 },
        { x: 0.1, y: -2.4, z: 0.1, duration: 1, ease: "none" },
        0,
      );
    }

    const { waypointsPosition, waypointsRotation } = avatar;

    if (desktop) {
      tl.fromTo(waypointsPosition, { x: 2, y: 0, z: 0 }, { x: 0, y: 1, z: 6, duration: 1, ease: "power1.out" }, 0);
      tl.fromTo(
        waypointsRotation,
        { x: 0, y: -2.3 + Math.PI / 2, z: 0 },
        { x: 0, y: -Math.PI * 0.85, z: 0, duration: 1, ease: "power1.out" },
        0,
      );
    } else if (mobile) {
      tl.fromTo(waypointsPosition, { x: 0, y: 0, z: 0 }, { x: 0, y: 1, z: 6, duration: 1, ease: "power1.out" }, 0);
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

const setupSectionOneAnimation = (sectionOne: HTMLElement) => {
  sectionOneMm = createMatchMedia((_context, { mobile, desktop }) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionOne,
        start: "bottom bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    tl.fromTo(sceneWeightsInOut["about-one"], { out: 0 }, { out: 1, ease: "none", duration: 1 }, 0);
  });
};

const setupSectionTwoAnimation = (sectionTwo: HTMLElement) => {
  sectionTwoMm = createMatchMedia((_context) => {
    const tl = gsap.timeline({
      duration: 1,
      scrollTrigger: {
        trigger: sectionTwo,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    tl.fromTo(sceneWeightsInOut["about-two"], { in: 0 }, { in: 1, ease: "power1.inOut", duration: 0.5 }, 0);
    tl.fromTo(sceneWeightsInOut["about-two"], { out: 0 }, { out: 1, ease: "none", duration: 0.5 }, 0.5);

    const { waypointsPosition, waypointsRotation } = avatar;

    tl.to(waypointsPosition, { x: 0, y: 1, z: 6, duration: 0.5, ease: "power1.out" }, 0);
    tl.to(waypointsRotation, { x: 0, y: -Math.PI, z: 0, duration: 0.5, ease: "power1.out" }, 0);
  });
};

const destroy = () => {
  if (inMM) inMM.revert();
  if (sectionOneMm) sectionOneMm.revert();
  if (sectionTwoMm) sectionTwoMm.revert();
  if (outTl) outTl.revert();
};

export const about = { setup, destroy };
