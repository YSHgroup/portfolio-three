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
    { clipPath: "inset(0% 0% 0% 0%)", duration: 0.4, ease: "none" },
    0,
  );

  tl.fromTo(copyRef.value, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.35);

  for (let i = 0; i < timelines.value.length; i++) {
    const item = timelines.value[i];
    if (!item) continue;
    tl.add(() => {
      item.timeline.restart(true);
    }, item.delay);
  }

  emit("timeline:created", tl);

  onInvalidate(() => {
    tl.kill();
  });
});

const handleTimelineCreated = (timeline: gsap.core.Timeline, delay: number) => {
  const updatedTimelines = [...timelines.value, { timeline, delay }];
  timelines.value = updatedTimelines;
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
        v-if="t('location') && t('germany')"
        class="box-one-details-copy"
        :text="`${t('location')}: ${t('germany')}`"
        :steps="3"
        :duration="0.35"
        @timeline:created="(tl: gsap.core.Timeline) => handleTimelineCreated(tl, 0.1)"
      />
      <AppearingText
        v-if="t('version')"
        class="box-one-details-copy"
        :text="`${t('version')}: 2.7`"
        :steps="3"
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
