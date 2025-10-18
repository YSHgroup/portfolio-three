<script setup lang="ts">
import Button from "./Button.vue";
import Logo from "./Logo.vue";
import HeaderLink from "./HeaderLink.vue";
import { onMounted, ref, computed, watch } from "vue";
import { useTranslationContext } from "../i18n/context";
import { useRoute } from "vue-router";
import { lenis } from "../utils/scroll";

const { t } = useTranslationContext();
const route = useRoute();

let aboutElement: HTMLElement | null = null;
const isDarkTheme = ref(false);

watch(route, () => {
  aboutElement = null;
});

const handleScroll = () => {
  if (!aboutElement) {
    aboutElement = typeof window !== "undefined" ? document.querySelector(".about") : null;
  }

  if (aboutElement) {
    const aboutBounding = aboutElement.getBoundingClientRect();
    const isScrolledIntoView = aboutBounding.top - 128 < 0;
    const isScrolledPast = aboutBounding.bottom - 48 < 0;
    isDarkTheme.value = isScrolledIntoView && !isScrolledPast;
  }
};

const handleLogoClick = () => {
  lenis.scrollTo(0);
};

const handleLinkClick = (link: string) => {
  lenis.scrollTo(link);
};

const classNames = computed(() => {
  return {
    header: true,
    "header-dark": isDarkTheme.value,
  };
});

onMounted(() => {
  lenis.on("scroll", handleScroll);
});
</script>

<template>
  <header :class="classNames" v-if="route.name !== 'NotFound'">
    <Logo class="header-logo" @click="handleLogoClick" />
    <div class="header-links">
      <HeaderLink @click="handleLinkClick('.about')">{{ t("about") }}</HeaderLink>
      <HeaderLink @click="handleLinkClick('.projects')">{{ t("projects") }}</HeaderLink>
      <HeaderLink @click="handleLinkClick('.contact')">{{ t("contact") }}</HeaderLink>
    </div>
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

  &-links {
    gap: var(--space-xxxl);
    display: none;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    @include mixins.mq("md") {
      display: flex;
    }
  }

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
