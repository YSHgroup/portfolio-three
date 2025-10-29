<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  copy: string;
  size?: "sm" | "md";
}>();

const resolvedSize = computed(() => props.size ?? "md");
</script>

<template>
  <div class="banner" :class="`banner-size-${resolvedSize}`">
    <p class="banner-copy" :class="`banner-copy-size-${resolvedSize}`">{{ props.copy }}</p>
  </div>
</template>

<style scoped lang="scss">
.banner {
  background-color: #263c70;
  width: fit-content;
  outline: var(--stroke-lg) solid var(--color-beige-400);
  transform-origin: center center;

  &-size {
    &-sm {
      padding: 2px var(--space-xxs);

      @include mixins.mq("lg") {
        padding: var(--space-xxs) var(--space-xs);
      }
    }

    &-md {
      padding: var(--space-xxs) var(--space-xs);

      @include mixins.mq("lg") {
        padding: var(--space-xs) var(--space-sm);
      }
    }
  }

  &-copy {
    font-weight: 700;
    color: var(--color-white-400);
    font-family: "NB-Architekt-Std";
    text-transform: uppercase;

    &-size {
      &-sm {
        font-size: var(--font-size-title-xxs);

        @include mixins.mq("xl") {
          font-size: var(--font-size-title-xs);
        }
      }

      &-md {
        font-size: var(--font-size-title-xxs);

        @include mixins.mq("lg") {
          font-size: var(--font-size-title-xs);
        }

        @include mixins.mq("xl") {
          font-size: var(--font-size-title-sm);
        }
      }
    }
  }
}
</style>
