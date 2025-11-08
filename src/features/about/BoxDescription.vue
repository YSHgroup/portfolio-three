<script setup lang="ts">
import { ref, watchEffect, onBeforeUnmount } from "vue";
import gsap from "gsap";
import { BREAKPOINTS } from "../../utils/sizes";
import { Vector3 } from "three";
import ProjectedElement from "../../components/ProjectedElement.vue";
import { t } from "../../i18n/utils/translate";
import AppearingText from "../../components/AppearingText.vue";

const landscapePoint = new Vector3(-1, 2, 6);
const portraitPoint = new Vector3(-0.6, 2.5, 6);

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
        }, item.delay + 0.15);
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
    <div ref="wrapperRef" class="box-description-content">
      <AppearingText
        :text="t('about-tagline')"
        :steps="3"
        :duration="0.7"
        class="box-description-copy"
        @timeline:created="(tl: gsap.core.Timeline) => handleTimelineCreated(tl, 0)"
      />
    </div>
  </ProjectedElement>
</template>

<style scoped lang="scss">
.box-description {
  &-content {
    width: 160px;
    max-width: 34svw;
    position: relative;
    gap: var(--space-xxs);
    display: flex;
    flex-direction: column;
    transform: translate(-100%, 0);
    padding-top: calc(var(--space-sm) + 3px);
    padding-bottom: calc(var(--space-xxs) + 3px);
    padding-left: var(--space-sm);
    padding-right: 48px;

    @include mixins.mq("md") {
      padding-top: calc(var(--space-md) + 3px);
      padding-left: var(--space-md);
    }

    @include mixins.landscape-large {
      width: 360px;
    }

    &::after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      width: 10px;
      height: 10px;
      background-color: var(--color-cyan-400);
      border-radius: 50%;
    }

    &::before {
      content: "";
      position: absolute;
      top: 3px;
      left: 0;
      width: 100%;
      height: calc(100% - 4px);
      border: var(--stroke-md) solid var(--color-cyan-400);
      border-bottom-width: 0;
      border-right-width: 0;
      border-top-left-radius: var(--radius-md);
    }
  }

  &-copy {
    will-change: opacity;
    text-shadow: var(--about-shadow);

    @include mixins.landscape {
      font-size: var(--font-size-sm);
    }

    @include mixins.landscape-large {
      font-size: var(--font-size-lg);
    }
  }
}
</style>
