<script setup lang="ts">
import { ref, onMounted } from "vue";
import { transitions } from "../../animations";

const aboutElement = ref<HTMLElement | null>(null);

onMounted(() => {
  if (aboutElement.value) {
    transitions.about(aboutElement.value);
  }
});
</script>

<template>
  <div class="about" ref="aboutElement">
    <p>about</p>
  </div>
</template>

<style scoped lang="scss">
.about {
  min-height: calc(var(--100vh) + 320px);
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 200px;

  &-lines {
    position: absolute;
    top: 0;
    left: 0;
  }

  &-overlay {
    position: absolute;
    transform: translateY(calc(var(--100vh) * -1));
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% + var(--100vh));
    opacity: 0;
  }
}
</style>
