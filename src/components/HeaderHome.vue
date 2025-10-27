<script setup lang="ts">
import HeaderLink from "./HeaderLink.vue";
import { onMounted, ref, nextTick } from "vue";
import { t } from "../i18n/utils/translate";
import { lenis } from "../utils/scroll";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useHeaderTheme } from "../composables/useHeaderTheme";

const handleLinkClick = (link: string) => {
  if (!lenis.value) return;
  lenis.value.scrollTo(link);
};

type ActiveLink = "about" | "projects" | "contact";
const activeLink = ref<ActiveLink | null>(null);
const sections: ActiveLink[] = ["about", "projects", "contact"];

const barStyle = ref({ transform: "" });
const ITEM_WIDTH = 128;

const { isDarkTheme, hasScrolledIntoView } = useHeaderTheme();

const updateBarPosition = () => {
  const index = sections.indexOf(activeLink.value as ActiveLink);
  const left = index * ITEM_WIDTH;
  barStyle.value = {
    transform: `translateX(${left}px)`,
  };
};

onMounted(async () => {
  await nextTick();

  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: `#${section}`,
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        activeLink.value = section;
        updateBarPosition();
      },
      onEnterBack: () => {
        activeLink.value = section;
        updateBarPosition();
      },
      onLeave: () => (activeLink.value = null),
      onLeaveBack: () => (activeLink.value = null),
    });
  });
});
</script>

<template>
  <header class="header-home">
    <div :class="['header-home-links', { 'header-home-links-dark': isDarkTheme }]">
      <div
        :class="[
          'header-home-bar',
          { 'header-home-bar-active': activeLink !== null && hasScrolledIntoView, 'header-home-bar-dark': isDarkTheme },
        ]"
        :style="barStyle"
      ></div>
      <HeaderLink
        v-for="section in sections"
        :key="section"
        :class="['header-home-link', { 'header-home-link-active': activeLink === section && hasScrolledIntoView }]"
        @click="handleLinkClick('.' + section)"
      >
        {{ t(section) }}
      </HeaderLink>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header-home {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: var(--z-index-header);
  height: var(--height-header);
  align-items: center;
  justify-content: center;
  display: none;

  @include mixins.mq("lg") {
    display: flex;
  }

  &-links {
    position: relative;
    display: flex;
    padding: 3px;
    background-color: var(--color-beige-500);
    border-radius: var(--radius-md);
    color: var(--color-text-400);
    transition:
      color 0.125s ease-in-out,
      background-color 0.125s ease-in-out;

    &-dark {
      background-color: var(--color-dark-blue-500);
      color: var(--color-white-400);
    }
  }

  &-bar {
    position: absolute;
    top: 3px;
    left: 3px;
    height: calc(100% - 6px);
    width: 128px;
    background: var(--color-orange-400);
    border-radius: calc(var(--radius-md) - 3px);
    transition:
      transform 0.3s ease-out,
      opacity 0.125s ease-in-out,
      background-color 0.125s ease-in-out;
    z-index: 1;
    opacity: 0;

    &-dark {
      background-color: var(--color-cyan-500);
    }

    &-active {
      opacity: 1;
    }
  }

  &-link {
    position: relative;
    z-index: 2;
    letter-spacing: 0.02em;
    font-weight: 700;
    border: none;
    background: none;
    transition: color 0.1s ease-in-out;
    font-size: var(--font-size-md);
    width: 128px;
    white-space: nowrap;
    text-transform: uppercase;

    &-active {
      color: var(--color-white-400);
    }
  }
}
</style>
