<script setup lang="ts">
import { ref, watchEffect } from "vue";
import gsap from "gsap";

const props = defineProps<{
  text: string;
  steps: number;
  duration: number;
}>();

const emit = defineEmits<{
  "timeline:created": [timeline: gsap.core.Timeline];
}>();

// Animation configuration constants
const FLICKER_CHARACTER_POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const displayText = ref("");
let currentTimeline: gsap.core.Timeline | null = null;

const randomChar = () => FLICKER_CHARACTER_POOL[Math.floor(Math.random() * FLICKER_CHARACTER_POOL.length)];

watchEffect((onInvalidate) => {
  // Kill previous timeline if it exists
  if (currentTimeline) {
    currentTimeline.kill();
    currentTimeline = null;
  }

  // Reset display text
  displayText.value = "";

  // Skip animation if user prefers reduced motion
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    displayText.value = props.text;
    return;
  }

  // Recalculate animation parameters based on current text
  const totalLetters = props.text.length;
  const totalSteps = Math.ceil(totalLetters / props.steps);
  const DURATION_PER_STEP = props.duration / totalSteps;

  const timeline = gsap.timeline({
    paused: true,
  });

  for (let step = 0; step < totalSteps; step++) {
    const startIndex = step * props.steps;

    const progress = { value: 0 };

    // Flicker phase for this group of letters
    timeline.to(progress, {
      value: 1,
      duration: DURATION_PER_STEP,
      onUpdate: () => {
        const revealed = props.text.slice(0, startIndex);
        const remaining = totalLetters - startIndex;
        const flickerLength = Math.min(props.steps, remaining);
        const flicker = Array(flickerLength)
          .fill(0)
          .map(() => randomChar())
          .join("");
        displayText.value = revealed + flicker;
      },
      onComplete: () => {
        displayText.value = props.text;
      },
    });
  }

  currentTimeline = timeline;

  // Emit the timeline to parent
  emit("timeline:created", timeline);

  onInvalidate(() => {
    if (currentTimeline) {
      currentTimeline.kill();
      currentTimeline = null;
    }
  });
});
</script>

<template>
  <div class="appearing-text">
    <p class="appearing-text-value" v-html="displayText"></p>
    <p class="appearing-text-clone" aria-hidden="true" v-html="props.text"></p>
  </div>
</template>

<style scoped>
.appearing-text {
  position: relative;
  display: inline-block;
}

.appearing-text-value {
  position: absolute;
  inset: 0;
}

.appearing-text-clone {
  visibility: hidden;
}
</style>
