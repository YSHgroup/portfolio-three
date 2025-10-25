import { PerspectiveCamera, Group } from "three";
import { threeSizes } from "../utils/sizes";
import { isTouch } from "../../utils/observer";
import gsap from "gsap";
import { scene } from "./scene";
import { waypoints } from "../../animations/waypoints";
import { sceneWeights } from "../../animations/scenes";

const PARALLAX_INTENSITY = 0.75;
const PARALLAX_SPEED = 0.5;

const instance = new PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.01, 100);

const parallaxGroup = new Group();

scene.instance.add(parallaxGroup);
parallaxGroup.add(instance);

const cursor = { x: 0, y: 0 };

const init = () => {
  threeSizes.on("resize", resize);
  resize();

  if (!isTouch()) {
    window.addEventListener("mousemove", handleMouseMove);
  }

  gsap.ticker.add(tick);

  updateTransforms();
};

const handleMouseMove = (event: MouseEvent) => {
  cursor.x = event.clientX / threeSizes.width - 0.5;
  cursor.y = event.clientY / threeSizes.height - 0.5;
};

const updateTransforms = () => {
  if (sceneWeights.contact <= 0.001) {
    instance.position.copy(waypoints.position);
  } else {
    instance.position.set(0, -10, 9);
    instance.rotation.set(-0.15, 0, 0);
  }
};

const tick = () => {
  updateTransforms();

  const delta = gsap.ticker.deltaRatio();
  const parallaxX = cursor.x * PARALLAX_INTENSITY;
  const parallaxY = -cursor.y * PARALLAX_INTENSITY;
  const byX = (parallaxX - parallaxGroup.position.x) * PARALLAX_SPEED * 0.1 * delta;
  const byY = (parallaxY - parallaxGroup.position.y) * PARALLAX_SPEED * 0.1 * delta;
  if (byX < 0.05 && byX > -0.05) parallaxGroup.position.x += byX;
  if (byY < 0.05 && byY > -0.05) parallaxGroup.position.y += byY;

  instance.lookAt(waypoints.focus);
};

const resize = () => {
  instance.aspect = threeSizes.width / threeSizes.height;
  instance.updateProjectionMatrix();
};

const destroy = () => {
  threeSizes.off("resize", resize);
  gsap.ticker.remove(tick);
  window.removeEventListener("mousemove", handleMouseMove);
  cursor.x = 0;
  cursor.y = 0;
};

export const camera = { init, destroy, instance, parallaxGroup };
