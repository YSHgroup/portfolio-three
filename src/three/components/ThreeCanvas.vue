<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import { three } from "../index";
import { resources } from "../../utils/resources";
import { useRoute } from "vue-router";
import { sizes } from "../../utils/sizes";
import { scroll } from "../../utils/scroll";

const route = useRoute();

const canvasRef = ref<HTMLCanvasElement | null>(null);
const isReady = ref(false);

watch(route, () => {
  three.setActive(!!route.meta?.isThreeActive);
});

onMounted(() => {
  resources.once("ready", () => {
    if (isReady.value) return;
    scroll.init();

    three.init(canvasRef.value as HTMLCanvasElement);
    sizes.init(canvasRef.value as HTMLCanvasElement);

    isReady.value = true;
  });
});

onUnmounted(() => {
  three.destroy();
});
</script>

<template>
  <aside class="three-wrapper">
    <canvas ref="canvasRef" class="three-canvas"></canvas>
  </aside>
</template>

<style scoped lang="scss">
.three-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--z-index-canvas);
  overflow: hidden;
  width: 100%;
  height: calc(var(--lvh) * 100);
}

.three-canvas {
  width: 100%;
  height: 100%;
}
</style>
