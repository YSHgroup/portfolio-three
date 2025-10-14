<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import emblaCarouselVue from "embla-carousel-vue";
import { previews } from "../../content/previews";
import { useTranslationContext } from "../../i18n/context";
import SliderCard from "./SliderCard.vue";

import type { ProjectPreview } from "../../content/types";

const { locale } = useTranslationContext();

const loadedPreviews = ref<ProjectPreview[] | null>(null);
const selectedIndex = ref(0);

const loadPreviews = async () => {
  const module = await previews[locale.value as keyof typeof previews]();
  loadedPreviews.value = module.default;
};

watch(locale, async () => {
  await loadPreviews();
});

const [emblaRef, emblaApi] = emblaCarouselVue({ align: "center" });

onMounted(async () => {
  await loadPreviews();

  if (!emblaApi.value) return;

  emblaApi.value.on("select", () => {
    selectedIndex.value = emblaApi.value!.selectedScrollSnap();
  });

  selectedIndex.value = emblaApi.value.selectedScrollSnap();
});
</script>

<template>
  <div class="wrapper">
    <div class="embla" ref="emblaRef">
      <div class="embla-container">
        <SliderCard
          v-for="(preview, index) in loadedPreviews"
          :key="preview.slug"
          :preview="preview"
          :active="selectedIndex === index"
          class="embla-slide"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.embla {
  width: 640px;
  max-width: 80%;

  &-container {
    display: flex;
    width: 100%;
    aspect-ratio: 16/9;
  }

  &-slide {
    flex: 0 0 100%;
    min-width: 0;
  }
}
</style>
