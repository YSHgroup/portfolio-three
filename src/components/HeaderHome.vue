<script setup lang="ts">
import HeaderLink from "./HeaderLink.vue";
import { computed, onMounted, ref, nextTick } from "vue";
import { t } from "../i18n/utils/translate";
import { lenis } from "../utils/scroll";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const handleLinkClick = (link: string) => {
  if (!lenis.value) return;
  lenis.value.scrollTo(link);
};

const classNames = computed(() => ({
  "header-home": true,
}));

type ActiveLink = "about" | "projects" | "contact";
const activeLink = ref<ActiveLink | null>(null);
const sections: ActiveLink[] = ["about", "projects", "contact"];

const barStyle = ref({ transform: "" });
const ITEM_WIDTH = 128;

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
  <header :class="classNames">
    <div class="header-home-links">
      <div class="header-home-bar" :style="barStyle"></div>
      <HeaderLink
        v-for="section in sections"
        :key="section"
        class="header-home-link"
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
  display: none;
  align-items: center;
  justify-content: center;

  &-links {
    position: relative;
    display: flex;
    padding: 3px;
    background-color: var(--color-beige-500);
    border-radius: var(--radius-md);
  }

  &-bar {
    position: absolute;
    top: 3px;
    left: 3px;
    height: calc(100% - 6px);
    width: 128px; /* fixed width */
    background: var(--color-orange-400);
    border-radius: calc(var(--radius-md) - 3px);
    transition: transform 0.3s ease;
    z-index: 1;
  }

  @include mixins.mq("lg") {
    display: flex;
  }
}
</style>
