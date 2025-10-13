<script setup lang="ts">
import Button from "./Button.vue";
</script>

<template>
  <header class="header">
    <Button>Get in touch</Button>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: fixed;
  top: var(--space-outer);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-outer);
  left: 50%;
  transform: translateX(-50%);
  width: var(--breakpoint-xxl);
  max-width: 100%;
  z-index: var(--z-index-header);
}
</style>
