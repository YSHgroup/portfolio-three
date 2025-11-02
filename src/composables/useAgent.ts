import { onMounted, ref } from "vue";

export const useAgent = () => {
  const isTouch = ref(false);

  onMounted(() => {
    isTouch.value =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      (window.matchMedia && window.matchMedia("(pointer: coarse)").matches);
  });

  return {
    isTouch,
  };
};
