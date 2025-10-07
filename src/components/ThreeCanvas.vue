<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { three } from "../three";

const canvasRef = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  three.init(canvasRef.value as HTMLCanvasElement);
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
