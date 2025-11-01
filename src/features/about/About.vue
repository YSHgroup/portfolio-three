<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import { transitions } from "../../animations";
import HologramBox from "../../components/HologramBox.vue";
import HologramBoxLine from "../../components/HologramBoxLine.vue";
import { t } from "../../i18n/utils/translate";
import { locale } from "../../i18n/store";

const aboutRef = ref<HTMLElement | null>(null);
const firstHologramBoxRef = ref<{ tl: gsap.core.Timeline | null; wrapperRef: HTMLDivElement | null } | null>(null);
const secondHologramBoxRef = ref<{ tl: gsap.core.Timeline | null; wrapperRef: HTMLDivElement | null } | null>(null);

watchEffect((onInvalidate) => {
  if (
    aboutRef.value &&
    firstHologramBoxRef.value?.tl &&
    firstHologramBoxRef.value.wrapperRef &&
    secondHologramBoxRef.value?.tl &&
    secondHologramBoxRef.value.wrapperRef
  ) {
    transitions.about.setup({
      about: aboutRef.value,
      firstHologramBoxTl: firstHologramBoxRef.value.tl,
      firstHologramBoxWrapper: firstHologramBoxRef.value.wrapperRef,
      secondHologramBoxTl: secondHologramBoxRef.value.tl,
      secondHologramBoxWrapper: secondHologramBoxRef.value.wrapperRef,
    });
  }

  onInvalidate(() => {
    transitions.about.destroy();
  });
});

const SERVICES_EN = [
  { name: "Frontend Development", sub: "React, Vue" },
  { name: "Backend Development", sub: "Node.js, Redis, PostgreSQL" },
  { name: "WebGL & Creative Coding", sub: "Three.js, GLSL, GSAP, SVG" },
  { name: "Real-Time Systems", sub: "WebSockets, multiplayer logic" },
] as const satisfies { name: string; sub: string }[];

const SERVICES_DE = [
  { name: "Frontend-Entwicklung", sub: "React, Vue" },
  { name: "Backend-Entwicklung", sub: "Node.js, Redis, PostgreSQL" },
  { name: "WebGL & Creative Coding", sub: "Three.js, GLSL, GSAP, SVG" },
  { name: "Echtzeit-Systeme", sub: "WebSockets, Multiplayer-Logik" },
] as const satisfies { name: string; sub: string }[];

const services = computed(() => {
  return locale.value === "en" ? SERVICES_EN : SERVICES_DE;
});
</script>

<template>
  <div class="about" ref="aboutRef" id="about"></div>
  <div class="about-sticky">
    <div class="about-content">
      <div class="about-first">
        <HologramBox title="David" ref="firstHologramBoxRef">
          <div class="about-first-details">
            <p class="about-first-details-copy">{{ t("location") }}: {{ t("germany") }}</p>
            <p class="about-first-details-copy">Version: 2.7</p>
          </div>
          <HologramBoxLine />
          <p class="about-first-copy" v-html="t('about-intro')"></p>
        </HologramBox>
      </div>
      <div class="about-services">
        <HologramBox title="Services" ref="secondHologramBoxRef">
          <div class="about-services-list">
            <div class="about-services-list-item" v-for="service in services" :key="service.name">
              <p class="about-services-list-item-name">{{ service.name }}</p>
              <p class="about-services-list-item-sub">{{ service.sub }}</p>
            </div>
          </div>
        </HologramBox>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.about {
  height: calc(var(--lvh) * 250);

  &-sticky {
    position: sticky;
    bottom: 0;
    width: 100%;
    height: 0;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-cyan-400);
    font-family: "NB-Architekt-Std";
  }

  &-content {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: var(--space-outer);
    left: 50%;
    transform: translateX(-50%);
    height: calc(var(--lvh) * 100 - var(--height-header));
  }

  &-services {
    position: absolute;
    bottom: var(--space-outer);
    right: var(--space-outer);
    width: calc(100% - var(--space-outer) * 2);

    @include mixins.landscape {
      width: 500px;
      max-width: calc(36% - var(--space-outer));
      bottom: 50%;
      transform: translateY(50%);
      right: 64%;

      @include mixins.mq("xxl") {
        width: 420px;
      }
    }

    &-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
      padding-bottom: var(--space-sm);
      padding-top: var(--space-xs);

      &-item {
        display: flex;
        flex-direction: column;
        padding-left: 28px;
        position: relative;

        &::before {
          content: "";
          position: absolute;
          left: 12px;
          top: 6px;
          width: 6px;
          height: 6px;
          background-color: var(--color-text-cyan-400);
        }

        &-sub {
          font-size: var(--font-size-xs);
        }
      }
    }
  }

  &-first {
    position: absolute;
    bottom: var(--space-outer);
    left: var(--space-outer);
    width: calc(100% - var(--space-outer) * 2);

    @include mixins.landscape {
      width: 500px;
      max-width: calc(42% - var(--space-outer));
      bottom: 50%;
      transform: translateY(50%);
      left: 58%;
      //right: calc(var(--space-outer));

      @include mixins.mq("xxl") {
        width: 460px;
        //right: calc(var(--space-outer) + 8%);
      }
    }

    &-content {
      display: flex;
      justify-content: space-between;
    }

    &-details {
      padding: var(--space-xs) var(--space-sm);
      padding-top: 0;
      display: flex;
      font-size: var(--font-size-sm);

      @include mixins.mq("md") {
        padding: var(--space-sm) var(--space-md);
        padding-top: 0;
        font-size: var(--font-size-md);
      }

      &-copy {
        flex: 0.5;
      }
    }

    &-copy {
      padding: var(--space-sm);

      @include mixins.mq("md") {
        padding: var(--space-md);
      }
    }
  }
}
</style>
