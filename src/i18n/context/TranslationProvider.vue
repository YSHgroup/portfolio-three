<script setup lang="ts">
import { provide } from "vue";
import { TRANSLATION_SYMBOL } from "./index";
import { useTranslations } from "../composables/useTranslations";

import type { TranslationContextType } from "./index";

const { t, locale, pathnameWithoutLocale } = useTranslations();

const context: TranslationContextType = {
  locale,
  pathnameWithoutLocale,
  t,
};

provide(TRANSLATION_SYMBOL, context);
</script>

<template>
  <slot></slot>
</template>
