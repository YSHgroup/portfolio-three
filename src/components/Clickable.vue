<script setup lang="ts">
const props = defineProps<{
  renderAs?: "button" | "a" | "div";
}>();
</script>

<template>
  <component :is="props.renderAs ?? 'button'" class="clickable">
    <slot></slot>
  </component>
</template>

<style scoped lang="scss">
.clickable {
  border: none;
  background: none;
  cursor: pointer;
  position: relative;
  z-index: 0;

  &::after {
    content: "";
    position: absolute;
    top: -5px;
    left: -5px;
    width: calc(100% + 10px);
    height: calc(100% + 10px);
    background-color: var(--color-beige-500);
    z-index: -1;
    border-radius: var(--radius-md);
    visibility: hidden;
  }

  @include mixins.hover {
    &:hover {
      &::after {
        visibility: visible;
      }
    }
  }
}
</style>
