import { onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";
import gsap from "gsap";
import { BASE_VOLUMES, musicTracks } from "../definitions/music";
import { sceneWeights } from "../../../animations/scenes";
import { sizes } from "../../../utils/sizes";
import { howlerUnlocked, soundsEnabled } from "./useHowler";

import type { MusicTrack } from "../types";

export const useMusic = () => {
  const route = useRoute();

  const tickVolumes = () => {
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

  const tick = () => {
    if (!sizes.visible) return;
    if (!soundsEnabled.value || !howlerUnlocked.value) return;
    tickVolumes();
  };

  const play = (track: MusicTrack) => {
    musicTracks[track].load();
    musicTracks[track].play();
  };

  watch(howlerUnlocked, (newVal) => {
    if (!newVal) return;
    play("luci");
    play("about");
  });

  onMounted(() => {
    gsap.ticker.add(tick);
  });

  onUnmounted(() => {
    gsap.ticker.remove(tick);
    musicTracks.luci.stop();
    musicTracks.about.stop();
  });
};
