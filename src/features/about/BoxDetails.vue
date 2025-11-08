<script setup lang="ts">
import { t } from "../../i18n/utils/translate";
import { ref, watchEffect, onBeforeUnmount, onMounted } from "vue";
import gsap from "gsap";
import AppearingText from "../../components/AppearingText.vue";
import { BREAKPOINTS } from "../../utils/sizes";
import { Vector3 } from "three";
import { camera } from "../../three/core/camera";

const point = new Vector3(-0.45, 2.9, 6.5);

const wrapperRef = ref<HTMLDivElement | null>(null);
const wrapperWrapperRef = ref<HTMLDivElement | null>(null);
const timelines = ref<{ timeline: gsap.core.Timeline; delay: number }[]>([]);
let matchMedia: gsap.MatchMedia | null = null;
let tickCallback: (() => void) | null = null;

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
          { clipPath: "inset(0% 0% 0% 100%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.3, ease: "none" },
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
        }, item.delay + 0.25);
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

const updatePosition = () => {
  if (!wrapperWrapperRef.value) return;

  const screenPos = camera.project(point);

  wrapperWrapperRef.value.style.transform = `translate(calc(${screenPos.x}px - 100%), calc(${screenPos.y}px - 100%))`;
};

onMounted(() => {
  tickCallback = updatePosition;
  gsap.ticker.add(tickCallback);
});

onBeforeUnmount(() => {
  if (matchMedia) {
    matchMedia.revert();
  }
  if (tickCallback) {
    gsap.ticker.remove(tickCallback);
  }
});

const handleTimelineCreated = (timeline: gsap.core.Timeline, delay: number) => {
  const updatedTimelines = [...timelines.value, { timeline, delay }];
  timelines.value = updatedTimelines;
};
</script>

<template>
  <div ref="wrapperWrapperRef" class="box-details">
    <div ref="wrapperRef" class="box-details-content">
      <div class="box-details-title">
        <AppearingText
          text="David"
          :steps="1"
          :duration="0.35"
          @timeline:created="(tl: gsap.core.Timeline) => handleTimelineCreated(tl, 0)"
        />
      </div>
      <div class="box-details-items">
        <div class="box-details-item">
          <AppearingText
            v-if="t('location') && t('germany')"
            class="box-details-content-copy"
            :text="`${t('location')}: ${t('germany')}`"
            :steps="3"
            :duration="0.35"
            @timeline:created="(tl: gsap.core.Timeline) => handleTimelineCreated(tl, 0.1)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.box-details {
  width: 0;
  height: 0;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  &-content {
    min-width: 280px;
    position: relative;
    padding-bottom: var(--space-md);
    padding-left: var(--space-md);
    gap: var(--space-xxs);
    display: flex;
    flex-direction: column;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      right: 0;
      width: 10px;
      height: 10px;
      background-color: var(--color-cyan-400);
      border-radius: 50%;
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: calc(100% - 4px);
      border: var(--stroke-md) solid var(--color-cyan-400);
      border-top-width: 0;
      border-right-width: 0;
      border-bottom-left-radius: var(--radius-md);
    }
  }

  &-icon {
    width: var(--icon-size-xs);
    transform: translateY(-1px);
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

  &-items {
    display: flex;
    font-size: var(--font-size-sm);
    flex-direction: column;

    @include mixins.mq("md") {
      font-size: var(--font-size-md);
    }

    &-copy {
      flex: 0.5;
    }
  }
}
</style>
