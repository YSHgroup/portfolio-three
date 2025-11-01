<script setup lang="ts">
import HologramBox from "../../components/HologramBox.vue";
import HologramBoxLine from "../../components/HologramBoxLine.vue";
import { t } from "../../i18n/utils/translate";
import { ref, watchEffect } from "vue";
import gsap from "gsap";

const wrapperRef = ref<InstanceType<typeof HologramBox> | null>(null);

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
    { clipPath: "inset(0% 0% 0% 0%)", duration: 0.5, ease: "power1.out" },
    0,
  );

  emit("timeline:created", tl);

  onInvalidate(() => {
    tl.kill();
  });
});
</script>

<template>
  <HologramBox ref="wrapperRef" title="David" class="box-one">
    <div class="box-one-details">
      <p class="box-one-details-copy">{{ t("location") }}: {{ t("germany") }}</p>
      <p class="box-one-details-copy">Version: 2.7</p>
    </div>
    <HologramBoxLine />
    <p class="box-one-copy" v-html="t('about-intro')"></p>
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
