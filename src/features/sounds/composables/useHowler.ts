import { onMounted, onUnmounted, ref, watch } from "vue";
import gsap from "gsap";
import { lerp } from "../../../utils/math";
import { Howler } from "howler";

export const howlerUnlocked = ref(false);
export const soundsEnabled = ref(false);

Howler.volume(0);

export const useHowler = () => {
  const enabledVolume = ref<number>(0);

  const handleUnlocked = () => {
    howlerUnlocked.value = true;
    console.log("[Howler] Unlocked");
    const storeItem = localStorage.getItem("portfolio-soundsEnabled");
    if (storeItem) {
      soundsEnabled.value = storeItem === "true";
    } else {
      soundsEnabled.value = true;
      localStorage.setItem("portfolio-soundsEnabled", "true");
    }
  };

  const tick = () => {
    if (!howlerUnlocked.value) {
      if (Howler.ctx.state !== "running") return;
      handleUnlocked();
    } else {
      //lerp howler.volume to targetVolume
      const currentVolume = Howler.volume();
      if (currentVolume > 0.99 && enabledVolume.value === 1) {
        return;
      }
      const speed = enabledVolume.value === 1 ? 0.01 : 0.05;
      Howler.volume(lerp(currentVolume, enabledVolume.value, speed));
    }
  };

  const handleVisibilityChange = () => {
    Howler.mute(document.visibilityState === "hidden");
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.code === "KeyM") {
      soundsEnabled.value = !soundsEnabled.value;
    }
  };

  watch(soundsEnabled, (newVal) => {
    enabledVolume.value = newVal ? 1 : 0;
    localStorage.setItem("portfolio-soundsEnabled", newVal.toString());
  });

  onMounted(() => {
    Howler.volume(0);

    if (howlerUnlocked.value) {
      soundsEnabled.value = localStorage.getItem("portfolio-soundsEnabled") === "true";
    }

    gsap.ticker.add(tick);
    window.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("keydown", handleKeyPress);
  });

  onUnmounted(() => {
    gsap.ticker.remove(tick);
    window.removeEventListener("visibilitychange", handleVisibilityChange);
    window.removeEventListener("keydown", handleKeyPress);
  });
};
