<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { transitions } from "../../animations";
import SectionOne from "./SectionOne.vue";
import SectionTwo from "./SectionTwo.vue";

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
  <div class="about" ref="aboutRef"></div>
  <div class="about-sections">
    <div class="about-sticky-wrapper">
      <section class="section-one about-section"><SectionOne /></section>
      <section class="section-two about-section"><SectionTwo /></section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.about {
  height: calc(var(--lvh) * 300);

  &-sections {
    position: absolute;
    width: 100%;
    top: 0;
    height: 100%;
    padding-bottom: 24px;
    font-family: "NB-Architekt-Std";
  }

  &-section {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
  }

  &-sticky-wrapper {
    position: sticky;
    height: calc(var(--lvh) * 100);
    top: 0;
    width: 100%;
  }

  &-lines {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
