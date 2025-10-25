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
import { useRoute } from "vue-router";

useTranslations();
const route = useRoute();

onMounted(() => {
  sizes.init();
  three.init();
  resources.startLoading();
  scroll.init();
});

watch(
  route,
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
