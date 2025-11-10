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
  canvas.classList.add("three-canvas");

  return canvas;
};

const init = () => {
  const canvas = getCanvas();

  threeSizes.init(canvas);
  camera.init();
  renderTarget.init();
  renderer.init(canvas);

  resources.once("ready", () => {
    objects.init();
  });
};

const updateParent = (parent: HTMLElement) => {
  const canvas = getCanvas();
  // Ensure parent has dimensions before appending canvas
  const rect = parent.getBoundingClientRect();
  if (rect.width && rect.height) {
    // Set initial canvas dimensions based on parent to prevent layout shift
    canvas.width = Math.floor(rect.width);
    canvas.height = Math.floor(rect.height);
  }
  parent.appendChild(canvas);
  // Trigger immediate resize after DOM insertion
  requestAnimationFrame(() => {
    threeSizes.resize();
  });
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
