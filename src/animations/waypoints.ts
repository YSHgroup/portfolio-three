import gsap from "gsap";
import { camera } from "../three/core/camera";
import { sizes } from "../utils/sizes";
import { sceneWeights } from "./scenes";
import { points } from "./waypoints-data";

import type { SceneKey } from "./types";

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
let resolvedPoints: typeof points.lg | typeof points.sm = points.lg;

// called when viewport or scene set changes
function updateReferences() {
  const isLg = sizes.atLeastBreakpoint("lg");
  resolvedPoints = isLg ? points.lg : points.sm;

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
  const finalLook = weightedAverage(rotations, weights);

  camera.instance.position.set(finalPos.x, finalPos.y, finalPos.z);
  camera.instance.rotation.set(finalLook.x, finalLook.y, finalLook.z);
};

export const waypoints = { init, points, updateReferences };
