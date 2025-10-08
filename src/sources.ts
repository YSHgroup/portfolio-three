import roomModel from "./assets/models/room.glb";

type Source = {
  name: string;
  type: "gltfModel" | "texture";
  path: string;
};

export const sources = [{ name: "room-model", type: "gltfModel", path: roomModel }] as const satisfies Source[];
