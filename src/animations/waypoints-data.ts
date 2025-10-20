import type { SceneKey } from "./types";

export const points = {
  md: {
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
      position: { x: 0, y: 8.4, z: 16 },
      rotation: { x: -0.2, y: 0, z: 0 },
    },
    "about-one": {
      position: { x: 0, y: 5, z: 12 },
      rotation: { x: -0.2, y: 0, z: 0 },
    },
    "about-two": {
      position: { x: 0, y: 7, z: 18 },
      rotation: { x: -0.4, y: 0, z: 0 },
    },
  },
} as const satisfies Record<
  "md" | "sm",
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
