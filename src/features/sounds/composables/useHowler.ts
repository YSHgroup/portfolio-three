import { onMounted, onUnmounted, ref, watch } from "vue";
import gsap from "gsap";

export const howlerUnlocked = ref(false);
export const soundsEnabled = ref(false);

export const useHowler = () => {
  const tick = () => {
    if (howlerUnlocked.value) return;
    if (Howler.ctx.state !== "running") return;
    howlerUnlocked.value = true;
    console.log("[Howler] Unlocked");
    gsap.ticker.remove(tick);
  };

  const handleVisibilityChange = () => {
    Howler.mute(document.visibilityState === "hidden");
  };

  watch(soundsEnabled, (newVal) => {
    if (!newVal) {
      Howler.mute(true);
      return;
    }
    Howler.mute(false);
    localStorage.setItem("portfolio-soundsEnabled", newVal.toString());
  });

  onMounted(() => {
    soundsEnabled.value = localStorage.getItem("portfolio-soundsEnabled") === "true";

    gsap.ticker.add(tick);
    window.addEventListener("visibilitychange", handleVisibilityChange);
  });

  onUnmounted(() => {
    gsap.ticker.remove(tick);
    window.removeEventListener("visibilitychange", handleVisibilityChange);
  });
};
