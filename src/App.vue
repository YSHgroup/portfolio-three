<script setup lang="ts">
import { onMounted } from "vue";
import { resources } from "./utils/resources";
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
import { sizes } from "./utils/sizes";
import { three } from "./three";
import { scroll } from "./utils/scroll";
import ProjectBackground from "./features/projects/ProjectBackground.vue";
import { useTranslations } from "./i18n/composables/useTranslations";

useTranslations();

onMounted(() => {
  sizes.init();
  three.init();
  resources.startLoading();
  scroll.init();
});
</script>

<template>
  <Header />
  <ProjectBackground />
  <RouterView />
</template>
