import type { SceneKey } from "./types";

export const points = {
  md: {
    hero: {
      position: { x: 0, y: 6, z: 10 },
      focus: { x: 0, y: 3, z: 0 },
    },
    about: {
      position: { x: 0, y: 4.7, z: 14.5 },
      focus: { x: 0, y: 1, z: 0 },
    },
  },
  sm: {
    hero: {
      position: { x: 0, y: 8.4, z: 16 },
      focus: { x: 0, y: 5.4, z: 0 },
    },
    about: {
      position: { x: 0, y: 4.75, z: 18 },
      focus: { x: 0, y: 1.4, z: 0 },
    },
  },
} as const satisfies Record<
  "md" | "sm",
  Partial<
    Record<
      SceneKey,
      {
        position: { x: number; y: number; z: number };
        focus: { x: number; y: number; z: number };
      }
    >
  >
>;
