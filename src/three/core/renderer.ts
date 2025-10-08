import { WebGLRenderer } from "three";
import { sizes } from "../../utils/Sizes";
import gsap from "gsap";
import { scene } from "./scene";
import { camera } from "./camera";

let instance: WebGLRenderer | null = null;

const init = (canvas: HTMLCanvasElement) => {
  if (instance) return;
  instance = new WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });

  gsap.ticker.add(tick);

  sizes.on("resize", resize);
  resize();
};

const getInstance = () => {
  if (!instance) throw new Error("Renderer not initialized");
  return instance;
};

const resize = () => {
  if (!instance) return;
  instance.setSize(sizes.width, sizes.height);
  instance.setPixelRatio(sizes.pixelRatio);
};

const tick = () => {
  if (!instance) return;
  instance.render(scene.instance, camera.instance);
};

const destroy = () => {
  if (!instance) return;
  instance.dispose();
  gsap.ticker.remove(tick);
  instance = null;
};

export const renderer = { init, destroy, getInstance };
