import { MeshBasicMaterial, SRGBColorSpace } from "three";
import { resources } from "../../utils/resources";

import type { Material } from "three";

let roomMaterial: Material | null = null;
let labMaterial: Material | null = null;

export const getRoomMaterial = () => {
  if (roomMaterial) return roomMaterial;
  const texture = resources.items["room-texture"];
  texture.flipY = false;
  texture.colorSpace = SRGBColorSpace;

  roomMaterial = new MeshBasicMaterial({ map: texture });

  return roomMaterial;
};

export const getLabMaterial = () => {
  if (labMaterial) return labMaterial;

  labMaterial = new MeshBasicMaterial({ color: 0xff0000 });

  return labMaterial;
};
