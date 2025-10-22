import { Mesh, ShaderMaterial, PlaneGeometry, Float32BufferAttribute, Color, Vector2 } from "three";
import { scene } from "../../core/scene";
import vertexShader from "../../shaders/dark-plane/vertex.glsl?raw";
import fragmentShader from "../../shaders/dark-plane/fragment.glsl?raw";
import gsap from "gsap";
import { sceneWeightsInOut } from "../../../animations/scenes";
import { renderTarget } from "../../core/renderTarget";
import { sizes } from "../../../utils/sizes";
import { mix } from "../../../utils/math";

let geometry: PlaneGeometry | null = null;
let material: ShaderMaterial | null = null;
let mesh: Mesh | null = null;

const uniforms = {
  uAngle: { value: 0 },
  uRectSize: { value: new Vector2() },
  uRectCenter: { value: new Vector2() },
  uRadius: { value: 0.05 },
  uAspectRatio: { value: sizes.width / sizes.height },
};

const init = () => {
  initMesh();
  gsap.ticker.add(tick);

  sizes.on("resize", handleResize);
  handleResize();
};

const initMesh = () => {
  if (geometry) return;
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
      uVignetteColor: { value: new Color("rgb(0, 15, 61)") },
      ...uniforms,
    },
  });

  mesh = new Mesh(geometry, material);
  mesh.renderOrder = 10;
  mesh.frustumCulled = false;
  mesh.visible = false;

  scene.instance.add(mesh);
};

const handleResize = () => {
  if (!material) return;
  const aspectRatio = sizes.width / sizes.height;
  uniforms.uAspectRatio.value = aspectRatio;

  const isMd = sizes.atLeastBreakpoint("md");
  uniforms.uRadius.value = (isMd ? 48 : 32) / sizes.height;
};

const tick = () => {
  if (!material || !mesh) return;

  const progress = {
    in: sceneWeightsInOut.about.in,
    out: sceneWeightsInOut.about.out,
  };

  if (progress.in < 0.001 || (progress.in === 1 && progress.out >= 0.999)) {
    mesh.visible = false;
    return;
  } else {
    mesh.visible = true;
  }

  const isMd = sizes.atLeastBreakpoint("md");

  const aspectRatio = sizes.width / sizes.height;
  const sizeValue = mix(0.55, 0.475, progress.in);
  uniforms.uRectSize.value.set(sizeValue * aspectRatio, sizeValue);
  uniforms.uRectCenter.value.set(0.5 + (isMd ? 0.1 : 0.175) * progress.in, 0.5 + progress.in * 1.1);
  uniforms.uAngle.value = (isMd ? 0.075 : 0.1) * progress.in;
};

const destroy = () => {
  gsap.ticker.remove(tick);
  sizes.off("resize", handleResize);
};

export const darkPlane = { init, destroy };
