<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { transitions } from "../../animations";
import HologramBox from "../../components/HologramBox.vue";
import HologramBoxLine from "../../components/HologramBoxLine.vue";

const aboutRef = ref<HTMLElement | null>(null);
const firstHologramBoxRef = ref<{ tl: gsap.core.Timeline | null; wrapperRef: HTMLDivElement | null } | null>(null);

watchEffect((onInvalidate) => {
  if (aboutRef.value && firstHologramBoxRef.value?.tl && firstHologramBoxRef.value.wrapperRef) {
    transitions.about.setup({
      about: aboutRef.value,
      firstHologramBoxTl: firstHologramBoxRef.value.tl,
      firstHologramBoxWrapper: firstHologramBoxRef.value.wrapperRef,
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
      <div class="about-first">
        <HologramBox title="David" ref="firstHologramBoxRef">
          <div class="about-first-details">
            <p class="about-first-details-copy">Location: Germany</p>
            <p class="about-first-details-copy">Version: 2.7</p>
          </div>
          <HologramBoxLine />
          <p class="about-first-copy">
            Focuses on modern web technologies that bridge visuals and performance.
            <br />With expertise in WebGL, TypeScript, and Node.js, he builds scalable systems and real-time 3D
            interfaces for the web.
          </p>
        </HologramBox>
      </div>
      <!--      <div class="about-details">
        <p class="about-details-copy">Name: David</p>
        <p class="about-details-copy">Location: Germany</p>
      </div>
      <HologramBox class="about-focus" title="Focus">
        <p class="section-one-hologram-box-copy">
          David focuses on modern web technologies that bridge visuals and performance.
          <br />With expertise in WebGL, TypeScript, and Node.js, he builds scalable systems and real-time 3D interfaces
          for the web.
        </p>
      </HologramBox>
      <HologramBox class="about-services" title="Services">
        <p>- Frontend Development</p>
        <p>- Backend Development</p>
        <p>- Creative Coding</p>
        <p>- 3D Design</p>
        <p>- WebGL</p>
      </HologramBox>-->
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
    left: var(--space-outer);
    width: calc(100% - var(--space-outer) * 2);

    @include mixins.landscape {
      width: 260px;
      left: calc(var(--space-outer) + 8%);
      max-width: 30%;
    }
  }

  &-first {
    position: absolute;
    bottom: var(--space-outer);
    left: var(--space-outer);
    width: calc(100% - var(--space-outer) * 2);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: var(--space-md);

    &-content {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }

    &-details {
      padding: var(--space-xs) var(--space-sm);
      padding-top: 0;
      display: flex;
      font-size: var(--font-size-sm);

      @include mixins.mq("md") {
        padding: var(--space-sm) var(--space-md);
        padding-top: var(--space-xxs);
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
  }
}
</style>
