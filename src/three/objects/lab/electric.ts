import { ShaderMaterial } from "three";
import gsap from "gsap";

import vertexShader from "../../shaders/lab-electric/vertex.glsl";
import fragmentShader from "../../shaders/lab-electric/fragment.glsl";
import { scroll } from "../../../utils/scroll";

import type { Mesh } from "three";

let material: ShaderMaterial | null = null;
let mesh: Mesh | null = null;
const uniforms = {
  uTime: { value: 0 },
  uOpacity: { value: 0 },
};

const init = (_mesh: Mesh) => {
  mesh = _mesh;
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
  material.uniforms.uTime!.value = gsap.ticker.time;
  const opacity = scroll.velocity * 0.75;
  material.uniforms.uOpacity!.value = opacity;

  if (mesh) {
    mesh.visible = opacity > 0.01;
  }
};

const destroy = () => {
  gsap.ticker.remove(tick);
};

export const labElectric = { init, destroy };
