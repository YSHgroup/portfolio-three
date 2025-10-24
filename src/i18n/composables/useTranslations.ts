import { watch } from "vue";
import { useRoute } from "vue-router";
import { loadTranslations } from "../utils/load";
import { extractLocale } from "../utils/locale";
import { locale, pathnameWithoutLocale, translations } from "../store";

import type { Locale } from "../types";

export const useTranslations = () => {
  const route = useRoute();

  watch(route, () => {
    locale.value = extractLocale(route.path).locale as Locale;
    pathnameWithoutLocale.value = extractLocale(route.path).pathnameWithoutLocale;
  });

  watch(
    locale,
    async (newLocale) => {
      translations.value = (await loadTranslations("common", newLocale)) ?? {};
    },
    { immediate: true },
  );
};
