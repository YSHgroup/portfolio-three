import { PlaneGeometry, ShaderMaterial, Mesh, Color } from "three";
import { renderTarget } from "../../core/renderTarget";
import vertexShader from "../../shaders/grid-floor/vertex.glsl?raw";
import fragmentShader from "../../shaders/grid-floor/fragment.glsl?raw";
import gsap from "gsap";
import { sceneWeightsInOut } from "../../../animations/scenes";

let mesh: Mesh | null = null;
let geometry: PlaneGeometry | null = null;
let material: ShaderMaterial | null = null;

const init = () => {
  if (geometry) return;
  geometry = new PlaneGeometry(20, 20);

  material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    depthTest: true,
    uniforms: {
      uColor: { value: new Color("#0157A0").convertLinearToSRGB() },
      uLineColor: { value: new Color("#34BCFD").convertLinearToSRGB() },
      uOpacity: { value: 0 },
      uTime: { value: 0 },
    },
  });

  mesh = new Mesh(geometry, material);
  mesh.frustumCulled = false;
  mesh.renderOrder = -100;
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.z = 6;

  renderTarget.scene.add(mesh);

  gsap.ticker.add(tick);
};

const tick = () => {
  if (!mesh || !(mesh.material instanceof ShaderMaterial)) return;

  mesh.material.uniforms.uOpacity!.value = 0.2 + 0.8 * sceneWeightsInOut.about.in;
  mesh.material.uniforms.uTime!.value = gsap.ticker.time;
};

const destroy = () => {
  gsap.ticker.remove(tick);
  //geometry?.dispose();
  //geometry = null;
  //material?.dispose();
  //material = null;
  //mesh = null;
};

export const gridFloor = { init, destroy, getMesh: () => mesh };
