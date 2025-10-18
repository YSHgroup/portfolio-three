import { camera } from "./core/camera";
import { renderer } from "./core/renderer";
import { objects } from "./objects";
import { renderTarget } from "./core/renderTarget";
import { threeSizes } from "./utils/sizes";

const init = (canvas: HTMLCanvasElement) => {
  threeSizes.init(canvas);
  renderTarget.init();
  renderer.init(canvas);
  objects.init();
  camera.init();
};

const destroy = () => {
  threeSizes.destroy();
  renderTarget.destroy();
  renderer.destroy();
  objects.destroy();
  camera.destroy();
};

export const three = { init, destroy, setActive: renderer.setActive };
