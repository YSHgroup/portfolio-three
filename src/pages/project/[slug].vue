<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { projectModules } from "../../content/projects/index";
import { useTranslationContext } from "../../i18n/context";
import ProjectContent from "../../features/projects/ProjectContent.vue";

import type { Locale } from "../../i18n/types";

const route = useRoute();
const { locale } = useTranslationContext();
const projectId = computed(() => route.meta.project as string);

const loading = ref(true);
const content = ref(null);
const error = ref<Error | null>(null);

const fetchProject = async (project: string | undefined) => {
  try {
    const module = await projectModules[locale.value as Locale][project as string].default;
    content.value = module;
    loading.value = false;
  } catch (err) {
    error.value = new Error(`Failed to fetch project ${project}`);
  } finally {
    loading.value = false;
  }
};

watch(projectId, fetchProject, { immediate: true });
watch(locale, fetchProject);
</script>

<template>
  <ProjectContent v-if="content" :content="content" :projectId="projectId" />
</template>
