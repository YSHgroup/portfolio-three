import gsap from "gsap";
import { sizes } from "../utils/sizes";
import { sceneWeights } from "./scenes";
import { points } from "./waypoints-data";
import { Vector3, Euler } from "three";

import type { SceneKey } from "./types";

const position = new Vector3();
const rotation = new Euler();

const init = () => {
  updateReferences();
  gsap.ticker.add(tick);
};

function weightedAverage<T extends { x: number; y: number; z: number }>(points: T[], weights: number[]): T {
  let total = 0,
    x = 0,
    y = 0,
    z = 0;

  for (let i = 0; i < points.length; i++) {
    const w = weights[i] ?? 0;
    total += w;
    x += points[i]!.x * w;
    y += points[i]!.y * w;
    z += points[i]!.z * w;
  }

  if (total === 0) total = 1;

  return { x: x / total, y: y / total, z: z / total } as T;
}

// cache
let positions: { x: number; y: number; z: number }[] = [];
let rotations: { x: number; y: number; z: number }[] = [];
let weights: number[] = [];
let resolvedPoints: typeof points.md | typeof points.sm = points.md;

// called when viewport or scene set changes
function updateReferences() {
  const isMd = sizes.atLeastBreakpoint("md");
  resolvedPoints = isMd ? points.md : points.sm;

  const active = Object.entries(sceneWeights).filter(([key, weight]) => weight > 0 && key in resolvedPoints) as [
    SceneKey,
    number,
  ][];

  positions = active.map(([key]) => resolvedPoints[key as keyof typeof resolvedPoints]!.position);
  rotations = active.map(([key]) => resolvedPoints[key as keyof typeof resolvedPoints]!.rotation);
  weights = active.map(([, w]) => w);
}

const tick = () => {
  updateReferences();

  const finalPos = weightedAverage(positions, weights);
  const finalRot = weightedAverage(rotations, weights);

  position.set(finalPos.x, finalPos.y, finalPos.z);
  rotation.set(finalRot.x, finalRot.y, finalRot.z);
};

const destroy = () => {
  gsap.ticker.remove(tick);
};

export const waypoints = { init, points, updateReferences, position, rotation, destroy };
