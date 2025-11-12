import { Box3, Mesh } from "three";
import { raycast } from "../../utils/raycast";
import { room } from ".";
import { soundsEnabled } from "../../../features/sounds/composables/useHowler";
import { notes } from "./notes";

import type { ClickableBox3 } from "../../types";

let mesh: Mesh | null = null;
let box3: ClickableBox3 | null = null;

const handleClick = () => {
  soundsEnabled.value = !soundsEnabled.value;
};

const init = (_mesh: Mesh) => {
  mesh = _mesh;
  room.group.add(mesh);

  box3 = new Box3().setFromObject(mesh);
  box3.onClick = handleClick;

  raycast.boxesToCheck.push(box3);

  // Initialize notes positioned relative to music box
  notes.init({
    x: mesh.position.x,
    y: mesh.position.y,
    z: mesh.position.z,
  });
};

const tick = () => {
  if (!mesh || !box3) return;

  box3.setFromObject(mesh);
  box3.expandByScalar(0.15);
};

const destroy = () => {
  if (box3) {
    raycast.boxesToCheck.splice(raycast.boxesToCheck.indexOf(box3), 1);
  }
  box3 = null;
  notes.destroy();
};

export const music = {
  init,
  tick,
  destroy,
};
