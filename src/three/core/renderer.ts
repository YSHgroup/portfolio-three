import { WebGLRenderer } from "three";
import { sizes } from "../../utils/sizes";
import gsap from "gsap";
import { scene } from "./scene";
import { renderTarget } from "./renderTarget";
import { camera } from "./camera";
import { sceneWeights } from "../../animations/scenes";

let instance: WebGLRenderer | null = null;

const init = (canvas: HTMLCanvasElement) => {
  if (instance) return;
  instance = new WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
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

  if (sceneWeights.about > 0.001) {
    renderTarget.render();
  }

  instance.setClearColor("#f5efe6");
  instance.render(scene.instance, camera.instance);
};

const destroy = () => {
  if (!instance) return;
  instance.dispose();
  gsap.ticker.remove(tick);
  instance = null;
};

export const renderer = { init, destroy, getInstance };
