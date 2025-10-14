import { LOCALES, LOCALE_DEFAULT } from "../constants";

export const extractLocale = (pathname: string): { locale: string; pathnameWithoutLocale: string } => {
  const path = pathname.split("/");

  const first = path[1];
  const possibleLocales = Object.keys(LOCALES).filter((locale) => locale !== LOCALE_DEFAULT);
  let locale, pathnameWithoutLocale;

  if (possibleLocales.some((locale) => locale === first)) {
    locale = first;
    pathnameWithoutLocale = "/" + path.slice(2).join("/");
  } else {
    locale = LOCALE_DEFAULT;
    pathnameWithoutLocale = pathname;
  }

  if (pathnameWithoutLocale !== "/" && pathnameWithoutLocale.endsWith("/")) {
    pathnameWithoutLocale = pathnameWithoutLocale.slice(0, -1);
  }

  return { locale: locale ?? LOCALE_DEFAULT, pathnameWithoutLocale };
};
