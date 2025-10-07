<script setup lang="ts">
import { onMounted } from "vue";
import sizes from "./utils/Sizes";
import ThreeCanvas from "./components/ThreeCanvas.vue";

onMounted(() => {
  sizes.init();
});
</script>

<template>
  <ThreeCanvas />
</template>
