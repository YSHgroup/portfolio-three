import { avatar } from ".";
import { avatarHologram } from "./hologram";
import { AnimationAction, AnimationMixer, LoopPingPong } from "three";
import gsap from "gsap";
import { resources } from "../../../utils/resources";
import { sceneWeights } from "../../../animations/scenes";

import type { AnimationClip, Object3D } from "three";

let mixer: AnimationMixer;
let activeAction: string | null = null;
const actions = new Map<string, AnimationAction>();

let hologramMixer: AnimationMixer;
const hologramActions = new Map<string, AnimationAction>();

const init = () => {
  mixer = new AnimationMixer(avatar.getMesh() as Object3D);
  hologramMixer = new AnimationMixer(avatarHologram.getMesh() as Object3D);

  setupActions();
  setupHologramActions();

  play("desktop-idle");
};

const getActionFromMesh = (name: string) => {
  const resource = resources.items["avatar-model"];
  const action = resource.animations.find((animation: AnimationClip) => animation.name === name);
  if (!action) throw new Error("[AvatarAnimations] Action not found");
  return action;
};

const setupActions = () => {
  //idle
  const desktopIdle = mixer.clipAction(getActionFromMesh("idle"));
  desktopIdle.loop = LoopPingPong;
  actions.set("desktop-idle", desktopIdle);
  desktopIdle.weight = 1;

  //t-idle
  const tIdle = mixer.clipAction(getActionFromMesh("t-idle"));
  tIdle.loop = LoopPingPong;
  actions.set("t-idle", tIdle);
  tIdle.weight = 0;
  tIdle.play();

  //left-desktop
  const leftDesktop = mixer.clipAction(getActionFromMesh("left-desktop"));
  leftDesktop.repetitions = 1;
  leftDesktop.clampWhenFinished = true;
  actions.set("left-desktop", leftDesktop);
  leftDesktop.weight = 0;

  //sleeping
  const sleeping = mixer.clipAction(getActionFromMesh("sleeping"));
  sleeping.loop = LoopPingPong;
  actions.set("sleeping", sleeping);
  sleeping.weight = 1;
  sleeping.play();

  //wake-up
  const wake = mixer.clipAction(getActionFromMesh("wake-up"));
  wake.repetitions = 1;
  wake.clampWhenFinished = true;
  actions.set("wake-up", wake);

  //contact-idle
  const contactIdle = mixer.clipAction(getActionFromMesh("contact-idle"));
  contactIdle.loop = LoopPingPong;
  actions.set("contact-idle", contactIdle);
};

const setupHologramActions = () => {
  //idle
  const desktopIdle = hologramMixer.clipAction(getActionFromMesh("idle"));
  desktopIdle.loop = LoopPingPong;
  hologramActions.set("desktop-idle", desktopIdle);
  desktopIdle.weight = 1;
  desktopIdle.play();

  //t-idle
  const tIdle = hologramMixer.clipAction(getActionFromMesh("t-idle"));
  tIdle.loop = LoopPingPong;
  hologramActions.set("t-idle", tIdle);
  tIdle.weight = 0;
  tIdle.play();

  //left-desktop
  const leftDesktop = hologramMixer.clipAction(getActionFromMesh("left-desktop"));
  leftDesktop.repetitions = 1;
  leftDesktop.clampWhenFinished = true;
  hologramActions.set("left-desktop", leftDesktop);
  leftDesktop.weight = 0;
};

const play = (name: string, transition: number = 0.5) => {
  if (activeAction === name) return;
  const newAction = actions.get(name);
  const newHologramAction = hologramActions.get(name);
  if (!newAction || !newHologramAction) throw new Error("[AvatarAnimations] Action not found");

  newAction.reset().play();
  newHologramAction.reset().play();

  if (activeAction) {
    const currentAction = actions.get(activeAction);
    if (currentAction) currentAction.crossFadeTo(newAction, transition);

    const currentHologramAction = hologramActions.get(activeAction);
    if (currentHologramAction) currentHologramAction.crossFadeTo(newHologramAction, transition);
  }

  activeAction = name;
};

const setWeight = (key: string, weight: number) => {
  const action = actions.get(key);
  if (action) action.weight = weight;
  const hologramAction = hologramActions.get(key);
  if (hologramAction) hologramAction.weight = weight;
};

const updateIntro = () => {
  setWeight("desktop-idle", 1 - avatar.tIdleIntensity.value);
  setWeight("left-desktop", 1 - avatar.tIdleIntensity.value);
  setWeight("t-idle", avatar.tIdleIntensity.value);
  setWeight("sleeping", 0);
  setWeight("contact-idle", 0);
  setWeight("wake-up", 0);
};

let isAwake = false;

const wakeUp = () => {
  if (isAwake) return;
  isAwake = true;
  const sleepingAction = actions.get("sleeping");
  const wakeUpAction = actions.get("wake-up");
  const contactIdleAction = actions.get("contact-idle");
  if (!sleepingAction || !wakeUpAction || !contactIdleAction) return;

  //crossfade to wake-up
  sleepingAction.crossFadeTo(wakeUpAction, 0.2);
  wakeUpAction.play();

  const wakeUpDuration = wakeUpAction.getClip().duration;

  setTimeout(() => {
    //crossfade to contact-idle
    wakeUpAction.crossFadeTo(contactIdleAction, 0.5);
    contactIdleAction.play();
  }, wakeUpDuration * 1000);
};

const updateContact = () => {
  setWeight("desktop-idle", 0);
  setWeight("left-desktop", 0);
  setWeight("t-idle", 0);
  setWeight("sleeping", 1);
  setWeight("contact-idle", 1);
  setWeight("wake-up", 1);
};

const update = () => {
  const isContact = sceneWeights.contact > 0.001;
  if (isContact) {
    updateContact();
  } else {
    updateIntro();
  }

  const delta = gsap.ticker.deltaRatio(60);
  mixer.update(delta / 60);
  hologramMixer.update(delta / 60);
};

export const animations = { init, play, actions, update, wakeUp };
