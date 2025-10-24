<script setup lang="ts">
import Layout from "../../../components/Layout.vue";
import ProjectHero from "./ProjectHero.vue";
import ProjectComponent from "./ProjectComponent.vue";

import type { ProjectContent } from "../../../content/types";

const { content } = defineProps<{
  content: ProjectContent;
  projectId: string;
}>();
</script>

<template>
  <Layout>
    <ProjectHero :content="content" :projectId="projectId" />
    <div v-for="component in content.components" :key="component.type" class="grid project-content">
      <ProjectComponent :type="component.type" :props="component.props" />
    </div>
  </Layout>
</template>

<style scoped lang="scss">
.project-content {
  row-gap: var(--space-xxl);
}
</style>
