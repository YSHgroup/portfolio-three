import { avatar } from "../../three/objects/avatar";
import { sceneWeightsInOut } from "../scenes";
import { createMatchMedia } from "../utils/matchMedia";
import { room } from "../../three/objects/room";
import { lab } from "../../three/objects/lab";
import gsap from "gsap";

let inMM: gsap.MatchMedia | null = null;
let outTl: gsap.core.Timeline | null = null;
let progressTl: gsap.core.Timeline | null = null;
let sectionsMm: gsap.MatchMedia | null = null;
let scenesMm: gsap.MatchMedia | null = null;

export const aboutProgress = { value: 0 };

const setup = ({
  about,
  tlOne,
  contentOne,
  tlTwo,
  contentTwo,
}: {
  about: HTMLElement;
  tlOne: gsap.core.Timeline;
  contentOne: HTMLDivElement;
  tlTwo: gsap.core.Timeline;
  contentTwo: HTMLDivElement;
}) => {
  setupInAnimation(about);
  setupProgressAnimation(about);
  setupSectionsAnimation({
    about,
    tlOne,
    contentOne,
    tlTwo,
    contentTwo,
  });
  setupOutAnimation(about);
  setupScenesAnimation(about);
  setupProgressAnimation(about);
};

const setupProgressAnimation = (about: HTMLElement) => {
  progressTl = gsap.timeline({
    duration: 1,
    scrollTrigger: {
      trigger: about,
      start: "top bottom",
      end: "bottom bottom",
      scrub: true,
    },
  });

  const completed = { value: false };
  progressTl.to(completed, { value: true, duration: 0 }, 1);

  progressTl.fromTo(aboutProgress, { value: 0 }, { value: 1, duration: 0.95, ease: "none" }, 0);
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
      //lab
      //tl.fromTo(lab.group.position, { x: -1, y: -2, z: 6 }, { x: -1, y: 0, z: 6, duration: 1, ease: "power.1out" }, 0);
      tl.fromTo(lab.group.position, { x: 0, y: 0, z: 6 }, { x: 0, y: 0, z: 6, duration: 1, ease: "power.1out" }, 0);

      tl.fromTo(waypointsPosition, { x: 2, y: 0, z: 0 }, { x: 0, y: 0, z: 6, duration: 1, ease: "power1.out" }, 0);
      tl.fromTo(
        waypointsRotation,
        { x: 0, y: -2.3 + Math.PI / 2, z: 0 },
        //{ x: 0, y: -Math.PI, z: 0, duration: 1, ease: "power1.out" },
        { x: 0, y: -Math.PI, z: 0, duration: 1, ease: "power1.out" },
        0,
      );

      tl.to(
        "#hero-content-inner",
        { x: "27vw", rotate: 4, y: isMobile ? "-5vh" : "10vh", duration: 1, ease: "none" },
        0,
      );
    } else {
      //tl.to("#hero-content-inner", { y: "40vh", scale: 0.7, duration: 1, ease: "none" }, 0);

      //lab
      tl.fromTo(lab.group.position, { x: 0, y: 0, z: 6 }, { x: 0, y: 0, z: 6, duration: 1, ease: "none" }, 0);

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

const setupScenesAnimation = (about: HTMLElement) => {
  scenesMm = createMatchMedia((_context) => {
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

    const delay = 0;
    const multiplier = 0.95;
    const duration = (1 - delay * 2) * multiplier;

    const { waypointsRotation } = avatar;
    tl.to(waypointsRotation, { x: 0, y: -Math.PI, z: 0, duration: duration, ease: "power1.inOut" }, delay);

    tl.to(sceneWeightsInOut["about-2"], { in: 1, duration: duration, ease: "power1.inOut" }, delay);
    tl.to(sceneWeightsInOut["about-1"], { out: 1, duration: duration, ease: "power1.inOut" }, delay);
  });
};

const setupSectionsAnimation = ({
  about,
  tlOne,
  contentOne,
  tlTwo,
  contentTwo,
}: {
  about: HTMLElement;
  contentOne: HTMLDivElement;
  contentTwo: HTMLDivElement;
  tlOne: gsap.core.Timeline;
  tlTwo: gsap.core.Timeline;
}) => {
  sectionsMm = createMatchMedia((_context, { isLandscape }) => {
    const tl = gsap.timeline({
      duration: 1,
      scrollTrigger: {
        trigger: about,
        start: isLandscape ? "top 75%" : "top 30%",
        end: "bottom bottom",
        scrub: true,
      },
    });

    const completed = { value: false };
    tl.to(completed, { value: true, duration: 0 }, 1);

    //first box
    if (isLandscape) {
      tl.fromTo(contentOne, { opacity: 0 }, { opacity: 1, duration: 0.15, ease: "power1.out" }, 0);
      //tl.to(contentOne, { opacity: 0, duration: 0.15, ease: "power1.in" }, 0.55);

      //tl.fromTo(contentOne, { y: "12.5vh" }, { y: "-12.5vh", duration: 0.7, ease: "none" }, 0);
      tl.fromTo(contentOne, { y: "12.5vh" }, { y: "0vh", duration: 0.35, ease: "none" }, 0);

      tl.add(() => {
        tlOne?.play();
      }, 0);
    } else {
      tl.fromTo(contentOne, { opacity: 0, y: "15vh" }, { opacity: 1, y: "0vh", duration: 0.15, ease: "power1.out" }, 0);
      tl.to(contentOne, { opacity: 0, y: "-15vh", duration: 0.15, ease: "power1.in" }, 0.45);

      tl.add(() => {
        tlOne?.play();
      }, 0);
    }

    //second box
    if (isLandscape) {
      const SECOND_BOX_DELAY = 0.55;
      tl.fromTo(contentTwo, { opacity: 0 }, { opacity: 1, duration: 0.15, ease: "power1.out" }, SECOND_BOX_DELAY);

      tl.fromTo(contentTwo, { y: "12.5vh" }, { y: 0, duration: 0.35, ease: "none" }, SECOND_BOX_DELAY);

      tl.add(() => {
        tlTwo?.play();
      }, SECOND_BOX_DELAY);
    } else {
      const SECOND_BOX_DELAY = 0.55;
      tl.fromTo(
        contentTwo,
        { opacity: 0, y: "20vh" },
        { opacity: 1, y: "0vh", duration: 0.15, ease: "power1.out" },
        SECOND_BOX_DELAY,
      );

      tl.add(() => {
        tlTwo?.play();
      }, SECOND_BOX_DELAY);
    }
  });
};

const destroy = () => {
  if (inMM) inMM.revert();
  if (progressTl) progressTl.revert();
  if (outTl) outTl.revert();
  if (sectionsMm) sectionsMm.revert();
  if (scenesMm) scenesMm.revert();
};

export const about = { setup, destroy };
