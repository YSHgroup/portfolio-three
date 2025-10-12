import { PerspectiveCamera, WebGLRenderTarget, Scene } from "three";
import { renderer } from "../renderer";
import gsap from "gsap";
import { camera as cameraMain } from "../camera";
import { sizes } from "../../../utils/sizes";

const camera = new PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 100);
const instance = new WebGLRenderTarget(window.innerWidth, window.innerHeight, {
  samples: 0,
  depthBuffer: false,
  stencilBuffer: false,
});
const scene = new Scene();

const init = () => {
  gsap.ticker.add(tick);
  sizes.on("resize", resize);
  resize();
};

const render = () => {
  const rendererInstance = renderer.getInstance();
  rendererInstance.setRenderTarget(instance);
  rendererInstance.setClearColor("#0169b4");
  rendererInstance.render(scene, camera);
  rendererInstance.setRenderTarget(null);
};

const resize = () => {
  instance.setSize(sizes.width, sizes.height);
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
};

const destroy = () => {
  gsap.ticker.remove(tick);
};

const tick = () => {
  const mainCameraInstance = cameraMain.instance;
  camera.position.copy(mainCameraInstance.position);
  camera.lookAt(cameraMain.lookAtPoint);
};

export const renderTarget = { render, scene, init, destroy, instance };
