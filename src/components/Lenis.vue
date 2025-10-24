<script setup lang="ts">
import { ref, watchEffect, watch } from "vue";
import { VueLenis } from "lenis/vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { pathnameWithoutLocale } from "../i18n/store";

const lenisRef = ref();
const homeScrollPosition = ref(0);

watchEffect((onInvalidate) => {
  if (!lenisRef.value?.lenis) return;

  //  if using GSAP ScrollTrigger, update ScrollTrigger on scroll
  lenisRef.value.lenis.on("scroll", ScrollTrigger.update);

  const update = (time: number) => {
    lenisRef.value.lenis.raf(time * 1000);
  };
  gsap.ticker.add(update);

  gsap.ticker.lagSmoothing(0);

  const handleScroll = () => {
    if (pathnameWithoutLocale.value === "/") {
      homeScrollPosition.value = lenisRef.value.lenis?.scroll.y ?? 0;
    }
  };

  lenisRef.value.lenis?.on("scroll", handleScroll);

  onInvalidate(() => {
    gsap.ticker.remove(update);
    lenisRef.value.lenis?.off("scroll", handleScroll);
  });
});

watch(pathnameWithoutLocale, (newPathnameWithoutLocale) => {
  if (newPathnameWithoutLocale === "/") {
    lenisRef.value.lenis?.scrollTo(homeScrollPosition.value, { immediate: true, force: true });
  } else {
    lenisRef.value.lenis?.scrollTo(0, { immediate: true, force: true });
  }
});
</script>

<template>
  <VueLenis root ref="lenisRef" :options="{ autoRaf: false }" />
</template>
