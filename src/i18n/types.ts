import { LOCALES } from "./constants";

export type Locale = keyof typeof LOCALES;

export interface TranslationContextType {
  locale: string;
  t: (key: string, ...args: any[]) => string;
}

export interface PrerenderData {
  locale: string;
  translations: Record<string, string>;
}
