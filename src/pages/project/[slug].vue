<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { projectModules } from "../../content/projects/index";
import ProjectContent from "../../features/projects/components/ProjectContent.vue";
import Footer from "../../components/Footer.vue";
import { locale } from "../../i18n/store";
import Button from "../../components/Button.vue";
import Link from "../../components/Link.vue";
import { t } from "../../i18n/utils/translate";
import Lenis from "../../components/Lenis.vue";

import type { Locale } from "../../i18n/types";

const route = useRoute();
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

watch(
  [projectId, locale],
  () => {
    fetchProject(projectId.value);
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
  <Lenis />
  <div :class="classNames">
    <ProjectContent v-if="content" :content="content" :projectId="projectId" class="project-content" />
    <Link to="/" class="project-back-to-home">
      <Button renderAs="div" variant="border">{{ t("back-to-home") }}</Button>
    </Link>
    <Footer :class="footerClassNames" />
  </div>
</template>

<style scoped lang="scss">
.project {
  min-height: calc(var(--lvh) * 100);
  z-index: var(--z-index-layout);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  gap: 64px;

  &-back-to-home {
    padding: 0 var(--space-outer);
    width: 100%;

    @include mixins.mq("md") {
      width: auto;
    }
  }

  &-content {
    color: var(--color-text-400);
  }

  &-footer {
    position: relative;
    margin-top: auto;
    color: var(--color-text-400);
  }
}
</style>
