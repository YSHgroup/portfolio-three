import { extractLocale } from "./i18n/utils/locale";
import { loadTranslations } from "./i18n/utils/load";

import type { Locale } from "./i18n/types";

export const prerender = async (data: any) => {
  const { locale } = extractLocale(data.url);

  const commonTranslations = await loadTranslations("common", locale as Locale);

  return {
    html: "",
    links: ["/de/test", "/test"],
    head: {
      lang: locale === "de" ? "de" : "en",
    },
    data: {
      locale,
      commonTranslations,
    },
  };
};
