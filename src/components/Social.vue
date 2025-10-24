<script setup lang="ts">
import Github from "./icons/Github.vue";
import Linkedin from "./icons/Linkedin.vue";
import Instagram from "./icons/Instagram.vue";
import Mail from "./icons/Mail.vue";
import X from "./icons/X.vue";
import Link from "./Link.vue";
import Clickable from "./Clickable.vue";
import { t } from "../i18n/utils/translate";

import { social } from "../content/social";

// map icon names to components
const icons = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  mail: Mail,
  x: X,
} as const;

const getAriaLabel = (name: string) => `${t("go-to")} ${name.charAt(0).toUpperCase() + name.slice(1)}`;
</script>

<template>
  <div class="social">
    <Clickable v-for="item in social" :key="item.name" :href="item.url" renderAs="div" class="social-link">
      <Link external :href="item.url">
        <component :is="icons[item.name]" :aria-label="getAriaLabel(item.name)" external
      /></Link>
    </Clickable>
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
  }
}
</style>
