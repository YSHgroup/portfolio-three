import { ShaderMaterial } from "three";

import vertexShader from "../../shaders/lab-base/vertex.glsl";
import fragmentShader from "../../shaders/lab-base/fragment.glsl";

import type { Mesh } from "three";

let material: ShaderMaterial | null = null;

const init = (mesh: Mesh) => {
  material = new ShaderMaterial({
    transparent: true,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  });
  mesh.material = material;
};

export const labBase = { init };
