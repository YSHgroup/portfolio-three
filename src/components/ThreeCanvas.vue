<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { three } from "../three";
import { resources } from "../utils/Resources";

const canvasRef = ref<HTMLCanvasElement | null>(null);
const isReady = ref(false);

onMounted(() => {
  resources.once("ready", () => {
    if (isReady.value) return;
    three.init(canvasRef.value as HTMLCanvasElement);
    isReady.value = true;
  });
});

onUnmounted(() => {
  three.destroy();
});
</script>

<template>
  <canvas class="three-canvas" ref="canvasRef"></canvas>
</template>

<style scoped lang="scss">
.three-canvas {
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--z-index-canvas);
}
</style>
