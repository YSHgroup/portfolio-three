<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const projectId = computed(() => route.meta.project as string);

const classNames = computed(() => {
  return {
    "project-background": true,
    [`project-${projectId.value}`]: true,
  };
});
</script>

<template>
  <div :class="classNames" v-show="projectId">
    <div class="project-background-image"></div>
  </div>
</template>

<style scoped lang="scss">
.project-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-background-300);
  z-index: var(--z-index-background);
}
</style>
