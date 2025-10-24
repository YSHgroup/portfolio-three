<script setup lang="ts">
import HeaderLink from "./HeaderLink.vue";
import { computed } from "vue";
import { t } from "../i18n/utils/translate";

import { lenis } from "../utils/scroll";
import { useHeaderTheme } from "../composables/useHeaderTheme";

const { isDarkTheme } = useHeaderTheme();

const handleLinkClick = (link: string) => {
  lenis.scrollTo(link);
};

const classNames = computed(() => {
  return {
    "header-links": true,
    "header-links-dark": isDarkTheme.value,
  };
});
</script>

<template>
  <header :class="classNames">
    <HeaderLink @click="handleLinkClick('.about')">{{ t("about") }}</HeaderLink>
    <HeaderLink @click="handleLinkClick('.projects')">{{ t("projects") }}</HeaderLink>
    <HeaderLink @click="handleLinkClick('.contact')">{{ t("contact") }}</HeaderLink>
  </header>
</template>

<style scoped lang="scss">
.header-links {
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 50%;
  gap: var(--space-xxxl);
  transform: translateX(-50%);
  z-index: var(--z-index-header);
  display: none;
  height: var(--height-header);

  @include mixins.mq("md") {
    display: flex;
  }

  &-dark {
    color: var(--color-white-400);
  }
}
</style>
