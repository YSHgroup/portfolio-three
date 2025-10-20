import { Vector3 } from "three";
import gsap from "gsap";
import { avatar } from "../avatar";
import { room } from ".";
import { sceneWeights } from "../../../animations/scenes";

import type { Mesh } from "three";

const BOUNDS = {
  x: {
    max: -0.75,
    min: -0.85,
  },
  z: {
    max: -0.28,
    min: -0.6,
  },
} as const;

const initialPos = new Vector3(0, 0, 0);
const currentPos = new Vector3(0, 0, 0);
let mesh: Mesh | null = null;

const init = (_mesh: Mesh) => {
  mesh = _mesh;

  initialPos.copy(mesh.position);
  gsap.ticker.add(tick);
};

const tick = () => {
  if (!mesh) return;

  if (sceneWeights.hero < 0.95) return;

  const bone = avatar.getRightHandBone();
  if (!bone) return;

  bone.getWorldPosition(currentPos);
  room.group.worldToLocal(currentPos);
  mesh.position.copy(currentPos);

  mesh.position.x = Math.max(BOUNDS.x.min, Math.min(BOUNDS.x.max, mesh.position.x));
  mesh.position.y = initialPos.y;
  mesh.position.z = Math.max(BOUNDS.z.min, Math.min(BOUNDS.z.max, mesh.position.z));
  mesh.position.z -= 0.15;
};

const destroy = () => {
  gsap.ticker.remove(tick);
  mesh = null;
};

export const mouse = { init, destroy };
