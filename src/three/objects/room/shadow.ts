import { resources } from "../../../utils/resources";
import { room } from ".";
import { Color, ShaderMaterial } from "three";
import vertexShader from "../../shaders/room-shadow/vertex.glsl";
import fragmentShader from "../../shaders/room-shadow/fragment.glsl";
import { colors } from "../../common/colors";

import type { Object3D } from "three";

let material: ShaderMaterial | null = null;

const init = () => {
  initObjects();
};

const initObjects = () => {
  if (material) return;
  const resource = resources.items["room-model"];
  const texture = resources.items["room-shadow-texture"];
  texture.flipY = false;

  const mesh = resource.scene.children.find((child: Object3D) => child.name === "shadow-catcher");
  if (!mesh) return;

  material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    depthWrite: false,
    depthTest: false,
    uniforms: {
      uTexture: { value: texture },
      uColorBackground: { value: colors.beigeLight.clone().convertLinearToSRGB() },
      uColorShadow: { value: new Color("rgb(215, 194, 169)") },
    },
  });

  mesh.renderOrder = -1000;

  mesh.material = material;

  room.group.add(mesh);
};

const destroy = () => {
  material?.dispose();
  material = null;
};

export const shadow = { init, destroy };
