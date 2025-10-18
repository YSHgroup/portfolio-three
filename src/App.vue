<script setup lang="ts">
import { onMounted } from "vue";
import "./utils/scroll";
import { resources } from "./utils/resources";
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
import ThreeCanvas from "./three/components/ThreeCanvas.vue";
import TranslationProvider from "./i18n/context/TranslationProvider.vue";

onMounted(() => {
  resources.startLoading();
});
</script>

<template>
  <TranslationProvider>
    <Header />
    <RouterView />
    <ThreeCanvas />
  </TranslationProvider>
</template>
