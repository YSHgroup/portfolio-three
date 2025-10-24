<script setup lang="ts">
import ProjectVideo from "./ProjectVideo.vue";

import type { ProjectContent } from "../../content/types";

const { content } = defineProps<{
  content: ProjectContent;
}>();
</script>

<template>
  <div class="project-hero grid">
    <ProjectVideo :src="content.video" class="project-hero-video" />
  </div>
</template>

<style scoped lang="scss">
.project-hero {
  padding: var(--space-outer);
  padding-top: calc(var(--height-header));

  &-video {
    grid-column: 1 / 13;

    @include mixins.mq("md") {
      grid-column: 2 / span 6;
    }
  }
}
</style>
