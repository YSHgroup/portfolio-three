<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  src: string;
  border?: boolean;
}>();

const videoClasses = computed(() => {
  return {
    "project-video": true,
    "project-video-border": props.border,
  };
});
</script>

<template>
  <video :src="props.src" autoplay muted loop playsinline preload="metadata" :class="videoClasses"></video>
</template>

<style scoped lang="scss">
.project-video {
  width: 100%;
  aspect-ratio: 16 / 9;
  height: auto;
  object-fit: cover;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background-color: var(--color-grayscale-400);

  @include mixins.mq("md") {
    border-radius: var(--radius-lg);
  }

  &-border {
    border: var(--stroke-md) solid var(--color-grayscale-400);
  }
}
</style>
