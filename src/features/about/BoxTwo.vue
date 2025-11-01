<script setup lang="ts">
import HologramBox from "../../components/HologramBox.vue";
import { computed, ref, watchEffect } from "vue";
import gsap from "gsap";
import { locale } from "../../i18n/store";
import { t } from "../../i18n/utils/translate";

const wrapperRef = ref<InstanceType<typeof HologramBox> | null>(null);

const emit = defineEmits<{
  "timeline:created": [timeline: gsap.core.Timeline];
}>();

watchEffect((onInvalidate) => {
  const wrapperEl = wrapperRef.value?.wrapperRef;
  if (!wrapperEl) return;

  const tl = gsap.timeline({
    paused: true,
  });

  tl.fromTo(
    wrapperEl,
    { clipPath: "inset(0% 0% 100% 0%)" },
    { clipPath: "inset(0% 0% 0% 0%)", duration: 0.5, ease: "power1.out" },
    0,
  );

  emit("timeline:created", tl);

  onInvalidate(() => {
    tl.kill();
  });
});

const SERVICES_EN = [
  { name: "Frontend Development", sub: "React, Vue" },
  { name: "Backend Development", sub: "Node.js, Redis, PostgreSQL" },
  { name: "WebGL & Creative Coding", sub: "Three.js, GLSL, GSAP, SVG" },
  { name: "Real-Time Systems", sub: "WebSockets, multiplayer logic" },
] as const satisfies { name: string; sub: string }[];

const SERVICES_DE = [
  { name: "Frontend-Entwicklung", sub: "React, Vue" },
  { name: "Backend-Entwicklung", sub: "Node.js, Redis, PostgreSQL" },
  { name: "WebGL & Creative Coding", sub: "Three.js, GLSL, GSAP, SVG" },
  { name: "Echtzeit-Systeme", sub: "WebSockets, Multiplayer-Logik" },
] as const satisfies { name: string; sub: string }[];

const services = computed(() => {
  return locale.value === "en" ? SERVICES_EN : SERVICES_DE;
});
</script>

<template>
  <HologramBox ref="wrapperRef" :title="t('services')">
    <div class="box-two-list">
      <div class="box-two-list-item" v-for="service in services" :key="service.name">
        <p class="box-two-list-item-name">{{ service.name }}</p>
        <p class="box-two-list-item-sub">{{ service.sub }}</p>
      </div>
    </div>
  </HologramBox>
</template>

<style scoped lang="scss">
.box-two {
  &-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    padding-bottom: var(--space-sm);
    padding-top: var(--space-xs);

    &-item {
      display: flex;
      flex-direction: column;
      padding-left: 28px;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        left: 12px;
        top: 6px;
        width: 6px;
        height: 6px;
        background-color: var(--color-text-cyan-400);
      }

      &-sub {
        font-size: var(--font-size-xs);
      }
    }
  }
}
</style>
