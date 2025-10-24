<script setup lang="ts">
import { onMounted, watch } from "vue";
import { resources } from "./utils/resources";
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
import { sizes } from "./utils/sizes";
import { three } from "./three";
import ProjectBackground from "./features/projects/components/ProjectBackground.vue";
import { useTranslations } from "./i18n/composables/useTranslations";
import { scroll } from "./utils/scroll";
import { pathnameWithoutLocale } from "./i18n/store";

useTranslations();

onMounted(() => {
  sizes.init();
  three.init();
  resources.startLoading();
  scroll.init();
});

watch(
  pathnameWithoutLocale,
  () => {
    scroll.createNewLenis();
  },
  { immediate: true },
);
</script>

<template>
  <Header></Header>
  <ProjectBackground />
  <RouterView />
</template>
