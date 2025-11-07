<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { transitions } from "../../animations";
import BoxOne from "./BoxOne.vue";
import BoxTwo from "./BoxTwo.vue";
import gsap from "gsap";

const aboutRef = ref<HTMLElement | null>(null);
const contentOneRef = ref<HTMLDivElement | null>(null);
const contentTwoRef = ref<HTMLDivElement | null>(null);
const tlOneRef = ref<gsap.core.Timeline | null>(null);
const tlTwoRef = ref<gsap.core.Timeline | null>(gsap.timeline({ paused: true }));

watchEffect((onInvalidate) => {
  if (aboutRef.value && tlOneRef.value && contentOneRef.value && tlTwoRef.value && contentTwoRef.value) {
    transitions.about.setup({
      about: aboutRef.value,
      contentOne: contentOneRef.value,
      tlOne: tlOneRef.value,
      contentTwo: contentTwoRef.value,
      tlTwo: tlTwoRef.value,
    });
  }

  onInvalidate(() => {
    transitions.about.destroy();
  });
});
</script>

<template>
  <div class="about" ref="aboutRef" id="about"></div>
  <div class="about-sticky">
    <div class="about-content">
      <div class="about-right" ref="contentOneRef">
        <div class="about-right-content">
          <BoxOne @timeline:created="(tl: gsap.core.Timeline) => (tlOneRef = tl)" />
        </div>
      </div>
      <div class="about-services" ref="contentTwoRef">
        <div class="about-services-content">
          <BoxTwo @timeline:created="(tl: gsap.core.Timeline) => (tlTwoRef = tl)" />
        </div>
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
      bottom: calc(var(--space-outer) + 10%);
      left: var(--space-outer);
      min-width: 260px;

      @include mixins.mq("xxl") {
        width: 420px;
        left: calc(var(--space-outer) + 8%);
      }
    }
  }

  &-right {
    position: absolute;
    bottom: var(--space-outer);
    right: var(--space-outer);
    width: calc(100% - var(--space-outer) * 2);

    @include mixins.landscape {
      width: 300px;
      max-width: calc(36% - var(--space-outer));
    }

    &-content {
      @include mixins.landscape {
        transform: translateY(50%);
      }
    }

    @include mixins.landscape {
      width: 500px;
      max-width: calc(42% - var(--space-outer));
      bottom: 50%;
      right: var(--space-outer);

      @include mixins.mq("xxl") {
        width: 460px;
        right: calc(var(--space-outer) + 8%);
      }
    }
  }
}
</style>
