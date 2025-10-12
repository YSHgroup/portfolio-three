import type { SceneKey } from "./types";

export const points = {
  lg: {
    hero: {
      position: { x: 5.8, y: 5.7, z: 8.3 },
      lookAt: { x: -2.7, y: 2, z: 0 },
    },
    about: {
      position: { x: 5.8, y: 5.7, z: 8.3 },
      lookAt: { x: -3.5, y: 2, z: 0 },
    },
  },
  sm: {
    hero: {
      position: { x: 8.8, y: 7.5, z: 13 },
      lookAt: { x: 0.3, y: 5.3, z: 0 },
    },
    about: {
      position: { x: 5.8, y: 5.7, z: 8.3 },
      lookAt: { x: -3.5, y: 2, z: 0 },
    },
  },
} as const satisfies Record<
  "lg" | "sm",
  Partial<
    Record<
      SceneKey,
      {
        position: { x: number; y: number; z: number };
        lookAt: { x: number; y: number; z: number };
      }
    >
  >
>;
