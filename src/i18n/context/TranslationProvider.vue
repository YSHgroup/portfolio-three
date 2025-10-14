<script setup lang="ts">
import { provide } from "vue";
import { TRANSLATION_SYMBOL } from "./index";
import { useTranslations } from "../composables/useTranslations";

import type { TranslationContextType } from "../types";

const { t, locale } = useTranslations();

const context: TranslationContextType = {
  locale: locale.value,
  t,
};

provide(TRANSLATION_SYMBOL, context);
</script>

<template>
  <slot />
</template>
