<script setup lang="ts">
import { t } from "../../i18n/utils/translate";
import { ref, watchEffect, onBeforeUnmount } from "vue";
import gsap from "gsap";
import AppearingText from "../../components/AppearingText.vue";
import { BREAKPOINTS } from "../../utils/sizes";
import { Vector3 } from "three";
import PinIcon from "../../components/icons/Pin.vue";
import ProjectedElement from "../../components/ProjectedElement.vue";

const landscapePoint = new Vector3(-0.875, 3.6, 6.5);
const portraitPoint = new Vector3(-0.6, 4.2, 6.5);

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
  <ProjectedElement :landscape="landscapePoint" :portrait="portraitPoint">
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
      </div>
    </div>
  </ProjectedElement>
</template>

<style scoped lang="scss">
.box-details-content {
  width: 160px;
  max-width: 34svw;
  position: relative;
  gap: var(--space-xxs);
  display: flex;
  flex-direction: column;
  transform: translate(-100%, -100%);
  padding-bottom: var(--space-sm);
  padding-top: var(--space-xxs);
  padding-left: var(--space-sm);

  @include mixins.mq("md") {
    padding-bottom: var(--space-md);
    padding-left: var(--space-md);
  }

  @include mixins.landscape-large {
    width: 240px;
  }

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
    opacity: 0.5;
  }
}

.box-details-item {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  flex-direction: row;
  white-space: nowrap;
  height: var(--icon-size-sm);
}

.box-details-icon {
  width: var(--icon-size-xxs);
  transform: translateY(-1px);

  @include mixins.mq("md") {
    width: var(--icon-size-xs);
  }
}

.box-details-title {
  font-size: var(--font-size-title-xxs);

  @include mixins.mq("md") {
    font-size: var(--font-size-title-sm);
  }
}

.box-details-items {
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
</style>
