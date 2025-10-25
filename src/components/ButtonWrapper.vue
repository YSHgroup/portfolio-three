<script setup lang="ts">
import { computed } from "vue";

export interface Props {
  renderAs?: "button" | "a" | "div";
  variant?: "accent" | "border";
}

const props = defineProps<Props>();

const classes = computed(() => ["button-wrapper", `button-wrapper-${props.variant ?? "accent"}`]);
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
  font-size: var(--font-size-md);
  font-weight: 800;
  text-align: center;
  white-space: nowrap;
  text-transform: uppercase;
  background-color: transparent;
  transition:
    background-color 0.125s ease-in-out,
    color 0.125s ease-in-out;

  &-accent {
    background-color: var(--color-accent-400, var(--color-orange-400));
    color: var(--color-accent-text-400, var(--color-white-400));
  }

  &-border {
    border: 2px solid var(--color-grayscale-400);
    color: var(--color-text-400);
  }
}
</style>
