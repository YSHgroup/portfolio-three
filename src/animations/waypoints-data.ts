import type { SceneKey } from "./types";

export const points = {
  lg: {
    hero: {
      position: { x: 0, y: 5.7, z: 10 },
      rotation: { x: -0.3, y: 0, z: 0 },
    },
    "about-one": {
      position: { x: 0, y: 5.7, z: 10.5 },
      rotation: { x: -0.3, y: -0.1, z: 0 },
    },
    "about-two": {
      position: { x: 0, y: 6.2, z: 15 },
      rotation: { x: -0.3, y: 0, z: 0 },
    },
  },
  sm: {
    hero: {
      position: { x: 0, y: 8, z: 16 },
      rotation: { x: -0.2, y: -0.125, z: 0 },
    },
    "about-one": {
      position: { x: 5.8, y: 5.7, z: 8.3 },
      rotation: { x: 0, y: 0, z: 0 },
    },
    "about-two": {
      position: { x: 0, y: 5.7, z: 10 },
      rotation: { x: -0.3, y: 0, z: 0 },
    },
  },
} as const satisfies Record<
  "lg" | "sm",
  Partial<
    Record<
      SceneKey,
      {
        position: { x: number; y: number; z: number };
        rotation: { x: number; y: number; z: number };
      }
    >
  >
>;
