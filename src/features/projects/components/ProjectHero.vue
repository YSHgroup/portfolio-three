<script setup lang="ts">
import ProjectVideo from "./ProjectVideo.vue";
import Tag from "../../../components/Tag.vue";

import type { ProjectContent } from "../../../content/types";

const { content } = defineProps<{
  content: ProjectContent;
}>();
</script>

<template>
  <div class="project-hero grid">
    <ProjectVideo :src="content.video" :border="content.videoBorder" class="project-hero-video" />
    <div class="project-hero-content">
      <div class="project-hero-content-top">
        <h2 class="project-hero-title">{{ content.title }}</h2>
        <div class="project-hero-tags">
          <Tag v-for="tag in content.tags" :key="tag" :variant="tag" />
        </div>
      </div>
      <p class="project-hero-description" v-html="content.description"></p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.project-hero {
  padding: 0 var(--space-outer);
  padding-bottom: 64px;
  padding-top: calc(var(--height-header));

  &-video {
    grid-column: 1 / span 12;
    align-self: center;

    @include mixins.mq("md") {
      grid-column: 2 / 8;
    }
  }

  &-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
  }

  &-title {
    font-size: var(--font-size-title-md);
    color: var(--color-text-400);
    line-height: var(--line-height-title);
  }

  &-description {
    color: var(--color-text-400);
    line-height: var(--line-height-copy);
  }

  &-content {
    grid-column: 1 / 13;
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
    align-self: center;

    @include mixins.mq("md") {
      grid-column: 9 / 13;
    }

    @include mixins.mq("lg") {
      grid-column: 8 / 12;
    }

    &-top {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    }
  }
}
</style>
