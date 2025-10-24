<script setup lang="ts">
import Layout from "../../../components/Layout.vue";
import ProjectHero from "./ProjectHero.vue";
import ProjectComponent from "./ProjectComponent.vue";
import Link from "../../../components/Link.vue";
import Button from "../../../components/Button.vue";
import { t } from "../../../i18n/utils/translate";

import type { ProjectContent } from "../../../content/types";

const { content } = defineProps<{
  content: ProjectContent;
  projectId: string;
}>();
</script>

<template>
  <Layout class="project-content">
    <ProjectHero :content="content" :projectId="projectId" />
    <div class="project-content-components">
      <div v-for="component in content.components" :key="component.type" class="grid project-content-grid">
        <ProjectComponent :type="component.type" :props="component.props" />
      </div>
      <Link to="/" class="project-content-back-to-home">
        <Button renderAs="div" variant="border">{{ t("back-to-home") }}</Button>
      </Link>
    </div>
  </Layout>
</template>

<style scoped lang="scss">
.project-content-components {
  padding: 0 var(--space-outer);
  background-color: var(--color-background-400);
  width: 100%;
  padding: 64px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-xxl);
  gap: var(--space-xxl);
}

.project-content {
  color: var(--color-text-400);

  &-grid {
    padding: 0 var(--space-outer);
    row-gap: var(--space-xxl);
  }

  &-back-to-home {
    width: 100%;

    @include mixins.mq("md") {
      width: auto;
    }
  }
}
</style>
