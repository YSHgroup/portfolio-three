<script setup lang="ts">
import { onMounted } from "vue";
import { sizes } from "./utils/Sizes";
import { scroll } from "./utils/Scroll";
import ThreeCanvas from "./components/ThreeCanvas.vue";
import DarkBackground from "./components/DarkBackground.vue";
import Hero from "./components/Hero.vue";
import { useScrollAnimations } from "./animations/useScrollAnimations";

useScrollAnimations();

onMounted(() => {
  sizes.init();
  scroll.init();
});
</script>

<template>
  <DarkBackground />
  <ThreeCanvas />
  <Hero />
</template>
