import { Mesh, ShaderMaterial, PlaneGeometry, Float32BufferAttribute } from "three";
import { scene } from "../../core/scene";
import vertexShader from "../../shaders/dark-plane/vertex.glsl?raw";
import fragmentShader from "../../shaders/dark-plane/fragment.glsl?raw";
import gsap from "gsap";
import { sceneWeightsInOut } from "../../../animations/scenes";
import { renderTarget } from "../../core/renderTarget";

let geometry: PlaneGeometry | null = null;
let material: ShaderMaterial | null = null;
let mesh: Mesh | null = null;

const init = () => {
  geometry = new PlaneGeometry(2, 2);

  const position = geometry.attributes.position!;
  const array = position.array as Float32Array;

  const activeArray = new Float32Array(array.length);

  for (let i = 0; i < array.length; i += 3) {
    const x = array[i]!;
    const y = array[i + 1]!;
    const z = array[i + 2]!;

    activeArray[i] = x;
    activeArray[i + 1] = y;
    activeArray[i + 2] = z;
  }

  geometry.setAttribute("activePosition", new Float32BufferAttribute(activeArray, 3));

  material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    depthTest: false,
    depthWrite: false,
    transparent: true,
    uniforms: {
      uTexture: { value: renderTarget.instance.texture },
      uInProgress: { value: 0 },
      uOutProgress: { value: 0 },
    },
  });

  mesh = new Mesh(geometry, material);
  mesh.renderOrder = 10;

  scene.instance.add(mesh);

  gsap.ticker.add(tick);
};

const tick = () => {
  if (!material || !mesh) return;

  const progress = {
    in: sceneWeightsInOut.about.in,
    out: sceneWeightsInOut.about.out,
  };

  material.uniforms.uInProgress!.value = sceneWeightsInOut.about.in;
  material.uniforms.uOutProgress!.value = sceneWeightsInOut.about.out;

  if (progress.in < 0.001 || (progress.in === 1 && progress.out >= 0.999)) {
    mesh.visible = false;
  } else {
    mesh.visible = true;
  }
};

export const darkPlane = { init };
