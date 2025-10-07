import { camera } from "./core/camera";
import { renderer } from "./core/renderer";
import { objects } from "./objects";

const init = (canvas: HTMLCanvasElement) => {
  renderer.init(canvas);
  objects.init();
  camera.init();
};

const destroy = () => {
  renderer.destroy();
  objects.destroy();
};

export const three = { init, destroy };
