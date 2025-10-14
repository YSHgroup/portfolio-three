import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { compileTemplate } from "../utils/template";
import { loadTranslations } from "../utils/load";
import { extractLocale } from "../utils/locale";

import type { Locale } from "../types";

export const useTranslations = () => {
  const route = useRoute();
  const locale = ref<Locale>(extractLocale(window.location.pathname).locale as Locale);

  watch(
    () => route.path,
    () => {
      locale.value = extractLocale(route.path).locale as Locale;
    },
  );

  const translations = ref<Record<string, string>>({});

  watch(
    locale,
    async (newLocale) => {
      translations.value = (await loadTranslations("common", newLocale)) ?? {};
    },
    { immediate: true },
  );

  const t = (key: string, props: { [key: string]: any } = {}) => {
    const translation = translations.value[key];
    if (!translation) return "";

    const render = compileTemplate(translation);
    return render(props);
  };

  return {
    locale,
    t,
  };
};
