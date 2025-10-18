import { avatar } from "../../three/objects/avatar";
import { sceneWeightsInOut } from "../scenes";
import { gridFloor } from "../../three/objects/grid-floor";

import gsap from "gsap";

let inTl: gsap.core.Timeline | null = null;
let outTl: gsap.core.Timeline | null = null;
let sectionOneTl: gsap.core.Timeline | null = null;
let sectionTwoTl: gsap.core.Timeline | null = null;

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

  inTl.fromTo(avatar.tIdleIntensity, { value: 0 }, { value: 1, duration: 1, ease: "power1.out" }, 0);

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

  //outTl.fromTo(lab.group.position, { x: -2, y: 0, z: 4 }, { x: -2, y: 0, z: 4, duration: 1 }, 0);
  //outTl.fromTo(lab.group.rotation, { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0, duration: 1 }, 0);
};

const setupSectionOneAnimation = (sectionOne: HTMLElement) => {
  sectionOneTl = gsap.timeline({
    duration: 1,
    scrollTrigger: {
      trigger: sectionOne,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });

  sectionOneTl.fromTo(sceneWeightsInOut["about-one"], { in: 0 }, { in: 1, ease: "none", duration: 0.5 }, 0);
  sectionOneTl.fromTo(sceneWeightsInOut["about-one"], { out: 0 }, { out: 1, ease: "none", duration: 0.5 }, 0.5);

  const gridFloorMesh = gridFloor.getMesh();
  if (gridFloorMesh) sectionOneTl.fromTo(gridFloorMesh.rotation, { z: 0.1 }, { z: 0, duration: 0.5, ease: "none" }, 0);

  const { waypointsPosition, waypointsRotation } = avatar;

  sectionOneTl.fromTo(
    waypointsPosition,
    { x: 2, y: 0, z: 0 },
    { x: 0, y: 1, z: 6, duration: 0.5, ease: "power1.out" },
    0,
  );
  sectionOneTl.fromTo(
    waypointsRotation,
    { x: 0, y: -2.3 + Math.PI / 2, z: 0 },
    { x: 0, y: -Math.PI * 0.85, z: 0, duration: 0.5, ease: "power1.out" },
    0,
  );
};

const setupSectionTwoAnimation = (sectionTwo: HTMLElement) => {
  sectionTwoTl = gsap.timeline({
    duration: 1,
    scrollTrigger: {
      trigger: sectionTwo,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });

  sectionTwoTl.fromTo(sceneWeightsInOut["about-two"], { in: 0 }, { in: 1, ease: "none", duration: 0.5 }, 0);
  sectionTwoTl.fromTo(sceneWeightsInOut["about-two"], { out: 0 }, { out: 1, ease: "none", duration: 0.5 }, 0.5);

  const { waypointsPosition, waypointsRotation } = avatar;

  sectionTwoTl.to(waypointsPosition, { x: 0, y: 1, z: 6, duration: 0.5, ease: "power1.out" }, 0);
  sectionTwoTl.to(waypointsRotation, { x: 0, y: -Math.PI, z: 0, duration: 0.5, ease: "power1.out" }, 0);
};

const destroy = () => {
  if (inTl) inTl.kill();
  if (sectionOneTl) sectionOneTl.kill();
  if (sectionTwoTl) sectionTwoTl.kill();
  if (outTl) outTl.kill();
};

export const about = { setup, destroy };
