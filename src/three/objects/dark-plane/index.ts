import { Mesh, ShaderMaterial, PlaneGeometry, Float32BufferAttribute } from "three";
import { scene } from "../../core/scene";
import vertexShader from "../../shaders/dark-plane/vertex.glsl?raw";
import fragmentShader from "../../shaders/dark-plane/fragment.glsl?raw";
import gsap from "gsap";

let geometry: PlaneGeometry | null = null;
let material: ShaderMaterial | null = null;
let mesh: Mesh | null = null;

const offset = { value: -2 };

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

    if (x < 0 && y > 0) activeArray[i + 1]! += 0.5;
    if (x < 0 && y < 0) activeArray[i + 1]! -= 0.5;
  }

  geometry.setAttribute("activePosition", new Float32BufferAttribute(activeArray, 3));

  material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    depthTest: false,
    depthWrite: false,
    uniforms: {
      uOffset: { value: offset.value },
      uActive: { value: 0 },
    },
  });

  mesh = new Mesh(geometry, material);
  mesh.renderOrder = 10;

  scene.instance.add(mesh);

  gsap.ticker.add(tick);
};

const tick = () => {
  if (!material) return;
  material.uniforms.uOffset!.value = offset.value;

  const normalized = 1 - Math.min(1, Math.abs(offset.value / 2));
  material.uniforms.uActive!.value = normalized;
};

export const darkPlane = { init, offset };
