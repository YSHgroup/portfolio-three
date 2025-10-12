import { PerspectiveCamera, Group, Vector3 } from "three";
import { sizes } from "../../utils/sizes";
import { isTouch } from "../../utils/observer";
import gsap from "gsap";
import { scene } from "./scene";

//const PARALLAX_INTENSITY = 1;
//const PARALLAX_SPEED = 1;

const instance = new PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 100);
instance.position.set(5.8, 5.7, 8.3);

const lookAtPoint = new Vector3(-2.7, 2, 0);

const parallaxGroup = new Group();

scene.instance.add(parallaxGroup);
parallaxGroup.add(instance);

const cursor = { x: 0, y: 0 };

const init = () => {
  sizes.on("resize", resize);
  resize();

  if (!isTouch()) {
    window.addEventListener("mousemove", (event) => {
      cursor.x = event.clientX / sizes.width - 0.5;
      cursor.y = event.clientY / sizes.height - 0.5;
    });
  }

  gsap.ticker.add(tick);
};

const tick = () => {
  //const delta = gsap.ticker.deltaRatio();

  //const parallaxX = cursor.x * PARALLAX_INTENSITY;
  //const parallaxY = -cursor.y * PARALLAX_INTENSITY;

  //const byX = (parallaxX - parallaxGroup.position.x) * PARALLAX_SPEED * 0.1 * delta;
  //const byY = (parallaxY - parallaxGroup.position.y) * PARALLAX_SPEED * 0.1 * delta;

  //if (byX < 0.05 && byX > -0.05) parallaxGroup.position.x += byX;
  //if (byY < 0.05 && byY > -0.05) parallaxGroup.position.y += byY;

  instance.lookAt(lookAtPoint);
};

const resize = () => {
  instance.aspect = sizes.width / sizes.height;
  instance.updateProjectionMatrix();
};

const destroy = () => {
  sizes.off("resize", resize);
  gsap.ticker.remove(tick);
};

export const camera = { init, destroy, instance, parallaxGroup, lookAtPoint };
