import { resources } from "../../../utils/resources";
import { scene } from "../../core/scene";
import { Group, Mesh } from "three";
import { getRoomMaterial } from "../../common/materials";

import type { Object3D } from "three";

const group = new Group();
group.rotation.y = -Math.PI / 2;

let objects: {
  blackboard: Mesh;
  chair: Mesh;
  frame: Mesh;
  mouse: Mesh;
  music: Mesh;
  penguin: Mesh;
  plant: Mesh;
  room: Mesh;
  shelf: Mesh;
};

const init = () => {
  const resource = resources.items["room-model"];

  objects = {
    blackboard: resource.scene.children.find((child: Object3D) => child.name === "blackboard"),
    chair: resource.scene.children.find((child: Object3D) => child.name === "chair"),
    frame: resource.scene.children.find((child: Object3D) => child.name === "frame"),
    mouse: resource.scene.children.find((child: Object3D) => child.name === "mouse"),
    music: resource.scene.children.find((child: Object3D) => child.name === "music"),
    penguin: resource.scene.children.find((child: Object3D) => child.name === "penguin"),
    plant: resource.scene.children.find((child: Object3D) => child.name === "plant"),
    room: resource.scene.children.find((child: Object3D) => child.name === "room"),
    shelf: resource.scene.children.find((child: Object3D) => child.name === "shelf"),
  };

  Object.values(objects).forEach((object) => {
    object.material = getRoomMaterial();
    group.add(object);
  });

  scene.instance.add(group);
};

export const room = { init };
