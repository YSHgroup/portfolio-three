<script setup lang="ts">
import { computed } from "vue";
import ProjectComponent from "./ProjectComponent.vue";

import type { ProjectComponentProps } from "../types";

export interface Props {
  imagePosition: "left" | "right";
  src: string;
  alt?: string;
  component?: ProjectComponentProps;
  border?: boolean;
}

const props = defineProps<Props>();

const imageClasses = computed(() => {
  return {
    "imageText-image": true,
    "imageText-image-left": props.imagePosition === "left",
    "imageText-image-right": props.imagePosition === "right",
  };
});

const imageContentClasses = computed(() => {
  return {
    "imageText-image-content": true,
    "imageText-image-content-border": props.border,
  };
});

const contentClasses = computed(() => {
  return {
    "imageText-content": true,
    "imageText-content-left": props.imagePosition === "right",
    "imageText-content-right": props.imagePosition === "left",
  };
});
</script>

<template>
  <div :class="imageClasses">
    <img :src="props.src" :alt="props.alt" loading="lazy" fetchpriority="high" :class="imageContentClasses" />
  </div>
  <div :class="contentClasses" v-if="props.component">
    <ProjectComponent :type="props.component.type" :props="props.component.props" />
  </div>
</template>

<style scoped lang="scss">
.imageText {
  &-image {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    grid-row: 1;

    &-content {
      overflow: hidden;
      border-radius: var(--radius-lg);

      &-border {
        border: var(--stroke-md) solid var(--color-grayscale-400);
      }
    }

    &-left {
      grid-column: 2 / 7;
    }

    &-right {
      grid-column: 7 / 12;
    }
  }

  &-content {
    width: 100%;
    min-height: 100%;
    display: flex;
    align-items: center;
    grid-row: 1;

    &-left {
      grid-column: 3 / 7;
    }

    &-right {
      grid-column:  7 / 11;
    }

    @include mixins.mq("md") {
      flex: 0.475;
    }
  }
}
</style>
