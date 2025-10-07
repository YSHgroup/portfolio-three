import { PerspectiveCamera } from "three";
import sizes from "../../utils/Sizes";

const instance: PerspectiveCamera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const init = () => {
  instance.position.set(0, 0, 5);

  sizes.on("resize", resize);
  resize();
};

const resize = () => {
  instance.aspect = sizes.width / sizes.height;
  instance.updateProjectionMatrix();
};

const destroy = () => {
  if (!instance) return;
  sizes.off("resize", resize);
};

export const camera = { init, destroy, instance };
