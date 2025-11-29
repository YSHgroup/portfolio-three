<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { projectModules } from "../../content/projects/index";
import ProjectContent from "../../features/projects/components/ProjectContent.vue";
import Footer from "../../components/Footer.vue";
import { locale } from "../../i18n/store";
import { projectId } from "../../composables/useRouteObserver";

import type { Locale } from "../../i18n/types";

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

watch(
  [projectId, locale],
  () => {
    if (projectId.value) {
      fetchProject(projectId.value);
    }
  },
  { immediate: true },
);

const classNames = computed(() => {
  return {
    project: true,
    [`project-${projectId.value}`]: true,
  };
});

const footerClassNames = computed(() => {
  return {
    "project-footer": true,
    [`project-${projectId.value}`]: true,
  };
});
</script>

<template>
  <div :class="classNames">
    <ProjectContent v-if="content && projectId" :content="content" :projectId="projectId" />
    <Footer :class="footerClassNames" />
  </div>
</template>

<style scoped lang="scss">
.project {
  min-height: calc(var(--lvh) * 100);
  z-index: var(--z-index-layout);
  background-color: var(--color-background-300);

  &-footer {
    position: relative;
    margin-top: auto;
    color: var(--color-text-400);
  }

  ::selection {
    background: var(--color-accent-400);
    color: var(--color-accent-text-400);
    text-shadow: none;
  }

  ::-moz-selection {
    background: var(--color-accent-400);
    color: var(--color-accent-text-400);
    text-shadow: none;
  }
}
</style>
