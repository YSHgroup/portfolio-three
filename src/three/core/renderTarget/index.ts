import { WebGLRenderTarget, Scene } from "three";
import { renderer } from "../renderer";
import { sizes } from "../../../utils/sizes";
import { sceneWeightsInOut } from "../../../animations/scenes";
import { camera as mainCamera } from "../camera";
import { waypoints } from "../../../animations/waypoints";

const instance = new WebGLRenderTarget(window.innerWidth, window.innerHeight, {
  samples: 1,
  depthBuffer: false,
  stencilBuffer: false,
});
const scene = new Scene();
const camera = mainCamera.instance.clone();
camera.near = 0.000001;
camera.far = 10000;
camera.updateProjectionMatrix();

const init = () => {
  sizes.on("resize", resize);
  resize();
};

const render = () => {
  camera.position.copy(waypoints.position);
  camera.rotation.copy(waypoints.rotation);

  camera.position.y += -4 * sceneWeightsInOut.about.out;
  camera.rotation.x += 0.5 * sceneWeightsInOut.about.out;

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
  const { width, height, pixelRatio } = sizes;
  instance.setSize(width * pixelRatio, height * pixelRatio);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
};

export const renderTarget = { render, scene, init, instance, destroy, camera };
