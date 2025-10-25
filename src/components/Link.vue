<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { RouterLink } from "vue-router";

const attrs = useAttrs();

const props = defineProps<{
  external?: boolean;
  renderAs?: "a" | "button" | "div";
  href?: string;
  to?: string;
  replace?: boolean;
}>();

const resolvedTo = computed(() => {
  const base = props.href || props.to || "/";

  let path = base;

  if (path.length > 1 && path.endsWith("/")) {
    path = path.slice(0, -1);
  }

  return path;
});
</script>

<template>
  <component
    v-if="props.external"
    :is="props.renderAs || 'a'"
    :href="props.href || props.to"
    target="_blank"
    rel="noopener noreferrer"
    v-bind="attrs"
  >
    <slot></slot>
  </component>

  <RouterLink v-else :to="resolvedTo" v-bind="attrs" :replace="props.replace">
    <slot></slot>
  </RouterLink>
</template>
