import { ShaderMaterial, LinearSRGBColorSpace } from "three";
import { resources } from "../../../utils/resources";
import { aboutProgress } from "../../../animations/transitions/about";
import gsap from "gsap";

import vertexShader from "../../shaders/lab-base/vertex.glsl";
import fragmentShader from "../../shaders/lab-base/fragment.glsl";

import type { Mesh } from "three";

let material: ShaderMaterial | null = null;

const uniforms = {
  uDiffuseMap: { value: null },
  uProgress: { value: 0 },
};

const init = (mesh: Mesh) => {
  const texture = resources.items["diffuse-map"];
  texture.colorSpace = LinearSRGBColorSpace;
  texture.generateMipmaps = false;
  texture.flipY = false;

  uniforms.uDiffuseMap.value = texture;

  material = new ShaderMaterial({
    transparent: true,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms,
  });
  mesh.material = material;

  gsap.ticker.add(tick);
};

const tick = () => {
  if (!material) return;
  material.uniforms.uProgress!.value = aboutProgress.value;
};

const destroy = () => {
  gsap.ticker.remove(tick);
};

export const labBase = { init, destroy };
