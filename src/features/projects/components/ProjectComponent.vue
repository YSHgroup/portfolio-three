<script setup lang="ts">
import ImageText from "./ImageText.vue";
import Text from "./Text.vue";
import List from "./List.vue";
import Image from "./Image.vue";
import Video from "./Video.vue";

import type { ProjectComponents, ProjectComponentProps } from "../types";

type Props = ProjectComponentProps;

const { type, props } = defineProps<Props>();

const components = {
  imageText: ImageText,
  text: Text,
  list: List,
  image: Image,
  video: Video,
} as const satisfies Record<keyof ProjectComponents, any>;

const Component = components[type];
</script>

<template>
  <Component v-bind="props" />
</template>
