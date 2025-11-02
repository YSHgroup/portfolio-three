<script setup lang="ts">
const props = defineProps<{
  isActive?: boolean;
  isDarkTheme?: boolean;
}>();
</script>

<template>
  <button
    class="header-link"
    :data-cursor="isDarkTheme ? 'circle-white' : 'circle-black'"
    :class="{ 'header-link-active': props.isActive, 'header-link-dark': props.isDarkTheme }"
  >
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
.header-link {
  letter-spacing: 0.02em;
  font-weight: 700;
  border: none;
  background: none;
  transition: color 0.1s ease-in-out;
  font-size: var(--font-size-md);
  width: 128px;
  white-space: nowrap;
  text-transform: uppercase;
  z-index: 2;
  border-radius: 100px;
  padding: var(--space-xxs) 0;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: background-color 0.1s ease-in-out;
    background-color: var(--color-beige-700);
    border-radius: 100px;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.1s ease-in-out;
  }

  &-dark {
    &::after {
      background-color: var(--color-dark-blue-600);
    }
  }

  &-active {
    &::after {
      opacity: 0 !important;
    }
  }

  @include mixins.hover {
    &:hover {
      &::after {
        opacity: 1;
      }
    }
  }
}
</style>
