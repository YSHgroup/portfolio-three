import avatarModel from "./assets/models/avatar.glb";
import roomModel from "./assets/models/room.glb";

import headTexture from "./assets/textures/head.png";
import matcapBlack from "./assets/textures/matcap-black.jpg";
import matcapGray from "./assets/textures/matcap-gray.jpg";
import matcapSkin from "./assets/textures/matcap-skin.jpg";
import matcapWhite from "./assets/textures/matcap-white.jpg";
import roomTexture from "./assets/textures/room.png";

type Source = {
  name: string;
  type: "gltfModel" | "texture";
  path: string;
};

export const sources = [
  //models
  { name: "avatar-model", type: "gltfModel", path: avatarModel },
  { name: "room-model", type: "gltfModel", path: roomModel },

  //textures
  { name: "head-texture", type: "texture", path: headTexture },
  { name: "matcap-black", type: "texture", path: matcapBlack },
  { name: "matcap-gray", type: "texture", path: matcapGray },
  { name: "matcap-skin", type: "texture", path: matcapSkin },
  { name: "matcap-white", type: "texture", path: matcapWhite },
  { name: "room-texture", type: "texture", path: roomTexture },
] as const satisfies Source[];
