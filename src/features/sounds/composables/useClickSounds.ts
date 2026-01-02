import { onMounted, onBeforeUnmount } from "vue";
import { playSound } from "../utils/sounds";
import { sounds as items } from "../definitions/sounds";

import type { SoundKey } from "../types";

const SELECTOR = "[data-sound]";

export function useClickSound(): void {
  let touchHandled = false;

  const findElementWithSound = (target: HTMLElement | null): HTMLElement | null => {
    if (!target) return null;
    return target.closest<HTMLElement>(SELECTOR);
  };

  const playSoundForElement = (el: HTMLElement | null) => {
    if (!el) return;
    const soundName = el.dataset.sound;
    if (soundName && soundName in items) {
      playSound(soundName as SoundKey);
    }
  };

  const handleClick = (e: MouseEvent) => {
    if (touchHandled) {
      touchHandled = false;
      return;
    }
    const el = findElementWithSound(e.target as HTMLElement | null);
    playSoundForElement(el);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    touchHandled = true;
    const touch = e.changedTouches[0];
    if (touch) {
      const target = document.elementFromPoint(touch.clientX, touch.clientY) as HTMLElement | null;
      const el = findElementWithSound(target);
      playSoundForElement(el);
    }
    setTimeout(() => {
      touchHandled = false;
    }, 300);
  };

  const addListeners = () => {
    document.body.addEventListener("click", handleClick, { capture: false });
    document.body.addEventListener("touchend", handleTouchEnd, { capture: false, passive: true });
  };

  const removeListeners = () => {
    document.body.removeEventListener("click", handleClick, { capture: false });
    document.body.removeEventListener("touchend", handleTouchEnd, { capture: false });
  };

  onMounted(() => {
    addListeners();
  });

  onBeforeUnmount(() => {
    removeListeners();
  });
}
