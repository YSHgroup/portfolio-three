<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Vector3 } from "three";
import { camera } from "../three/core/camera";
import { sizes } from "../utils/sizes";
import gsap from "gsap";

const props = defineProps<{
  landscape: Vector3;
  portrait: Vector3;
}>();

const wrapperRef = ref<HTMLDivElement | null>(null);

const updatePosition = () => {
  if (!wrapperRef.value) return;

  const point = sizes.isLandscape() ? props.landscape : props.portrait;
  const screenPos = camera.project(point);
  wrapperRef.value.style.transform = `translate(calc(${screenPos.x}px), calc(${screenPos.y}px))`;
};

onMounted(() => {
  gsap.ticker.add(updatePosition);
});

onBeforeUnmount(() => {
  gsap.ticker.remove(updatePosition);
});
</script>

<template>
  <div ref="wrapperRef" class="projected-element">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.projected-element {
  width: 0;
  height: 0;
  position: relative;
}
</style>
