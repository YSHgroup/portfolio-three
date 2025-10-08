import { resources } from "../../../utils/Resources";
import { scene } from "../../core/scene";
import { Group } from "three";

import type { Object3D } from "three";
import type { Mesh } from "three";

const group = new Group();
group.rotation.y = -Math.PI / 2;

const init = () => {
  const resource = resources.items["room-model"];
  const mesh = resource.scene.children.find((child: Object3D) => child.name === "room-base") as Mesh;
  group.add(mesh);

  scene.instance.add(group);
};

export const room = { init };
