import { ref } from "vue";
import { extractLocale } from "./utils/locale";

import type { Locale } from "./types";

export const pathnameWithoutLocale = ref<string>(extractLocale(window.location.pathname).pathnameWithoutLocale);
export const locale = ref<Locale>(extractLocale(window.location.pathname).locale as Locale);
export const translations = ref<Record<string, string>>({});
