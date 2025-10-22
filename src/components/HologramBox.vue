<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  title?: string;
  footer?: boolean;
}>();

const classes = computed(() => ["hologram-box", { "hologram-box-has-title": !!props.title }]);
</script>

<template>
  <div :class="classes">
    <div class="hologram-box-header" v-if="props.title">
      <h3 class="hologram-box-header-title">{{ props.title }}</h3>
      <svg viewBox="0 0 257 42" fill="none" xmlns="http://www.w3.org/2000/svg" class="hologram-box-header-svg">
        <path
          d="M13.929 3.92893L3.92898 13.9289C0.023735 17.8342 0.023735 24.1658 3.92898 28.0711L13.929 38.0711C15.8043 39.9464 18.3479 41 21 41H226.716C229.368 41 231.911 39.9464 233.787 38.0711L243.787 28.0711C247.692 24.1658 247.692 17.8342 243.787 13.9289L233.787 3.92893C231.911 2.05357 229.368 1 226.716 1H21C18.3479 1 15.8043 2.05357 13.929 3.92893Z"
          vector-effect="non-scaling-stroke"
          class="hologram-box-header-path"
        />
      </svg>
    </div>
    <slot></slot>
    <div class="hologram-box-footer" v-if="props.footer">
      <svg class="hologram-box-footer-svg" viewBox="0 0 255 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0.257324 0.428772L14.3995 8.91406C18.1502 11.1645 23.2373 12.4288 28.5416 12.4288H225.973C231.277 12.4288 236.364 11.1645 240.115 8.91405L254.257 0.428772"
          class="hologram-box-footer-path"
          vector-effect="non-scaling-stroke"
        />
      </svg>
    </div>
  </div>
</template>

<style scoped lang="scss">
.hologram-box {
  width: 100%;
  padding: var(--space-md);
  padding-top: var(--space-md);
  border: 1px solid var(--color-cyan-400);
  position: relative;
  border-radius: var(--radius-sm);
  background: linear-gradient(to bottom, rgba(0, 44, 124, 0.6) 30%, rgba(0, 65, 157, 0.8) 95%);
  color: var(--color-cyan-300);
  line-height: 1.1;
  filter: drop-shadow(0 6px 4px rgba(0, 44, 124, 0.75));

  &-has-title {
    padding-top: calc(var(--space-md) + 16px);
  }

  &-header {
    position: absolute;
    top: 0;
    left: var(--space-xs);
    transform: translate(0, -50%);
    width: 200px;

    &-title {
      font-size: var(--font-size-title-sm);
      font-weight: 700;
      position: absolute;
      top: 50%;
      left: 0;
      padding-left: var(--space-md);
      transform: translate(0, -50%);
    }

    &-path {
      fill: rgb(0, 65, 158);
      stroke: var(--color-cyan-400);
      stroke-width: 1px;
    }

    &-svg {
      overflow: visible;
    }
  }

  &-footer {
    position: absolute;
    bottom: 0;
    right: var(--space-md);
    transform: translate(0, 100%);
    width: 96px;

    &-path {
      fill: var(--color-cyan-400);
    }

    &-svg {
      overflow: visible;
    }
  }
}
</style>
