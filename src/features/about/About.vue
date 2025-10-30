<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { transitions } from "../../animations";
//import HologramBox from "../../components/HologramBox.vue";

const aboutRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (aboutRef.value) {
    transitions.about.setup(aboutRef.value);
  }
});

onUnmounted(() => {
  transitions.about.destroy();
});
</script>

<template>
  <div class="about" ref="aboutRef" id="about"></div>
  <div class="about-sticky">
    <div class="about-content">
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
  height: calc(var(--lvh) * 300);

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
    position: absolute;
    top: var(--space-outer);
    left: var(--space-outer);
    font-size: var(--font-size-xl);

    @include mixins.mq("xxl") {
      left: calc(var(--space-outer) + 8%);
    }
  }

  &-services {
    position: absolute;
    bottom: var(--space-outer);
    left: var(--space-outer);
    width: calc(100% - var(--space-outer) * 2);

    @include mixins.mq("lg") {
      width: 260px;
      left: calc(var(--space-outer) + 8%);
      max-width: 30%;
    }
  }

  &-focus {
    position: absolute;
    bottom: var(--space-outer);
    left: var(--space-outer);
    width: calc(100% - var(--space-outer) * 2);

    @include mixins.mq("lg") {
      width: 460px;
      max-width: 30%;
      bottom: 50%;
      transform: translateY(50%);
      left: unset;
      right: calc(var(--space-outer));
    }

    @include mixins.mq("xxl") {
      right: calc(var(--space-outer) + 8%);
    }
  }
}
</style>
