import { onMounted, ref, watch } from "vue";

export const musicEnabled = ref(false);

export const useMusic = () => {
  //local storage
  watch(musicEnabled, (newVal) => {
    localStorage.setItem("portfolio-musicEnabled", newVal.toString());
  });

  onMounted(() => {
    musicEnabled.value = localStorage.getItem("portfolio-musicEnabled") === "true";
  });
};
