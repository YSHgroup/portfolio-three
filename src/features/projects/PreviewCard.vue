<script setup lang="ts">
//import { useTranslationContext } from "../../i18n/context";
import Link from "../../components/Link.vue";

import type { ProjectPreview } from "../../content/types";

const props = defineProps<{
  preview: ProjectPreview;
}>();

//const { t } = useTranslationContext();
</script>

<template>
  <Link class="preview-card" :to="`/project/${props.preview.slug}`">
    <img :src="props.preview.thumbnail" :alt="props.preview.title" class="preview-card-image" />
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
  border-radius: var(--radius-lg);

  &-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
    padding-top: var(--space-sm);
  }

  &-image {
    width: 100%;
    object-fit: cover;
    border-radius: var(--radius-md);
    aspect-ratio: 16/9;
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
  }
}
</style>
