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
import { usePreloader } from "./composables/usePreloader";
import Cursor from "./components/Cursor.vue";
import { useAgent } from "./composables/useAgent";
import { useMusic } from "./features/sounds/composables/useMusic";
import { useHowler } from "./features/sounds/composables/useHowler";

useTranslations();
usePreloader();
useMusic();
useHowler();
const route = useRoute();
const { isTouch } = useAgent();

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
  <Header />
  <ProjectBackground />
  <RouterView />
  <Cursor v-if="!isTouch" />
</template>
