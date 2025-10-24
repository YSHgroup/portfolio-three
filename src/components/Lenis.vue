<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { VueLenis } from "lenis/vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const lenisRef = ref();

watchEffect((onInvalidate) => {
  if (!lenisRef.value?.lenis) return;

  //  if using GSAP ScrollTrigger, update ScrollTrigger on scroll
  lenisRef.value.lenis.on("scroll", ScrollTrigger.update);

  const update = (time: number) => {
    lenisRef.value.lenis.raf(time * 1000);
  };
  gsap.ticker.add(update);

  gsap.ticker.lagSmoothing(0);

  onInvalidate(() => {
    gsap.ticker.remove(update);
  });
});
</script>

<template>
  <VueLenis root ref="lenisRef" :options="{ autoRaf: false }" />
</template>
