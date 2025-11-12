import { onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import gsap from "gsap";
import { BASE_VOLUMES, musicTracks } from "../definitions/music";
import { sceneWeights } from "../../../animations/scenes";
import { sizes } from "../../../utils/sizes";

export const musicEnabled = ref(false);

export const useMusic = () => {
  const route = useRoute();

  //local storage
  watch(musicEnabled, (newVal) => {
    localStorage.setItem("portfolio-musicEnabled", newVal.toString());
  });

  const tick = () => {
    if (!sizes.visible) {
      return;
    }

    // If not on home route, always use base volume
    if (route.path !== "/") {
      musicTracks.luci.volume(BASE_VOLUMES.luci);
      musicTracks.about.volume(0);
      return;
    }

    //luci volume = (1. - sceneWeights.about) * BASE_VOLUMES.luci
    musicTracks.luci.volume((1 - sceneWeights.about) * BASE_VOLUMES.luci);
    musicTracks.about.volume(sceneWeights.about * BASE_VOLUMES.about);
  };

  const handleVisibilityChange = () => {
    if (!sizes.visible) {
      musicTracks.luci.volume(0);
      musicTracks.about.volume(0);
      return;
    }
  };

  onMounted(() => {
    musicEnabled.value = localStorage.getItem("portfolio-musicEnabled") === "true";
    gsap.ticker.add(tick);
    musicTracks.luci.play();
    musicTracks.about.play();
    sizes.on("hide", handleVisibilityChange);
  });

  onUnmounted(() => {
    gsap.ticker.remove(tick);
    musicTracks.luci.stop();
    musicTracks.about.stop();
    sizes.off("hide", handleVisibilityChange);
  });
};
