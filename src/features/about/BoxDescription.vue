<script setup lang="ts">
import HologramBox from "../../components/HologramBox.vue";
import { t } from "../../i18n/utils/translate";
import { ref, watchEffect, onBeforeUnmount } from "vue";
import gsap from "gsap";
import AppearingText from "../../components/AppearingText.vue";
import { BREAKPOINTS } from "../../utils/sizes";

const wrapperRef = ref<InstanceType<typeof HologramBox> | null>(null);
const timelines = ref<{ timeline: gsap.core.Timeline; delay: number }[]>([]);
const copyRef = ref<HTMLParagraphElement | null>(null);
let matchMedia: gsap.MatchMedia | null = null;

const emit = defineEmits<{
  "timeline:created": [timeline: gsap.core.Timeline];
}>();

watchEffect((onInvalidate) => {
  const wrapperEl = wrapperRef.value?.wrapperRef;
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

      // Only fade in on desktop
      if (!isMobile) {
        tl.fromTo(copyRef.value, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.35);
      } else {
        // On mobile, ensure opacity is 1 immediately
        if (copyRef.value) {
          gsap.set(copyRef.value, { opacity: 1 });
        }
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
  <HologramBox ref="wrapperRef" class="box-description">
    <template #title>
      <AppearingText
        :text="t('description')"
        :steps="1"
        :duration="0.35"
        @timeline:created="(tl: gsap.core.Timeline) => handleTimelineCreated(tl, 0)"
        class="box-description-title"
      />
    </template>
    <p class="box-description-copy" v-html="t('about-intro')" ref="copyRef"></p>
  </HologramBox>
</template>

<style scoped lang="scss">
.box-description {
  width: 100%;
  //display: none;

  &-line {
    @include mixins.landscape {
      display: none;
    }
  }

  &-title {
    font-size: var(--font-size-title-xs);

    @include mixins.landscape-large {
      font-size: var(--font-size-title-xs);
    }
  }

  &-content {
    display: flex;
    justify-content: space-between;
  }

  &-copy {
    padding: var(--space-sm);
    padding-top: var(--space-xxs);

    will-change: opacity;

    @include mixins.mq("md") {
      padding: var(--space-md);
      padding-top: 0;
    }

    @include mixins.landscape {
      padding-top: 0;
      font-size: var(--font-size-sm);
    }

    @include mixins.landscape-large {
      font-size: var(--font-size-lg);
    }
  }
}
</style>
