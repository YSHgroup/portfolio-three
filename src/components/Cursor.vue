<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { lerp } from "../utils/math";
import gsap from "gsap";

const cursorWrapperRef = ref<HTMLElement | null>(null);
const cursorScaleRef = ref<HTMLElement | null>(null);
const mouseX = ref(0);
const mouseY = ref(0);
const currentX = ref(0);
const currentY = ref(0);
const isHovering = ref(false);
const isVisible = ref(false);
const cursorType = ref<"circle-black" | "arrow" | "circle-white" | null>(null);

const lerpSpeed = 0.1;

const tick = () => {
  // Lerp the current position towards the mouse position
  currentX.value = lerp(currentX.value, mouseX.value, lerpSpeed);
  currentY.value = lerp(currentY.value, mouseY.value, lerpSpeed);

  if (cursorWrapperRef.value) {
    cursorWrapperRef.value.style.transform = `translate(${currentX.value}px, ${currentY.value}px)`;
  }

  if (cursorScaleRef.value) {
    const visibilityScale = isVisible.value ? 1 : 0;
    const hoverScale = isHovering.value ? 1.5 : 1;
    const finalScale = visibilityScale * hoverScale;
    cursorScaleRef.value.style.transform = `scale(${finalScale})`;
  }
};

const checkIfHasCursorAttribute = (element: Element | null): "circle-black" | "arrow" | "circle-white" | null => {
  if (!element) return null;
  if (element instanceof HTMLElement) {
    const cursor = element.dataset.cursor;
    if (cursor === "circle-black" || cursor === "arrow" || cursor === "circle-white") {
      return cursor;
    }
  }
  return checkIfHasCursorAttribute(element.parentElement);
};

const handleMouseMove = (e: MouseEvent) => {
  // Update mouse position
  mouseX.value = e.clientX;
  mouseY.value = e.clientY;

  // Check for cursor attribute and update state
  const detectedType = checkIfHasCursorAttribute(e.target as Element);

  if (detectedType) {
    if (!isVisible.value) {
      isVisible.value = true;
      // Initialize cursor position to current mouse position when first appearing
      currentX.value = mouseX.value;
      currentY.value = mouseY.value;
    }
    cursorType.value = detectedType;
    isHovering.value = true;
  } else {
    isVisible.value = false;
    isHovering.value = false;
    cursorType.value = null;
  }
};

onMounted(() => {
  // Initialize position to center of screen
  mouseX.value = window.innerWidth / 2;
  mouseY.value = window.innerHeight / 2;
  currentX.value = mouseX.value;
  currentY.value = mouseY.value;

  window.addEventListener("mousemove", handleMouseMove);
  gsap.ticker.add(tick);
});

onUnmounted(() => {
  window.removeEventListener("mousemove", handleMouseMove);
  gsap.ticker.remove(tick);
});
</script>

<template>
  <div ref="cursorWrapperRef" class="cursor-wrapper">
    <div ref="cursorScaleRef" class="cursor-scale">
      <div class="cursor cursor-circle-black" :class="{ 'cursor-active': cursorType === 'circle-black' }" />
      <div class="cursor cursor-circle-white" :class="{ 'cursor-active': cursorType === 'circle-white' }" />
      <div class="cursor cursor-arrow" :class="{ 'cursor-active': cursorType === 'arrow' }" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.cursor-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
  will-change: transform;
  display: none;

  // Hide cursor on touch devices
  @include mixins.hover {
    display: block;
  }
}

.cursor-scale {
  position: relative;
  transform-origin: center;
  will-change: transform;
  transition: transform 0.2s ease-out;
}

.cursor {
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.2s ease;

  &-active {
    opacity: 1;
  }

  &-circle-black {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 3px solid var(--color-text-400);
  }

  &-circle-white {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 3px solid var(--color-white-400);
  }

  &-arrow {
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 16px solid green;
    transform: translate(-8px, -8px) rotate(0deg);
  }
}
</style>
