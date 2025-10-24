<script setup lang="ts">
import { onMounted } from "vue";
import { resources } from "./utils/resources";
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
import TranslationProvider from "./i18n/context/TranslationProvider.vue";
import { sizes } from "./utils/sizes";
import { three } from "./three";
import { scroll } from "./utils/scroll";
import ProjectBackground from "./features/projects/ProjectBackground.vue";

onMounted(() => {
  sizes.init();
  three.init();
  resources.startLoading();
  scroll.init();
});
</script>

<template>
  <TranslationProvider>
    <Header />
    <ProjectBackground />
    <RouterView />
  </TranslationProvider>
</template>
