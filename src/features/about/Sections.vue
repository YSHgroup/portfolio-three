<script setup lang="ts">
import SectionOne from "./SectionOne.vue";
import SectionTwo from "./SectionTwo.vue";
</script>

<template>
  <div class="about-sections">
    <section class="section-one about-section"><SectionOne /></section>
    <section class="section-two about-section"><SectionTwo /></section>
  </div>
</template>

<style scoped lang="scss">
.about {
  &-sections {
    --gap: 16px;
    position: sticky;
    bottom: calc(var(--gap) * -1);
    width: 100%;
    font-family: "NB-Architekt-Std";
    height: 0;
    pointer-events: none;
  }

  &-section {
    position: absolute;
    bottom: var(--gap);
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
  }
}
</style>
