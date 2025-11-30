<script setup lang="ts">
import { onMounted } from "vue";
import { resources } from "./utils/resources";
import Header from "./components/Header.vue";
import { sizes } from "./utils/sizes";
import { useTranslations } from "./i18n/composables/useTranslations";
import { usePreloader } from "./composables/usePreloader";
import Cursor from "./components/Cursor.vue";
import { useAgent } from "./composables/useAgent";
import { useMusic } from "./features/sounds/composables/useMusic";
import { useHowler } from "./features/sounds/composables/useHowler";
import { useRouteObserver, projectId } from "./composables/useRouteObserver";
import Home from "./features/home/components/Home.vue";
import Project from "./features/projects/components/Project.vue";
import { useProjectTransition } from "./composables/useProjectTransition";
import { useScroll } from "./composables/useScroll";

const { isTransitioning } = useProjectTransition();

useTranslations();
usePreloader();
useMusic();
useHowler();
useScroll(); // <-- single Lenis instance
useRouteObserver();
const { isTouch } = useAgent();

onMounted(() => {
  sizes.init();
  resources.startLoading();
});
</script>

<template>
  <Header />

  <!-- main page -->
  <div :class="{ 'home-wrapper-projectIsReady': projectId !== null && !isTransitioning }">
    <Home v-show="projectId === null || isTransitioning" />
  </div>

  <!-- overlay page -->
  <div
    class="project-wrapper"
    :class="{
      'project-wrapper-visible': projectId !== null,
      'project-wrapper-transitioning': isTransitioning,
      'project-wrapper-isReady': projectId !== null && !isTransitioning,
    }"
  >
    <div class="project-content">
      <Project v-show="projectId !== null || isTransitioning" />
    </div>
  </div>

  <Cursor v-if="!isTouch" />
</template>

<style lang="scss">
.home-wrapper-projectIsReady {
  visibility: hidden;
  position: fixed;
  inset: 0;
}

.project-wrapper {
  position: fixed; /* <-- key */
  inset: 0;
  overflow: hidden; /* new page must NOT scroll during transition */
  z-index: var(--z-index-layout-project);
  clip-path: circle(0%);
  transition: clip-path var(--transition-route-duration) var(--transition-route-ease);
  visibility: hidden;
  pointer-events: none; /* avoid interaction before fully opened */

  &-visible {
    visibility: visible;
    clip-path: circle(100%);
    pointer-events: auto; /* re-enable interaction */
  }

  &-transitioning {
    visibility: visible;
  }

  &-isReady {
    position: static;
  }
}

.project-content {
  width: 100%;
  height: 100%;
  overflow: hidden; /* ensure no scroll container */
}
</style>
