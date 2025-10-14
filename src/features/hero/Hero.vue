<script setup lang="ts">
import { ref, onMounted } from "vue";
import { transitions } from "../../animations";

const heroElement = ref<HTMLElement | null>(null);

onMounted(() => {
  if (heroElement.value) {
    transitions.hero(heroElement.value);
  }
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
