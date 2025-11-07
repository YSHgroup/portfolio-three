<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { transitions } from "../../animations";
import BoxDescription from "./BoxDescription.vue";
import BoxServices from "./BoxServices.vue";
import gsap from "gsap";

const aboutRef = ref<HTMLElement | null>(null);
const contentDescriptionRef = ref<HTMLDivElement | null>(null);
const contentServicesRef = ref<HTMLDivElement | null>(null);
const tlDescriptionRef = ref<gsap.core.Timeline | null>(null);
const tlServicesRef = ref<gsap.core.Timeline | null>(gsap.timeline({ paused: true }));

watchEffect((onInvalidate) => {
  if (
    aboutRef.value &&
    tlDescriptionRef.value &&
    contentDescriptionRef.value &&
    tlServicesRef.value &&
    contentServicesRef.value
  ) {
    transitions.about.setup({
      about: aboutRef.value,
      contentDescription: contentDescriptionRef.value,
      tlDescription: tlDescriptionRef.value,
      contentServices: contentServicesRef.value,
      tlServices: tlServicesRef.value,
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
      <div class="about-right" ref="contentDescriptionRef">
        <div class="about-right-content">
          <BoxDescription @timeline:created="(tl: gsap.core.Timeline) => (tlDescriptionRef = tl)" />
        </div>
      </div>
      <div class="about-left">
        <div class="about-left-content">
          <div ref="contentServicesRef">
            <BoxServices @timeline:created="(tl: gsap.core.Timeline) => (tlServicesRef = tl)" />
          </div>
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

  &-left {
    position: absolute;
    bottom: var(--space-outer);
    right: var(--space-outer);
    width: calc(100% - var(--space-outer) * 2);

    @include mixins.landscape {
      width: 500px;
      max-width: calc(36% - var(--space-outer));
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      left: var(--space-outer);

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

    &-content {
      @include mixins.landscape {
        transform: translateY(50%);
      }
    }

    @include mixins.landscape {
      width: 500px;
      max-width: calc(36% - var(--space-outer));
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
