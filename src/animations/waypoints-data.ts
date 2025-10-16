import type { SceneKey } from "./types";

export const points = {
  lg: {
    hero: {
      //position: { x: 5.8, y: 5.7, z: 8.3 },
      //rotation: { x: -0.42, y: 0.75, z: 0.3 },
      position: { x: 0, y: 5.7, z: 10 },
      rotation: { x: -0.3, y: 0, z: 0 },
    },
    about: {
      position: { x: 0, y: 5.7, z: 10 },
      rotation: { x: -0.3, y: 0, z: 0 },
    },
  },
  sm: {
    hero: {
      position: { x: 8.8, y: 7.5, z: 13 },
      rotation: { x: -0.168, y: 0.573, z: 0.091 },
    },
    about: {
      position: { x: 5.8, y: 5.7, z: 8.3 },
      rotation: { x: 0, y: 0, z: 0 },
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
