import avatarModel from "./assets/models/avatar.glb";
import labModel from "./assets/models/lab.glb";
import roomModel from "./assets/models/room.glb";

import faceTexture from "./assets/textures/face-spritesheet.png";
import headTexture from "./assets/textures/head.png";
import desktopsTexture from "./assets/textures/desktops.png";
import matcapBlack from "./assets/textures/matcap-black.jpg";
import matcapGray from "./assets/textures/matcap-gray.jpg";
import matcapSkin from "./assets/textures/matcap-skin.jpg";
import matcapWhite from "./assets/textures/matcap-white.jpg";
import roomTexture from "./assets/textures/room.png";
import roomShadowTexture from "./assets/textures/room-shadow.png";

type Source = {
  name: string;
  type: "gltfModel" | "texture";
  path: string;
};

export const sources = [
  //models
  { name: "avatar-model", type: "gltfModel", path: avatarModel },
  { name: "lab-model", type: "gltfModel", path: labModel },
  { name: "room-model", type: "gltfModel", path: roomModel },

  //textures
  { name: "face-texture", type: "texture", path: faceTexture },
  { name: "head-texture", type: "texture", path: headTexture },
  { name: "desktops-texture", type: "texture", path: desktopsTexture },
  { name: "matcap-black", type: "texture", path: matcapBlack },
  { name: "matcap-gray", type: "texture", path: matcapGray },
  { name: "matcap-skin", type: "texture", path: matcapSkin },
  { name: "matcap-white", type: "texture", path: matcapWhite },
  { name: "room-texture", type: "texture", path: roomTexture },
  { name: "room-shadow-texture", type: "texture", path: roomShadowTexture },
] as const satisfies Source[];
