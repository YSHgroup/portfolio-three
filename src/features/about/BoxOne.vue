<script setup lang="ts">
import HologramBox from "../../components/HologramBox.vue";
import HologramBoxLine from "../../components/HologramBoxLine.vue";
import { t } from "../../i18n/utils/translate";
import { ref, watchEffect } from "vue";
import gsap from "gsap";
import AppearingText from "../../components/AppearingText.vue";

const wrapperRef = ref<InstanceType<typeof HologramBox> | null>(null);
const timelines = ref<{ timeline: gsap.core.Timeline; delay: number }[]>([]);
const copyRef = ref<HTMLParagraphElement | null>(null);
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

  tl.fromTo(copyRef.value, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.35);

  timelines.value.forEach(({ timeline, delay }) => {
    previousTimelines.value.push(timeline);
    tl.add(() => {
      timeline.play();
    }, delay);
  });

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
</script>

<template>
  <HologramBox ref="wrapperRef" class="box-one">
    <template #title>
      <AppearingText
        :text="`David`"
        :steps="1"
        :duration="0.35"
        @timeline:created="(tl: gsap.core.Timeline) => handleTimelineCreated(tl, 0)"
      />
    </template>
    <div class="box-one-details">
      <AppearingText
        class="box-one-details-copy"
        :text="`${t('location')}: ${t('germany')}`"
        :steps="2"
        :duration="0.35"
        @timeline:created="(tl: gsap.core.Timeline) => handleTimelineCreated(tl, 0.1)"
      />
      <AppearingText
        class="box-one-details-copy"
        :text="`Version: 2.7`"
        :steps="2"
        :duration="0.35"
        @timeline:created="(tl: gsap.core.Timeline) => handleTimelineCreated(tl, 0.2)"
      />
    </div>
    <HologramBoxLine />
    <p class="box-one-copy" v-html="t('about-intro')" ref="copyRef"></p>
  </HologramBox>
</template>

<style scoped lang="scss">
.box-one {
  width: 100%;

  &-content {
    display: flex;
    justify-content: space-between;
  }

  &-details {
    padding: var(--space-xs) var(--space-sm);
    padding-top: 0;
    display: flex;
    font-size: var(--font-size-sm);

    @include mixins.mq("md") {
      padding: var(--space-sm) var(--space-md);
      padding-top: 0;
      font-size: var(--font-size-md);
    }

    &-copy {
      flex: 0.5;
    }
  }

  &-copy {
    padding: var(--space-sm);

    @include mixins.mq("md") {
      padding: var(--space-md);
    }
  }
}
</style>
