import { inject } from "vue";

export interface TranslationContextType {
  locale: string;
  t: (key: string, ...args: any[]) => string;
}

const TRANSLATION_SYMBOL = Symbol("TranslationContext");

export const provideTranslationContext = (context: TranslationContextType) => {
  return {
    symbol: TRANSLATION_SYMBOL,
    context,
  };
};

export const useTranslationContext = (): TranslationContextType => {
  const context = inject<TranslationContextType>(TRANSLATION_SYMBOL);
  if (!context) {
    throw new Error("useTranslationContext must be used within a TranslationProvider");
  }
  return context;
};

export { TRANSLATION_SYMBOL };
