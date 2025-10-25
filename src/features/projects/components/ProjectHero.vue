<script setup lang="ts">
import Tag from "../../../components/Tag.vue";

import type { ProjectContent } from "../../../content/types";

const { content } = defineProps<{
  content: ProjectContent;
}>();
</script>

<template>
  <div class="project-hero grid">
    <div class="project-hero-top">
      <h1 class="project-hero-title">{{ content.title }}</h1>
      <div class="project-hero-tags">
        <Tag v-for="tag in content.tags" :key="tag" :variant="tag" />
      </div>
    </div>
    <p class="project-hero-description" v-html="content.description"></p>
  </div>
</template>

<style scoped lang="scss">
.project-hero {
  padding: 0 var(--space-outer);
  padding-bottom: 48px;
  padding-top: calc(var(--height-header) + 24px);

  @include mixins.mq("md") {
    padding-bottom: 64px;
  }

  &-video {
    grid-column: 1 / span 12;
    align-self: center;

    @include mixins.mq("md") {
      grid-column: 1 / 8;
    }

    @include mixins.mq("lg") {
      grid-column: 2 / 8;
    }
  }

  &-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
  }

  &-title {
    font-size: var(--font-size-title-lg);
    color: var(--color-text-400);
    line-height: var(--line-height-title);

    @include mixins.mq("md") {
      font-size: var(--font-size-title-xl);
    }
  }

  &-description {
    color: var(--color-text-400);
    line-height: var(--line-height-copy);
    grid-column: 1 / 13;
    align-self: center;

    @include mixins.mq("md") {
      grid-row: 1;
      grid-column: 6 / 12;
    }

    @include mixins.mq("lg") {
      grid-row: 1;
      grid-column: 7 / 12;
    }

    @include mixins.mq("xl") {
      grid-row: 1;
      grid-column: 7 / 11;
    }
  }

  &-top {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    grid-row: 1;
    grid-column: 1 / 13;
    align-self: top;

    @include mixins.mq("md") {
      grid-column: 1 / 6;
    }

    @include mixins.mq("lg") {
      grid-column: 2 / 6;
    }
  }
}
</style>
