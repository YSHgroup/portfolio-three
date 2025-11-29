<script setup lang="ts">
import { projectId, recentProjectId } from "../../../composables/useRouteObserver";
</script>

<template>
  <div
    :class="[
      'project-background',
      recentProjectId !== null && `project-${recentProjectId}`,
      projectId !== null && `project-background-visible`,
    ]"
  >
    <div class="project-background-accent"></div>
    <div class="project-background-main"></div>
  </div>
</template>

<style scoped lang="scss">
.project-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: var(--z-index-project-background);

  &-visible {
    pointer-events: auto;
  }

  &-accent {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--color-accent-400);
    clip-path: circle(0%);
    transition: clip-path calc(var(--transition-route-duration)) var(--transition-route-ease);
    z-index: 1;
  }

  &-main {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--color-background-400);
    clip-path: circle(0%);
    transition: clip-path calc(var(--transition-route-duration) * 0.75) var(--transition-route-ease);
    z-index: 2;
  }

  &-visible &-accent {
    clip-path: circle(100%);
    transition: clip-path calc(var(--transition-route-duration) * 0.75) var(--transition-route-ease);
  }

  &-visible &-main {
    clip-path: circle(100%);
    transition: clip-path var(--transition-route-duration) var(--transition-route-ease);
  }
}
</style>
