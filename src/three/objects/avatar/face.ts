import { LinearSRGBColorSpace, ShaderMaterial } from "three";
import { resources } from "../../../utils/resources";
import fragmentShader from "../../shaders/avatar-face/fragment.glsl?raw";
import vertexShader from "../../shaders/avatar-face/vertex.glsl?raw";

import type { Material } from "three";

let material: Material | null = null;

const init = () => {};

const getMaterial = (): Material | null => {
  const texture = resources.items["face-texture"];
  texture.colorSpace = LinearSRGBColorSpace;
  texture.generateMipmaps = false;

  material = new ShaderMaterial({
    transparent: true,
    depthTest: false,
    depthWrite: false,
    fragmentShader,
    vertexShader,
    uniforms: { uTexture: { value: texture }, uIndex: { value: 0 } },
  });

  return material;
};

const destroy = () => {};

export const face = { init, destroy, getMaterial };
