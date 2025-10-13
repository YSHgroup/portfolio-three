<script setup lang="ts"></script>

<template>
  <div class="about">
    <p>about</p>
  </div>
</template>

<style scoped lang="scss">
.about {
  min-height: var(--100vh);
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 200px;

  &-lines {
    position: absolute;
    top: 0;
    left: 0;
  }

  &-overlay {
    position: absolute;
    transform: translateY(calc(var(--100vh) * -1));
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% + var(--100vh));
    opacity: 0;
  }
}
</style>
