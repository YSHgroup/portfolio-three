import { avatar } from "../../three/objects/avatar";
import { sceneWeightsInOut } from "../scenes";
//import { gridFloor } from "../../three/objects/grid-floor";
import { createMatchMedia } from "../utils/matchMedia";
import { room } from "../../three/objects/room";
import gsap from "gsap";

let inMM: gsap.MatchMedia | null = null;
let outTl: gsap.core.Timeline | null = null;
let progressMm: gsap.MatchMedia | null = null;
let sectionsMm: gsap.MatchMedia | null = null;

export const aboutProgress = { value: 0 };

const setup = ({
  about,
  firstHologramBoxTl,
  firstHologramBoxWrapper,
  secondHologramBoxTl,
  secondHologramBoxWrapper,
}: {
  about: HTMLElement;
  firstHologramBoxTl: gsap.core.Timeline;
  firstHologramBoxWrapper: HTMLDivElement;
  secondHologramBoxTl: gsap.core.Timeline;
  secondHologramBoxWrapper: HTMLDivElement;
}) => {
  setupInAnimation(about);
  setupProgressAnimation(about);
  setupSectionsAnimation({
    about,
    firstHologramBoxTl,
    firstHologramBoxWrapper,
    secondHologramBoxTl,
    secondHologramBoxWrapper,
  });
  setupOutAnimation(about);
};

const setupInAnimation = (about: HTMLElement) => {
  inMM = createMatchMedia((_context, { isMobile, isLandscape }) => {
    const tl = gsap.timeline({
      duration: 1,
      scrollTrigger: {
        trigger: about,
        start: isMobile ? "top bottom" : "-=200px bottom",
        end: "top top",
        scrub: true,
      },
    });

    tl.fromTo(sceneWeightsInOut.hero, { out: 0 }, { out: 1, ease: "none", duration: 1 }, 0);

    tl.fromTo(room.chairRotation, { x: 0, y: 0, z: 0 }, { y: -1.1, duration: 0.6, ease: "power4.out" }, 0);
    tl.fromTo(room.chairRotation, { x: 0, y: 0, z: 0 }, { x: -0.9, z: -1.3, duration: 0.6 }, 0);

    tl.fromTo(avatar.tIdleIntensity, { value: 0 }, { value: 1, duration: 0.75, ease: "power1.out" }, 0);

    tl.fromTo(sceneWeightsInOut.about, { in: 0 }, { in: 1, ease: "none", duration: 1 }, 0);
    tl.fromTo(sceneWeightsInOut["about-1"], { in: 0 }, { in: 1, ease: "none", duration: 1 }, 0);

    //const gridFloorMesh = gridFloor.getMesh();
    //if (gridFloorMesh) tl.fromTo(gridFloorMesh.rotation, { z: 0.1 }, { z: 0, duration: 1, ease: "none" }, 0);

    tl.fromTo(room.group.scale, { x: 1, y: 1, z: 1 }, { x: 0.85, y: 0.85, z: 0.85, duration: 1, ease: "none" }, 0);
    if (!isLandscape) {
      tl.fromTo(room.group.position, { x: 0, y: 0, z: 0 }, { x: 0, y: 5.4, z: 0, duration: 1, ease: "none" }, 0);
      tl.fromTo(room.group.rotation, { x: 0, y: -2.1, z: 0 }, { x: 0, y: -2.1, z: 0, duration: 1, ease: "none" }, 0);
    } else {
      tl.fromTo(room.group.position, { x: 2, y: 0, z: 0 }, { x: 3, y: 5.7, z: 0, duration: 1, ease: "none" }, 0);
      tl.fromTo(
        room.group.rotation,
        { x: 0, y: -2.3, z: 0 },
        { x: 0.1, y: -2.3, z: 0.09, duration: 1, ease: "none" },
        0,
      );
    }

    const { waypointsPosition, waypointsRotation } = avatar;

    if (isLandscape) {
      tl.fromTo(waypointsPosition, { x: 2, y: 0, z: 0 }, { x: -1, y: 0, z: 6, duration: 1, ease: "power1.out" }, 0);
      tl.fromTo(
        waypointsRotation,
        { x: 0, y: -2.3 + Math.PI / 2, z: 0 },
        //{ x: 0, y: -Math.PI, z: 0, duration: 1, ease: "power1.out" },
        { x: 0, y: -Math.PI * 0.8, z: 0, duration: 1, ease: "power1.out" },
        0,
      );

      tl.to("#hero-content-inner", { x: "27vw", rotate: 4, y: 150, duration: 1, ease: "none" }, 0);
    } else {
      //tl.to("#hero-content-inner", { y: "40vh", scale: 0.7, duration: 1, ease: "none" }, 0);

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

  outTl.fromTo(sceneWeightsInOut["about"], { out: 0 }, { out: 1, ease: "none", duration: 1 }, 0);
  outTl.fromTo(sceneWeightsInOut["about-2"], { out: 0 }, { out: 1, ease: "none", duration: 1 }, 0);
};

const setupProgressAnimation = (about: HTMLElement) => {
  progressMm = createMatchMedia((_context) => {
    const tl = gsap.timeline({
      duration: 1,
      scrollTrigger: {
        trigger: about,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    const completed = { value: false };
    tl.to(completed, { value: true, duration: 1 }, 0);

    //tl.fromTo("#section-one-content", { opacity: 0 }, { opacity: 1, duration: 0.1, ease: "none" }, 0);
    //tl.to("#section-one-content", { opacity: 0, duration: 0.1, ease: "none" }, 0.4);
    //tl.fromTo("#section-two-content", { opacity: 0 }, { opacity: 1, duration: 0.1, ease: "none" }, 0.5);

    const delay = 0;
    const multiplier = 0.98;
    const duration = (1 - delay * 2) * multiplier;

    const { waypointsRotation } = avatar;
    tl.to(waypointsRotation, { x: 0, y: -Math.PI, z: 0, duration: duration, ease: "power1.inOut" }, delay);

    tl.to(sceneWeightsInOut["about-2"], { in: 1, duration: duration, ease: "power1.inOut" }, delay);
    tl.to(sceneWeightsInOut["about-1"], { out: 1, duration: duration, ease: "power1.inOut" }, delay);

    tl.to(aboutProgress, { value: 1, duration: (1 - delay) * multiplier, ease: "none" }, 0);
  });
};

const setupSectionsAnimation = ({
  about,
  //firstHologramBoxTl,
  firstHologramBoxWrapper,
  //secondHologramBoxTl,
  secondHologramBoxWrapper,
}: {
  about: HTMLElement;
  firstHologramBoxTl: gsap.core.Timeline;
  firstHologramBoxWrapper: HTMLDivElement;
  secondHologramBoxWrapper: HTMLDivElement;
  secondHologramBoxTl: gsap.core.Timeline;
}) => {
  sectionsMm = createMatchMedia((_context, { isLandscape, isMobile }) => {
    const tl = gsap.timeline({
      duration: 1,
      scrollTrigger: {
        trigger: about,
        start: isLandscape ? "top 75%" : "top 30%",
        end: "bottom bottom",
        scrub: true,
      },
    });

    //first box
    if (isLandscape) {
      tl.fromTo(firstHologramBoxWrapper, { opacity: 0 }, { opacity: 1, duration: 0.15, ease: "power1.out" }, 0);
      tl.to(firstHologramBoxWrapper, { opacity: 0, duration: 0.15, ease: "power1.in" }, 0.55);

      tl.fromTo(firstHologramBoxWrapper, { y: "20vh" }, { y: "-20vh", duration: 0.7, ease: "none" }, 0);
    } else {
      tl.fromTo(
        firstHologramBoxWrapper,
        { opacity: 0, y: isMobile ? 60 : 100 },
        { opacity: 1, y: 0, duration: 0.15, ease: "power1.out" },
        0,
      );
      tl.to(firstHologramBoxWrapper, { opacity: 0, y: "-10vh", duration: 0.15, ease: "power1.in" }, 0.45);
    }

    //second box
    if (isLandscape) {
      const SECOND_BOX_DELAY = 0.6;
      tl.fromTo(
        secondHologramBoxWrapper,
        { opacity: 0 },
        { opacity: 1, duration: 0.15, ease: "power1.out" },
        SECOND_BOX_DELAY,
      );

      tl.fromTo(secondHologramBoxWrapper, { y: "20vh" }, { y: 0, duration: 0.35, ease: "none" }, SECOND_BOX_DELAY);
    } else {
      const SECOND_BOX_DELAY = 0.55;
      tl.fromTo(
        secondHologramBoxWrapper,
        { opacity: 0, y: "10vh" },
        { opacity: 1, y: 0, duration: 0.15, ease: "power1.out" },
        SECOND_BOX_DELAY,
      );
    }

    //tl.add(firstHologramBoxTl, 0);

    const completed = { value: false };
    tl.to(completed, { value: true, duration: 1 }, 0);
  });
};

const destroy = () => {
  if (inMM) inMM.revert();
  if (progressMm) progressMm.revert();
  if (outTl) outTl.revert();
  if (sectionsMm) sectionsMm.revert();
};

export const about = { setup, destroy };
