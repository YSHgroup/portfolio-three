<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  size?: "sm" | "md" | "lg";
}>();

const classes = computed(() => ["layout-content", `layout-content-size-${props.size ?? "lg"}`]);
</script>

<template>
  <div :class="classes"><slot></slot></div>
</template>

<style scoped lang="scss">
.layout-content {
  width: 100%;
  flex: 1;
  max-width: calc(var(--breakpoint-lg) - 1px);
  padding: var(--space-outer);
  pointer-events: none;
  display: flex;
  flex-direction: column;
  z-index: var(--z-index-layout);

  * {
    pointer-events: auto;
  }

  &-size {
    &-sm {
      max-width: calc(var(--breakpoint-sm) - 1px);
    }

    &-md {
      max-width: calc(var(--breakpoint-md) - 1px);
    }

    &-lg {
      max-width: calc(var(--breakpoint-lg) - 1px);
    }

    &-xl {
      max-width: calc(var(--breakpoint-xl) - 1px);
    }

    &-xxl {
      max-width: calc(var(--breakpoint-xxl) - 1px);
    }
  }
}
</style>
