import { resources } from "../../../utils/resources";
import { Group, Mesh } from "three";
import { getLabMaterial } from "../../common/materials";
//import { renderTarget } from "../../core/renderTarget";

import type { Object3D } from "three";

const group = new Group();

let objects: {
  base: Mesh;
} | null = null;

const init = () => {
  if (objects) return;
  const resource = resources.items["lab-model"];

  objects = {
    base: resource.scene.children.find((child: Object3D) => child.name === "base"),
  };

  Object.values(objects).forEach((object) => {
    const mat = getLabMaterial();
    object.material = mat;
    group.add(object);
  });

  //renderTarget.scene.add(group);
};

const destroy = () => {
  group.clear();
  //objects = null;
};

export const lab = { init, destroy, group };
