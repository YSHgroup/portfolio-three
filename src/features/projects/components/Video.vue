<script setup lang="ts">
import { computed } from "vue";

export interface Props {
  src: string;
  border?: boolean;
}

const props = defineProps<Props>();

const wrapperClasses = computed(() => {
  return {
    "project-video-wrapper": true,
    "project-video-wrapper-border": props.border,
  };
});
</script>

<template>
  <div :class="wrapperClasses">
    <video :src="props.src" autoplay muted loop playsinline preload="metadata" class="project-video" />
  </div>
</template>

<style scoped lang="scss">
.project-video {
  width: 100%;
  height: 100%;

  &-wrapper {
    width: 100%;
    aspect-ratio: 16 / 9;
    max-width: 900px;
    height: auto;
    object-fit: cover;
    justify-self: center;
    border-radius: var(--radius-lg);
    overflow: hidden;
    background-color: var(--color-grayscale-400);
    grid-column: 1 / 13;

    @include mixins.mq("md") {
      grid-column: 2 / 12;
    }

    @include mixins.mq("lg") {
      grid-column: 3 / 11;
    }

    &-border {
      border: var(--stroke-md) solid var(--color-grayscale-400);
    }
  }
}
</style>
