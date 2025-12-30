import { ShaderMaterial } from "three";
import gsap from "gsap";
import { velocity } from "../../../composables/useScroll";
import { isTouch } from "../../../composables/useAgent";
import vertexShader from "../../shaders/lab-electric/vertex.glsl";
import fragmentShader from "../../shaders/lab-electric/fragment.glsl";

import type { Mesh } from "three";

let material: ShaderMaterial | null = null;
let mesh: Mesh | null = null;
let lastScrollY = 0;
let touchVelocity = 0;
let touchVelocityTimeout: number | null = null;
const uniforms = {
  uTime: { value: 0 },
  uOpacity: { value: 0 },
};

const init = (_mesh: Mesh) => {
  mesh = _mesh;
  material = new ShaderMaterial({
    transparent: true,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms,
  });

  mesh.material = material;

  // Initialize scroll position for touch fallback
  lastScrollY = window.scrollY;

  // Add touch fallback for devices where Lenis doesn't work
  if (isTouch.value) {
    window.addEventListener("scroll", handleScroll, { passive: true });
  }

  gsap.ticker.add(tick);
};

const handleScroll = () => {
  const currentScrollY = window.scrollY;
  const delta = Math.abs(currentScrollY - lastScrollY);
  lastScrollY = currentScrollY;

  // Calculate velocity based on scroll delta (normalized to 0-1 range)
  const newVelocity = Math.min(delta, 1);

  // Kill any existing reset animation
  gsap.killTweensOf({ value: touchVelocity });

  // Immediately set new velocity (no animation on scroll in)
  touchVelocity = newVelocity;

  // Clear existing timeout and set new one to animate back to 0
  if (touchVelocityTimeout) {
    clearTimeout(touchVelocityTimeout);
  }

  touchVelocityTimeout = window.setTimeout(() => {
    gsap.to(
      { value: touchVelocity },
      {
        value: 0,
        duration: 0.5,
        ease: "power2.out",
        onUpdate: function () {
          touchVelocity = this.targets()[0].value;
        },
      },
    );
  }, 100);
};

const tick = () => {
  if (!material) return;
  material.uniforms.uTime!.value = gsap.ticker.time;

  // Use touch velocity fallback if main velocity is 0 (e.g., on touch devices)
  const currentVelocity = velocity.value > 0 ? velocity.value : touchVelocity;
  const opacity = currentVelocity * 0.75;
  material.uniforms.uOpacity!.value = opacity;
};

const destroy = () => {
  gsap.ticker.remove(tick);

  // Kill any ongoing velocity animations
  gsap.killTweensOf({ value: touchVelocity });

  // Clean up touch fallback
  if (isTouch.value) {
    window.removeEventListener("scroll", handleScroll);
  }

  if (touchVelocityTimeout) {
    clearTimeout(touchVelocityTimeout);
  }
};

export const labElectric = { init, destroy };
