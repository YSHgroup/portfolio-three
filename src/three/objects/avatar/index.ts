import { resources } from "../../../utils/resources";
import { Mesh, MeshMatcapMaterial, MeshBasicMaterial, Vector3, Euler, Group } from "three";
import { scene } from "../../core/scene";
import { animations } from "./animations";
import { sceneWeights } from "../../../animations/scenes";
import gsap from "gsap";
import { clone as cloneSkeleton } from "three/examples/jsm/utils/SkeletonUtils.js";

import type { Material } from "three";

let mesh: Mesh | null = null;

const tIdleIntensity = { value: 0 };

const waypointsPosition = new Vector3();
const waypointsRotation = new Euler();
const transform = new Group();

const init = () => {
  setupMesh();
  animations.init();
  gsap.ticker.add(tick);
};

const getMaterial = (name: string): Material | null => {
  if (name === "face") return new MeshBasicMaterial({ transparent: true, opacity: 0 });
  if (name === "black") return new MeshMatcapMaterial({ matcap: resources.items["matcap-black"] });
  if (name === "gray") return new MeshMatcapMaterial({ matcap: resources.items["matcap-gray"] });
  if (name === "skin") return new MeshMatcapMaterial({ matcap: resources.items["matcap-skin"] });
  if (name === "white") return new MeshMatcapMaterial({ matcap: resources.items["matcap-white"] });
  if (name === "head") {
    const texture = resources.items["head-texture"];
    texture.flipY = false;
    return new MeshBasicMaterial({ map: texture });
  }
  return null;
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
    }
  });
  mesh.rotation.z = 0;

  transform.add(mesh);

  scene.instance.add(transform);
};

const tick = () => {
  if (sceneWeights.hero >= 0.001) {
    transform.position.copy(waypointsPosition);
    transform.rotation.copy(waypointsRotation);
  } else {
    transform.position.set(0, -14, 0);
    transform.rotation.set(0, -Math.PI, 0);
  }
};

const destroy = () => {
  gsap.ticker.remove(tick);
  //mesh = null;
  //transform.clear();
};

export const avatar = { init, destroy, getMesh: () => mesh, tIdleIntensity, waypointsPosition, waypointsRotation };
