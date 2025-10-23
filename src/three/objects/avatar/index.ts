import { resources } from "../../../utils/resources";
import { Mesh, MeshBasicMaterial, Vector3, Euler, Group, ShaderMaterial, LinearSRGBColorSpace } from "three";
import { scene } from "../../core/scene";
import { animations } from "./animations";
//import { sceneWeights } from "../../../animations/scenes";
import gsap from "gsap";
import { clone as cloneSkeleton } from "three/examples/jsm/utils/SkeletonUtils.js";
import { face } from "./face";
import { leftDesktop as avatarLeftDesktop } from "./left-desktop";
import vertexShader from "../../shaders/avatar-matcap/vertex.glsl";
import fragmentShader from "../../shaders/avatar-matcap/fragment.glsl";
import { aboutProgress } from "../../../animations/transitions/about";

import type { Material, Bone, Texture } from "three";

let mesh: Mesh | null = null;
let rightHandBone: Bone | null = null;

const tIdleIntensity = { value: 0 };

const waypointsPosition = new Vector3();
const waypointsRotation = new Euler();
const transform = new Group();
const uniforms = { uProgress: { value: 0 } };

const init = () => {
  setupMesh();
  animations.init();
  gsap.ticker.add(tick);
  face.init();
  avatarLeftDesktop.init();
};

const getMaterial = (name: string): Material | null => {
  if (name === "face") return face.getMaterial();
  if (name === "head") {
    const texture = resources.items["head-texture"];
    texture.flipY = false;
    return new MeshBasicMaterial({ map: texture, transparent: true });
  }

  const tex = resources.items["matcap-black"];
  tex.colorSpace = LinearSRGBColorSpace;

  return new ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: true,
    uniforms: {
      uMatcap: { value: tex },
      ...uniforms,
    },
  });
};

const assignMatcap = (child: Mesh): boolean => {
  let tex: Texture | null = null;

  if (child.name === "black") {
    tex = resources.items["matcap-black"];
  } else if (child.name === "gray") {
    tex = resources.items["matcap-gray"];
  } else if (child.name === "skin") {
    tex = resources.items["matcap-skin"];
  } else if (child.name === "white") {
    tex = resources.items["matcap-white"];
  }

  if (tex) {
    tex.colorSpace = LinearSRGBColorSpace;
    child.userData.matcap = tex;
    return true;
  }
  return false;
};

const setupMesh = () => {
  if (mesh) return;
  const resource = resources.items["avatar-model"];
  mesh = cloneSkeleton(resource.scene.children[0]) as Mesh;

  mesh.frustumCulled = false;

  mesh.traverse((child) => {
    if (child instanceof Mesh) {
      const mat = getMaterial(child.name);
      if (!mat) return;
      child.material = mat;
      child.frustumCulled = false;
      child.renderOrder = child.name === "face" ? 21 : 20;
      const hasMatcap = assignMatcap(child);
      if (hasMatcap) {
        child.onBeforeRender = () => {
          child.material.uniforms.uMatcap.value = child.userData.matcap;
        };
      }
    }
  });
  mesh.rotation.z = 0;

  transform.add(mesh);

  rightHandBone = mesh.getObjectByName("bone-right-hand") as Bone;

  scene.instance.add(transform);
};

const tick = () => {
  //TBD: hide when intro isnt visible or progress is 1 but not in contact section

  //if (sceneWeights.hero >= 0.001) {
  //  transform.position.copy(waypointsPosition);
  //  transform.rotation.copy(waypointsRotation);
  //} else {
  //  transform.position.set(0, -14, 0);
  //  transform.rotation.set(0, -Math.PI, 0);
  //}

  transform.position.copy(waypointsPosition);
  transform.rotation.copy(waypointsRotation);

  uniforms.uProgress.value = aboutProgress.value;
};

const destroy = () => {
  gsap.ticker.remove(tick);
  //mesh = null;
  //transform.clear();
  face.destroy();
};

export const avatar = {
  init,
  destroy,
  getMesh: () => mesh,
  getRightHandBone: () => rightHandBone,
  tIdleIntensity,
  waypointsPosition,
  waypointsRotation,
};
