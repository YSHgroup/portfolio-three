<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { transitions } from "../../animations";
import SectionOne from "./SectionOne.vue";
import SectionTwo from "./SectionTwo.vue";

const aboutRef = ref<HTMLElement | null>(null);
const sectionOneRef = ref<HTMLElement | null>(null);
const sectionTwoRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (aboutRef.value && sectionOneRef.value && sectionTwoRef.value) {
    transitions.about.setup(aboutRef.value, sectionOneRef.value, sectionTwoRef.value);
  }
});

onUnmounted(() => {
  transitions.about.destroy();
});
</script>

<template>
  <div class="about" ref="aboutRef">
    <section ref="sectionOneRef" class="section-one"><SectionOne /></section>
    <section ref="sectionTwoRef" class="section-two"><SectionTwo /></section>
  </div>
</template>

<style scoped lang="scss">
.section {
  &-two {
    @include mixins.mq("md") {
      padding-bottom: 128px;
    }
  }
}

.about {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  font-family: "NB-Architekt-Std";

  @include mixins.mq("md") {
    gap: 128px;
  }

  &-lines {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
