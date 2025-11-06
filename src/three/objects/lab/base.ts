import { ShaderMaterial, LinearSRGBColorSpace } from "three";
import { resources } from "../../../utils/resources";

import vertexShader from "../../shaders/lab-base/vertex.glsl";
import fragmentShader from "../../shaders/lab-base/fragment.glsl";

import type { Mesh } from "three";

let material: ShaderMaterial | null = null;

const init = (mesh: Mesh) => {
  const texture = resources.items["diffuse-map"];
  texture.colorSpace = LinearSRGBColorSpace;
  texture.generateMipmaps = false;
  texture.flipY = false;

  material = new ShaderMaterial({
    transparent: true,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
      uDiffuseMap: { value: texture },
    },
  });
  mesh.material = material;
};

export const labBase = { init };
