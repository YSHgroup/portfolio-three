<script setup lang="ts"></script>

<template>
  <div class="section-two">
    <div class="section-two-content grid">
      <h2 class="section-two-title">Services</h2>
    </div>
  </div>
</template>

<style scoped lang="scss">
.section-two {
  height: calc(var(--svh) * 100);
  color: var(--color-white-400);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &-title {
    grid-column: 2 / 13;
  }
}
</style>
