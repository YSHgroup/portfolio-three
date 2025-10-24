<script setup lang="ts">
import ImageText from "./ImageText.vue";
import Text from "./Text.vue";

import type { ProjectComponents, ProjectComponentProps } from "../types";

type Props = ProjectComponentProps;

const { type, props } = defineProps<Props>();

const components = {
  imageText: ImageText,
  text: Text,
} as const satisfies Record<keyof ProjectComponents, any>;

const Component = components[type];
</script>

<template>
  <Component v-bind="props" />
</template>
