<script setup lang="ts">
import { onMounted } from "vue";
import { sizes } from "./utils/sizes";
import { scroll } from "./utils/scroll";
import { waypoints } from "./three/core/waypoints";
import { resources } from "./utils/resources";
import { RouterView } from "vue-router";
import { useScrollAnimations } from "./animations/useScrollAnimations";
import ThreeCanvas from "./three/components/ThreeCanvas.vue";

useScrollAnimations();

onMounted(() => {
  sizes.init();
  scroll.init();
  waypoints.init();
  resources.startLoading();
});
</script>

<template>
  <ThreeCanvas />
  <RouterView />
</template>
