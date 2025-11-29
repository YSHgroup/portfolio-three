<script setup lang="ts">
import { projectId, recentProjectId } from "../../../composables/useRouteObserver";
import { isTransitioning } from "../../../composables/useProjectTransition";
</script>

<template>
  <div
    ref="projectRef"
    :class="[
      'project',
      recentProjectId !== null && `project-${recentProjectId}`,
      isTransitioning && `project-transitioning`,
      projectId !== null && `project-visible`,
    ]"
  >
    <h1>test</h1>
    <h1>test</h1>
    <h1>test</h1>
    <h1>test</h1>
    <h1>test</h1>
    <button>Close</button>
  </div>
</template>

<style scoped lang="scss">
.project {
  //min-height: calc(var(--lvh) * 100);
  background-color: var(--color-background-300);
  min-height: calc(var(--lvh) * 500);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>
