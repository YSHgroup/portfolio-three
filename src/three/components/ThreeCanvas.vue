<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import { three } from "../index";
import { resources } from "../../utils/resources";
import { useRoute } from "vue-router";

const route = useRoute();

const canvasRef = ref<HTMLCanvasElement | null>(null);
const isReady = ref(false);

watch(route, () => {
  three.setActive(!!route.meta?.isThreeActive);
});

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
