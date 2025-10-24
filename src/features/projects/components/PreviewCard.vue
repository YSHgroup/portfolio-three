<script setup lang="ts">
import Link from "../../../components/Link.vue";
import Notch from "../../../components/Notch.vue";
import ArrowRight from "../../../components/icons/ArrowRight.vue";

import type { ProjectPreview } from "../../../content/types";

const props = defineProps<{
  preview: ProjectPreview;
}>();
</script>

<template>
  <Link class="preview-card" :to="`/project/${props.preview.slug}`">
    <div class="preview-card-top">
      <div class="preview-card-image-wrapper">
        <img :src="props.preview.thumbnail" :alt="props.preview.title" class="preview-card-image" />
      </div>
      <div class="preview-card-edge">
        <div class="preview-card-button">
          <ArrowRight class="preview-card-button-arrow" />
        </div>
      </div>
      <Notch class="preview-card-notch preview-card-notch-left" />
      <Notch class="preview-card-notch preview-card-notch-right" />
    </div>
    <div class="preview-card-content">
      <div class="preview-card-copys">
        <h3 class="preview-card-title">{{ props.preview.title }}</h3>
        <p class="preview-card-description">{{ props.preview.description }}</p>
      </div>
    </div>
  </Link>
</template>

<style scoped lang="scss">
.preview-card {
  --hover: 0;

  @include mixins.hover {
    &:hover {
      --hover: 1;
    }
  }

  &-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    padding-top: var(--space-xs);
  }

  &-notch {
    position: absolute;
    color: var(--color-beige-400);
    transform: scale(-1) rotate(90deg);
    height: 20px;

    &-left {
      bottom: 0;
      right: 53px;
    }

    &-right {
      bottom: 53px;
      right: 0;
    }
  }

  &-edge {
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: var(--color-beige-400);
    padding-left: 6px;
    padding-top: 6px;
    border-radius: 32px 0 0 0;
  }

  &-button {
    aspect-ratio: 1;
    border-radius: 50%;
    background-color: var(--color-orange-400);
    width: 48px;
    color: var(--color-white-400);
    display: flex;
    align-items: center;
    justify-content: center;

    &-arrow {
      transition: transform 0.125s ease-in-out;
      width: 28px;
      transform: rotate(calc(var(--hover) * -45deg));
    }
  }

  &-image {
    width: 100%;
    object-fit: cover;
    aspect-ratio: 16/9;
    transition: transform 0.125s ease-in-out;
    transform: scale(calc(1 + var(--hover) * 0.02));

    &-wrapper {
      border-radius: var(--radius-md);
      overflow: hidden;
    }
  }

  &-top {
    position: relative;
  }

  &-copys {
    display: flex;
    flex-direction: column;
  }

  &-title {
    font-size: var(--font-size-title-sm);
    font-weight: 800;
    color: var(--color-text-400);
  }

  &-description {
    font-size: var(--font-size-sm);
    color: var(--color-text-300);
    font-weight: 500;
  }
}
</style>
