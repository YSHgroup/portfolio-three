import { Box3, Box3Helper } from "three";
import { scene } from "../../core/scene";
import { raycast } from "../../utils/raycast";

import type { Mesh } from "three";

let mesh: Mesh | null = null;
let box3: Box3 | null = null;
let helper: Box3Helper | null = null;

const init = (_mesh: Mesh) => {
  mesh = _mesh;

  // Create Box3 from mesh geometry
  box3 = new Box3().setFromObject(mesh);

  // Create Box3Helper to visualize the box
  helper = new Box3Helper(box3, 0x00ff00);
  scene.instance.add(helper);

  raycast.boxesToCheck.push(box3);
};

const tick = () => {
  if (!mesh || !box3 || !helper) return;

  box3.setFromObject(mesh);
};

const destroy = () => {
  if (helper) {
    scene.instance.remove(helper);
    helper.dispose();
    helper = null;
  }
  box3 = null;
  if (box3) raycast.boxesToCheck.splice(raycast.boxesToCheck.indexOf(box3), 1);
};

export const penguin = { init, tick, destroy };
