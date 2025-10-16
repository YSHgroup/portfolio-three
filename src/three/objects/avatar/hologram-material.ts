import { Color, ShaderMaterial, DoubleSide } from "three";
import vertexShader from "../../shaders/hologram/vertex.glsl?raw";
import fragmentShader from "../../shaders/hologram/fragment.glsl?raw";

let material: ShaderMaterial;

const uniforms = {
  uTime: { value: 0 },
  uColor: { value: new Color("rgb(0, 234, 255)") },
};

const getMaterial = () => {
  if (material) return material;

  material = new ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: true,
    depthWrite: false,
    blending: 2,
    side: DoubleSide,
    uniforms,
  });

  return material;
};

export { getMaterial, uniforms };
