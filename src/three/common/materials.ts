import { MeshBasicMaterial, SRGBColorSpace } from "three";
import { resources } from "../../utils/resources";

let roomMaterial: MeshBasicMaterial | null = null;

export const getRoomMaterial = () => {
  if (roomMaterial) return roomMaterial;
  const texture = resources.items["room-texture"];
  texture.flipY = false;
  texture.colorSpace = SRGBColorSpace;

  roomMaterial = new MeshBasicMaterial({ map: texture });

  return roomMaterial;
};
