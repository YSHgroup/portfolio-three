<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { transitions } from "../../animations";

const heroElement = ref<HTMLElement | null>(null);

onMounted(() => {
  if (heroElement.value) {
    transitions.hero.setup(heroElement.value);
  }
});

onUnmounted(() => {
  transitions.hero.destroy();
});
</script>

<template>
  <div class="hero" ref="heroElement"></div>
</template>

<style scoped lang="scss">
.hero {
  height: var(--100vh);
}
</style>
