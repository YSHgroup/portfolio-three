<script setup lang="ts">
import { computed } from "vue";

export interface Props {
  src: string;
  alt?: string;
  border?: boolean;
}

const props = defineProps<Props>();

const wrapperClasses = computed(() => {
  return {
    "project-image-wrapper": true,
    "project-image-wrapper-border": props.border,
  };
});
</script>

<template>
  <div :class="wrapperClasses">
    <img :src="props.src" :alt="props.alt" loading="lazy" fetchpriority="high" class="project-image" />
  </div>
</template>

<style scoped lang="scss">
.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;

  &-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: var(--radius-lg);
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
