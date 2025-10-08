// camera.ts
import { PerspectiveCamera, Group } from "three";
import { sizes } from "../../utils/Sizes";
import { isTouch } from "../../utils/observer";
import gsap from "gsap";
import { scene } from "./scene";

const PARALLAX_INTENSITY = 0.4;
const PARALLAX_SPEED = 3;

const instance = new PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 100);

// NEW: waypointGroup moves along the scroll path
const waypointGroup = new Group();
scene.instance.add(waypointGroup);

// parallaxGroup is child of waypointGroup
const parallaxGroup = new Group();
waypointGroup.add(parallaxGroup);

// camera is child of parallaxGroup
parallaxGroup.add(instance);

const cursor = { x: 0, y: 0 };

const tick = () => {
  const delta = gsap.ticker.deltaRatio();

  // Apply parallax offset
  const parallaxX = cursor.x * PARALLAX_INTENSITY;
  const parallaxY = -cursor.y * PARALLAX_INTENSITY;

  parallaxGroup.position.x += (parallaxX - parallaxGroup.position.x) * PARALLAX_SPEED * 0.1 * delta;
  parallaxGroup.position.y += (parallaxY - parallaxGroup.position.y) * PARALLAX_SPEED * 0.1 * delta;

  // LookAt
  if (waypointGroup.userData.lookAt) {
    instance.lookAt(waypointGroup.userData.lookAt);
  }
};

const init = () => {
  sizes.on("resize", resize);
  resize();

  if (!isTouch()) {
    window.addEventListener("mousemove", (event) => {
      cursor.x = event.clientX / sizes.width - 0.5;
      cursor.y = event.clientY / sizes.height - 0.5;
    });

    gsap.ticker.add(tick);
  }
};

const resize = () => {
  instance.aspect = sizes.width / sizes.height;
  instance.updateProjectionMatrix();
};

const destroy = () => {
  sizes.off("resize", resize);
  gsap.ticker.remove(tick);
};

export const camera = { init, destroy, instance, parallaxGroup, waypointGroup };
