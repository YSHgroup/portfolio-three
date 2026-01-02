import { onMounted, onBeforeUnmount } from "vue";
import { playSound } from "../utils/sounds";
import { sounds as items } from "../definitions/sounds";
import { useAgent } from "../../../composables/useAgent";

import type { SoundKey } from "../types";

const SELECTOR = "[data-hoversound]";

export function useHoverSound(): void {
  const { isTouch } = useAgent();

  const findElementWithSound = (target: HTMLElement | null): HTMLElement | null => {
    if (!target) return null;
    return target.closest<HTMLElement>(SELECTOR);
  };

  const playSoundForElement = (el: HTMLElement | null) => {
    if (!el) return;
    const soundName = el.dataset.hoversound;
    if (soundName && soundName in items) {
      playSound(soundName as SoundKey);
    }
  };

  const handleMouseEnter = (e: MouseEvent) => {
    const el = findElementWithSound(e.target as HTMLElement | null);
    playSoundForElement(el);
  };

  const addListeners = () => {
    document.body.addEventListener("mouseenter", handleMouseEnter, { capture: true });
  };

  const removeListeners = () => {
    document.body.removeEventListener("mouseenter", handleMouseEnter, { capture: true });
  };

  onMounted(() => {
    if (isTouch.value) return;
    addListeners();
  });

  onBeforeUnmount(() => {
    if (isTouch.value) return;
    removeListeners();
  });
}
