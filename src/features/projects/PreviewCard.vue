<script setup lang="ts">
import Button from "../../components/Button.vue";
import Tag from "../../components/Tag.vue";
import { useTranslationContext } from "../../i18n/context";
import Link from "../../components/Link.vue";

import type { ProjectPreview } from "../../content/types";

const props = defineProps<{
  preview: ProjectPreview;
}>();

const { t } = useTranslationContext();
</script>

<template>
  <div class="preview-card">
    <img :src="props.preview.thumbnail" :alt="props.preview.title" class="preview-card-image" />
    <div class="preview-card-content">
      <div class="preview-card-copys">
        <h3 class="preview-card-title">{{ props.preview.title }}</h3>
        <p class="preview-card-description">{{ props.preview.description }}</p>
        <div class="preview-card-tags">
          <Tag v-for="tag in props.preview.tags" :key="tag" :variant="tag" />
        </div>
      </div>
      <Link :to="`/project/${props.preview.slug}`">
        <Button class="preview-card-button" size="sm" renderAs="div">{{ t("view-project") }}</Button>
      </Link>
      
    </div>
  </div>
</template>

<style scoped lang="scss">
.preview-card {
  padding: var(--space-sm);
  border: var(--stroke-md) solid var(--color-grayscale-400);
  border-radius: var(--radius-lg);

  &-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
    padding-top: var(--space-md);
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
    gap: var(--space-xxs);
  }

  &-title {
    font-size: var(--font-size-title-sm);
    font-weight: 700;
    color: var(--color-text-400);
  }

  &-description {
    font-size: var(--font-size-sm);
    color: var(--color-text-300);
  }

  &-button {
    width: 100%;
  }

  &-tags {
    margin-top: var(--space-xs);
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);
  }
}
</style>
