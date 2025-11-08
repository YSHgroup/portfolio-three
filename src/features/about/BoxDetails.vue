<script setup lang="ts">
import { t } from "../../i18n/utils/translate";
import { ref, watchEffect, onBeforeUnmount } from "vue";
import gsap from "gsap";
import AppearingText from "../../components/AppearingText.vue";
import { BREAKPOINTS } from "../../utils/sizes";
import PinIcon from "../../components/icons/Pin.vue";

const wrapperRef = ref<HTMLDivElement | null>(null);
const timelines = ref<{ timeline: gsap.core.Timeline; delay: number }[]>([]);
let matchMedia: gsap.MatchMedia | null = null;

const emit = defineEmits<{
  "timeline:created": [timeline: gsap.core.Timeline];
}>();

watchEffect((onInvalidate) => {
  const wrapperEl = wrapperRef.value;
  if (!wrapperEl) return;

  // Clean up previous matchMedia
  if (matchMedia) {
    matchMedia.revert();
    matchMedia = null;
  }

  // Initialize GSAP matchMedia
  matchMedia = gsap.matchMedia();

  matchMedia.add(
    {
      isMobile: `(max-width: ${BREAKPOINTS.md - 1}px)`,
      isDesktop: `(min-width: ${BREAKPOINTS.md}px)`,
    },
    (context) => {
      const { conditions } = context;
      const { isMobile } = conditions as { isMobile: boolean; isDesktop: boolean };

      const tl = gsap.timeline({
        paused: true,
      });

      // Only animate clipPath on desktop
      if (!isMobile) {
        tl.fromTo(
          wrapperEl,
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.4, ease: "none" },
          0,
        );
      } else {
        // On mobile, ensure clipPath is set to visible immediately
        gsap.set(wrapperEl, { clipPath: "inset(0% 0% 0% 0%)" });
      }

      for (let i = 0; i < timelines.value.length; i++) {
        const item = timelines.value[i];
        if (!item) continue;
        tl.add(() => {
          item.timeline.restart(true);
        }, item.delay);
      }

      emit("timeline:created", tl);

      // Return cleanup function
      return () => {
        tl.kill();
      };
    },
  );

  onInvalidate(() => {
    if (matchMedia) {
      matchMedia.revert();
      matchMedia = null;
    }
  });
});

onBeforeUnmount(() => {
  if (matchMedia) {
    matchMedia.revert();
  }
});

const handleTimelineCreated = (timeline: gsap.core.Timeline, delay: number) => {
  const updatedTimelines = [...timelines.value, { timeline, delay }];
  timelines.value = updatedTimelines;
};
</script>

<template>
  <div class="box-details-wrapper">
    <div ref="wrapperRef" class="box-details">
      <div class="box-details-line"></div>
      <div class="box-details-title">
        <AppearingText
          text="David"
          :steps="1"
          :duration="0.35"
          @timeline:created="(tl: gsap.core.Timeline) => handleTimelineCreated(tl, 0)"
        />
      </div>
      <div class="box-details-content">
        <div class="box-details-item">
          <PinIcon class="box-details-icon" />
          <AppearingText
            v-if="t('germany')"
            class="box-details-content-copy"
            :text="t('germany')"
            :steps="3"
            :duration="0.35"
            @timeline:created="(tl: gsap.core.Timeline) => handleTimelineCreated(tl, 0.1)"
          />
        </div>
        <div class="box-details-item">
          <AppearingText
            v-if="t('version')"
            class="box-details-content-copy"
            :text="`${t('version')}: 2.7`"
            :steps="3"
            :duration="0.35"
            @timeline:created="(tl: gsap.core.Timeline) => handleTimelineCreated(tl, 0.2)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.box-details {
  width: 240px;
  position: relative;
  padding-bottom: calc(var(--space-sm) + 32px);

  &-wrapper {
    width: 240px;
    position: relative;
    transform: translate(-100%, -100%);

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      right: calc(-5px + var(--stroke-md));
      width: 10px;
      height: 10px;
      background-color: var(--color-cyan-400);
      border-radius: 50%;
    }
  }

  &-line {
    border-top-right-radius: var(--radius-md);
    border: var(--stroke-md) solid var(--color-cyan-400);
    border-left-width: 0;
    border-bottom-width: 0;
    height: 32px;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  &-icon {
    width: var(--icon-size-sm);
  }

  &-item {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    flex-direction: row;
    white-space: nowrap;
    height: var(--icon-size-sm);
  }

  &-title {
    font-size: var(--font-size-title-sm);
  }

  &-content {
    display: flex;
    font-size: var(--font-size-sm);

    @include mixins.mq("md") {
      font-size: var(--font-size-md);
    }

    &-copy {
      flex: 0.5;
    }
  }
}
</style>
