import { ref, watch, watchEffect } from "vue";
import { projectId } from "./useRouteObserver";
import { lenis } from "./useScroll";
import { sizes } from "../utils/sizes";

export const useHeaderTheme = ({
  onAboutElementChange,
}: {
  onAboutElementChange?: (
    element: HTMLElement | null,
    boundingClientRect: DOMRect | null,
    hasScrolledIntoView: boolean,
  ) => void;
} = {}) => {
  let aboutElement: HTMLElement | null = null;
  const isDarkTheme = ref(false);
  const hasScrolledIntoView = ref(false);

  const handleScroll = () => {
    if (projectId.value !== null) {
      if (typeof onAboutElementChange === "function") {
        onAboutElementChange(null, null, false);
      }
      return;
    }

    if (!aboutElement) {
      aboutElement = typeof window !== "undefined" ? document.querySelector("#about") : null;
    }

    if (aboutElement) {
      const aboutBounding = aboutElement.getBoundingClientRect();
      const isLandscape = sizes.isLandscape;
      const isScrolledIntoView = aboutBounding.top - (isLandscape ? sizes.height * 0.225 : 0) < 0;
      const isScrolledPast = aboutBounding.bottom - 36 < 0;

      hasScrolledIntoView.value = isScrolledIntoView;
      isDarkTheme.value = isScrolledIntoView && !isScrolledPast;

      if (typeof onAboutElementChange === "function") {
        onAboutElementChange(aboutElement, aboutBounding, isScrolledIntoView);
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
    projectId,
    () => {
      aboutElement = null;
    },
  );

  watch(
    projectId,
    () => {
      if (projectId.value !== null) {
        isDarkTheme.value = false;
      }
    },
  );

  return {
    isDarkTheme,
    hasScrolledIntoView,
  };
};
