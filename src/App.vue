<script setup lang="ts">
import { onMounted } from "vue";
import { resources } from "./utils/resources";
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
import { sizes } from "./utils/sizes";
import { three } from "./three";
import ProjectBackground from "./features/projects/components/ProjectBackground.vue";
import { useTranslations } from "./i18n/composables/useTranslations";
import Lenis from "./components/Lenis.vue";

useTranslations();

onMounted(() => {
  sizes.init();
  three.init();
  resources.startLoading();
});
</script>

<template>
  <Header />
  <ProjectBackground />
  <Lenis />
  <RouterView />
</template>
