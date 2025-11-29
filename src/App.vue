<script setup lang="ts">
import { onMounted, ref } from "vue";
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
import ProjectBackground from "./features/projects/components/ProjectBackground.vue";
import { useScroll } from "./composables/useScroll";
import Home from "./features/home/components/Home.vue";
import { useRouteObserver } from "./composables/useRouteObserver";
import Project from "./features/projects/components/Project.vue";
import { projectId } from "./composables/useRouteObserver";

const projectWrapperRef = ref<HTMLElement | null>(null);
const projectContentRef = ref<HTMLElement | null>(null);

useTranslations();
usePreloader();
useMusic();
useHowler();
useScroll({ projectWrapperRef, projectContentRef });
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
  <ProjectBackground />
  <div :class="['project-wrapper', projectId !== null && `project-wrapper-visible`]" ref="projectWrapperRef">
    <div class="project-content" ref="projectContentRef">
      <Project />
    </div>
  </div>
  <Cursor v-if="!isTouch" />
</template>
<style lang="scss">
.project-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: var(--z-index-layout-project);
  pointer-events: none;
  opacity: 0;
  transition: opacity var(--transition-route-duration) var(--transition-route-ease);

  &-visible {
    overflow-y: scroll;
    pointer-events: auto;
    opacity: 1;
  }
}
</style>
