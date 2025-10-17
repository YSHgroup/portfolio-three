<script setup lang="ts"></script>

<template>
  <div class="section-one">
    <div class="section-one-content grid">
      <h2 class="section-one-title">About</h2>
    </div>
  </div>
</template>

<style scoped lang="scss">
.section-one {
  height: var(--100vh);
  color: var(--color-white-400);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &-title {
    grid-column: 9 / 13;
  }
}
</style>
