<script setup lang="ts">
import Layout from "../../components/Layout.vue";
import ProjectHero from "./ProjectHero.vue";

import type { ProjectContent } from "../../content/types";

const { content } = defineProps<{
  content: ProjectContent;
}>();
</script>

<template>
  <Layout>
    <ProjectHero :content="content" />
  </Layout>
</template>
