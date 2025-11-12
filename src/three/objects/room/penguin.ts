import { Box3 } from "three";
import { raycast } from "../../utils/raycast";
import gsap from "gsap";

import type { Mesh } from "three";
import type { ClickableBox3 } from "../../types";

let mesh: Mesh | null = null;
let box3: ClickableBox3 | null = null;
let isJumping = false;

const init = (_mesh: Mesh) => {
  mesh = _mesh;

  box3 = new Box3().setFromObject(mesh);
  box3.onClick = handleClick;

  raycast.boxesToCheck.push(box3);
};

const handleClick = () => {
  if (isJumping || !mesh) return;
  isJumping = true;
  gsap.to(mesh.position, {
    y: 2,
    duration: 0.4,
    ease: "power2.out",
    yoyo: true,
    repeat: 1,
    onComplete: () => {
      isJumping = false;
    },
  });
};

const tick = () => {
  if (!mesh || !box3) return;

  box3.setFromObject(mesh);
  box3.expandByScalar(0.2);
};

const destroy = () => {
  if (box3) {
    raycast.boxesToCheck.splice(raycast.boxesToCheck.indexOf(box3), 1);
  }
  box3 = null;
};

export const penguin = { init, tick, destroy };
