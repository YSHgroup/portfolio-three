import { ref, watch, onMounted } from "vue";
import { lenis } from "../utils/scroll";
import { useRoute } from "vue-router";
import { useTranslationContext } from "../i18n/context";

export const useHeaderTheme = () => {
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
    }
  };

  onMounted(() => {
    lenis.on("scroll", handleScroll);
  });

  return {
    isDarkTheme,
  };
};
