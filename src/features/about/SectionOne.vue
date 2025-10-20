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
  color: var(--color-white-400);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  height: calc(var(--svh) * 100);

  @include mixins.mq("md") {
    justify-content: center;
  }

  &-title {
    grid-column: 9 / 13;
  }
}
</style>
