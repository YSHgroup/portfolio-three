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

watch(route, () => {
  scroll.createNewLenis();
});
</script>

<template>
  <Header />
  <ProjectBackground />
  <div class="router-view-wrapper">
    <RouterView v-slot="{ Component, route: routeData }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" v-if="Component" :key="routeData.path" />
      </Transition>
    </RouterView>
  </div>
  <Cursor v-if="!isTouch" />
</template>

<style lang="scss">
.router-view-wrapper {
  position: relative;
  min-height: 100%;

  > * {
    opacity: 1;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease-in-out;
}

.fade-enter-from {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

.fade-leave-from {
  opacity: 1;
}

.fade-leave-to {
  opacity: 0;
}
</style>
