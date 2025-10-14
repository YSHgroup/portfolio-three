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
    <div class="slider-card-image-wrapper">
      <img :src="props.preview.thumbnail" :alt="props.preview.title" class="slider-card-image" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.slider-card {
  width: 100%;
  height: 100%;
  background-color: var(--color-beige-400);
  border-radius: var(--radius-lg);
  transform: scale(0.9);
  transition: transform 0.3s ease-in-out;

  &-active {
    transform: scale(1);
  }

  &-image {
    &-wrapper {
      border-radius: var(--radius-md);
      overflow: hidden;
    }

    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
