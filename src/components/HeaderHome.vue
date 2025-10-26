<script setup lang="ts">
import HeaderLink from "./HeaderLink.vue";
import { computed } from "vue";
import { t } from "../i18n/utils/translate";
import { lenis } from "../utils/scroll";

const handleLinkClick = (link: string) => {
  if (!lenis.value) return;
  lenis.value.scrollTo(link);
};

const classNames = computed(() => {
  return {
    "header-home": true,
  };
});
</script>

<template>
  <header :class="classNames">
    <div class="header-home-links">
      <HeaderLink @click="handleLinkClick('.about')" class="header-home-link">{{ t("about") }}</HeaderLink>
      <HeaderLink @click="handleLinkClick('.projects')" class="header-home-link">{{ t("projects") }}</HeaderLink>
      <HeaderLink @click="handleLinkClick('.contact')" class="header-home-link">{{ t("contact") }}</HeaderLink>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header-home {
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 50%;
  transform: translateX(-50%);
  z-index: var(--z-index-header);
  display: none;
  height: var(--height-header);

  &-links {
    background-color: var(--color-beige-500);
    border-radius: var(--radius-md);
    display: flex;
    gap: var(--space-xxl);
    padding: var(--space-sm) var(--space-lg);
    flex-direction: row;
  }

  @include mixins.mq("lg") {
    display: flex;
  }
}
</style>
