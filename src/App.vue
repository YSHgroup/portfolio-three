<script setup lang="ts">
import { onMounted, ref } from "vue";
import "./utils/scroll";
import { resources } from "./utils/resources";
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
import TranslationProvider from "./i18n/context/TranslationProvider.vue";
import { sizes } from "./utils/sizes";
import { three } from "./three";

const isReady = ref(false);

onMounted(() => {
  sizes.init();
  resources.startLoading();
});

const handleReady = () => {
  if (isReady.value) return;
  three.init();

  isReady.value = true;
};

onMounted(() => {
  if (resources.isReady) {
    handleReady();
  } else {
    resources.once("ready", handleReady);
  }
});
</script>

<template>
  <TranslationProvider>
    <Header />
    <RouterView />
  </TranslationProvider>
</template>
