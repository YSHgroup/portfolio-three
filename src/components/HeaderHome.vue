<script setup lang="ts">
import HeaderLink from "./HeaderLink.vue";
import { computed } from "vue";
import { useTranslationContext } from "../i18n/context";

import { lenis } from "../utils/scroll";
import { useHeaderTheme } from "../composables/useHeaderTheme";

const { t } = useTranslationContext();
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
  top: var(--space-outer);
  display: flex;
  align-items: center;
  justify-content: center;
  left: 50%;
  gap: var(--space-xxxl);
  transform: translateX(-50%);
  width: var(--breakpoint-xxl);
  max-width: calc(100% - var(--space-outer) * 2);
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
