<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { previews } from "../../content/previews";
import { useTranslationContext } from "../../i18n/context";
import PreviewCard from "./PreviewCard.vue";
import LayoutContent from "../../components/LayoutContent.vue";

import type { ProjectPreview } from "../../content/types";

const { locale } = useTranslationContext();

const loadedPreviews = ref<ProjectPreview[] | null>(null);

const loadPreviews = async () => {
  const module = await previews[locale.value as keyof typeof previews]();
  loadedPreviews.value = module.default;
};

watch(locale, async () => {
  await loadPreviews();
});

onMounted(async () => {
  await loadPreviews();
});
</script>
<template>
  <div class="projects">
    <LayoutContent size="lg">
      <div class="projects-cards">
        <PreviewCard v-for="preview in loadedPreviews" :key="preview.slug" :preview="preview" />
      </div>
    </LayoutContent>
  </div>
</template>

<style scoped lang="scss">
.projects {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 100px;
  padding-bottom: 100px;
  width: 100%;
  background-color: var(--color-beige-400);

  &-cards {
    display: grid;
    gap: var(--space-md);
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));

    @include mixins.mq("md") {
      gap: var(--space-lg);
    }
  }
}
</style>
