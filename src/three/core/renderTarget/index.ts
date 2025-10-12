import { WebGLRenderTarget, Scene } from "three";
import { renderer } from "../renderer";
import { camera as cameraMain } from "../camera";
import { sizes } from "../../../utils/sizes";

const instance = new WebGLRenderTarget(window.innerWidth, window.innerHeight, {
  samples: 0,
  depthBuffer: false,
  stencilBuffer: false,
});
const scene = new Scene();

const init = () => {
  sizes.on("resize", resize);
  resize();
};

const render = () => {
  const mainCameraInstance = cameraMain.instance;
  const rendererInstance = renderer.getInstance();
  rendererInstance.setRenderTarget(instance);
  rendererInstance.setClearColor("#0169b4");
  rendererInstance.render(scene, mainCameraInstance);
  rendererInstance.setRenderTarget(null);
};

const resize = () => {
  instance.setSize(sizes.width, sizes.height);
};

export const renderTarget = { render, scene, init, instance };
