<script setup lang="ts">
import HologramBox from "../../components/HologramBox.vue";
import { computed, ref, watchEffect } from "vue";
import gsap from "gsap";
import { locale } from "../../i18n/store";
import { t } from "../../i18n/utils/translate";
import AppearingText from "../../components/AppearingText.vue";

const wrapperRef = ref<InstanceType<typeof HologramBox> | null>(null);
const timelines = ref<{ timeline: gsap.core.Timeline; delay: number }[]>([]);
const subRefs = ref<HTMLParagraphElement[]>([]);
let previousMainTimeline: gsap.core.Timeline | null = null;
const previousTimelines = ref<gsap.core.Timeline[]>([]);

const emit = defineEmits<{
  "timeline:created": [timeline: gsap.core.Timeline];
}>();

watchEffect((onInvalidate) => {
  // Stop all previous playing timelines
  if (previousMainTimeline && previousMainTimeline.isActive()) {
    previousMainTimeline.pause();
  }
  previousTimelines.value.forEach((timeline) => {
    if (timeline && timeline.isActive()) {
      timeline.pause();
    }
  });
  previousTimelines.value = [];

  const wrapperEl = wrapperRef.value?.wrapperRef;
  if (!wrapperEl) return;

  const tl = gsap.timeline({
    paused: true,
  });

  tl.fromTo(
    wrapperEl,
    { clipPath: "inset(0% 0% 100% 0%)" },
    { clipPath: "inset(0% 0% 0% 0%)", duration: 0.4, ease: "none" },
    0,
  );

  timelines.value.forEach(({ timeline, delay }) => {
    previousTimelines.value.push(timeline);
    tl.add(() => {
      timeline.play();
    }, delay);
  });

  if (subRefs.value.length > 0) {
    const subItems = subRefs.value.filter((ref) => ref !== null && ref !== undefined);
    if (subItems.length > 0) {
      tl.fromTo(subItems, { opacity: 0 }, { opacity: 1, duration: 0.2, stagger: 0.1 }, 0.3);
    }
  }

  previousMainTimeline = tl;
  emit("timeline:created", tl);

  onInvalidate(() => {
    tl.kill();
    previousMainTimeline = null;
  });
});

const handleTimelineCreated = (timeline: gsap.core.Timeline, delay: number) => {
  timelines.value.push({ timeline, delay });
};

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
  <HologramBox ref="wrapperRef">
    <template #title>
      <AppearingText
        :text="t('services')"
        :steps="1"
        :duration="0.35"
        @timeline:created="(tl: gsap.core.Timeline) => handleTimelineCreated(tl, 0)"
      />
    </template>
    <div class="box-two-list">
      <div class="box-two-list-item" v-for="(service, index) in services" :key="service.name">
        <p class="box-two-list-item-name">
          <AppearingText
            :text="service.name"
            :steps="1"
            :duration="0.35"
            @timeline:created="(tl: gsap.core.Timeline) => handleTimelineCreated(tl, 0.15 + index * 0.1)"
          />
        </p>
        <p
          class="box-two-list-item-sub"
          :ref="
            (el) => {
              if (el) {
                subRefs[index] = el as HTMLParagraphElement;
              }
            }
          "
        >
          {{ service.sub }}
        </p>
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
        opacity: 0;
      }
    }
  }
}
</style>
