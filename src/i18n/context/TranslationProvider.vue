<script setup lang="ts">
import { provide } from "vue";
import { TRANSLATION_SYMBOL } from "./index";
import { useTranslations } from "../composables/useTranslations";

import type { Locale } from "../types";
import type { TranslationContextType } from "../types";

interface Props {
  locale: Locale;
}

const props = defineProps<Props>();

const { t } = useTranslations();

const context: TranslationContextType = {
  locale: props.locale,
  t,
};

provide(TRANSLATION_SYMBOL, context);
</script>

<template>
  <slot />
</template>
