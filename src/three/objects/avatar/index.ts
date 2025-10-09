import { resources } from "../../../utils/resources";
import { Mesh, MeshMatcapMaterial, MeshBasicMaterial } from "three";
import { scene } from "../../core/scene";

import type { Material } from "three";

let mesh: Mesh;

const init = () => {
  setupMesh();
};

const getMaterial = (name: string): Material | null => {
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
  const resource = resources.items["avatar-model"];
  mesh = resource.scene.children[0];

  mesh.traverse((child) => {
    if (child instanceof Mesh) {
      const mat = getMaterial(child.name);
      if (!mat) return;
      child.material = mat;
    }
  });

  scene.instance.add(mesh);
};

export const avatar = { init };
