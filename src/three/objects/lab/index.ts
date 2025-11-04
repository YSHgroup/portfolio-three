import { resources } from "../../../utils/resources";
import { Group, Mesh } from "three";
import { getLabMaterial } from "../../common/materials";
import { scene } from "../../core/scene";
import { labShine } from "./shine";

import type { Object3D } from "three";

const group = new Group();

let objects: {
  base: Mesh;
  shine: Mesh;
} | null = null;

const init = () => {
  if (objects) return;
  const resource = resources.items["lab-model"];

  objects = {
    base: resource.scene.children.find((child: Object3D) => child.name === "base"),
    shine: resource.scene.children.find((child: Object3D) => child.name === "shine"),
  };

  Object.values(objects).forEach((object) => {
    const mat = getLabMaterial();
    object.material = mat;
    object.renderOrder = 20;
    group.add(object);
  });

  scene.instance.add(group);

  if (objects?.shine) labShine.init(objects.shine);
};

const destroy = () => {
  group.clear();
  //objects = null;
};

export const lab = { init, destroy, group };
