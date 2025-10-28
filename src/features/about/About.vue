<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { transitions } from "../../animations";

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
</template>

<style scoped lang="scss">
.about {
  height: calc(var(--lvh) * 300);
}
</style>
