<script setup lang="ts">
import { isTransitioning } from "../../../composables/useProjectTransition";
import { projectId, recentProjectId } from "../../../composables/useRouteObserver";
import { ROUTE_TRANSITION_DURATION } from "../../../composables/useProjectTransition";
</script>

<template>
  <div
    :class="[
      'project-background-blend',
      isTransitioning && `project-background-blend-transitioning`,
      typeof projectId === 'string' && `project-background-blend-visible`,
    ]"
    :style="{ '--transitionDuration': `${ROUTE_TRANSITION_DURATION}ms` }"
  ></div>
  <div
    :class="[
      'project-background',
      typeof recentProjectId === 'string' && `project-${recentProjectId}`,
      typeof projectId === 'string' && `project-background-visible`,
      isTransitioning && `project-background-transitioning`,
    ]"
    :style="{ '--transitionDuration': `${ROUTE_TRANSITION_DURATION}ms` }"
  ></div>
</template>

<style scoped lang="scss">
.project-background {
  position: fixed;
  top: 0;
  left: calc(var(--radius-xxl) * -1);
  width: calc(100% + var(--radius-xxl));
  height: 100%;
  background-color: var(--color-background-300);
  border-radius: var(--radius-xxl) 0 0 0;
  z-index: calc(var(--z-index-project-background) - 3);
  pointer-events: none;
  transition: transform var(--transitionDuration) var(--ease-smooth);
  visibility: hidden;
  transform: translate3d(100%, 0, 0);

  &-blend {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: calc(var(--z-index-project-background) - 4);
    background-color: rgba(21, 34, 66, 0.5);
    transition: opacity var(--transitionDuration);
    opacity: 0;
    pointer-events: none;
    visibility: hidden;

    &-visible {
      opacity: 1;
    }

    &-transitioning {
      visibility: visible;
    }
  }

  @include mixins.mq("md") {
    transform: translate3d(0, 100%, 0);
    border-radius: var(--radius-xxl) var(--radius-xxl) 0 0;
    top: calc(var(--radius-xxl) * -1);
    left: 0;
    height: calc(100% + var(--radius-xxl));
    width: 100%;
  }

  &-visible {
    transform: translate3d(0, 0, 0);
  }

  &-transitioning {
    visibility: visible;
  }
}
</style>
