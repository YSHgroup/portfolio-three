<script setup lang="ts">
import { projectId } from "../../../composables/useRouteObserver";
</script>

<template>
  <div
    :class="[
      'project-background',
      projectId !== null && `project-${projectId}`,
      projectId !== null && `project-background-visible`,
    ]"
  ></div>
</template>

<style scoped lang="scss">
.project-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-background-400);
  opacity: 0;
  transition: opacity var(--transition-route-duration) var(--transition-route-ease);
  pointer-events: none;
  z-index: var(--z-index-project-background);

  &-visible {
    pointer-events: auto;
    opacity: 1;
  }
}
</style>
