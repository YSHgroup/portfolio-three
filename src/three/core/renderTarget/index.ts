import { WebGLRenderTarget, Scene } from "three";
import { renderer } from "../renderer";
import { sizes } from "../../../utils/sizes";
//import { sceneWeightsInOut } from "../../../animations/scenes";
import { camera as mainCamera } from "../camera";
import { waypoints } from "../../../animations/waypoints";

const instance = new WebGLRenderTarget(window.innerWidth, window.innerHeight, {
  samples: 1,
  depthBuffer: true,
  stencilBuffer: false,
});
const scene = new Scene();
const camera = mainCamera.instance.clone();

const init = () => {
  sizes.on("resize", resize);
  resize();
};

const render = () => {
  camera.position.copy(waypoints.position);
  //camera.position.y += -2 * sceneWeightsInOut.about.out;
  camera.rotation.copy(waypoints.rotation);

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
