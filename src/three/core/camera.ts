import { PerspectiveCamera, Group } from "three";
import { sizes } from "../../utils/Sizes";
import { isTouch } from "../../utils/observer";
import gsap from "gsap";
import { scene } from "./scene";

const PARALLAX_INTENSITY = 0.4;
const PARALLAX_SPEED = 3;
const PARALLAX_ENABLED = true;

const instance = new PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 100);

const parallaxGroup = new Group();
const cursor = { x: 0, y: 0 };

parallaxGroup.add(instance);
scene.instance.add(parallaxGroup);

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
  if (!instance) return;
  sizes.off("resize", resize);
  gsap.ticker.remove(tick);
};

const tick = () => {
  if (!PARALLAX_ENABLED) return;

  const parallaxX = cursor.x * PARALLAX_INTENSITY;
  const parallaxY = -cursor.y * PARALLAX_INTENSITY;

  const delta = gsap.ticker.deltaRatio();

  //parallaxGroup.position.x += (parallaxX - parallaxGroup.position.x) * PARALLAX_SPEED * 0.1 * delta;
  //parallaxGroup.position.y += (parallaxY - parallaxGroup.position.y) * PARALLAX_SPEED * 0.1 * delta;
};

export const camera = { init, destroy, instance };
