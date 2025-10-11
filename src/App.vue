<script setup lang="ts">
import { onMounted } from "vue";
import { sizes } from "./utils/sizes";
import { scroll } from "./utils/scroll";
import { resources } from "./utils/resources";
import { RouterView } from "vue-router";
import ThreeCanvas from "./three/components/ThreeCanvas.vue";

onMounted(() => {
  sizes.init();
  scroll.init();
  resources.startLoading();
});
</script>

<template>
  <ThreeCanvas />
  <RouterView />
</template>
