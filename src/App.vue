<script setup lang="ts">
import { onMounted } from "vue";
import "./utils/scroll";
import { resources } from "./utils/resources";
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
import TranslationProvider from "./i18n/context/TranslationProvider.vue";
import { sizes } from "./utils/sizes";

onMounted(() => {
  sizes.init();
  resources.startLoading();
});
</script>

<template>
  <TranslationProvider>
    <Header />
    <RouterView />
  </TranslationProvider>
</template>
