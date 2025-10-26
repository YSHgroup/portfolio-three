import { WebGLRenderer, Vector3 } from "three";
import gsap from "gsap";
import { scene } from "./scene";
import { renderTarget } from "./renderTarget";
import { camera } from "./camera";
import { sceneWeights } from "../../animations/scenes";
import { colors } from "../common/colors";
import { threeSizes } from "../utils/sizes";

let instance: WebGLRenderer | null = null;
let active = false;
let canvas: HTMLCanvasElement | null = null;
let visible = true;

const emptyVector = new Vector3();

const init = (_canvas: HTMLCanvasElement | null) => {
  if (instance) return;
  canvas = _canvas;
  instance = new WebGLRenderer({
    canvas: canvas!,
    antialias: true,
    alpha: false,
  });

  gsap.ticker.add(tick);
  threeSizes.on("resize", resize);
  resize();
};

const getInstance = () => {
  if (!instance) throw new Error("Renderer not initialized");
  return instance;
};

const resize = () => {
  if (!instance) return;
  instance.setSize(threeSizes.width, threeSizes.height, false);
  instance.setPixelRatio(threeSizes.pixelRatio);
};

const tick = () => {
  const shouldBeVisible = !camera.instance.position.equals(emptyVector);

  if (canvas && shouldBeVisible !== visible) {
    canvas.style.visibility = shouldBeVisible ? "visible" : "hidden";
    visible = shouldBeVisible;
  }

  if (!instance || !active || !shouldBeVisible) return;

  if (sceneWeights.about > 0.001) {
    renderTarget.render();
  }

  const color = sceneWeights.contact > 0.001 ? colors.beigeDark : colors.beigeLight;
  instance.setClearColor(color);
  instance.render(scene.instance, camera.instance);
};

const setActive = (value: boolean) => {
  active = value;
};

const destroy = () => {
  if (!instance) return;
  instance.dispose();
  gsap.ticker.remove(tick);
  instance = null;
  active = false;
  visible = true;
};

export const renderer = { init, destroy, getInstance, setActive };
