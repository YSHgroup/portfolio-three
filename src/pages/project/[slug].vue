<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { projectModules } from "../../content/projects/index";
import { useTranslationContext } from "../../i18n/context";
import ProjectContent from "../../features/projects/ProjectContent.vue";
import Footer from "../../components/Footer.vue";

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
    <ProjectContent v-if="content" :content="content" :projectId="projectId" class="project-content" />
    <Footer :class="footerClassNames" />
  </div>
</template>

<style scoped lang="scss">
.project-cubewar {
  color: var(--color-text-400);
}

.project {
  min-height: 100vh;
  z-index: var(--z-index-layout);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  &-content {
    padding-bottom: 72px;
    color: var(--color-text-400);
  }

  &-footer {
    position: relative;
    margin-top: auto;
    color: var(--color-text-400);
  }
}
</style>
