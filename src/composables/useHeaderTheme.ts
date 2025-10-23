import { ref, watch, onMounted } from "vue";
import { lenis } from "../utils/scroll";
import { useRoute } from "vue-router";
import { useTranslationContext } from "../i18n/context";

export const useHeaderTheme = ({
  onAboutElementChange,
}: {
  onAboutElementChange?: (element: HTMLElement | null, boundingClientRect: DOMRect | null) => void;
} = {}) => {
  let aboutElement: HTMLElement | null = null;
  const isDarkTheme = ref(false);
  const route = useRoute();
  const { pathnameWithoutLocale } = useTranslationContext();

  watch(route, () => {
    aboutElement = null;
  });

  watch(pathnameWithoutLocale, () => {
    if (pathnameWithoutLocale.value !== "/") {
      isDarkTheme.value = false;
    }
  });

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
      const isScrolledPast = aboutBounding.bottom - 48 < 0;
      isDarkTheme.value = isScrolledIntoView && !isScrolledPast;

      if (typeof onAboutElementChange === "function") {
        onAboutElementChange(aboutElement, aboutBounding);
      }
    }
  };

  onMounted(() => {
    lenis.on("scroll", handleScroll);
  });

  return {
    isDarkTheme,
  };
};
