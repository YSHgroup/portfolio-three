import { Box3 } from "three";
import { raycast } from "../../utils/raycast";
import gsap from "gsap";

import type { Mesh } from "three";
import type { ClickableBox3 } from "../../types";

let mesh: Mesh | null = null;
let box3: ClickableBox3 | null = null;
let isJumping = false;
let wings: { left: Mesh; right: Mesh } | null = null;

const init = (_mesh: Mesh, _wings: { left: Mesh; right: Mesh }) => {
  mesh = _mesh;
  wings = _wings;

  mesh.add(wings.left);
  mesh.add(wings.right);

  box3 = new Box3().setFromObject(mesh);
  box3.onClick = handleClick;

  raycast.boxesToCheck.push(box3);
};

const handleClick = () => {
  if (isJumping || !mesh || !wings) return;
  isJumping = true;
  const tl = gsap.timeline({
    onComplete: () => {
      isJumping = false;
    },
  });

  tl.to(
    mesh.position,
    {
      y: 2,
      duration: 0.4,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
    },
    0,
  );

  tl.to(
    wings.left.rotation,
    {
      x: 0.4,
      duration: 0.1,
      repeat: 7,
      ease: "power2.out",
      yoyo: true,
    },
    0,
  );

  tl.to(
    wings.left.position,
    {
      y: 0.05,
      duration: 0.1,
      repeat: 7,
      ease: "power2.out",
      yoyo: true,
    },
    0,
  );

  tl.to(
    wings.right.rotation,
    {
      x: -0.4,
      duration: 0.1,
      repeat: 7,
      ease: "power2.out",
      yoyo: true,
    },
    0,
  );

  tl.to(
    wings.right.position,
    {
      y: 0.05,
      duration: 0.1,
      repeat: 7,
      ease: "power2.out",
      yoyo: true,
    },
    0,
  );
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
};

export const penguin = { init, tick, destroy };
