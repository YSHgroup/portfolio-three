<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { transitions } from "../../animations";
import LayoutContent from "../../components/LayoutContent.vue";

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
  <div class="hero" ref="heroElement">
    <LayoutContent>
      <h1 class="hero-title">David</h1>
    </LayoutContent>
  </div>
</template>

<style scoped lang="scss">
.hero {
  height: calc(var(--lvh) * 100);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &-title {
    font-size: 80px;
    font-weight: 800;
    letter-spacing: 2px;
  }
}
</style>
