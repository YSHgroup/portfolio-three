import { ref, watch, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { lenis } from "../utils/scroll";

export const useHeaderTheme = ({
  onAboutElementChange,
}: {
  onAboutElementChange?: (element: HTMLElement | null, boundingClientRect: DOMRect | null) => void;
} = {}) => {
  let aboutElement: HTMLElement | null = null;
  const isDarkTheme = ref(false);
  const route = useRoute();

  const handleScroll = () => {
    if (route.path !== "/") {
      if (typeof onAboutElementChange === "function") {
        onAboutElementChange(null, null);
      }
      return;
    }

    if (!aboutElement) {
      aboutElement = typeof window !== "undefined" ? document.querySelector(".about") : null;
    }

    if (aboutElement) {
      const aboutBounding = aboutElement.getBoundingClientRect();
      const isScrolledIntoView = aboutBounding.top - 128 < 0;
      const isScrolledPast = aboutBounding.bottom - 36 < 0;
      isDarkTheme.value = isScrolledIntoView && !isScrolledPast;

      if (typeof onAboutElementChange === "function") {
        onAboutElementChange(aboutElement, aboutBounding);
      }
    }
  };

  watchEffect((onInvalidate) => {
    if (lenis.value) {
      lenis.value.on("scroll", handleScroll);
    }

    onInvalidate(() => {
      if (lenis.value) {
        lenis.value.off("scroll", handleScroll);
      }
    });
  });

  watch(
    () => route.path,
    () => {
      aboutElement = null;
    },
  );

  watch(
    () => route.path,
    () => {
      if (route.path !== "/") {
        isDarkTheme.value = false;
      }
    },
  );

  return {
    isDarkTheme,
  };
};
