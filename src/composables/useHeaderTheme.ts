import { ref, watch, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { pathnameWithoutLocale } from "../i18n/store";
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
    if (pathnameWithoutLocale.value !== "/") {
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

  watch(route, () => {
    aboutElement = null;
  });

  watch(pathnameWithoutLocale, () => {
    if (pathnameWithoutLocale.value !== "/") {
      isDarkTheme.value = false;
    }
  });

  return {
    isDarkTheme,
  };
};
