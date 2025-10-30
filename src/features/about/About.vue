<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { transitions } from "../../animations";
import HologramBox from "../../components/HologramBox.vue";

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
      <HologramBox class="about-focus" title="Focus" footer>
        <p class="section-one-hologram-box-copy">
          David focuses on modern web technologies that bridge visuals and performance.
          <br />With expertise in WebGL, TypeScript, and Node.js, he builds scalable systems and real-time 3D interfaces
          for the web.
        </p>
      </HologramBox>
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
  }

  &-content {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: var(--space-outer);
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
