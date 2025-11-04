import { DoubleSide, ShaderMaterial } from "three";
import vertexShader from "../../shaders/lab-shine/vertex.glsl";
import fragmentShader from "../../shaders/lab-shine/fragment.glsl";

import type { Mesh } from "three";

let material: ShaderMaterial | null = null;

const init = (mesh: Mesh) => {
  if (material) return;
  material = new ShaderMaterial({
    transparent: true,
    side: DoubleSide,
    depthWrite: false,
    depthTest: false,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  });
  mesh.material = material;
};

export const labShine = { init };
