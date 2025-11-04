import { resources } from "../../../utils/resources";
import { Group, Mesh } from "three";
import { scene } from "../../core/scene";
import { labShine } from "./shine";
import { labBase } from "./base";

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
    object.renderOrder = object.name === "shine" ? 21 : 20;
    group.add(object);
  });

  scene.instance.add(group);

  if (objects?.shine) labShine.init(objects.shine);
  if (objects?.base) labBase.init(objects.base);
};

const destroy = () => {
  labShine.destroy();
  group.clear();
  //objects = null;
};

export const lab = { init, destroy, group };
