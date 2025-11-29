<script setup lang="ts">
import { projectId } from "../../../composables/useRouteObserver";
</script>

<template>
  <div
    ref="projectRef"
    :class="['project', projectId !== null && `project-${projectId}`, projectId !== null && `project-visible`]"
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
  min-height: calc(var(--lvh) * 500);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>
