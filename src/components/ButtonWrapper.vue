<script setup lang="ts">
import { computed } from "vue";

export interface Props {
  renderAs?: "button" | "a";
  variant?: "orange";
}

const props = defineProps<Props>();

const classes = computed(() => ["button-wrapper", `button-wrapper-${props.variant ?? "orange"}`]);
</script>

<template>
  <component :is="props.renderAs ?? 'button'" :class="classes">
    <slot></slot>
  </component>
</template>

<style scoped lang="scss">
.button-wrapper {
  border: none;
  border-radius: 100px;
  letter-spacing: 0.02em;
  font-weight: 800;
  text-transform: uppercase;

  &-orange {
    background-color: var(--color-orange-400);
    color: var(--color-white-400);
  }
}
</style>
