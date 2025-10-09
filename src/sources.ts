import roomModel from "./assets/models/room.glb";

import roomTexture from "./assets/textures/room.png";

type Source = {
  name: string;
  type: "gltfModel" | "texture";
  path: string;
};

export const sources = [
  //models
  { name: "room-model", type: "gltfModel", path: roomModel },

  //textures
  { name: "room-texture", type: "texture", path: roomTexture },
] as const satisfies Source[];
