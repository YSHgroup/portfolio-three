<script setup lang="ts">
import Button from "./Button.vue";
import Logo from "./Logo.vue";
import { computed } from "vue";
import { useTranslationContext } from "../i18n/context";
import { lenis } from "../utils/scroll";
import { useHeaderTheme } from "../composables/useHeaderTheme";

const { t } = useTranslationContext();
const { isDarkTheme } = useHeaderTheme();

const handleLogoClick = () => {
  lenis.scrollTo(0);
};

const classNames = computed(() => {
  return {
    header: true,
    "header-dark": isDarkTheme.value,
  };
});
</script>

<template>
  <header :class="classNames">
    <Logo class="header-logo" @click="handleLogoClick" />
    <Button>{{ t("get-in-touch") }}</Button>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: fixed;
  top: var(--space-outer);
  display: flex;
  align-items: center;
  justify-content: space-between;
  left: 50%;
  transform: translateX(-50%);
  width: var(--breakpoint-xxl);
  max-width: calc(100% - var(--space-outer) * 2);
  z-index: var(--z-index-header);
  height: var(--height-header);

  &-dark {
    color: var(--color-white-400);
  }

  &-logo {
    transition: color 0.2s ease-in-out;
    width: 42px;
    cursor: pointer;

    @include mixins.mq("md") {
      width: 48px;
    }
  }
}
</style>
