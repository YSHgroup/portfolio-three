<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { previews } from "../../content/projects/previews";
import { useTranslationContext } from "../../i18n/context";
import PreviewCard from "./PreviewCard.vue";
import NotchSection from "../../components/NotchSection.vue";

import type { ProjectPreview } from "../../content/types";

const { locale } = useTranslationContext();

const loadedPreviews = ref<ProjectPreview[] | null>(null);

const loadPreviews = async () => {
  const module = await previews[locale.value as keyof typeof previews]();
  loadedPreviews.value = module.default;
};

watch(locale, loadPreviews);

onMounted(loadPreviews);
</script>
<template>
  <div class="projects">
    <NotchSection class="projects-notch" />
    <div class="grid">
      <div class="projects-cards">
        <PreviewCard v-for="preview in loadedPreviews" :key="preview.title" :preview="preview" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.projects {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-top: 100px;
  padding-bottom: 100px;
  width: 100%;
  padding-left: var(--space-outer);
  padding-right: var(--space-outer);
  background-color: var(--color-beige-400);
  min-height: calc(var(--lvh) * 100);
  border-bottom-left-radius: var(--radius-xxl);
  border-bottom-right-radius: var(--radius-xxl);

  &-notch {
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%);
    color: var(--color-beige-400);
  }

  &-cards {
    max-width: 100%;
    flex: 1;
    grid-column: 1 / span 12;
    display: grid;
    gap: var(--space-lg);
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));

    @include mixins.mq("md") {
      grid-column: 1 / span 12;
    }

    @include mixins.mq("lg") {
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      grid-column: 3 / span 8;
    }

    @include mixins.mq("xl") {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
      gap: var(--space-lg);
    }
  }
}
</style>
