import { avatar } from "../../three/objects/avatar";
import { sceneWeightsInOut } from "../scenes";
import { gridFloor } from "../../three/objects/grid-floor";
import { createMatchMedia } from "../utils/matchMedia";

import gsap from "gsap";

let inTl: gsap.core.Timeline | null = null;
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
  inTl = gsap.timeline({
    duration: 1,
    scrollTrigger: {
      trigger: about,
      start: "top bottom",
      end: "top top",
      scrub: true,
    },
  });

  inTl.fromTo(avatar.tIdleIntensity, { value: 0 }, { value: 1, duration: 0.75, ease: "power1.out" }, 0);

  inTl.fromTo(sceneWeightsInOut.about, { in: 0 }, { in: 1, ease: "none", duration: 1 }, 0);
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
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    tl.fromTo(sceneWeightsInOut["about-one"], { in: 0 }, { in: 1, ease: "none", duration: 0.5 }, 0);
    tl.fromTo(sceneWeightsInOut["about-one"], { out: 0 }, { out: 1, ease: "none", duration: 0.5 }, 0.5);

    const gridFloorMesh = gridFloor.getMesh();
    if (gridFloorMesh) tl.fromTo(gridFloorMesh.rotation, { z: 0.1 }, { z: 0, duration: 0.5, ease: "none" }, 0);

    const { waypointsPosition, waypointsRotation } = avatar;

    if (desktop) {
      tl.fromTo(waypointsPosition, { x: 2, y: 0, z: 0 }, { x: 0, y: 1, z: 6, duration: 0.5, ease: "power1.out" }, 0);
      tl.fromTo(
        waypointsRotation,
        { x: 0, y: -2.3 + Math.PI / 2, z: 0 },
        { x: 0, y: -Math.PI * 0.85, z: 0, duration: 0.5, ease: "power1.out" },
        0,
      );
    } else if (mobile) {
      tl.fromTo(waypointsPosition, { x: 0, y: 0, z: 0 }, { x: 0, y: 1, z: 6, duration: 0.5, ease: "power1.out" }, 0);
      tl.fromTo(
        waypointsRotation,
        { x: 0, y: -2.1 + Math.PI / 2, z: 0 },
        { x: 0, y: -Math.PI, z: 0, duration: 0.5, ease: "power1.out" },
        0,
      );
    }
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
  if (inTl) inTl.revert();
  if (sectionOneMm) sectionOneMm.revert();
  if (sectionTwoMm) sectionTwoMm.revert();
  if (outTl) outTl.revert();
};

export const about = { setup, destroy };
