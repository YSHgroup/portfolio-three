import { MeshBasicMaterial } from "three";
import { resources } from "../../utils/resources";

import type { Material } from "three";

let roomMaterial: Material | null = null;
let labMaterial: Material | null = null;
let contactMaterial: Material | null = null;

export const getRoomMaterial = () => {
  if (roomMaterial) return roomMaterial;
  const texture = resources.items["room-texture"];

  roomMaterial = new MeshBasicMaterial({ map: texture });

  return roomMaterial;
};

export const getContactMaterial = () => {
  if (contactMaterial) return contactMaterial;
  const texture = resources.items["contact-texture"];
  texture.flipY = false;

  contactMaterial = new MeshBasicMaterial({ map: texture });

  return contactMaterial;
};

export const getLabMaterial = () => {
  if (labMaterial) return labMaterial;

  labMaterial = new MeshBasicMaterial({ color: 0xff0000 });

  return labMaterial;
};
