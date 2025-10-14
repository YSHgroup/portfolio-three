<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { useTranslationContext } from "../i18n/context";
import { LOCALE_DEFAULT } from "../i18n/constants";

const { locale: currentLocale } = useTranslationContext();

const props = defineProps<{
  external?: boolean;
  renderAs?: "a" | "button" | "div";
  href?: string;
  to?: string;
  locale?: string;
  replace?: boolean;
}>();

const resolvedTo = computed(() => {
  const finalLocale = props.locale || currentLocale || LOCALE_DEFAULT;
  const base = props.href || props.to || "/";
  if (finalLocale !== LOCALE_DEFAULT && !base.startsWith(`/${finalLocale}`)) {
    return `/${finalLocale}${base}`;
  }
  return base;
});
</script>

<template>
  <component
    v-if="props.external"
    :is="props.renderAs || 'a'"
    :href="props.href || props.to"
    target="_blank"
    rel="noopener noreferrer"
  >
    <slot></slot>
  </component>

  <RouterLink v-else :to="resolvedTo" custom v-slot="{ navigate }">
    <component :is="props.renderAs || 'a'" :href="resolvedTo" @click.prevent.stop="navigate">
      <slot></slot>
    </component>
  </RouterLink>
</template>
