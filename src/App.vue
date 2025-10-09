<script setup lang="ts">
import { onMounted } from "vue";
import { sizes } from "./utils/sizes";
import { scroll } from "./utils/scroll";
import { waypoints } from "./three/core/waypoints";
import { resources } from "./utils/resources";

import ThreeCanvas from "./components/ThreeCanvas.vue";
import DarkBackground from "./components/DarkBackground.vue";
import Hero from "./components/Hero.vue";
import { useScrollAnimations } from "./animations/useScrollAnimations";

useScrollAnimations();

onMounted(() => {
  sizes.init();
  scroll.init();
  waypoints.init();
  resources.startLoading();
});
</script>

<template>
  <DarkBackground />
  <ThreeCanvas />
  <Hero />
</template>
