import { WebGLRenderTarget, Scene } from "three";
import { renderer } from "../renderer";
import { sizes } from "../../../utils/sizes";
import { sceneWeightsInOut } from "../../../animations/scenes";
import { camera as mainCamera } from "../camera";

const instance = new WebGLRenderTarget(window.innerWidth, window.innerHeight, {
  samples: 0,
  depthBuffer: false,
  stencilBuffer: false,
});
const scene = new Scene();
const camera = mainCamera.instance.clone();

const init = () => {
  sizes.on("resize", resize);
  resize();
};

const render = () => {
  const mainCameraInstance = mainCamera.instance;
  camera.position.copy(mainCameraInstance.position);
  camera.position.y += -2 * sceneWeightsInOut.about.out;
  camera.quaternion.copy(mainCameraInstance.quaternion);

  const rendererInstance = renderer.getInstance();
  rendererInstance.setRenderTarget(instance);
  rendererInstance.setClearColor("#0169b4");
  rendererInstance.render(scene, camera);
  rendererInstance.setRenderTarget(null);
};

const destroy = () => {
  sizes.off("resize", resize);
};

const resize = () => {
  instance.setSize(sizes.width, sizes.height);
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
};

export const renderTarget = { render, scene, init, instance, destroy, camera };
