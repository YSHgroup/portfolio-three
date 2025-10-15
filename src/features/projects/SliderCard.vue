<script setup lang="ts">
import { computed } from "vue";

import type { ProjectPreview } from "../../content/types";

const props = defineProps<{
  preview: ProjectPreview;
  active: boolean;
}>();

const classes = computed(() => ["slider-card", { "slider-card-active": props.active }]);
</script>

<template>
  <div :class="classes">
    <div class="slider-card-content">
      <h3 class="slider-card-title">{{ props.preview.title }}</h3>
      <p class="slider-card-description">{{ props.preview.description }}</p>
    </div>
    <div class="slider-card-image-wrapper">
      <img :src="props.preview.thumbnail" :alt="props.preview.title" class="slider-card-image" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.slider-card {
  width: 100%;
  height: 100%;
  transform: scale(0.9);
  transition: transform 0.3s ease-in-out;
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  --active: 0;

  &-active {
    transform: scale(1);
    --active: 1;
  }

  &-content {
    display: flex;
    flex-direction: column;
    background-color: var(--color-white-400);
    padding: var(--space-md);
    padding-top: calc(var(--space-xs) + var(--radius-lg));
    padding-bottom: var(--space-md);
    border-radius: 0 0 var(--radius-lg) var(--radius-lg);
    transform: translateY(calc(-100% + 100% * var(--active)));
    transition: transform 0.3s ease-in-out;
    position: relative;
    top: calc(-1 * var(--radius-lg));
  }

  &-title {
    font-size: var(--font-size-title-sm);
    font-weight: 800;
  }

  &-description {
    font-size: var(--font-size-sm);
    font-weight: 400;
    line-height: var(--line-height-copy);
    color: var(--color-text-300);
  }

  &-image {
    &-wrapper {
      background-color: var(--color-white-400);
      border-radius: var(--radius-lg);
      overflow: hidden;
      aspect-ratio: 16/9;
      padding: calc(var(--active) * var(--space-xs));
      transition: padding 0.3s ease-in-out;
      z-index: 1;
      position: relative;
    }

    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--radius-md);
  }
}
</style>
