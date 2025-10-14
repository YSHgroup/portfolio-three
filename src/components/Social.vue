<script setup lang="ts">
import Github from "./icons/Github.vue";
import Linkedin from "./icons/Linkedin.vue";
import Instagram from "./icons/Instagram.vue";
import Mail from "./icons/Mail.vue";
import X from "./icons/X.vue";

import { social } from "../content/social";

// map icon names to components
const icons = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  mail: Mail,
  x: X,
} as const;
</script>

<template>
  <div class="social">
    <a
      v-for="item in social"
      :key="item.name"
      :href="item.url"
      target="_blank"
      rel="noopener noreferrer"
      class="social-link"
      :aria-label="`Go to ${item.name.charAt(0).toUpperCase() + item.name.slice(1)}`"
    >
      <component :is="icons[item.name]" />
    </a>
  </div>
</template>

<style scoped lang="scss">
.social {
  display: flex;
  gap: var(--space-md);
  color: var(--color-text-300);

  &-link {
    width: 24px;
    height: 24px;
    position: relative;
    z-index: 0;

    &::before {
      content: "";
      position: absolute;
      top: -4px;
      left: -4px;
      width: calc(100% + 8px);
      height: calc(100% + 8px);
      background-color: var(--color-beige-600);
      border-radius: var(--radius-md);
      z-index: -1;
      opacity: 0;
    }

    @include mixins.hover {
      &:hover {
        &::before {
          opacity: 1;
        }
      }
    }
  }
}
</style>
