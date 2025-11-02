<script setup lang="ts">
import Button from "./Button.vue";
import Logo from "./Logo.vue";
import { computed, ref } from "vue";
import { t } from "../i18n/utils/translate";
import { useHeaderTheme } from "../composables/useHeaderTheme";
import { lenis } from "../utils/scroll";
import { useRoute, useRouter } from "vue-router";
import { social } from "../content/social";
import ButtonRound from "./ButtonRound.vue";
import ArrowRight from "./icons/ArrowRight.vue";

const route = useRoute();
const router = useRouter();

const scrolledPastHeroVisible = ref(false);
const { isDarkTheme } = useHeaderTheme({
  onAboutElementChange: (element, boundingClientRect, hasScrolledIntoView) => {
    if (!element || !boundingClientRect) {
      scrolledPastHeroVisible.value = false;
      return;
    }

    if (hasScrolledIntoView) {
      scrolledPastHeroVisible.value = true;
    } else {
      scrolledPastHeroVisible.value = false;
    }
  },
});

const handleLogoClick = () => {
  if (!lenis.value) return;
  lenis.value.scrollTo(0);
};

const isProjectPage = computed(() => route.meta.project !== undefined);

const classNames = computed(() => {
  return {
    header: true,
    "header-dark": isDarkTheme.value,
    "header-scrolled": scrolledPastHeroVisible.value,
    [`project-${route.meta.project as string}`]: isProjectPage.value,
  };
});

const getInTouchClassNames = computed(() => {
  return {
    "header-get-in-touch": true,
    "header-get-in-touch-isProjectPage": isProjectPage.value,
  };
});
</script>

<template>
  <header :class="classNames">
    <div class="header-left">
      <ButtonRound
        v-if="isProjectPage"
        variant="accent"
        @click="router.back()"
        :aria-label="t('back-to-home')"
        :class="{ 'header-back': true, 'header-back-isProjectPage': isProjectPage }"
      >
        <ArrowRight class="header-back-icon" />
      </ButtonRound>
    </div>
    <div :class="{ 'header-logo': true, 'header-logo-isProjectPage': isProjectPage }" @click="handleLogoClick">
      <Logo class="header-logo-image" />
    </div>
    <div class="header-right">
      <Button
        renderAs="a"
        variant="accent"
        :aria-label="t('get-in-touch')"
        :href="social.find((item) => item.name === 'mail')?.url ?? ''"
        external
        :class="getInTouchClassNames"
        data-cursor="circle-white"
        >{{ t("get-in-touch") }}</Button
      >
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  left: 50%;
  transform: translateX(-50%);
  width: var(--breakpoint-xxxl);
  padding: 0 var(--space-outer);
  max-width: 100%;
  z-index: var(--z-index-header);
  height: var(--height-header);

  --scrolled: 0;

  &-scrolled {
    --scrolled: 1;
  }

  &-back {
    pointer-events: none;
    visibility: hidden;

    &-icon {
      width: 100%;
      color: var(--color-accent-text-400);
      transform: rotate(180deg);
    }

    &-isProjectPage {
      pointer-events: auto;
      visibility: visible;
    }
  }

  &-left {
    position: absolute;
    left: var(--space-outer);
    top: 50%;
    transform: translateY(-50%);
  }

  &-get-in-touch {
    width: fit-content;

    &-isProjectPage {
      opacity: 1 !important;
    }
  }

  &-right {
    position: absolute;
    right: var(--space-outer);
    top: 50%;
    transform: translateY(-50%);
  }

  &-dark {
    color: var(--color-white-400);
  }

  &-get-in-touch {
    display: none;
    transition:
      opacity 0.2s ease-in-out,
      color 0.2s ease-in-out,
      background-color 0.2s ease-in-out;

    @include mixins.mq("md") {
      display: flex;
    }
  }

  &-logo {
    cursor: pointer;
    display: flex;
    gap: var(--space-xs);
    transition: color 0.2s ease-in-out;
    opacity: var(--scrolled);

    @include mixins.mq("md") {
      gap: var(--space-sm);
    }

    &-isProjectPage {
      pointer-events: none;
    }

    &-image {
      width: 36px;

      @include mixins.mq("md") {
        width: 40px;
      }
    }

    &-text {
      font-weight: 900;
      font-size: 18px;

      @include mixins.mq("md") {
        font-size: 20px;
      }
    }
  }
}
</style>
