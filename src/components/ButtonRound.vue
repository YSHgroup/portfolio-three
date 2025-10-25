<script setup lang="ts">
import { computed } from "vue";
import ButtonWrapper from "./ButtonWrapper.vue";

const props = defineProps<{
  size?: "sm" | "md" | "lg";
}>();

const classes = computed(() => ["button-round", `button-round-size-${props.size ?? "md"}`]);
</script>

<template>
  <ButtonWrapper v-bind="props" rounded :class="classes">
    <slot></slot>
  </ButtonWrapper>
</template>

<style scoped lang="scss">
.button-round {
  display: flex;
  align-items: center;
  justify-content: center;

  &-size {
    &-sm {
      width: 32px;
    }

    &-md {
      width: 44px;
    }

    &-lg {
      width: 52px;
    }
  }
}
</style>
