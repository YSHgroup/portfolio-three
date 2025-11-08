<script setup lang="ts">
import { computed, ref, watchEffect, onBeforeUnmount } from "vue";
import gsap from "gsap";
import { locale } from "../../i18n/store";
import { t } from "../../i18n/utils/translate";
import AppearingText from "../../components/AppearingText.vue";
import { BREAKPOINTS } from "../../utils/sizes";
import { Vector3 } from "three";
import ProjectedElement from "../../components/ProjectedElement.vue";

const landscapePoint = new Vector3(0.75, 2.9, 6);
const portraitPoint = new Vector3(-0.6, 4.2, 6);

const wrapperRef = ref<HTMLDivElement | null>(null);
const timelines = ref<{ timeline: gsap.core.Timeline; delay: number }[]>([]);
const subRefs = ref<HTMLParagraphElement[]>([]);
let matchMedia: gsap.MatchMedia | null = null;

const emit = defineEmits<{
  "timeline:created": [timeline: gsap.core.Timeline];
}>();

watchEffect((onInvalidate) => {
  const wrapperEl = wrapperRef.value;
  if (!wrapperEl) return;

  if (matchMedia) {
    matchMedia.revert();
    matchMedia = null;
  }

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
        }, item.delay + 0.25);
      }

      // Only fade in on desktop
      if (!isMobile && subRefs.value.length > 0) {
        const subItems = subRefs.value.filter((ref) => ref !== null && ref !== undefined);
        if (subItems.length > 0) {
          tl.fromTo(subItems, { opacity: 0 }, { opacity: 1, duration: 0.2, stagger: 0.1 }, 0.3);
        }
      } else if (isMobile && subRefs.value.length > 0) {
        // On mobile, ensure opacity is 1 immediately
        const subItems = subRefs.value.filter((ref) => ref !== null && ref !== undefined);
        if (subItems.length > 0) {
          gsap.set(subItems, { opacity: 1 });
        }
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

const SERVICES_EN = [
  { name: "Three.js & WebGL" },
  { name: "Node.js & WebSockets" },
  { name: "React & Vue" },
  { name: "Kubernetes & Redis" },
  { name: "Real-Time Multiplayer" },
] as const satisfies { name: string }[];

const SERVICES_DE = [
  { name: "Three.js & WebGL" },
  { name: "Node.js & WebSockets" },
  { name: "React & Vue" },
  { name: "Kubernetes & Redis" },
  { name: "Real-Time Multiplayer" },
] as const satisfies { name: string }[];

const services = computed(() => {
  return locale.value === "en" ? SERVICES_EN : SERVICES_DE;
});
</script>

<template>
  <ProjectedElement :landscape="landscapePoint" :portrait="portraitPoint">
    <div ref="wrapperRef" class="box-services-content">
      <div class="box-services-title">
        <AppearingText
          :text="t('services')"
          :steps="1"
          :duration="0.35"
          @timeline:created="(tl: gsap.core.Timeline) => handleTimelineCreated(tl, 0)"
        />
      </div>
      <div class="box-services-list">
        <div class="box-services-list-item" v-for="(service, index) in services" :key="service.name">
          <p class="box-services-list-item-name">
            <AppearingText
              :text="service.name"
              :steps="1"
              :duration="0.35"
              @timeline:created="(tl: gsap.core.Timeline) => handleTimelineCreated(tl, 0.15 + index * 0.1)"
            />
          </p>
        </div>
      </div>
    </div>
  </ProjectedElement>
</template>

<style scoped lang="scss">
.box-services {
  &-content {
    position: relative;
    padding-top: var(--space-sm);
    padding-bottom: var(--space-xxs);
    padding-right: var(--space-sm);
    padding-left: calc(96px + var(--space-md));
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);

    @include mixins.mq("md") {
      padding-top: var(--space-md);
      padding-right: var(--space-md);
    }

    @include mixins.landscape-large {
      width: 480px;
    }

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
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
      width: 96px;
      height: calc(100% - 3px);
      border: var(--stroke-md) solid var(--color-cyan-400);
      border-bottom-width: 0;
      border-left-width: 0;
      border-top-right-radius: var(--radius-md);
    }
  }

  &-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);

    &-item {
      display: flex;
      flex-direction: column;
      padding-left: 18px;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        left: 2px;
        top: 6px;
        width: 4px;
        height: 4px;
        background-color: var(--color-text-cyan-400);
        box-shadow: var(--about-shadow);
        border-radius: 50%;
      }

      &-name {
        font-size: var(--font-size-md);
        text-shadow: var(--about-shadow);

        @include mixins.landscape {
          font-size: var(--font-size-sm);
        }

        @include mixins.landscape-large {
          font-size: var(--font-size-lg);
        }
      }
    }
  }

  &-title {
    font-size: var(--font-size-title-xs);
    text-shadow: var(--about-shadow);
    font-weight: 700;

    @include mixins.landscape {
      font-size: var(--font-size-title-xxs);
    }

    @include mixins.landscape-large {
      font-size: var(--font-size-title-xs);
    }
  }
}
</style>
