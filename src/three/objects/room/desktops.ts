import { resources } from "../../../utils/resources";
import { BufferAttribute, LinearSRGBColorSpace, Mesh, RepeatWrapping, ShaderMaterial } from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { room } from ".";
import fragmentShader from "../../shaders/desktops/fragment.glsl?raw";
import vertexShader from "../../shaders/desktops/vertex.glsl?raw";
import gsap from "gsap";

import type { Object3D, Material, BufferGeometry } from "three";

let mesh: Mesh | null = null;
let material: Material | null = null;
let geometry: BufferGeometry | null = null;

const uniforms = {
  uScrollDepth: { value: 0 },
};

const init = () => {
  setupMesh();

  setTimeout(() => {
    scroll();
  }, 1000);
};

const setupMesh = () => {
  const resource = resources.items["room-model"];

  const desktop1 = resource.scene.children.find((child: Object3D) => child.name === "desktop-plane-0");
  const desktop2 = resource.scene.children.find((child: Object3D) => child.name === "desktop-plane-1");

  desktop1.geometry.translate(desktop1.position);
  desktop2.geometry.translate(desktop2.position);

  // Add scrollIntensity attribute to geometries
  const scrollIntensity1 = new Float32Array(desktop1.geometry.attributes.position.count).fill(1);
  const scrollIntensity2 = new Float32Array(desktop2.geometry.attributes.position.count).fill(0);
  desktop1.geometry.setAttribute("scrollIntensity", new BufferAttribute(scrollIntensity1, 1));
  desktop2.geometry.setAttribute("scrollIntensity", new BufferAttribute(scrollIntensity2, 1));

  // add messageIntensity attribute to geometries
  const messageIntensity1 = new Float32Array(desktop1.geometry.attributes.position.count).fill(0);
  const messageIntensity2 = new Float32Array(desktop2.geometry.attributes.position.count).fill(1);
  desktop1.geometry.setAttribute("messageIntensity", new BufferAttribute(messageIntensity1, 1));
  desktop2.geometry.setAttribute("messageIntensity", new BufferAttribute(messageIntensity2, 1));

  geometry = mergeGeometries([desktop1.geometry, desktop2.geometry]);

  const texture = resources.items["desktops-texture"];
  texture.colorSpace = LinearSRGBColorSpace;
  texture.flipY = false;
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;

  material = new ShaderMaterial({
    fragmentShader,
    vertexShader,
    uniforms: {
      uTexture: { value: texture },
      ...uniforms,
    },
  });

  mesh = new Mesh(geometry, material);

  room.group.add(mesh);
};

const scroll = () => {
  const scrollDepth = Math.random() * (-0.25 - 0.25) + 0.25;

  gsap.to(uniforms.uScrollDepth, { value: scrollDepth, duration: 1 });
};

const destroy = () => {
  material?.dispose();
  material = null;
  geometry?.dispose();
  geometry = null;
  mesh = null;
};

export const desktops = { init, destroy, scroll };
