<script setup lang="ts">
const { src } = defineProps<{
  src: string;
}>();
</script>

<template>
  <video :src="src" autoplay muted loop playsinline preload="metadata" class="project-video"></video>
</template>

<style scoped lang="scss">
.project-video {
  width: 100%;
  aspect-ratio: 16 / 9;
  height: auto;
  object-fit: cover;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: var(--stroke-md) solid var(--color-grayscale-400);
  background-color: var(--color-grayscale-400);

  @include mixins.mq("md") {
    border-radius: var(--radius-lg);
  }
}
</style>
