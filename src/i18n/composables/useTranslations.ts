import { computed } from "vue";
import { useRoute } from "vue-router";
import { extractLocale } from "../utils/locale";
import { getPrerenderedTranslations } from "../utils/prerendered";

import type { Locale } from "../types";

export const useTranslations = () => {
  const route = useRoute();
  const translations = computed(() => getPrerenderedTranslations());

  console.log(translations.value);

  const locale = computed(() => extractLocale(route.fullPath).locale as Locale);

  return {
    locale,
  };
};
