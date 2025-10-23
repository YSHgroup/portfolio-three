<script setup lang="ts">
import Button from "./Button.vue";
import Logo from "./Logo.vue";
import { computed, ref } from "vue";
import { useTranslationContext } from "../i18n/context";
import { lenis } from "../utils/scroll";
import { useHeaderTheme } from "../composables/useHeaderTheme";

const { t } = useTranslationContext();
const logoVisible = ref(false);
const { isDarkTheme } = useHeaderTheme({
  onAboutElementChange: (element, boundingClientRect) => {
    if (!element || !boundingClientRect) {
      logoVisible.value = false;
      return;
    }

    if (boundingClientRect.top - 128 < 0) {
      logoVisible.value = true;
    } else {
      logoVisible.value = false;
    }
  },
});

const handleLogoClick = () => {
  lenis.scrollTo(0);
};

const classNames = computed(() => {
  return {
    header: true,
    "header-dark": isDarkTheme.value,
    "header-logo-visible": logoVisible.value,
  };
});
</script>

<template>
  <header :class="classNames">
    <div class="header-logo" @click="handleLogoClick">
      <Logo class="header-logo-image" />
      <p class="header-logo-text">David</p>
    </div>
    <div class="header-right">
      <Button>{{ t("get-in-touch") }}</Button>
    </div>
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

  --logo-visible: 0;

  &-logo-visible {
    --logo-visible: 1;
  }

  &-right {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  &-dark {
    color: var(--color-white-400);
  }

  &-logo {
    transition:
      color 0.125s ease-in-out,
      opacity 0.125s ease-in-out;
    cursor: pointer;
    opacity: var(--logo-visible);
    display: flex;
    gap: var(--space-xs);

    @include mixins.mq("md") {
      gap: var(--space-sm);
    }

    &-image {
      width: 28px;
      transform: translateY(-4px);

      @include mixins.mq("md") {
        width: 34px;
        transform: translateY(-6px);
      }
    }

    &-text {
      font-weight: 900;
      font-size: 18px;
      letter-spacing: -1px;

      @include mixins.mq("md") {
        font-size: 20px;
      }
    }
  }
}
</style>
