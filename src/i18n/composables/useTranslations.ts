import { watch } from "vue";
import { useRoute } from "vue-router";
import { compileTemplate } from "../utils/template";
import { loadTranslations } from "../utils/load";
import { extractLocale } from "../utils/locale";
import { locale, pathnameWithoutLocale, translations } from "../store";

import type { Locale } from "../types";

export const t = (key: string, props: { [key: string]: any } = {}) => {
  const translation = translations.value[key];
  if (!translation) return "";

  const render = compileTemplate(translation);
  return render(props);
};

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
