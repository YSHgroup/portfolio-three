import { camera } from "./core/camera";
import { renderer } from "./core/renderer";
import { objects } from "./objects";
import { renderTarget } from "./core/renderTarget";
import { threeSizes } from "./utils/sizes";
import { resources } from "../utils/resources";

let canvas: HTMLCanvasElement | null = null;

const getCanvas = () => {
  if (canvas) return canvas;
  canvas = document.createElement("canvas");
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  return canvas;
};

const init = () => {
  const canvas = getCanvas();

  threeSizes.init(canvas);
  renderTarget.init();
  renderer.init(canvas);
  camera.init();

  resources.once("ready", () => {
    objects.init();
  });
};

const updateParent = (parent: HTMLElement) => {
  parent.appendChild(getCanvas());
};

const destroy = () => {
  threeSizes.destroy();
  renderTarget.destroy();
  renderer.destroy();
  objects.destroy();
  camera.destroy();
  canvas = null;
};

export const three = { init, destroy, setActive: renderer.setActive, updateParent, getCanvas };
