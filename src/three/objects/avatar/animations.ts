import { avatar } from ".";
import { AnimationAction, AnimationMixer, LoopPingPong } from "three";
import gsap from "gsap";
import { resources } from "../../../utils/resources";

import type { AnimationClip } from "three";

let mixer: AnimationMixer;
let activeAction: string | null = null;
const actions = new Map<string, AnimationAction>();

const init = () => {
  mixer = new AnimationMixer(avatar.getMesh());

  setupActions();

  play("idle");

  gsap.ticker.add(tick);
};

const getActionFromMesh = (name: string) => {
  const resource = resources.items["avatar-model"];
  const action = resource.animations.find((animation: AnimationClip) => animation.name === name);
  if (!action) throw new Error("[AvatarAnimations] Action not found");
  return action;
};

const setupActions = () => {
  //idle
  const idle = mixer.clipAction(getActionFromMesh("idle"));
  idle.loop = LoopPingPong;
  actions.set("idle", idle);
};

const play = (name: string, transition: number = 0.5) => {
  if (activeAction === name) return;
  const newAction = actions.get(name);
  if (!newAction) throw new Error("[AvatarAnimations] Action not found");

  if (activeAction) {
    const currentAction = actions.get(activeAction);
    if (currentAction) currentAction.crossFadeTo(newAction, transition);
  }

  newAction.reset().play();
  activeAction = name;
};

const tick = () => {
  const delta = gsap.ticker.deltaRatio(60);
  mixer.update(delta / 60);
};

export const animations = { init, play };
