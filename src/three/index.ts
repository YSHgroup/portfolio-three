import { camera } from "./core/camera";
import { renderer } from "./core/renderer";
import { objects } from "./objects";
import { renderTarget } from "./core/renderTarget";

const init = (canvas: HTMLCanvasElement) => {
  renderTarget.init();
  renderer.init(canvas);
  objects.init();
  camera.init();
};

const destroy = () => {
  renderTarget.destroy();
  renderer.destroy();
  objects.destroy();
};

export const three = { init, destroy, setActive: renderer.setActive };
