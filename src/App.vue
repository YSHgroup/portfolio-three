<script setup lang="ts">
import { onMounted } from "vue";
import { sizes } from "./utils/sizes";
import { scroll } from "./utils/scroll";
import { resources } from "./utils/resources";
import { animations } from "./animations";
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
import ThreeCanvas from "./three/components/ThreeCanvas.vue";
import TranslationProvider from "./i18n/context/TranslationProvider.vue";

onMounted(() => {
  sizes.init();
  scroll.init();
  resources.startLoading();

  resources.once("ready", () => {
    animations.init();
  });
});
</script>

<template>
  <TranslationProvider>
    <Header />
    <RouterView />
    <ThreeCanvas />
  </TranslationProvider>
</template>
