<script setup lang="ts">
import { onMounted } from "vue";
import { resources } from "./utils/resources";
import Header from "./components/Header.vue";
import { sizes } from "./utils/sizes";
import { three } from "./three";
import { useTranslations } from "./i18n/composables/useTranslations";
import { usePreloader } from "./composables/usePreloader";
import Cursor from "./components/Cursor.vue";
import { useAgent } from "./composables/useAgent";
import { useMusic } from "./features/sounds/composables/useMusic";
import { useHowler } from "./features/sounds/composables/useHowler";
import { useScroll } from "./composables/useScroll";
import Home from "./pages/Home.vue";
import { useRouteObserver } from "./composables/useRouteObserver";

useTranslations();
usePreloader();
useMusic();
useHowler();
useScroll();
useRouteObserver();
const { isTouch } = useAgent();

onMounted(() => {
  sizes.init();
  three.init();
  resources.startLoading();
});
</script>

<template>
  <Header />
  <Home />
  <Cursor v-if="!isTouch" />
</template>
<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease-in-out;
}
</style>
