import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { compileTemplate } from "../utils/template";
import { extractLocale } from "../utils/locale";
import { loadTranslations } from "../utils/load";

import type { Locale } from "../types";

export const useTranslations = () => {
  const route = useRoute();
  const locale = computed(() => (extractLocale(route.path ?? "/")?.locale ?? "en") as Locale);

  // reactive translations
  const translations = ref<Record<string, string>>({});

  // load translations whenever locale changes
  watch(
    locale,
    async (newLocale) => {
      translations.value = (await loadTranslations("common", newLocale)) ?? {};
    },
    { immediate: true },
  );

  // reactive t function
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
