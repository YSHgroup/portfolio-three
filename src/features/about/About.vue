<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { transitions } from "../../animations";
import BoxDescription from "./BoxDescription.vue";
import BoxServices from "./BoxServices.vue";
import BoxDetails from "./BoxDetails.vue";

const contentDescriptionRef = ref<HTMLDivElement | null>(null);
const contentServicesRef = ref<HTMLDivElement | null>(null);
const contentDetailsRef = ref<HTMLDivElement | null>(null);
const tlDescriptionRef = ref<gsap.core.Timeline | null>(null);
const tlServicesRef = ref<gsap.core.Timeline | null>(null);
const tlDetailsRef = ref<gsap.core.Timeline | null>(null);

const props = defineProps<{
  spacerRef: HTMLElement | null;
}>();

watchEffect((onInvalidate) => {
  if (
    props.spacerRef &&
    tlDescriptionRef.value &&
    contentDescriptionRef.value &&
    tlServicesRef.value &&
    contentServicesRef.value &&
    contentDetailsRef.value &&
    tlDetailsRef.value
  ) {
    transitions.about.setup({
      about: props.spacerRef,
      contentDescription: contentDescriptionRef.value,
      tlDescription: tlDescriptionRef.value,
      contentServices: contentServicesRef.value,
      tlServices: tlServicesRef.value,
      contentDetails: contentDetailsRef.value,
      tlDetails: tlDetailsRef.value,
    });
  }

  onInvalidate(() => {
    transitions.about.destroy();
  });
});
</script>

<template>
  <div class="about-sticky">
    <div class="about-content">
      <div ref="contentDetailsRef" class="about-details">
        <BoxDetails @timeline:created="(tl: gsap.core.Timeline) => (tlDetailsRef = tl)" />
      </div>
      <div class="about-right" ref="contentDescriptionRef">
        <div class="about-right-content">
          <BoxDescription @timeline:created="(tl: gsap.core.Timeline) => (tlDescriptionRef = tl)" />
        </div>
      </div>
      <div class="about-left">
        <div class="about-left-content">
          <div ref="contentServicesRef" class="about-left-content-services">
            <BoxServices @timeline:created="(tl: gsap.core.Timeline) => (tlServicesRef = tl)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.about {
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

  &-details {
    display: flex;
    justify-content: center;
    align-items: center;
    will-change: transform, opacity;
    width: 100%;
    height: 0;
    position: absolute;
    top: calc(50% - var(--height-header) / 2);
    left: 0;
  }

  &-left {
    position: absolute;
    bottom: var(--space-outer);
    right: var(--space-outer);
    width: calc(100% - var(--space-outer) * 2);

    @include mixins.landscape {
      width: 500px;
      max-width: calc(38% - var(--space-outer));
      height: 100%;
      right: var(--space-outer);

      @include mixins.mq("xxl") {
        width: 420px;
        right: calc(var(--space-outer) + 8%);
      }
    }

    &-content {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      gap: var(--space-sm);

      //@include mixins.landscape {
      //  padding-bottom: 8%;
      //}

      @include mixins.landscape-large {
        gap: var(--space-xl);
        padding-bottom: 35%;
      }

      &-services {
        will-change: transform, opacity;
      }
    }
  }

  &-right {
    position: absolute;
    bottom: var(--space-outer);
    right: var(--space-outer);
    width: calc(100% - var(--space-outer) * 2);
    will-change: transform, opacity;

    @include mixins.landscape {
      width: 500px;
      max-width: calc(38% - var(--space-outer));
      bottom: var(--space-outer);
      left: var(--space-outer);

      @include mixins.mq("xxl") {
        width: 460px;
        left: calc(var(--space-outer) + 8%);
      }
    }

    &-content {
      //@include mixins.landscape {
      //  padding-bottom: 8%;
      //}

      @include mixins.landscape-large {
        padding-bottom: 35%;
      }
    }
  }
}
</style>
