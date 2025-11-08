<script setup lang="ts">
import HologramBox from "../../components/HologramBox.vue";
import { computed, ref, watchEffect, onBeforeUnmount } from "vue";
import gsap from "gsap";
import { locale } from "../../i18n/store";
import { t } from "../../i18n/utils/translate";
import AppearingText from "../../components/AppearingText.vue";
import { BREAKPOINTS } from "../../utils/sizes";

const wrapperRef = ref<InstanceType<typeof HologramBox> | null>(null);
const timelines = ref<{ timeline: gsap.core.Timeline; delay: number }[]>([]);
const subRefs = ref<HTMLParagraphElement[]>([]);
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

      for (let i = 0; i < timelines.value.length; i++) {
        const item = timelines.value[i];
        if (!item) continue;
        tl.add(() => {
          item.timeline.restart(true);
        }, item.delay);
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
  timelines.value.push({ timeline, delay });
};

const SERVICES_EN = [
  { name: "Frontend", sub: "React, Vue" },
  { name: "Backend", sub: "Node.js, Redis, PostgreSQL" },
  { name: "3D & Creative", sub: "Three.js, GLSL, GSAP" },
  { name: "Real-Time", sub: "WebSockets, Multiplayer" },
] as const satisfies { name: string; sub: string }[];

const SERVICES_DE = [
  { name: "Frontend", sub: "React, Vue" },
  { name: "Backend", sub: "Node.js, Redis, PostgreSQL" },
  { name: "3D & Kreativ", sub: "Three.js, GLSL, GSAP" },
  { name: "Echtzeit", sub: "WebSockets, Multiplayer" },
] as const satisfies { name: string; sub: string }[];

const services = computed(() => {
  return locale.value === "en" ? SERVICES_EN : SERVICES_DE;
});
</script>

<template>
  <HologramBox ref="wrapperRef" class="box-services">
    <template #title>
      <AppearingText
        :text="t('services')"
        :steps="1"
        :duration="0.35"
        @timeline:created="(tl: gsap.core.Timeline) => handleTimelineCreated(tl, 0)"
        class="box-services-title"
      />
    </template>
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
        <p
          class="box-services-list-item-sub"
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
.box-services {
  display: none;

  &-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
    padding-bottom: var(--space-md);
    padding-top: var(--space-xxs);
    padding-right: var(--space-xxs);

    @include mixins.landscape {
      padding-bottom: var(--space-sm);
      padding-top: 0;
    }

    @include mixins.landscape-large {
      padding-bottom: var(--space-md);
    }

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
        background-color: var(--color-text-cyan-300);
      }

      &-name {
        font-size: var(--font-size-md);

        @include mixins.landscape {
          font-size: var(--font-size-sm);
        }

        @include mixins.landscape-large {
          font-size: var(--font-size-lg);
        }
      }

      &-sub {
        font-size: var(--font-size-xs);
        opacity: 0;
        will-change: opacity;
        color: var(--color-text-cyan-300);

        @include mixins.landscape-large {
          font-size: var(--font-size-sm);
        }
      }
    }
  }

  &-title {
    font-size: var(--font-size-title-xs);

    @include mixins.landscape {
      font-size: var(--font-size-title-xxs);
    }

    @include mixins.landscape-large {
      font-size: var(--font-size-title-xs);
    }
  }
}
</style>
