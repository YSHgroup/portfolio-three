import { resources } from "../../../utils/resources";
import { Group, Mesh, Vector3, Color } from "three";
import { scene } from "../../core/scene";
import { labShine } from "./shine";
import { labBase } from "./base";
import { labParticles } from "./particles";
import { DigitalNumbers } from "../digital-numbers";
import { aboutProgress } from "../../../animations/transitions/about";
import gsap from "gsap";

import type { Object3D } from "three";

const group = new Group();

let objects: {
  base: Mesh;
  shine: Mesh;
  display: Mesh;
} | null = null;

let aboutNumbers: DigitalNumbers | null = null;

const init = () => {
  if (objects) return;
  const resource = resources.items["lab-model"];

  objects = {
    base: resource.scene.children.find((child: Object3D) => child.name === "base"),
    shine: resource.scene.children.find((child: Object3D) => child.name === "shine"),
    display: resource.scene.children.find((child: Object3D) => child.name === "display"),
  };

  Object.values(objects).forEach((object) => {
    object.renderOrder = object.name === "shine" ? 30 : 20;
    group.add(object);
  });

  scene.instance.add(group);

  if (objects?.shine) labShine.init(objects.shine);
  if (objects?.base) labBase.init(objects.base, objects.display);

  labParticles.init();

  aboutNumbers = new DigitalNumbers({
    count: 3,
    scene: group,
    position: new Vector3(0, -0.23, 1.07),
    scale: 0.17,
    color: new Color("#bae9ff"),
  });
  aboutNumbers.updateFrames(0);

  gsap.ticker.add(tick);
};

const tick = () => {
  if (!aboutNumbers) return;
  const value = Math.floor(aboutProgress.value * 100);
  aboutNumbers.updateFrames(value);
};

const destroy = () => {
  gsap.ticker.remove(tick);
  labShine.destroy();
  labBase.destroy();
  labParticles.destroy();
  aboutNumbers?.destroy();
  aboutNumbers = null;
  group.clear();
  //objects = null;
};

export const lab = { init, destroy, group };
